import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { createLeadSchema } from '@/lib/validations/lead'

function classifyTraffic(utm: {
  source?: string | null
  medium?: string | null
  campaign?: string | null
}): 'cold' | 'warm' | 'hot' {
  if (utm.source === 'cpa_partner' || utm.medium === 'affiliate') return 'hot'
  if (utm.campaign?.includes('cpa') || utm.campaign?.includes('urgency')) return 'hot'
  if (utm.medium === 'cpc' || utm.campaign?.includes('comparison')) return 'warm'
  return 'cold'
}

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

    const { name, phone, email, channel, utmSource, utmMedium, utmCampaign, utmContent, utmTerm } = parsed.data

    const trafficTemperature = classifyTraffic({
      source: utmSource,
      medium: utmMedium,
      campaign: utmCampaign,
    })

    // 2. Salvar no Supabase via Prisma (upsert por telefone)
    const lead = await prisma.lead.upsert({
      where: { phone },
      create: {
        name,
        phone,
        email: email || null,
        channel: channel ?? 'site',
        utmSource:          utmSource    ?? null,
        utmMedium:          utmMedium    ?? null,
        utmCampaign:        utmCampaign  ?? null,
        utmContent:         utmContent   ?? null,
        utmTerm:            utmTerm      ?? null,
        trafficTemperature,
        status: 'novo',
        stage: 'lead',
      },
      update: {
        name,
        email: email || null,
        utmSource:          utmSource    ?? null,
        utmMedium:          utmMedium    ?? null,
        utmCampaign:        utmCampaign  ?? null,
        utmContent:         utmContent   ?? null,
        utmTerm:            utmTerm      ?? null,
        trafficTemperature,
        lastInteractionAt: new Date(),
      },
    })

    // 3. Disparar webhook n8n (fire and forget — não bloqueia a resposta)
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_CRM_SYNC ?? process.env.N8N_WEBHOOK_LEADS

    if (n8nWebhookUrl) {
      fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'lead_created',
          supabaseLeadId: lead.id,
          leadId: lead.id,
          name,
          phone,
          email,
          channel,
          trafficTemperature,
          status: lead.status,
          stage: lead.stage,
          utmSource,
          utmMedium,
          utmCampaign,
          utmContent,
          utmTerm,
        }),
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
