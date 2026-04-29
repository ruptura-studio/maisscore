type EspoLead = Record<string, unknown>

const baseUrl = process.env.ESPOCRM_URL ?? 'https://crm.maisscore.com.br'
const user = process.env.ESPOCRM_USER
const password = process.env.ESPOCRM_PASS

if (!user || !password) {
  throw new Error('Defina ESPOCRM_USER e ESPOCRM_PASS antes de rodar o teste.')
}

const auth = Buffer.from(`${user}:${password}`).toString('base64')
const headers = {
  Authorization: `Basic ${auth}`,
  'Content-Type': 'application/json',
}

function crmDate(daysAgo = 0) {
  const date = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000)
  const pad = (n: number) => String(n).padStart(2, '0')
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
  ].join('-') + ` ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

function compact<T extends Record<string, unknown>>(value: T): T {
  return Object.fromEntries(Object.entries(value).filter(([, v]) => v !== undefined && v !== null)) as T
}

async function api(method: string, path: string, body?: Record<string, unknown>) {
  const response = await fetch(`${baseUrl}/api/v1/${path.replace(/^\/+/, '')}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  let data: unknown = null
  const text = await response.text()
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  return { status: response.status, data }
}

async function getLeadByPhoneNormalized(phoneNormalized: string) {
  const { status, data } = await api(
    'GET',
    `Lead?where[0][type]=equals&where[0][attribute]=phoneNormalized&where[0][value]=${encodeURIComponent(phoneNormalized)}`
  )

  if (status !== 200 || !data || typeof data !== 'object') return null
  const list = Array.isArray((data as { list?: unknown[] }).list) ? (data as { list: EspoLead[] }).list : []
  return list[0] ?? null
}

async function upsertLead(payload: EspoLead) {
  const phoneNormalized = String(payload.phoneNormalized ?? '')
  if (!phoneNormalized) throw new Error('phoneNormalized e obrigatorio no payload.')

  const existing = await getLeadByPhoneNormalized(phoneNormalized)
  if (existing?.id) {
    const { status, data } = await api('PUT', `Lead/${existing.id}`, payload)
    return { mode: 'updated', status, data, id: existing.id }
  }

  const { status, data } = await api('POST', 'Lead', payload)
  return { mode: 'created', status, data, id: (data as { id?: string } | null)?.id ?? null }
}

async function main() {
  const metadata = await api('GET', 'Metadata')
  if (metadata.status !== 200) {
    throw new Error(`Metadata indisponivel: ${metadata.status}`)
  }

  const leadFields = ((metadata.data as { entityDefs?: { Lead?: { fields?: Record<string, unknown> } } })?.entityDefs?.Lead?.fields ?? {})
  const wantedFields = [
    'phoneNormalized',
    'canal',
    'origem',
    'utmSource',
    'utmMedium',
    'utmCampaign',
    'utmContent',
    'utmTerm',
    'temperaturaInicial',
    'temperaturaAtual',
    'classificacao',
    'perfil',
    'etapaAtual',
    'objeccaoDominante',
    'objetivoPrincipal',
    'primeiraResposta',
    'resumoConversa',
    'proximoPasso',
    'produtoInteresse',
    'checkoutStatus',
    'checkoutUrl',
    'checkoutEnviadoEm',
    'opportunityAmount',
    'formaPagamento',
    'paymentStatus',
    'asaasPaymentId',
    'paymentConfirmedAt',
    'orderId',
    'documentType',
    'processStatus',
    'processStage',
    'processStartedAt',
    'processCleanedAt',
    'proofUrl',
  ]

  const missing = wantedFields.filter((field) => !(field in leadFields))
  console.log(JSON.stringify({ metadata: metadata.status, missing }, null, 2))

  const scenarios = [
    compact({
      firstName: 'QA',
      lastName: 'Espo Cold 01',
      emailAddress: 'qa-espocrm-cold-01@example.com',
      phoneNumber: '+5511998801101',
      phoneNormalized: '5511998801101',
      status: 'New',
      temperaturaInicial: 'cold',
      temperaturaAtual: 'cold',
      classificacao: 'A',
      perfil: 'CPF',
      etapaAtual: 'cold',
      canal: 'whatsapp',
      origem: 'meta_ads',
      utmSource: 'facebook',
      utmMedium: 'social',
      utmCampaign: 'qa_cold_01',
      objetivoPrincipal: 'quero testar entrada fria',
      primeiraResposta: 'sim',
      resumoConversa: 'lead frio para teste de CRM',
      proximoPasso: 'triagem',
    }),
    compact({
      firstName: 'QA',
      lastName: 'Espo Warm 01',
      emailAddress: 'qa-espocrm-warm-01@example.com',
      phoneNumber: '+5511998801102',
      phoneNormalized: '5511998801102',
      status: 'In Process',
      temperaturaInicial: 'warm',
      temperaturaAtual: 'warm',
      classificacao: 'B',
      perfil: 'CPF',
      etapaAtual: 'warm',
      canal: 'site',
      origem: 'google_ads',
      utmSource: 'google',
      utmMedium: 'cpc',
      utmCampaign: 'qa_comparison_01',
      utmContent: 'ad_1',
      utmTerm: 'comparacao',
      objetivoPrincipal: 'comparar proposta',
      primeiraResposta: 'sim',
      resumoConversa: 'lead com interesse intermediario',
      proximoPasso: 'checkout',
    }),
    compact({
      firstName: 'QA',
      lastName: 'Espo Hot Checkout 01',
      emailAddress: 'qa-espocrm-hot-01@example.com',
      phoneNumber: '+5511998801103',
      phoneNormalized: '5511998801103',
      status: 'In Process',
      temperaturaInicial: 'hot',
      temperaturaAtual: 'hot',
      classificacao: 'A',
      perfil: 'CNPJ',
      accountName: 'QA Hot Checkout LTDA',
      etapaAtual: 'checkout',
      canal: 'whatsapp',
      origem: 'retargeting',
      produtoInteresse: 'limpa-nome-cnpj',
      checkoutStatus: 'enviado',
      checkoutUrl: 'https://checkout.maisscore.com.br/qa-hot-01',
      checkoutEnviadoEm: crmDate(0),
      objetivoPrincipal: 'enviar checkout',
      primeiraResposta: 'sim',
      resumoConversa: 'checkout enviado para teste',
      proximoPasso: 'pagamento',
    }),
    compact({
      firstName: 'QA',
      lastName: 'Espo Paid 01',
      emailAddress: 'qa-espocrm-paid-01@example.com',
      phoneNumber: '+5511998801104',
      phoneNormalized: '5511998801104',
      status: 'Converted',
      temperaturaInicial: 'hot',
      temperaturaAtual: 'hot',
      classificacao: 'A',
      perfil: 'CPF',
      etapaAtual: 'pagamento',
      canal: 'checkout',
      origem: 'direct',
      produtoInteresse: 'limpa-nome-cpf',
      formaPagamento: 'PIX',
      paymentStatus: 'confirmed',
      asaasPaymentId: 'asaas_qa_paid_01',
      paymentConfirmedAt: crmDate(1),
      opportunityAmount: 59500,
      documentType: 'CPF',
      orderId: 'order-qa-paid-01',
      objetivoPrincipal: 'validar pagamento confirmado',
      primeiraResposta: 'sim',
      resumoConversa: 'pagamento confirmado para teste',
      proximoPasso: 'processo',
    }),
    compact({
      firstName: 'QA',
      lastName: 'Espo Process 01',
      emailAddress: 'qa-espocrm-process-01@example.com',
      phoneNumber: '+5511998801105',
      phoneNormalized: '5511998801105',
      status: 'Converted',
      temperaturaInicial: 'hot',
      temperaturaAtual: 'hot',
      classificacao: 'B',
      perfil: 'CNPJ',
      accountName: 'QA Process LTDA',
      etapaAtual: 'pos_venda',
      canal: 'checkout',
      origem: 'whatsapp',
      produtoInteresse: 'limpa-nome-cnpj',
      formaPagamento: 'CREDIT_CARD',
      paymentStatus: 'confirmed',
      asaasPaymentId: 'asaas_qa_process_01',
      paymentConfirmedAt: crmDate(2),
      opportunityAmount: 69700,
      documentType: 'CNPJ',
      orderId: 'order-qa-process-01',
      processStatus: 'em_andamento',
      processStage: 'analise_documental',
      processStartedAt: crmDate(2),
      processCleanedAt: crmDate(0),
      proofUrl: 'https://files.maisscore.local/provas/qa-process-01.pdf',
      objetivoPrincipal: 'validar processo e prova',
      primeiraResposta: 'sim',
      resumoConversa: 'processo em andamento',
      proximoPasso: 'pos_venda',
    }),
    compact({
      firstName: 'QA',
      lastName: 'Espo Lost 01',
      emailAddress: 'qa-espocrm-lost-01@example.com',
      phoneNumber: '+5511998801106',
      phoneNormalized: '5511998801106',
      status: 'Dead',
      temperaturaInicial: 'cold',
      temperaturaAtual: 'warm',
      classificacao: 'C',
      perfil: 'CPF',
      etapaAtual: 'perdido',
      canal: 'site',
      origem: 'organic',
      objeccaoDominante: 'sem resposta',
      objetivoPrincipal: 'validar abandono',
      primeiraResposta: 'nao',
      resumoConversa: 'lead perdido para teste',
      proximoPasso: 'reentrada',
    }),
  ]

  const results: Array<Record<string, unknown>> = []
  for (const payload of scenarios) {
    const result = await upsertLead(payload)
    results.push({
      phoneNormalized: payload.phoneNormalized,
      mode: result.mode,
      status: result.status,
      id: result.id,
    })
  }

  // Atualiza o segundo lead para simular reentrada / deduplicacao sem criar duplicado.
  const dedupLead = await getLeadByPhoneNormalized('5511998801102')
  if (dedupLead?.id) {
    const { status } = await api('PUT', `Lead/${dedupLead.id}`, compact({
      temperaturaAtual: 'hot',
      etapaAtual: 'checkout',
      checkoutStatus: 'enviado',
      checkoutEnviadoEm: crmDate(0),
      proximoPasso: 'pagamento',
    }))
    results.push({
      phoneNormalized: '5511998801102',
      mode: 'updated-dedup',
      status,
      id: dedupLead.id,
    })
  }

  const verification = await Promise.all(
    scenarios.map(async (payload) => {
      const lead = await getLeadByPhoneNormalized(String(payload.phoneNormalized))
      return {
        phoneNormalized: payload.phoneNormalized,
        found: Boolean(lead),
        name: lead?.name,
        status: lead?.status,
        etapaAtual: lead?.etapaAtual,
        temperaturaInicial: lead?.temperaturaInicial,
      }
    })
  )

  console.log(JSON.stringify({ results, verification }, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
