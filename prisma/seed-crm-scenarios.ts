import { Prisma, PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { config } from 'dotenv'

config({ path: '.env.local' })

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
})

type Db = Prisma.TransactionClient

function compact<T extends Record<string, unknown>>(value: T): T {
  return Object.fromEntries(Object.entries(value).filter(([, v]) => v !== undefined)) as T
}

function daysAgo(days: number) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000)
}

async function getProductId(tx: Db, slug: string) {
  const product = await tx.product.findUnique({ where: { slug } })
  if (!product) {
    throw new Error(`Produto nao encontrado: ${slug}`)
  }
  return product.id
}

async function upsertLead(
  tx: Db,
  input: {
    phone: string
    name: string
    email?: string | null
    channel?: string | null
    status: string
    stage?: string | null
    trafficTemperature: string
    currentTemperature?: string | null
    coraTemperature?: string | null
    objective?: string | null
    tempoEndividado?: string | null
    valorDivida?: string | null
    estagioNegociacao?: string | null
    companyName?: string | null
    leadType?: string | null
    checkoutStep?: number | null
    isClient?: boolean
    acquisition?: string | null
    acquisitionValue?: number | null
    pendingAction?: string | null
    reentryCount?: number
    lastInteractionAt?: Date | null
    convertedAt?: Date | null
    lossReason?: string | null
    notes?: string | null
  }
) {
  const payload = {
    name: input.name,
    phone: input.phone,
    email: input.email ?? null,
    channel: input.channel ?? null,
    status: input.status,
    stage: input.stage ?? undefined,
    trafficTemperature: input.trafficTemperature,
    currentTemperature: input.currentTemperature ?? undefined,
    coraTemperature: input.coraTemperature ?? undefined,
    objetivo: input.objective ?? undefined,
    tempoEndividado: input.tempoEndividado ?? undefined,
    valorDivida: input.valorDivida ?? undefined,
    estagioNegociacao: input.estagioNegociacao ?? undefined,
    companyName: input.companyName ?? undefined,
    leadType: input.leadType ?? undefined,
    checkoutStep: input.checkoutStep ?? undefined,
    isClient: input.isClient ?? undefined,
    acquisition: input.acquisition ?? undefined,
    acquisitionValue: input.acquisitionValue ?? undefined,
    pendingAction: input.pendingAction ?? undefined,
    reentryCount: input.reentryCount ?? undefined,
    lastInteractionAt: input.lastInteractionAt ?? undefined,
    convertedAt: input.convertedAt ?? undefined,
    lossReason: input.lossReason ?? undefined,
    notes: input.notes ?? undefined,
  }

  return tx.lead.upsert({
    where: { phone: input.phone },
    create: compact(payload),
    update: compact(payload),
  })
}

async function ensureLeadEvent(
  tx: Db,
  leadId: string,
  type: string,
  value?: string | null,
  createdAt?: Date
) {
  const existing = await tx.leadEvent.findFirst({
    where: {
      leadId,
      type,
      value: value ?? null,
    },
  })

  if (existing) return existing

  return tx.leadEvent.create({
    data: compact({
      leadId,
      type,
      value: value ?? null,
      createdAt,
    }),
  })
}

async function ensureCheckoutEvent(
  tx: Db,
  leadId: string,
  type: string,
  metadata?: string | null,
  createdAt?: Date
) {
  const existing = await tx.checkoutEvent.findFirst({
    where: {
      leadId,
      type,
      metadata: metadata ?? null,
    },
  })

  if (existing) return existing

  return tx.checkoutEvent.create({
    data: compact({
      leadId,
      type,
      metadata: metadata ?? null,
      createdAt,
    }),
  })
}

async function ensureNurtureLog(
  tx: Db,
  leadId: string,
  channel: string,
  type: string,
  message?: string | null,
  sentAt?: Date
) {
  const existing = await tx.nurtureLog.findFirst({
    where: {
      leadId,
      channel,
      type,
      message: message ?? null,
    },
  })

  if (existing) return existing

  return tx.nurtureLog.create({
    data: compact({
      leadId,
      channel,
      type,
      message: message ?? null,
      sentAt,
    }),
  })
}

async function ensureAbandonedCheckout(
  tx: Db,
  input: {
    name?: string | null
    email?: string | null
    phone?: string | null
    document?: string | null
    documentType?: string | null
    product?: string | null
    paymentMethod?: string | null
    installments?: number | null
  }
) {
  const existing = await tx.abandonedCheckout.findFirst({
    where: compact({
      phone: input.phone ?? undefined,
      document: input.document ?? undefined,
      product: input.product ?? undefined,
    }),
  })

  if (existing) return existing

  return tx.abandonedCheckout.create({
    data: compact({
      name: input.name ?? null,
      email: input.email ?? null,
      phone: input.phone ?? null,
      document: input.document ?? null,
      documentType: input.documentType ?? null,
      product: input.product ?? null,
      paymentMethod: input.paymentMethod ?? null,
      installments: input.installments ?? null,
    }),
  })
}

async function ensureOrder(
  tx: Db,
  input: {
    leadId: string
    productId: string
    document?: string | null
    documentType?: string | null
    status: string
    pricePaid: number
    discount?: number
    notes?: string | null
  }
) {
  const existing = await tx.order.findFirst({
    where: {
      leadId: input.leadId,
      productId: input.productId,
    },
  })

  if (existing) {
    return tx.order.update({
      where: { id: existing.id },
      data: compact({
        document: input.document ?? undefined,
        documentType: input.documentType ?? undefined,
        status: input.status,
        pricePaid: input.pricePaid,
        discount: input.discount ?? undefined,
        notes: input.notes ?? undefined,
      }),
    })
  }

  return tx.order.create({
    data: compact({
      leadId: input.leadId,
      productId: input.productId,
      document: input.document ?? null,
      documentType: input.documentType ?? null,
      status: input.status,
      pricePaid: input.pricePaid,
      discount: input.discount ?? 0,
      notes: input.notes ?? null,
    }),
  })
}

async function ensurePayment(
  tx: Db,
  input: {
    orderId: string
    asaasId?: string | null
    method?: string | null
    status: string
    amount: number
    pixKey?: string | null
    confirmedAt?: Date | null
    remoteIp?: string | null
  }
) {
  return tx.payment.upsert({
    where: { orderId: input.orderId },
    create: compact({
      orderId: input.orderId,
      asaasId: input.asaasId ?? null,
      method: input.method ?? null,
      status: input.status,
      amount: input.amount,
      pixKey: input.pixKey ?? null,
      confirmedAt: input.confirmedAt ?? undefined,
      remoteIp: input.remoteIp ?? null,
    }),
    update: compact({
      asaasId: input.asaasId ?? undefined,
      method: input.method ?? undefined,
      status: input.status,
      amount: input.amount,
      pixKey: input.pixKey ?? undefined,
      confirmedAt: input.confirmedAt ?? undefined,
      remoteIp: input.remoteIp ?? undefined,
    }),
  })
}

async function ensureProcess(
  tx: Db,
  input: {
    orderId: string
    status: string
    stage?: string | null
    startedAt?: Date | null
    cleanedAt?: Date | null
    proofUrl?: string | null
    notes?: string | null
  }
) {
  return tx.process.upsert({
    where: { orderId: input.orderId },
    create: compact({
      orderId: input.orderId,
      status: input.status,
      stage: input.stage ?? undefined,
      startedAt: input.startedAt ?? undefined,
      cleanedAt: input.cleanedAt ?? undefined,
      proofUrl: input.proofUrl ?? undefined,
      notes: input.notes ?? undefined,
    }),
    update: compact({
      status: input.status,
      stage: input.stage ?? undefined,
      startedAt: input.startedAt ?? undefined,
      cleanedAt: input.cleanedAt ?? undefined,
      proofUrl: input.proofUrl ?? undefined,
      notes: input.notes ?? undefined,
    }),
  })
}

async function main() {
  const [cpfProductId, cnpjProductId] = await Promise.all([
    getProductId(prisma, 'limpa-nome-cpf'),
    getProductId(prisma, 'limpa-nome-cnpj'),
  ])

  const summary: Array<{ label: string; phone: string; leadId: string }> = []

  await prisma.$transaction(async (tx) => {
    const coldLead = await upsertLead(tx, {
      phone: '5511998801001',
      name: 'Aline Freitas',
      email: null,
      channel: 'site',
      status: 'novo',
      stage: 'lead',
      trafficTemperature: 'cold',
      currentTemperature: 'cold',
      coraTemperature: 'cold',
      objective: 'quero limpar o nome',
      tempoEndividado: '8 meses',
      valorDivida: 'R$ 4.200',
      estagioNegociacao: 'nunca tentei',
      leadType: 'cpf',
      reentryCount: 0,
      lastInteractionAt: daysAgo(10),
      notes: 'Entrada fria sem e-mail para testar cadastro minimo.',
    })
    await ensureLeadEvent(tx, coldLead.id, 'lead_capturado', 'seed:cold', daysAgo(10))
    await ensureNurtureLog(
      tx,
      coldLead.id,
      'whatsapp',
      'cold_intro',
      'Primeiro contato de teste para validar o fluxo minimo.',
      daysAgo(10)
    )
    summary.push({ label: 'cold lead', phone: coldLead.phone, leadId: coldLead.id })

    const dedupInitial = await upsertLead(tx, {
      phone: '5511998801002',
      name: 'Bruno Araujo',
      email: null,
      channel: 'site',
      status: 'novo',
      stage: 'lead',
      trafficTemperature: 'cold',
      currentTemperature: 'cold',
      coraTemperature: 'cold',
      objective: 'entender se a renegociacao vale a pena',
      tempoEndividado: '14 meses',
      valorDivida: 'R$ 9.800',
      estagioNegociacao: 'nunca tentei',
      leadType: 'cpf',
      reentryCount: 0,
      lastInteractionAt: daysAgo(8),
      notes: 'Primeira captura do telefone para testar deduplicacao.',
    })
    await ensureLeadEvent(tx, dedupInitial.id, 'lead_capturado', 'seed:dedup-initial', daysAgo(8))

    const dedupUpdated = await upsertLead(tx, {
      phone: '5511998801002',
      name: 'Bruno Araujo',
      email: 'bruno@example.com',
      channel: 'whatsapp',
      status: 'checkout_iniciado',
      stage: 'triagem_concluida',
      trafficTemperature: 'warm',
      currentTemperature: 'hot',
      coraTemperature: 'warm',
      objective: 'fechar agora se a proposta estiver coerente',
      tempoEndividado: '14 meses',
      valorDivida: 'R$ 9.800',
      estagioNegociacao: 'ja pediu proposta',
      leadType: 'cpf',
      checkoutStep: 1,
      reentryCount: 1,
      lastInteractionAt: daysAgo(2),
      pendingAction: 'cora_qualify',
      notes: 'Mesma linha de telefone recebida de novo para testar deduplicacao e divergencia de temperatura.',
    })
    await ensureLeadEvent(tx, dedupUpdated.id, 'triagem_completa', 'seed:dedup-updated', daysAgo(2))
    await ensureNurtureLog(
      tx,
      dedupUpdated.id,
      'whatsapp',
      'triage_followup',
      'Lead recapturado no mesmo telefone com nova interacao.',
      daysAgo(2)
    )
    summary.push({ label: 'dedup lead', phone: dedupUpdated.phone, leadId: dedupUpdated.id })

    const hotLead = await upsertLead(tx, {
      phone: '5511998801003',
      name: 'Carla Mendes Sistemas LTDA',
      email: 'financeiro@carlamendes.com',
      channel: 'checkout',
      status: 'em_atendimento',
      stage: 'quente',
      trafficTemperature: 'hot',
      currentTemperature: 'hot',
      coraTemperature: 'hot',
      objective: 'resolver a restricao sem travar o caixa',
      tempoEndividado: '2 anos',
      valorDivida: 'R$ 28.900',
      estagioNegociacao: 'ja recebeu proposta',
      companyName: 'Carla Mendes Sistemas LTDA',
      leadType: 'cnpj',
      checkoutStep: 3,
      reentryCount: 0,
      lastInteractionAt: daysAgo(1),
      notes: 'Checkout enviado em CNPJ para testar funil quente e campos comerciais.',
    })
    await ensureLeadEvent(tx, hotLead.id, 'lead_capturado', 'seed:hot', daysAgo(3))
    await ensureLeadEvent(tx, hotLead.id, 'triagem_completa', 'seed:hot', daysAgo(2))
    await ensureLeadEvent(tx, hotLead.id, 'checkout_enviado', 'seed:hot', daysAgo(1))
    await ensureCheckoutEvent(
      tx,
      hotLead.id,
      'url_gerada',
      JSON.stringify({ product: 'limpa-nome-cnpj', source: 'seed', amount: 69700 }),
      daysAgo(1)
    )
    await ensureCheckoutEvent(
      tx,
      hotLead.id,
      'url_enviada',
      JSON.stringify({ channel: 'whatsapp', step: 3 }),
      daysAgo(1)
    )
    await ensureCheckoutEvent(
      tx,
      hotLead.id,
      'link_clicado',
      JSON.stringify({ device: 'mobile', source: 'seed' }),
      daysAgo(1)
    )
    await ensureNurtureLog(
      tx,
      hotLead.id,
      'whatsapp',
      'checkout_followup',
      'Checkout enviado para o lead quente de teste.',
      daysAgo(1)
    )
    summary.push({ label: 'hot lead', phone: hotLead.phone, leadId: hotLead.id })

    const paidLead = await upsertLead(tx, {
      phone: '5511998801004',
      name: 'Diego Ribeiro',
      email: 'diego@example.com',
      channel: 'checkout',
      status: 'pago',
      stage: 'pagamento',
      trafficTemperature: 'warm',
      currentTemperature: 'warm',
      coraTemperature: 'hot',
      objective: 'limpar o nome e voltar a comprar no prazo',
      tempoEndividado: '11 meses',
      valorDivida: 'R$ 6.300',
      estagioNegociacao: 'aceitou a proposta',
      leadType: 'cpf',
      checkoutStep: 3,
      isClient: true,
      acquisition: 'limpa-nome-cpf',
      acquisitionValue: 59500,
      convertedAt: daysAgo(1),
      reentryCount: 0,
      lastInteractionAt: daysAgo(1),
      notes: 'Pagamento confirmado, processo ainda sem limpeza concluida.',
    })
    const paidOrder = await ensureOrder(tx, {
      leadId: paidLead.id,
      productId: cpfProductId,
      document: '12345678901',
      documentType: 'CPF',
      status: 'pago',
      pricePaid: 59500,
      notes: 'Pedido de teste com pagamento confirmado.',
    })
    await ensurePayment(tx, {
      orderId: paidOrder.id,
      asaasId: 'asaas_seed_paid_progress',
      method: 'PIX',
      status: 'confirmed',
      amount: 59500,
      pixKey: 'seed-pix-paid-progress',
      confirmedAt: daysAgo(1),
      remoteIp: '127.0.0.1',
    })
    await ensureProcess(tx, {
      orderId: paidOrder.id,
      status: 'em_andamento',
      stage: 'analise_documental',
      startedAt: daysAgo(1),
      notes: 'Processo em andamento para validar listas, filtros e dashboard.',
    })
    await ensureLeadEvent(tx, paidLead.id, 'lead_capturado', 'seed:paid-progress', daysAgo(4))
    await ensureLeadEvent(tx, paidLead.id, 'checkout_enviado', 'seed:paid-progress', daysAgo(2))
    await ensureLeadEvent(tx, paidLead.id, 'pagamento_confirmado', 'seed:paid-progress', daysAgo(1))
    await ensureLeadEvent(tx, paidLead.id, 'posvendas_iniciado', 'seed:paid-progress', daysAgo(1))
    await ensureCheckoutEvent(
      tx,
      paidLead.id,
      'pagamento_confirmado',
      JSON.stringify({ method: 'PIX', amount: 59500, source: 'seed' }),
      daysAgo(1)
    )
    await ensureNurtureLog(
      tx,
      paidLead.id,
      'whatsapp',
      'payment_confirmation',
      'Pagamento confirmado e processo iniciado.',
      daysAgo(1)
    )
    summary.push({ label: 'paid lead in progress', phone: paidLead.phone, leadId: paidLead.id })

    const completedLead = await upsertLead(tx, {
      phone: '5511998801005',
      name: 'Fernanda Lima Rocha LTDA',
      email: 'financeiro@fernandalima.com',
      channel: 'checkout',
      status: 'pago',
      stage: 'pos_venda',
      trafficTemperature: 'hot',
      currentTemperature: 'hot',
      coraTemperature: 'hot',
      objective: 'finalizar a limpeza com prova anexada',
      tempoEndividado: '3 anos',
      valorDivida: 'R$ 41.200',
      estagioNegociacao: 'pagou e aguardava protocolo',
      companyName: 'Fernanda Lima Rocha LTDA',
      leadType: 'cnpj',
      checkoutStep: 3,
      isClient: true,
      acquisition: 'limpa-nome-cnpj',
      acquisitionValue: 69700,
      convertedAt: daysAgo(3),
      reentryCount: 0,
      lastInteractionAt: daysAgo(2),
      notes: 'Processo concluido com prova anexada.',
    })
    const completedOrder = await ensureOrder(tx, {
      leadId: completedLead.id,
      productId: cnpjProductId,
      document: '98765432000199',
      documentType: 'CNPJ',
      status: 'pago',
      pricePaid: 69700,
      notes: 'Pedido com processo finalizado para validar pos-venda.',
    })
    await ensurePayment(tx, {
      orderId: completedOrder.id,
      asaasId: 'asaas_seed_paid_completed',
      method: 'CREDIT_CARD',
      status: 'confirmed',
      amount: 69700,
      confirmedAt: daysAgo(3),
      remoteIp: '127.0.0.1',
    })
    await ensureProcess(tx, {
      orderId: completedOrder.id,
      status: 'concluido',
      stage: 'finalizado',
      startedAt: daysAgo(4),
      cleanedAt: daysAgo(2),
      proofUrl: 'https://files.maisscore.local/provas/fernanda-lima-rocha.pdf',
      notes: 'Processo concluido com prova registrada.',
    })
    await ensureLeadEvent(tx, completedLead.id, 'lead_capturado', 'seed:completed', daysAgo(6))
    await ensureLeadEvent(tx, completedLead.id, 'checkout_enviado', 'seed:completed', daysAgo(4))
    await ensureLeadEvent(tx, completedLead.id, 'pagamento_confirmado', 'seed:completed', daysAgo(3))
    await ensureLeadEvent(tx, completedLead.id, 'posvendas_iniciado', 'seed:completed', daysAgo(2))
    await ensureCheckoutEvent(
      tx,
      completedLead.id,
      'url_gerada',
      JSON.stringify({ product: 'limpa-nome-cnpj', source: 'seed', amount: 69700 }),
      daysAgo(4)
    )
    await ensureCheckoutEvent(
      tx,
      completedLead.id,
      'url_enviada',
      JSON.stringify({ channel: 'whatsapp', step: 3 }),
      daysAgo(4)
    )
    await ensureCheckoutEvent(
      tx,
      completedLead.id,
      'pagamento_confirmado',
      JSON.stringify({ method: 'CREDIT_CARD', amount: 69700, source: 'seed' }),
      daysAgo(3)
    )
    await ensureNurtureLog(
      tx,
      completedLead.id,
      'whatsapp',
      'posvendas_followup',
      'Processo finalizado com prova anexada.',
      daysAgo(2)
    )
    summary.push({ label: 'paid lead completed', phone: completedLead.phone, leadId: completedLead.id })

    const lostLead = await upsertLead(tx, {
      phone: '5511998801006',
      name: 'Gustavo Almeida',
      email: 'gustavo@example.com',
      channel: 'site',
      status: 'perdido',
      stage: 'lead',
      trafficTemperature: 'cold',
      currentTemperature: 'warm',
      coraTemperature: 'warm',
      objective: 'entender se ainda vale a pena tentar',
      tempoEndividado: '6 meses',
      valorDivida: 'R$ 2.100',
      estagioNegociacao: 'sumiu apos o primeiro contato',
      leadType: 'cpf',
      pendingAction: 'followup_2',
      reentryCount: 3,
      lastInteractionAt: daysAgo(14),
      lossReason: 'sem resposta apos 7 dias',
      notes: 'Lead perdido com reentradas para testar segmentacao e abandono.',
    })
    await ensureLeadEvent(tx, lostLead.id, 'lead_capturado', 'seed:lost', daysAgo(14))
    await ensureLeadEvent(tx, lostLead.id, 'perdido', 'seed:lost', daysAgo(7))
    await ensureNurtureLog(
      tx,
      lostLead.id,
      'whatsapp',
      'reengagement',
      'Tentativa final sem resposta para validar fluxo perdido.',
      daysAgo(7)
    )
    summary.push({ label: 'lost lead', phone: lostLead.phone, leadId: lostLead.id })

    await ensureAbandonedCheckout(tx, {
      name: 'Gustavo Almeida',
      email: 'gustavo@example.com',
      phone: '5511998801006',
      document: '12345678901',
      documentType: 'CPF',
      product: 'limpa-nome-cpf',
      paymentMethod: 'PIX',
      installments: 3,
    })
  })

  console.log('Seed CRM concluido:')
  for (const item of summary) {
    console.log(`- ${item.label}: ${item.phone} (${item.leadId})`)
  }
}

main()
  .catch((error) => {
    console.error('Erro ao cadastrar cenarios de CRM:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
