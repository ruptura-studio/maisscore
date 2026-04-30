import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { getPayment, getPixQrCode } from '@/lib/asaas'
import { handlePaymentConfirmedWebhook } from '@/lib/webhooks/payment-confirmed'

async function fireClientWebhook(payload: Record<string, unknown>) {
  const url = process.env.WEBHOOK_CLIENT_URL
  if (!url) return
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {})
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { payment: true, product: true, lead: true },
    })

    if (!order || !order.payment || !order.lead) {
      return Response.json({ success: false, error: 'Pedido não encontrado.' }, { status: 404 })
    }

    const { payment, product } = order

    // Se já confirmado, retorna sem buscar no Asaas
    if (payment.status === 'confirmed') {
      return Response.json({
        success: true,
        data: {
          orderId: order.id,
          status: 'confirmed',
          method: payment.method,
          amount: payment.amount,
          productName: product.name,
          phone: order.lead.phone,
        },
      })
    }

    // Verifica status atual no Asaas
    let currentStatus = payment.status
    if (payment.asaasId) {
      const asaasPayment = await getPayment(payment.asaasId)
      const asaasConfirmed =
        asaasPayment.status === 'CONFIRMED' || asaasPayment.status === 'RECEIVED'

      if (asaasConfirmed && payment.status !== 'confirmed') {
        await handlePaymentConfirmedWebhook(
          {
            event: 'PAYMENT_CONFIRMED',
            payment: { id: payment.asaasId },
          },
          process.env.ASAAS_WEBHOOK_TOKEN ?? null,
          { prisma },
        )
        fireClientWebhook({
          orderId: order.id,
          leadId: order.leadId,
          name: order.lead.name,
          phone: order.lead.phone,
          email: order.lead.email,
          productSlug: product.slug,
          method: payment.method,
          amount: payment.amount,
        })
        currentStatus = 'confirmed'
      }
    }

    // Para PIX pendente, retorna QR code fresco do Asaas
    let pixQrCode: string | null = null
    let pixPayload: string | null = payment.pixKey ?? null

    if (payment.method === 'PIX' && payment.asaasId && currentStatus !== 'confirmed') {
      try {
        const qr = await getPixQrCode(payment.asaasId)
        pixQrCode = qr.encodedImage
        pixPayload = qr.payload
      } catch {
        // QR pode ter expirado — usa pixKey salvo no banco como fallback
      }
    }

    return Response.json({
      success: true,
      data: {
        orderId: order.id,
        status: currentStatus,
        method: payment.method,
        amount: payment.amount,
        productName: product.name,
        phone: order.lead.phone,
        pixQrCode,
        pixPayload,
        pixExpiresAt: payment.pixExpiresAt?.toISOString() ?? null,
      },
    })
  } catch (error) {
    console.error('[GET /api/checkout/[orderId]]', error)
    return Response.json({ success: false, error: 'Erro interno.' }, { status: 500 })
  }
}
