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

    const {
      step,
      name,
      email,
      phone,
      document,
      documentType,
      razaoSocial,
      birthDate,
      addressStreet,
      addressNumber,
      addressComplement,
      addressNeighborhood,
      addressCity,
      addressState,
      addressZip,
      civilStatus,
      profession,
      identityDocument,
      responsibleName,
      responsibleCpf,
      productSlug,
      paymentMethod,
    } = parsed.data

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
        ...(birthDate ? { birthDate: new Date(birthDate) } : {}),
        ...(addressStreet !== undefined ? { addressStreet } : {}),
        ...(addressNumber !== undefined ? { addressNumber } : {}),
        ...(addressComplement !== undefined ? { addressComplement } : {}),
        ...(addressNeighborhood !== undefined ? { addressNeighborhood } : {}),
        ...(addressCity !== undefined ? { addressCity } : {}),
        ...(addressState !== undefined ? { addressState } : {}),
        ...(addressZip !== undefined ? { addressZip } : {}),
        ...(civilStatus !== undefined ? { civilStatus } : {}),
        ...(profession !== undefined ? { profession } : {}),
        ...(identityDocument !== undefined ? { identityDocument } : {}),
        ...(responsibleName !== undefined ? { responsibleName } : {}),
        ...(responsibleCpf !== undefined ? { responsibleCpf } : {}),
        checkoutStep: step,
        status: 'checkout_iniciado',
      },
    })

    // Dispara webhook n8n conforme step
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_CRM_SYNC
      ?? (
        step === 1
          ? process.env.WEBHOOK_STEP1_URL
          : step === 2
            ? process.env.WEBHOOK_STEP2_URL
            : null
      )

    if (n8nWebhookUrl) {
      fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: step === 1 ? 'checkout_started' : 'checkout_submitted',
          supabaseLeadId: lead.id,
          leadId: lead.id,
          step,
          name: lead.name,
          phone: lead.phone,
          email: lead.email,
          leadType: lead.leadType,
          companyName: lead.companyName,
          productSlug,
          paymentMethod,
          status: lead.status,
          stage: lead.checkoutStep === 2 ? 'checkout_submitted' : 'checkout_started',
        }),
      }).catch(() => {}) // fire-and-forget
    }

    return Response.json({ success: true, leadId: lead.id })
  } catch (error) {
    console.error('[POST /api/checkout/progress]', String(error))
    return Response.json({ success: false, error: 'Erro interno.' }, { status: 500 })
  }
}
