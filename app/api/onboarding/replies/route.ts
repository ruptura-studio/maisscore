import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { getOnboardingWebhookToken } from '@/lib/onboarding-auth'

type AttachmentInput = {
  itemKey?: string
  label?: string
  status?: string
  fileUrl?: string
  storagePath?: string
  notes?: string
  receivedAt?: string
}

function toIso(value: Date | null | undefined) {
  return value?.toISOString?.() ?? null
}

function isBlank(value: string | null | undefined) {
  return !value || value.trim().length === 0
}

function computeChecklist(order: any) {
  const lead = order.lead
  const documentType = (order.documentType ?? 'CPF').toUpperCase()
  const missingData: string[] = []
  const missingDocuments: string[] = []

  if (isBlank(lead?.name)) missingData.push('lead.name')
  if (isBlank(lead?.phone)) missingData.push('lead.phone')
  if (isBlank(lead?.email)) missingData.push('lead.email')
  if (isBlank(order?.document)) missingData.push('order.document')

  if (documentType === 'CPF') {
    if (!lead?.birthDate) missingData.push('lead.birthDate')
  } else if (documentType === 'CNPJ') {
    if (isBlank(lead?.companyName)) missingData.push('lead.companyName')
    if (isBlank(lead?.responsibleName)) missingData.push('lead.responsibleName')
    if (isBlank(lead?.responsibleCpf)) missingData.push('lead.responsibleCpf')
  }

  const docs = Array.isArray(order?.onboardingDocuments) ? order.onboardingDocuments : []
  for (const doc of docs) {
    const status = (doc?.status ?? '').toLowerCase()
    if (status !== 'received' && status !== 'approved') {
      missingDocuments.push(doc.itemKey ?? doc.label ?? 'documento_pendente')
    }
  }

  const isComplete = missingData.length === 0 && missingDocuments.length === 0
  const nextStatus = isComplete
    ? 'onboarding_complete'
    : missingData.length > 0
      ? 'waiting_onboarding_data'
      : 'waiting_onboarding_documents'

  return { isComplete, missingData, missingDocuments, nextStatus }
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
    const leadId = body?.leadId as string | undefined
    const asaasPaymentId = body?.asaasPaymentId as string | undefined
    const data = (body?.data ?? {}) as Record<string, string | null | undefined>
    const attachments = (body?.attachments ?? []) as AttachmentInput[]

    if (!orderId && !leadId && !asaasPaymentId) {
      return Response.json(
        { success: false, error: 'Informe orderId, leadId ou asaasPaymentId.' },
        { status: 400 },
      )
    }

    let order: any = null

    if (orderId) {
      order = await prisma.order.findUnique({ where: { id: orderId } })
    } else if (asaasPaymentId) {
      const payment = await prisma.payment.findUnique({ where: { asaasId: asaasPaymentId } })
      if (payment?.orderId) {
        order = await prisma.order.findUnique({ where: { id: payment.orderId } })
      }
    } else if (leadId) {
      order = await prisma.order.findFirst({ where: { leadId }, orderBy: { createdAt: 'desc' } })
    }

    if (!order) {
      return Response.json({ success: false, error: 'Pedido não encontrado.' }, { status: 404 })
    }

    await prisma.$transaction(async (tx: any) => {
      const leadUpdate: Record<string, any> = {}
      const orderUpdate: Record<string, any> = {}

      if (data.name !== undefined) leadUpdate.name = data.name || null
      if (data.email !== undefined) leadUpdate.email = data.email || null
      if (data.phone !== undefined) leadUpdate.phone = data.phone || null
      if (data.birthDate !== undefined) leadUpdate.birthDate = data.birthDate ? new Date(data.birthDate) : null
      if (data.addressStreet !== undefined) leadUpdate.addressStreet = data.addressStreet || null
      if (data.addressNumber !== undefined) leadUpdate.addressNumber = data.addressNumber || null
      if (data.addressComplement !== undefined) leadUpdate.addressComplement = data.addressComplement || null
      if (data.addressNeighborhood !== undefined) leadUpdate.addressNeighborhood = data.addressNeighborhood || null
      if (data.addressCity !== undefined) leadUpdate.addressCity = data.addressCity || null
      if (data.addressState !== undefined) leadUpdate.addressState = data.addressState || null
      if (data.addressZip !== undefined) leadUpdate.addressZip = data.addressZip || null
      if (data.civilStatus !== undefined) leadUpdate.civilStatus = data.civilStatus || null
      if (data.profession !== undefined) leadUpdate.profession = data.profession || null
      if (data.identityDocument !== undefined) leadUpdate.identityDocument = data.identityDocument || null
      if (data.companyName !== undefined) leadUpdate.companyName = data.companyName || null
      if (data.responsibleName !== undefined) leadUpdate.responsibleName = data.responsibleName || null
      if (data.responsibleCpf !== undefined) leadUpdate.responsibleCpf = data.responsibleCpf || null
      if (data.cpf !== undefined) leadUpdate.cpf = data.cpf || null
      if (data.cnpj !== undefined) leadUpdate.cnpj = data.cnpj || null

      if (data.document !== undefined) orderUpdate.document = data.document || null
      if (data.documentType !== undefined) orderUpdate.documentType = data.documentType || null

      if (Object.keys(leadUpdate).length > 0) {
        leadUpdate.lastInteractionAt = new Date()
        await tx.lead.update({ where: { id: order.leadId }, data: leadUpdate })
      }

      if (Object.keys(orderUpdate).length > 0) {
        await tx.order.update({ where: { id: order.id }, data: orderUpdate })
      }

      for (const attachment of attachments) {
        if (!attachment?.itemKey) continue

        const existing = await tx.onboardingDocument.findFirst({
          where: { orderId: order.id, itemKey: attachment.itemKey },
          orderBy: { createdAt: 'desc' },
        })

        const docData = {
          status: attachment.status ?? 'received',
          label: attachment.label ?? attachment.itemKey,
          fileUrl: attachment.fileUrl ?? null,
          storagePath: attachment.storagePath ?? null,
          notes: attachment.notes ?? null,
          receivedAt: attachment.receivedAt ? new Date(attachment.receivedAt) : new Date(),
        }

        if (existing) {
          await tx.onboardingDocument.update({ where: { id: existing.id }, data: docData })
        } else {
          await tx.onboardingDocument.create({
            data: { orderId: order.id, itemKey: attachment.itemKey, ...docData },
          })
        }
      }
    })

    const refreshedOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: { lead: true, payment: true, product: true, process: true, onboardingDocuments: true },
    })

    if (!refreshedOrder) {
      return Response.json({ success: false, error: 'Pedido não encontrado após atualização.' }, { status: 404 })
    }

    const checklist = computeChecklist(refreshedOrder)

    await prisma.lead.update({
      where: { id: refreshedOrder.leadId },
      data: { status: checklist.nextStatus, lastInteractionAt: new Date() },
    })

    await prisma.leadEvent.create({
      data: {
        leadId: refreshedOrder.leadId,
        type: 'onboarding_reply_received',
        value: JSON.stringify({
          orderId: refreshedOrder.id,
          hasData: Object.keys(data).length > 0,
          attachmentsCount: attachments.length,
          checklist,
          receivedAt: new Date().toISOString(),
        }),
      },
    })

    return Response.json({
      success: true,
      action: checklist.isComplete ? 'complete' : checklist.missingData.length > 0 ? 'incomplete' : 'waiting_documents',
      checklist: {
        isComplete: checklist.isComplete,
        nextStatus: checklist.nextStatus,
        missingData: checklist.missingData,
        missingDocuments: checklist.missingDocuments,
      },
      data: {
        orderId: refreshedOrder.id,
        leadId: refreshedOrder.leadId,
        documentType: refreshedOrder.documentType ?? null,
        lead: {
          name: refreshedOrder.lead?.name ?? null,
          phone: refreshedOrder.lead?.phone ?? null,
          email: refreshedOrder.lead?.email ?? null,
          birthDate: toIso(refreshedOrder.lead?.birthDate),
          companyName: refreshedOrder.lead?.companyName ?? null,
          responsibleName: refreshedOrder.lead?.responsibleName ?? null,
          responsibleCpf: refreshedOrder.lead?.responsibleCpf ?? null,
        },
        order: {
          document: refreshedOrder.document ?? null,
          status: refreshedOrder.status,
        },
      },
    })
  } catch (error) {
    console.error('[POST /api/onboarding/replies]', error)
    return Response.json({ success: false, error: 'Erro interno.' }, { status: 500 })
  }
}
