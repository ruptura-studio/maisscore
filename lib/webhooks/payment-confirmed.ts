import { randomBytes } from 'crypto'

const CONFIRMED_EVENTS = ['PAYMENT_CONFIRMED', 'PAYMENT_RECEIVED']

type PaymentWebhookEnv = {
  ASAAS_WEBHOOK_TOKEN?: string
  N8N_WEBHOOK_PAYMENT_CONFIRMED?: string
  N8N_WEBHOOK_CRM_SYNC?: string
}

type PaymentWebhookDeps = {
  prisma: any
  fetchImpl?: typeof fetch
  env?: PaymentWebhookEnv
  now?: () => Date
  logger?: Pick<Console, 'warn' | 'error'>
}

type ClaimResult =
  | { status: 'ignored'; reason: string }
  | { status: 'deduplicated' }
  | { status: 'error'; reason: string }
    | {
      status: 'claimed'
      payment: any
      acquisition: string
      paymentConfirmedAt: Date
      onboardingToken: string
      existingOnboardingDispatch: boolean
      existingCrmSyncDispatch: boolean
    }

async function writeLeadEvent(prisma: any, logger: Pick<Console, 'warn' | 'error'>, data: any, label: string) {
  try {
    await prisma.leadEvent.create({ data })
  } catch (error) {
    logger.error?.(`[webhook/payment] failed to persist ${label} leadEvent:`, error)
  }
}

async function dispatchWebhook(
  prisma: any,
  fetchImpl: typeof fetch,
  logger: Pick<Console, 'warn' | 'error'>,
  params: {
    url: string
    payload: any
    successType: string
    failureType: string
    leadId: string
    orderId: string
    asaasPaymentId: string
    event: string
    now: () => Date
    label: string
  },
) {
  const { url, payload, successType, failureType, leadId, orderId, asaasPaymentId, event, now, label } = params

  try {
    const response = await fetchImpl(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const responseBody = await response.text().catch(() => '')
      logger.warn?.(`[webhook/payment] ${label} webhook returned non-2xx:`, {
        url,
        status: response.status,
        body: responseBody,
      })
      await writeLeadEvent(
        prisma,
        logger,
        {
          leadId,
          type: failureType,
          value: JSON.stringify({
            asaasPaymentId,
            orderId,
            event,
            url,
            status: response.status,
            body: responseBody,
            failedAt: now().toISOString(),
          }),
        },
        `${label} failure`,
      )
      return
    }

    await writeLeadEvent(
      prisma,
      logger,
      {
        leadId,
        type: successType,
        value: JSON.stringify({
          asaasPaymentId,
          orderId,
          event,
          url,
          dispatchedAt: now().toISOString(),
        }),
      },
      `${label} success`,
    )
  } catch (error) {
    logger.error?.(`[webhook/payment] ${label} webhook error:`, error)
    await writeLeadEvent(
      prisma,
      logger,
      {
        leadId,
        type: failureType,
        value: JSON.stringify({
          asaasPaymentId,
          orderId,
          event,
          url,
          error: String(error),
          failedAt: now().toISOString(),
        }),
      },
      `${label} failure`,
    )
  }
}

function buildPaymentConfirmedPayload(payment: any, acquisition: string, confirmedAt: Date, onboardingToken: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maisscore.com.br'
  const onboardingUrl = `${appUrl}/onboarding/${onboardingToken}`
  return {
    event: 'payment_confirmed',
    onboardingUrl,
    supabaseLeadId: payment.order.leadId,
    orderId: payment.orderId,
    leadId: payment.order.leadId,
    leadName: payment.order.lead.name,
    leadPhone: payment.order.lead.phone,
    leadEmail: payment.order.lead.email,
    document: payment.order.document,
    documentType: payment.order.documentType,
    birthDate: payment.order.lead.birthDate?.toISOString?.() ?? null,
    addressStreet: payment.order.lead.addressStreet ?? null,
    addressNumber: payment.order.lead.addressNumber ?? null,
    addressComplement: payment.order.lead.addressComplement ?? null,
    addressNeighborhood: payment.order.lead.addressNeighborhood ?? null,
    addressCity: payment.order.lead.addressCity ?? null,
    addressState: payment.order.lead.addressState ?? null,
    addressZip: payment.order.lead.addressZip ?? null,
    civilStatus: payment.order.lead.civilStatus ?? null,
    profession: payment.order.lead.profession ?? null,
    identityDocument: payment.order.lead.identityDocument ?? null,
    responsibleName: payment.order.lead.responsibleName ?? null,
    responsibleCpf: payment.order.lead.responsibleCpf ?? null,
    amount: payment.amount,
    method: payment.method,
    status: 'confirmed',
    stage: 'payment_confirmed',
    paymentStatus: 'confirmed',
    paymentConfirmedAt: confirmedAt.toISOString(),
    acquisition,
    asaasPaymentId: payment.asaasId,
    trafficTemperature: payment.order.lead.trafficTemperature,
    lead: {
      id: payment.order.lead.id,
      name: payment.order.lead.name,
      phone: payment.order.lead.phone,
      email: payment.order.lead.email,
      birthDate: payment.order.lead.birthDate?.toISOString?.() ?? null,
      addressStreet: payment.order.lead.addressStreet ?? null,
      addressNumber: payment.order.lead.addressNumber ?? null,
      addressComplement: payment.order.lead.addressComplement ?? null,
      addressNeighborhood: payment.order.lead.addressNeighborhood ?? null,
      addressCity: payment.order.lead.addressCity ?? null,
      addressState: payment.order.lead.addressState ?? null,
      addressZip: payment.order.lead.addressZip ?? null,
      civilStatus: payment.order.lead.civilStatus ?? null,
      profession: payment.order.lead.profession ?? null,
      identityDocument: payment.order.lead.identityDocument ?? null,
      responsibleName: payment.order.lead.responsibleName ?? null,
      responsibleCpf: payment.order.lead.responsibleCpf ?? null,
      status: 'onboarding_started',
      stage: payment.order.lead.stage,
      trafficTemperature: payment.order.lead.trafficTemperature,
      isClient: true,
      acquisition,
      acquisitionValue: payment.amount,
      convertedAt: confirmedAt.toISOString(),
    },
    order: {
      id: payment.order.id,
      leadId: payment.order.leadId,
      productId: payment.order.productId,
      document: payment.order.document,
      documentType: payment.order.documentType,
      status: 'pago',
      pricePaid: payment.order.pricePaid,
    },
    payment: {
      id: payment.id,
      asaasId: payment.asaasId,
      method: payment.method,
      status: 'confirmed',
      amount: payment.amount,
      confirmedAt: confirmedAt.toISOString(),
    },
    product: payment.order.product
      ? {
          id: payment.order.product.id,
          slug: payment.order.product.slug,
          name: payment.order.product.name,
          price: payment.order.product.price,
        }
      : null,
    process: payment.order.process
      ? {
          status: payment.order.process.status,
          stage: payment.order.process.stage,
          startedAt: payment.order.process.startedAt?.toISOString?.() ?? null,
          cleanedAt: payment.order.process.cleanedAt?.toISOString?.() ?? null,
          proofUrl: payment.order.process.proofUrl ?? null,
        }
      : null,
    onboardingDocuments: payment.order.onboardingDocuments.map((item: any) => ({
      id: item.id,
      itemKey: item.itemKey,
      label: item.label,
      status: item.status,
      storagePath: item.storagePath,
      fileUrl: item.fileUrl,
      receivedAt: item.receivedAt?.toISOString?.() ?? null,
    })),
  }
}

function parseAsaasConfirmedAt(payment: any, fallback: Date) {
  const rawConfirmedDate = payment?.confirmedDate ?? payment?.paymentDate ?? payment?.clientPaymentDate ?? null
  if (typeof rawConfirmedDate === 'string' && rawConfirmedDate.trim()) {
    const parsed = new Date(rawConfirmedDate)
    if (!Number.isNaN(parsed.getTime())) {
      return parsed
    }
  }

  return fallback
}

export async function handlePaymentConfirmedWebhook(
  body: any,
  token: string | null,
  deps: PaymentWebhookDeps,
) {
  const prisma = deps.prisma
  const fetchImpl = deps.fetchImpl ?? fetch
  const env = deps.env ?? process.env
  const now = deps.now ?? (() => new Date())
  const logger = deps.logger ?? console
  const onboardingStartedStatus = 'onboarding_started'

  if (env.ASAAS_WEBHOOK_TOKEN && token !== env.ASAAS_WEBHOOK_TOKEN) {
    return Response.json({ received: false }, { status: 401 })
  }

  const { event, payment: asaasPayment } = body ?? {}

  if (!event || !asaasPayment?.id) {
    return Response.json({ received: true })
  }

  if (!CONFIRMED_EVENTS.includes(event)) {
    return Response.json({ received: true })
  }

  const externalReference: string = asaasPayment.externalReference ?? ''
  if (externalReference && !externalReference.startsWith('maisscore:')) {
    return Response.json({ received: true, ignored: true, reason: 'externalReference_not_maisscore' })
  }

  const processedAt = now()
  const lockKey = `payment-confirmed:${asaasPayment.id}`
  const n8nWebhookUrl =
    env.N8N_WEBHOOK_PAYMENT_CONFIRMED?.trim() ||
    'https://auto.maisscore.com.br/webhook/ms-onboarding-mvp'
  const crmSyncWebhookUrl =
    env.N8N_WEBHOOK_CRM_SYNC?.trim() ||
    'https://auto.maisscore.com.br/webhook/crm-entrada-sincronizacao'

  const claimResult = await prisma.$transaction(async (tx: any): Promise<ClaimResult> => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${lockKey}))`

    const payment = await tx.payment.findUnique({
      where: { asaasId: asaasPayment.id },
      include: {
        order: {
          include: {
            lead: true,
            product: true,
            process: true,
            onboardingDocuments: true,
          },
        },
      },
    })

    if (!payment) {
      logger.warn?.('[webhook/payment] asaasId not found:', asaasPayment.id)
      return { status: 'ignored', reason: 'payment_not_found' }
    }

    if (payment.webhookProcessedAt) {
      logger.warn?.('[webhook/payment] duplicate confirmation ignored before claim:', asaasPayment.id)
      return { status: 'deduplicated' }
    }

    const paymentConfirmedAt = parseAsaasConfirmedAt(asaasPayment, processedAt)

    const processedMarker = await tx.payment.updateMany({
      where: {
        id: payment.id,
        webhookProcessedAt: null,
      },
      data: {
        status: 'confirmed',
        confirmedAt: paymentConfirmedAt,
        webhookProcessedAt: processedAt,
      },
    })

    if (processedMarker.count === 0) {
      logger.warn?.('[webhook/payment] duplicate confirmation ignored:', asaasPayment.id)
      return { status: 'deduplicated' }
    }

    const claimedPayment = await tx.payment.findUnique({
      where: { id: payment.id },
      select: { webhookProcessedAt: true },
    })

    if (!claimedPayment?.webhookProcessedAt) {
      logger.error?.('[webhook/payment] claim marker not persisted after update:', asaasPayment.id)
      return { status: 'error', reason: 'claim_not_persisted' }
    }

    const existingOnboardingDispatch = await tx.leadEvent.findFirst({
      where: {
        leadId: payment.order.leadId,
        type: 'onboarding_webhook_dispatched',
        value: { contains: payment.orderId },
      },
    })

    const existingCrmSyncDispatch = await tx.leadEvent.findFirst({
      where: {
        leadId: payment.order.leadId,
        type: 'crm_sync_webhook_dispatched',
        value: { contains: payment.orderId },
      },
    })

    if (existingOnboardingDispatch && existingCrmSyncDispatch) {
      return { status: 'deduplicated' }
    }

    const existingPaymentEvent = await tx.leadEvent.findFirst({
      where: {
        leadId: payment.order.leadId,
        type: 'pagamento_confirmado',
        value: { contains: payment.asaasId },
      },
    })

    const existingPaymentAuditEvent = await tx.leadEvent.findFirst({
      where: {
        leadId: payment.order.leadId,
        type: 'pagamento_audit_linked',
        value: { contains: payment.asaasId },
      },
    })

    const acquisitionFallback = payment.order.documentType === 'CNPJ' ? 'CNPJ' : 'CPF'
    const acquisition = payment.order.lead.acquisition?.trim() || acquisitionFallback

    await tx.order.update({
      where: { id: payment.orderId },
      data: { status: 'pago' },
    })

    await tx.process.upsert({
      where: { orderId: payment.orderId },
      create: {
        orderId: payment.orderId,
        status: 'aguardando_inicio',
      },
      update: {
        status: 'aguardando_inicio',
      },
    })

    const existingLead = await tx.lead.findUnique({
      where: { id: payment.order.leadId },
      select: { onboardingToken: true, acquisition: true },
    })
    const onboardingToken = existingLead?.onboardingToken ?? randomBytes(32).toString('hex')

    await tx.lead.update({
      where: { id: payment.order.leadId },
      data: {
        isClient: true,
        status: onboardingStartedStatus,
        stage: 'pagamento',
        acquisition,
        acquisitionValue: payment.amount,
        convertedAt: paymentConfirmedAt,
        lastInteractionAt: processedAt,
        onboardingToken,
      },
    })

    if (!existingPaymentEvent) {
      await tx.leadEvent.create({
        data: {
          leadId: payment.order.leadId,
          type: 'pagamento_confirmado',
          value: JSON.stringify({
            asaasPaymentId: payment.asaasId,
            orderId: payment.orderId,
            amount: payment.amount,
            method: payment.method,
            confirmedAt: paymentConfirmedAt.toISOString(),
          }),
        },
      })
    }

    if (!existingPaymentAuditEvent) {
      await tx.leadEvent.create({
        data: {
          leadId: payment.order.leadId,
          type: 'pagamento_audit_linked',
          value: JSON.stringify({
            asaasWebhookEventId: body?.id ?? null,
            asaasEvent: body?.event ?? null,
            asaasPaymentId: payment.asaasId,
            orderId: payment.orderId,
            leadId: payment.order.leadId,
            externalReference: asaasPayment.externalReference ?? null,
            amount: payment.amount,
            method: payment.method,
            paymentStatus: asaasPayment.status ?? null,
            confirmedDate: paymentConfirmedAt.toISOString(),
            paymentDate: asaasPayment.paymentDate ?? null,
            clientPaymentDate: asaasPayment.clientPaymentDate ?? null,
            invoiceUrl: asaasPayment.invoiceUrl ?? null,
            transactionReceiptUrl: asaasPayment.transactionReceiptUrl ?? null,
            processedAt: processedAt.toISOString(),
          }),
        },
      })
    }

    return {
      status: 'claimed',
      payment,
      acquisition,
      paymentConfirmedAt,
      onboardingToken,
      existingOnboardingDispatch: Boolean(existingOnboardingDispatch),
      existingCrmSyncDispatch: Boolean(existingCrmSyncDispatch),
    }
  })

  if (claimResult.status === 'ignored') {
    return Response.json({ received: true, ignored: true, reason: claimResult.reason })
  }

  if (claimResult.status === 'deduplicated') {
    return Response.json({ received: true, deduplicated: true })
  }

  if (claimResult.status === 'error') {
    return Response.json(
      { received: true, error: claimResult.reason },
      { status: 500 },
    )
  }

  const paymentConfirmedPayload = buildPaymentConfirmedPayload(
    claimResult.payment,
    claimResult.acquisition,
    claimResult.paymentConfirmedAt,
    claimResult.onboardingToken,
  )

  if (n8nWebhookUrl && !claimResult.existingOnboardingDispatch) {
    await dispatchWebhook(prisma, fetchImpl, logger, {
      url: n8nWebhookUrl,
      payload: paymentConfirmedPayload,
      successType: 'onboarding_webhook_dispatched',
      failureType: 'onboarding_webhook_failed',
      leadId: claimResult.payment.order.leadId,
      orderId: claimResult.payment.orderId,
      asaasPaymentId: claimResult.payment.asaasId,
      event,
      now,
      label: 'n8n',
    })
  }

  if (crmSyncWebhookUrl && !claimResult.existingCrmSyncDispatch) {
    await dispatchWebhook(prisma, fetchImpl, logger, {
      url: crmSyncWebhookUrl,
      payload: paymentConfirmedPayload,
      successType: 'crm_sync_webhook_dispatched',
      failureType: 'crm_sync_webhook_failed',
      leadId: claimResult.payment.order.leadId,
      orderId: claimResult.payment.orderId,
      asaasPaymentId: claimResult.payment.asaasId,
      event,
      now,
      label: 'crm sync',
    })
  }

  return Response.json({ received: true })
}
