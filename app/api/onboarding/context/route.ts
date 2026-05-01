import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { getOnboardingWebhookToken } from '@/lib/onboarding-auth'

function toIso(value: Date | null | undefined) {
  return value?.toISOString?.() ?? null
}

function normalizePayload(record: any) {
  const order = record?.order ?? record
  const lead = order?.lead
  const payment = order?.payment ?? record?.payment ?? null
  const product = order?.product ?? null
  const process = order?.process ?? null
  const onboardingDocuments = order?.onboardingDocuments ?? []

  return {
    fetchedAt: new Date().toISOString(),
    lead: lead
      ? {
          id: lead.id,
          name: lead.name,
          phone: lead.phone,
          email: lead.email,
          birthDate: toIso(lead.birthDate),
          addressStreet: lead.addressStreet ?? null,
          addressNumber: lead.addressNumber ?? null,
          addressComplement: lead.addressComplement ?? null,
          addressNeighborhood: lead.addressNeighborhood ?? null,
          addressCity: lead.addressCity ?? null,
          addressState: lead.addressState ?? null,
          addressZip: lead.addressZip ?? null,
          civilStatus: lead.civilStatus ?? null,
          profession: lead.profession ?? null,
          identityDocument: lead.identityDocument ?? null,
          responsibleName: lead.responsibleName ?? null,
          responsibleCpf: lead.responsibleCpf ?? null,
          status: lead.status,
          stage: lead.stage ?? null,
          trafficTemperature: lead.trafficTemperature,
          isClient: lead.isClient,
          acquisition: lead.acquisition ?? null,
          acquisitionValue: lead.acquisitionValue ?? null,
          convertedAt: toIso(lead.convertedAt),
          crmId: lead.crmId ?? null,
        }
      : null,
    order: order
      ? {
          id: order.id,
          leadId: order.leadId,
          productId: order.productId,
          document: order.document ?? null,
          documentType: order.documentType ?? null,
          status: order.status,
          pricePaid: order.pricePaid,
        }
      : null,
    payment: payment
      ? {
          id: payment.id,
          orderId: payment.orderId,
          asaasId: payment.asaasId ?? null,
          method: payment.method ?? null,
          status: payment.status,
          amount: payment.amount,
          confirmedAt: toIso(payment.confirmedAt),
        }
      : null,
    product: product
      ? {
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
        }
      : null,
    process: process
      ? {
          id: process.id,
          orderId: process.orderId,
          status: process.status,
          stage: process.stage ?? null,
          startedAt: toIso(process.startedAt),
          cleanedAt: toIso(process.cleanedAt),
          proofUrl: process.proofUrl ?? null,
        }
      : null,
    onboardingDocuments: onboardingDocuments.map((item: any) => ({
      id: item.id,
      orderId: item.orderId,
      itemKey: item.itemKey,
      label: item.label,
      status: item.status,
      storagePath: item.storagePath ?? null,
      fileUrl: item.fileUrl ?? null,
      receivedAt: toIso(item.receivedAt),
      notes: item.notes ?? null,
    })),
  }
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

    if (!orderId && !leadId && !asaasPaymentId) {
      return Response.json(
        { success: false, error: 'Informe orderId, leadId ou asaasPaymentId.' },
        { status: 400 },
      )
    }

    let order: any = null

    if (orderId) {
      order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { lead: true, payment: true, product: true, process: true, onboardingDocuments: true },
      })
    } else if (asaasPaymentId) {
      const payment = await prisma.payment.findUnique({
        where: { asaasId: asaasPaymentId },
        include: {
          order: {
            include: { lead: true, payment: true, product: true, process: true, onboardingDocuments: true },
          },
        },
      })
      order = payment?.order ?? null
    } else if (leadId) {
      order = await prisma.order.findFirst({
        where: { leadId },
        orderBy: { createdAt: 'desc' },
        include: { lead: true, payment: true, product: true, process: true, onboardingDocuments: true },
      })
    }

    if (!order) {
      return Response.json({ success: false, error: 'Registro não encontrado.' }, { status: 404 })
    }

    return Response.json({ success: true, data: normalizePayload(order) })
  } catch (error) {
    console.error('[POST /api/onboarding/context]', error)
    return Response.json({ success: false, error: 'Erro interno.' }, { status: 500 })
  }
}
