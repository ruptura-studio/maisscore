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

  const payment = await prisma.payment.findUnique({
    where: { asaasId: asaasPayment.id },
    include: { order: { include: { lead: true, product: true, process: true, onboardingDocuments: true } } },
  })

  if (!payment) {
    logger.warn?.('[webhook/payment] asaasId não encontrado:', asaasPayment.id)
    return Response.json({ received: true })
  }

  if (payment.status === 'confirmed') {
    return Response.json({ received: true })
  }

  const confirmedAt = now()
  const acquisition = payment.order.product?.slug ?? (payment.order.documentType === 'CNPJ' ? 'limpa-nome-cnpj' : 'limpa-nome-cpf')

  await prisma.$transaction(async (tx: any) => {
    await tx.payment.update({
      where: { id: payment.id },
      data: { status: 'confirmed', confirmedAt },
    })

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

    await tx.lead.update({
      where: { id: payment.order.leadId },
      data: {
        isClient: true,
        status: 'pago',
        stage: 'pagamento',
        acquisition,
        acquisitionValue: payment.amount,
        convertedAt: confirmedAt,
        lastInteractionAt: confirmedAt,
      },
    })

    await tx.leadEvent.create({
      data: {
        leadId: payment.order.leadId,
        type: 'pagamento_confirmado',
        value: JSON.stringify({
          asaasPaymentId: payment.asaasId,
          orderId: payment.orderId,
          amount: payment.amount,
          method: payment.method,
          confirmedAt: confirmedAt.toISOString(),
        }),
      },
    })
  })

  const n8nWebhookUrl = env.N8N_WEBHOOK_PAYMENT_CONFIRMED ?? env.N8N_WEBHOOK_CRM_SYNC

  if (n8nWebhookUrl) {
    fetchImpl(n8nWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'payment_confirmed',
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
          status: payment.order.lead.status,
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
      }),
    }).catch(() => {})
  }

  return Response.json({ received: true })
}
