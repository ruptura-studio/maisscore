import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { normalizeBrazilPhone } from '@/lib/phone'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, document, documentType, product, paymentMethod, installments } = body
    const normalizedPhone = normalizeBrazilPhone(phone) ?? phone?.replace(/\D/g, '') ?? null

    // Só salva se tiver pelo menos um campo preenchido
    if (!name && !email && !normalizedPhone && !document) {
      return Response.json({ received: true })
    }

    await prisma.abandonedCheckout.create({
      data: {
        name: name || null,
        email: email || null,
        phone: normalizedPhone,
        document: document || null,
        documentType: documentType || null,
        product: product || null,
        paymentMethod: paymentMethod || null,
        installments: installments ? Number(installments) : null,
      },
    })

    return Response.json({ received: true })
  } catch {
    return Response.json({ received: true })
  }
}
