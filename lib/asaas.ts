const BASE_URL = process.env.ASAAS_BASE_URL!
// ASAAS_API_KEY começa com "$" — @next/env no Node.js v24 expande "$" para string vazia.
// Workaround: usar ASAAS_API_KEY_VALUE (sem "$") no .env.local; em prod a Vercel usa ASAAS_API_KEY diretamente.
const API_KEY = process.env.ASAAS_API_KEY || ('$' + process.env.ASAAS_API_KEY_VALUE!)

async function asaasFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'access_token': API_KEY,
      ...options?.headers,
    },
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Asaas ${options?.method ?? 'GET'} ${path} → ${res.status}: ${body}`)
  }

  return res.json() as Promise<T>
}

// ── Tipos ──────────────────────────────────────────────────────────────────

export interface AsaasCustomer {
  id: string
  name: string
  cpfCnpj: string
}

export interface AsaasPayment {
  id: string
  status: string
  billingType: string
  value: number
  dueDate: string
  invoiceUrl: string
  pixKey?: string | null
}

export interface AsaasPixQrCode {
  encodedImage: string   // base64
  payload: string        // copia-e-cola
  expirationDate: string
}

// ── Customers ──────────────────────────────────────────────────────────────

export async function findOrCreateCustomer(params: {
  name: string
  email: string
  phone: string
  cpfCnpj: string
  companyName?: string
}): Promise<AsaasCustomer> {
  // Busca cliente existente pelo CPF/CNPJ
  const search = await asaasFetch<{ data: AsaasCustomer[] }>(
    `/customers?cpfCnpj=${params.cpfCnpj}`
  )

  if (search.data.length > 0) return search.data[0]

  // Cria novo cliente
  const personType = params.cpfCnpj.length === 11 ? 'FISICA' : 'JURIDICA'

  return asaasFetch<AsaasCustomer>('/customers', {
    method: 'POST',
    body: JSON.stringify({
      name: params.name,
      email: params.email,
      mobilePhone: params.phone,
      cpfCnpj: params.cpfCnpj,
      personType,
      ...(params.companyName ? { company: params.companyName } : {}),
      notificationDisabled: true,
    }),
  })
}

// ── Payments ───────────────────────────────────────────────────────────────

export async function createPayment(params: {
  customerId: string
  billingType: 'PIX' | 'CREDIT_CARD'
  value: number
  description: string
  externalReference: string
  installmentCount?: number
  remoteIp?: string
  creditCard?: {
    holderName: string
    number: string
    expiryMonth: string
    expiryYear: string
    ccv: string
  }
  creditCardHolderInfo?: {
    name: string
    email: string
    cpfCnpj: string
    phone: string
    postalCode: string
    addressNumber: string
    complement?: string
  }
}): Promise<AsaasPayment> {
  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + 1)
  const dueDateStr = dueDate.toISOString().split('T')[0]

  const installmentCount = params.installmentCount ?? 1

  return asaasFetch<AsaasPayment>('/payments', {
    method: 'POST',
    body: JSON.stringify({
      customer: params.customerId,
      billingType: params.billingType,
      value: params.value,
      dueDate: dueDateStr,
      description: params.description,
      externalReference: params.externalReference,
      ...(params.billingType === 'CREDIT_CARD' && installmentCount > 1
        ? { installmentCount, installmentValue: parseFloat((params.value / installmentCount).toFixed(2)) }
        : {}),
      ...(params.creditCard ? { creditCard: params.creditCard } : {}),
      ...(params.creditCardHolderInfo ? { creditCardHolderInfo: params.creditCardHolderInfo } : {}),
      ...(params.remoteIp ? { remoteIp: params.remoteIp } : {}),
    }),
  })
}

export async function getPixQrCode(paymentId: string): Promise<AsaasPixQrCode> {
  return asaasFetch<AsaasPixQrCode>(`/payments/${paymentId}/pixQrCode`)
}

export async function getPayment(paymentId: string): Promise<AsaasPayment> {
  return asaasFetch<AsaasPayment>(`/payments/${paymentId}`)
}
