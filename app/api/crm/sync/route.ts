import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { normalizeBrazilPhone } from '@/lib/phone'

export async function POST(req: NextRequest) {
  try {
    const expectedToken = process.env.CRM_SYNC_WEBHOOK_TOKEN?.trim()
    if (expectedToken) {
      const providedToken = req.headers.get('x-crm-sync-token')?.trim()
      if (!providedToken || providedToken !== expectedToken) {
        return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
      }
    }

    const body = await req.json()
    const crmId = (body?.crmId ?? body?.contactId ?? body?.id) as string | undefined
    const leadId = body?.leadId as string | undefined
    const orderId = body?.orderId as string | undefined
    const phone = normalizeBrazilPhone(body?.phone as string | undefined)
    const email = (body?.email as string | undefined)?.trim()?.toLowerCase()

    if (!crmId) {
      return Response.json({ success: false, error: 'crmId é obrigatório.' }, { status: 400 })
    }

    let lead: { id: string; crmId: string | null; phone: string; email: string | null } | null = null

    if (leadId) {
      lead = await prisma.lead.findUnique({
        where: { id: leadId },
        select: { id: true, crmId: true, phone: true, email: true },
      })
    }

    if (!lead && orderId) {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { lead: { select: { id: true, crmId: true, phone: true, email: true } } },
      })
      lead = order?.lead ?? null
    }

    if (!lead && phone) {
      lead = await prisma.lead.findFirst({
        where: { phone },
        orderBy: { updatedAt: 'desc' },
        select: { id: true, crmId: true, phone: true, email: true },
      })
    }

    if (!lead && email) {
      lead = await prisma.lead.findFirst({
        where: { email },
        orderBy: { updatedAt: 'desc' },
        select: { id: true, crmId: true, phone: true, email: true },
      })
    }

    if (!lead) {
      return Response.json(
        { success: false, error: 'Lead não encontrado para sincronizar crmId.' },
        { status: 404 },
      )
    }

    const updated = await prisma.lead.update({
      where: { id: lead.id },
      data: {
        crmId,
        lastInteractionAt: new Date(),
      },
      select: { id: true, crmId: true, phone: true, email: true },
    })

    await prisma.leadEvent.create({
      data: {
        leadId: updated.id,
        type: 'crm_id_synced',
        value: JSON.stringify({
          crmId,
          previousCrmId: lead.crmId,
          orderId: orderId ?? null,
          syncedAt: new Date().toISOString(),
        }),
      },
    })

    return Response.json({
      success: true,
      data: {
        leadId: updated.id,
        crmId: updated.crmId,
      },
    })
  } catch (error) {
    console.error('[POST /api/crm/sync]', error)
    return Response.json({ success: false, error: 'Erro interno.' }, { status: 500 })
  }
}

