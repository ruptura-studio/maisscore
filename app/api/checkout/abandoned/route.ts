import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, document, documentType, product, paymentMethod, installments } = body

    // Só salva se tiver pelo menos um campo preenchido
    if (!name && !email && !phone && !document) {
      return Response.json({ received: true })
    }

    await prisma.abandonedCheckout.create({
      data: {
        name: name || null,
        email: email || null,
        phone: phone || null,
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
