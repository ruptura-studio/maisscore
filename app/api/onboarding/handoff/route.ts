import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { getOnboardingWebhookToken } from '@/lib/config'

function toDate(value: string | undefined) {
  if (!value) return null
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

export async function POST(req: NextRequest) {
  try {
    const expectedToken = getOnboardingWebhookToken()
    if (!expectedToken) {
      return Response.json(
        { success: false, error: 'ONBOARDING_WEBHOOK_TOKEN não configurada' },
        { status: 500 },
      )
    }

    const providedToken = req.headers.get('x-onboarding-access-token')?.trim()
    if (!providedToken || providedToken !== expectedToken) {
      return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const orderId = body?.orderId as string | undefined
    const leadIdInput = body?.leadId as string | undefined
    const processId = body?.processId as string | undefined
    const status = (body?.status as string | undefined) ?? 'ready'
    const notes = body?.notes as string | undefined
    const checklistStatus = (body?.checklistStatus as string | undefined) ?? 'complete'
    const checklistSummary = body?.checklistSummary as string | undefined
    const missingItems = body?.missingItems as string | string[] | undefined
    const crmSyncStatus = body?.crmSyncStatus as string | undefined
    const routedAt = toDate(body?.routedAt as string | undefined) ?? new Date()
    const handoffSentAt = toDate(body?.handoffSentAt as string | undefined) ?? new Date()

    if (!orderId) {
      return Response.json({ success: false, error: 'orderId é obrigatório.' }, { status: 400 })
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { process: true },
    })

    if (!order) {
      return Response.json({ success: false, error: 'Pedido não encontrado.' }, { status: 404 })
    }

    const leadId = leadIdInput ?? order.leadId
    const serializedMissingItems = Array.isArray(missingItems) ? missingItems.join(', ') : missingItems ?? null

    const processStage = body?.processStage ?? order.process?.stage ?? (processId ? `process_id:${processId}` : null)
    const normalizedNotes = [notes, processId ? `processId=${processId}` : null].filter(Boolean).join(' | ') || null

    const handoff = await prisma.onboardingHandoff.upsert({
      where: { orderId: order.id },
      create: {
        leadId,
        orderId: order.id,
        status,
        checklistStatus,
        checklistSummary: checklistSummary ?? null,
        missingItems: serializedMissingItems,
        processStage,
        crmSyncStatus: crmSyncStatus ?? null,
        routedAt,
        handoffSentAt,
        notes: normalizedNotes,
      },
      update: {
        leadId,
        status,
        checklistStatus,
        checklistSummary: checklistSummary ?? null,
        missingItems: serializedMissingItems,
        processStage,
        crmSyncStatus: crmSyncStatus ?? null,
        routedAt,
        handoffSentAt,
        notes: normalizedNotes,
      },
    })

    await prisma.lead.update({
      where: { id: leadId },
      data: {
        status: 'handoff_ready',
        lastInteractionAt: new Date(),
      },
    })

    await prisma.leadEvent.create({
      data: {
        leadId,
        type: 'onboarding_handoff_created',
        value: JSON.stringify({
          orderId: order.id,
          onboardingHandoffId: handoff.id,
          status: handoff.status,
          checklistStatus: handoff.checklistStatus,
          createdAt: handoff.createdAt.toISOString(),
          processId: processId ?? null,
        }),
      },
    })

    return Response.json({
      success: true,
      data: {
        id: handoff.id,
        leadId: handoff.leadId,
        orderId: handoff.orderId,
        status: handoff.status,
        notes: handoff.notes,
        createdAt: handoff.createdAt.toISOString(),
      },
    })
  } catch (error) {
    console.error('[POST /api/onboarding/handoff]', error)
    return Response.json({ success: false, error: 'Erro interno.' }, { status: 500 })
  }
}
