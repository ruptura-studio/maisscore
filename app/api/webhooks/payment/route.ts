import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { handlePaymentConfirmedWebhook } from '@/lib/webhooks/payment-confirmed'

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('asaas-access-token')
    const body = await req.json()
    return await handlePaymentConfirmedWebhook(body, token, { prisma })
  } catch (error) {
    console.error('[POST /api/webhooks/payment]', error)
    return Response.json({ received: true }) // sempre 200 para o Asaas não retentar
  }
}
