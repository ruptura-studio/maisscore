import { handlePaymentConfirmedWebhook } from '@/lib/webhooks/payment-confirmed'

type LeadEventRow = {
  leadId: string
  type: string
  value?: string | null
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

function createMockPrisma() {
  const leadEvents: LeadEventRow[] = []
  const payment = {
    id: 'payment-1',
    asaasId: 'pay_123',
    method: 'CREDIT_CARD',
    amount: 500,
    confirmedAt: null as Date | null,
    webhookProcessedAt: null as Date | null,
    orderId: 'order-1',
    order: {
      id: 'order-1',
      leadId: 'lead-1',
      productId: 'product-1',
      document: '00.000.000/0001-00',
      documentType: 'CNPJ',
      pricePaid: 500,
      lead: {
        id: 'lead-1',
        name: 'Empresa Teste Ltda',
        phone: '5511999999999',
        email: 'teste@example.com',
        birthDate: null,
        addressStreet: 'Rua A',
        addressNumber: '100',
        addressComplement: null,
        addressNeighborhood: 'Centro',
        addressCity: 'São Paulo',
        addressState: 'SP',
        addressZip: '01000-000',
        civilStatus: null,
        profession: null,
        identityDocument: null,
        responsibleName: 'Responsável Teste',
        responsibleCpf: '123.456.789-00',
        trafficTemperature: 'hot',
        stage: 'pagamento',
      },
      product: {
        id: 'product-1',
        slug: 'limpa-nome-cnpj',
        name: 'Limpar CNPJ',
        price: 500,
      },
      process: null,
      onboardingDocuments: [],
    },
  }

  const prisma: any = {
    leadEvent: {
      create: async ({ data }: { data: LeadEventRow }) => {
        leadEvents.push(clone(data))
        return clone(data)
      },
      findFirst: async ({ where }: any) => {
        return (
          leadEvents.find((row) => {
            if (where.leadId && row.leadId !== where.leadId) return false
            if (where.type && row.type !== where.type) return false
            if (where.value?.contains && !String(row.value ?? '').includes(where.value.contains)) return false
            return true
          }) ?? null
        )
      },
    },
    payment: {
      findUnique: async () => clone(payment),
      updateMany: async ({ where, data }: any) => {
        if (where.id !== payment.id) return { count: 0 }
        if (where.webhookProcessedAt === null && payment.webhookProcessedAt !== null) return { count: 0 }
        if (payment.webhookProcessedAt !== null) return { count: 0 }
        payment.status = data.status
        payment.confirmedAt = data.confirmedAt
        payment.webhookProcessedAt = data.webhookProcessedAt
        return { count: 1 }
      },
    },
    order: {
      update: async () => ({})
    },
    process: {
      upsert: async () => ({})
    },
    lead: {
      update: async () => ({})
    },
    $transaction: async (fn: any) => fn({
      $executeRaw: async () => {},
      payment: prisma.payment,
      leadEvent: prisma.leadEvent,
      order: prisma.order,
      process: prisma.process,
      lead: prisma.lead,
    }),
  }

  return { prisma, payment, leadEvents }
}

const fetchCalls: Array<{ url: string; body: any }> = []
const fetchImpl = async (url: string, init?: RequestInit) => {
  fetchCalls.push({ url, body: init?.body ? JSON.parse(String(init.body)) : null })
  return new Response('ok', { status: 200 })
}

async function main() {
  const { prisma, payment, leadEvents } = createMockPrisma()
  const body = {
    event: 'PAYMENT_CONFIRMED',
    payment: { id: payment.asaasId },
  }

  const firstResponse = await handlePaymentConfirmedWebhook(body, null, {
    prisma,
    fetchImpl: fetchImpl as typeof fetch,
    env: {
      N8N_WEBHOOK_PAYMENT_CONFIRMED: 'https://example.test/onboarding',
      N8N_WEBHOOK_CRM_SYNC: 'https://example.test/crm',
    },
    now: () => new Date('2026-05-01T15:42:00.000Z'),
    logger: console,
  })
  const first = await firstResponse.json()

  const secondResponse = await handlePaymentConfirmedWebhook(body, null, {
    prisma,
    fetchImpl: fetchImpl as typeof fetch,
    env: {
      N8N_WEBHOOK_PAYMENT_CONFIRMED: 'https://example.test/onboarding',
      N8N_WEBHOOK_CRM_SYNC: 'https://example.test/crm',
    },
    now: () => new Date('2026-05-01T15:42:01.000Z'),
    logger: console,
  })
  const second = await secondResponse.json()

  const onboardingDispatches = leadEvents.filter((row) => row.type === 'onboarding_webhook_dispatched').length
  const crmDispatches = leadEvents.filter((row) => row.type === 'crm_sync_webhook_dispatched').length

  if (first.received !== true) {
    throw new Error(`First call returned an unexpected payload: ${JSON.stringify(first)}`)
  }

  if (second.received !== true || second.deduplicated !== true) {
    throw new Error(`Second call returned an unexpected payload: ${JSON.stringify(second)}`)
  }

  if (payment.webhookProcessedAt === null) {
    throw new Error('webhookProcessedAt was not persisted.')
  }

  if (onboardingDispatches !== 1) {
    throw new Error(`Expected 1 onboarding dispatch, got ${onboardingDispatches}.`)
  }

  if (crmDispatches !== 1) {
    throw new Error(`Expected 1 CRM dispatch, got ${crmDispatches}.`)
  }

  if (fetchCalls.length !== 2) {
    throw new Error(`Expected 2 outbound calls total, got ${fetchCalls.length}.`)
  }

  console.log(
    JSON.stringify(
      {
        webhookProcessedAt: payment.webhookProcessedAt,
        onboardingDispatches,
        crmDispatches,
        fetchCalls: fetchCalls.length,
        leadEvents: leadEvents.map((row) => row.type),
      },
      null,
      2,
    ),
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
