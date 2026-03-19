import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { createLeadSchema } from '@/lib/validations/lead'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // 1. Validar com Zod
    const parsed = createLeadSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json(
        { success: false, error: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

    const { name, phone, email, channel, utmSource, utmMedium, utmCampaign } = parsed.data

    // 2. Salvar no Supabase via Prisma (upsert por telefone)
    const lead = await prisma.lead.upsert({
      where: { phone },
      create: {
        name,
        phone,
        email: email || null,
        channel: channel ?? 'site',
        utmSource:   utmSource   ?? null,
        utmMedium:   utmMedium   ?? null,
        utmCampaign: utmCampaign ?? null,
        status: 'novo',
      },
      update: {
        name,
        email: email || null,
        utmSource:   utmSource   ?? null,
        utmMedium:   utmMedium   ?? null,
        utmCampaign: utmCampaign ?? null,
      },
    })

    // 3. Disparar webhook n8n (fire and forget — não bloqueia a resposta)
    if (process.env.N8N_WEBHOOK_LEADS) {
      fetch(process.env.N8N_WEBHOOK_LEADS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: lead.id, name, phone, email, channel }),
      }).catch(() => {}) // n8n pode estar offline — não bloquear
    }

    return Response.json({ success: true, data: { id: lead.id } })

  } catch (error) {
    console.error('[POST /api/leads]', error)
    return Response.json(
      { success: false, error: 'Erro interno. Tente novamente.' },
      { status: 500 }
    )
  }
}
