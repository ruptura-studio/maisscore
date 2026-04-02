import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'

// Eventos relevantes do Asaas
const CONFIRMED_EVENTS = ['PAYMENT_CONFIRMED', 'PAYMENT_RECEIVED']

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('asaas-access-token')
    if (process.env.ASAAS_WEBHOOK_TOKEN && token !== process.env.ASAAS_WEBHOOK_TOKEN) {
      return Response.json({ received: false }, { status: 401 })
    }

    const body = await req.json()
    const { event, payment: asaasPayment } = body

    if (!event || !asaasPayment?.id) {
      return Response.json({ received: true })
    }

    if (!CONFIRMED_EVENTS.includes(event)) {
      return Response.json({ received: true })
    }

    // Busca payment pelo asaasId
    const payment = await prisma.payment.findUnique({
      where: { asaasId: asaasPayment.id },
      include: { order: { include: { lead: true } } },
    })

    if (!payment) {
      console.warn('[webhook/payment] asaasId não encontrado:', asaasPayment.id)
      return Response.json({ received: true })
    }

    if (payment.status === 'confirmed') {
      return Response.json({ received: true })
    }

    // Atualiza payment + order + cria process
    await prisma.$transaction([
      prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'confirmed', confirmedAt: new Date() },
      }),
      prisma.order.update({
        where: { id: payment.orderId },
        data: { status: 'pago' },
      }),
      prisma.process.create({
        data: { orderId: payment.orderId, status: 'aguardando_inicio' },
      }),
    ])

    // Dispara n8n (fire and forget)
    if (process.env.N8N_WEBHOOK_PAYMENT_CONFIRMED) {
      fetch(process.env.N8N_WEBHOOK_PAYMENT_CONFIRMED, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'payment_confirmed',
          orderId: payment.orderId,
          leadId: payment.order.leadId,
          leadName: payment.order.lead.name,
          leadPhone: payment.order.lead.phone,
          leadEmail: payment.order.lead.email,
          document: payment.order.document,
          documentType: payment.order.documentType,
          amount: payment.amount,
          method: payment.method,
        }),
      }).catch(() => {})
    }

    return Response.json({ received: true })
  } catch (error) {
    console.error('[POST /api/webhooks/payment]', error)
    return Response.json({ received: true }) // sempre 200 para o Asaas não retentar
  }
}
