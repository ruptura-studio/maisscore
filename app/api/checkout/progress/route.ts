import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { checkoutProgressSchema } from '@/lib/validations/checkout'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const parsed = checkoutProgressSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json(
        { success: false, error: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

    const { step, name, email, phone, document, documentType, razaoSocial, productSlug, paymentMethod } = parsed.data

    if (!phone) {
      return Response.json({ success: false, error: 'Telefone obrigatório.' }, { status: 400 })
    }

    const leadType = documentType === 'CNPJ' ? 'cnpj' : 'cpf'

    const lead = await prisma.lead.upsert({
      where: { phone },
      create: {
        name: name ?? '',
        phone,
        email,
        channel: 'checkout',
        status: 'checkout_iniciado',
        companyName: razaoSocial,
        leadType,
        checkoutStep: step,
      },
      update: {
        ...(name ? { name } : {}),
        ...(email ? { email } : {}),
        ...(razaoSocial !== undefined ? { companyName: razaoSocial } : {}),
        ...(documentType ? { leadType } : {}),
        checkoutStep: step,
        status: 'checkout_iniciado',
      },
    })

    // Dispara webhook n8n conforme step
    const webhookUrl =
      step === 1
        ? process.env.WEBHOOK_STEP1_URL
        : step === 2
          ? process.env.WEBHOOK_STEP2_URL
          : null

    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          step,
          name: lead.name,
          phone: lead.phone,
          email: lead.email,
          leadType: lead.leadType,
          companyName: lead.companyName,
          productSlug,
          paymentMethod,
        }),
      }).catch(() => {}) // fire-and-forget
    }

    return Response.json({ success: true, leadId: lead.id })
  } catch (error) {
    console.error('[POST /api/checkout/progress]', String(error))
    return Response.json({ success: false, error: 'Erro interno.' }, { status: 500 })
  }
}
