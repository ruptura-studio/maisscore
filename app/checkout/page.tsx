'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { totalWithInstallmentFee, installmentValueCents } from '@/lib/installment-fees'

type Product = 'cpf' | 'cnpj'
type PaymentMethod = 'PIX' | 'CREDIT_CARD'

const PRODUCTS = {
  cpf: {
    slug: 'limpa-nome-cpf' as const,
    label: 'Limpa Nome CPF',
    description: 'Pessoa física',
    price: 'R$ 595,00',
    priceInCents: 59500,
    maxInstallments: 3,
    documentType: 'CPF' as const,
    documentLabel: 'CPF',
    documentPlaceholder: '000.000.000-00',
    documentMaxLength: 14,
  },
  cnpj: {
    slug: 'limpa-nome-cnpj' as const,
    label: 'Limpa Nome CNPJ',
    description: 'Pessoa jurídica',
    price: 'R$ 795,00',
    priceInCents: 79500,
    maxInstallments: 3,
    documentType: 'CNPJ' as const,
    documentLabel: 'CNPJ',
    documentPlaceholder: '00.000.000/0000-00',
    documentMaxLength: 18,
  },
}

function formatCurrency(cents: number) {
  return (cents / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function getInstallmentOptions(priceInCents: number, max: number) {
  return Array.from({ length: max }, (_, i) => {
    const n = i + 1
    if (n === 1) {
      return {
        value: 1,
        label: `1× de R$ ${formatCurrency(priceInCents)} (à vista)`,
      }
    }
    const total = totalWithInstallmentFee(priceInCents, n)
    const perInstallment = installmentValueCents(priceInCents, n)
    return {
      value: n,
      label: `${n}× de R$ ${formatCurrency(perInstallment)} — total R$ ${formatCurrency(total)}`,
    }
  })
}

const FEATURES = [
  'Retirada de restrições Serasa, SPC e Boa Vista',
  'Retirada de restrições em Cartório de Protesto',
  'Acompanhamento pelo WhatsApp do início ao fim',
  'Processo inicia em até 7 dias úteis',
  'Resultado em até 30 dias úteis',
]

function formatCpf(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

function formatCnpj(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 14)
  return digits
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '')
  }
  return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '')
}

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialProduct = (searchParams.get('produto') as Product) || 'cpf'
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    initialProduct === 'cnpj' ? 'cnpj' : 'cpf'
  )
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('PIX')
  const [installments, setInstallments] = useState(1)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    document: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const product = PRODUCTS[selectedProduct]
  const installmentOptions = getInstallmentOptions(product.priceInCents, product.maxInstallments)

  // Reseta o campo documento ao trocar de produto
  useEffect(() => {
    setForm((f) => ({ ...f, document: '' }))
    setErrors((e) => ({ ...e, document: '' }))
    setInstallments(1)
  }, [selectedProduct])

  // Rastreamento de abandono
  useEffect(() => {
    function saveAbandoned() {
      if (submitted) return
      const { name, email, phone, document } = form
      if (!name && !email && !phone && !document) return
      navigator.sendBeacon(
        '/api/checkout/abandoned',
        new Blob(
          [JSON.stringify({
            name: name || null,
            email: email || null,
            phone: phone.replace(/\D/g, '') || null,
            document: document.replace(/\D/g, '') || null,
            documentType: product.documentType,
            product: product.slug,
            paymentMethod,
            installments: paymentMethod === 'CREDIT_CARD' ? installments : null,
          })],
          { type: 'application/json' }
        )
      )
    }

    window.addEventListener('beforeunload', saveAbandoned)
    return () => window.removeEventListener('beforeunload', saveAbandoned)
  }, [form, submitted, paymentMethod, installments, product])

  function handleDocumentChange(value: string) {
    const formatted =
      selectedProduct === 'cpf' ? formatCpf(value) : formatCnpj(value)
    setForm((f) => ({ ...f, document: formatted }))
  }

  function validate() {
    const newErrors: Record<string, string> = {}
    if (form.name.trim().length < 2) newErrors.name = 'Nome deve ter pelo menos 2 caracteres'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'E-mail inválido'
    const phoneDigits = form.phone.replace(/\D/g, '')
    if (phoneDigits.length < 10) newErrors.phone = 'Telefone inválido'
    const docDigits = form.document.replace(/\D/g, '')
    const expectedLen = selectedProduct === 'cpf' ? 11 : 14
    if (docDigits.length !== expectedLen)
      newErrors.document = `${product.documentLabel} deve ter ${expectedLen} dígitos`
    return newErrors
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setServerError('')

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setLoading(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.replace(/\D/g, ''),
          document: form.document.replace(/\D/g, ''),
          documentType: product.documentType,
          productSlug: product.slug,
          paymentMethod,
          installments: paymentMethod === 'CREDIT_CARD' ? installments : 1,
        }),
      })

      const data = await res.json()

      if (!data.success) {
        setServerError(data.error || 'Erro ao processar. Tente novamente.')
        return
      }

      setSubmitted(true)

      // Cartão: redireciona para link do Asaas
      if (paymentMethod === 'CREDIT_CARD' && data.data.invoiceUrl) {
        window.location.href = data.data.invoiceUrl
        return
      }

      // PIX: vai para tela de pagamento
      router.push(`/checkout/pagamento?orderId=${data.data.orderId}`)
    } catch {
      setServerError('Erro de conexão. Verifique sua internet e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-100 py-12">
      <div className="container-ms">
        {/* Header da página */}
        <div className="mb-8 flex flex-col gap-1">
          <h1 className="font-dm text-h2 text-brand-navy">Finalizar contratação</h1>
          <p className="text-sm text-foreground-alt">
            Preencha seus dados abaixo para começar o processo de regularização.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            {/* ── Coluna esquerda: formulário ── */}
            <div className="flex flex-1 flex-col gap-6">

              {/* Card 1: Selecionar produto */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-subtitle text-brand-navy">Qual serviço você precisa?</h2>
                <div className="flex flex-col gap-3 sm:flex-row">
                  {(Object.entries(PRODUCTS) as [Product, typeof PRODUCTS.cpf][]).map(
                    ([key, p]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedProduct(key)}
                        className={`flex flex-1 flex-col gap-1 rounded-lg border-2 p-4 text-left transition-colors ${
                          selectedProduct === key
                            ? 'border-brand-orange bg-[#fff4f0]'
                            : 'border-brand-border bg-white hover:border-neutral-400'
                        }`}
                      >
                        <span
                          className={`text-subtitle ${
                            selectedProduct === key ? 'text-brand-orange' : 'text-brand-navy'
                          }`}
                        >
                          {p.label}
                        </span>
                        <span className="text-label text-foreground-alt">{p.description}</span>
                        <span className="font-dm text-h3 text-brand-navy">{p.price}</span>
                        <span className="text-txt-xs text-foreground-alt">
                          PIX à vista ou até 3× no cartão
                        </span>
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Card 2: Dados pessoais */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-subtitle text-brand-navy">Seus dados</h2>
                <div className="flex flex-col gap-4">
                  {/* Nome */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-label text-brand-navy">
                      Nome completo <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Seu nome completo"
                      className={`h-11 rounded-md border px-3 text-sm text-brand-navy placeholder:text-neutral-400 outline-none transition-colors focus:border-brand-navy ${
                        errors.name ? 'border-destructive' : 'border-brand-border'
                      }`}
                    />
                    {errors.name && (
                      <span className="text-txt-xs text-destructive">{errors.name}</span>
                    )}
                  </div>

                  {/* E-mail */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-label text-brand-navy">
                      E-mail <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="seu@email.com"
                      className={`h-11 rounded-md border px-3 text-sm text-brand-navy placeholder:text-neutral-400 outline-none transition-colors focus:border-brand-navy ${
                        errors.email ? 'border-destructive' : 'border-brand-border'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-txt-xs text-destructive">{errors.email}</span>
                    )}
                  </div>

                  {/* Telefone + Documento — linha dupla no md+ */}
                  <div className="flex flex-col gap-4 md:flex-row">
                    <div className="flex flex-1 flex-col gap-1">
                      <label htmlFor="phone" className="text-label text-brand-navy">
                        Celular (WhatsApp) <span className="text-brand-orange">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        inputMode="numeric"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, phone: formatPhone(e.target.value) }))
                        }
                        placeholder="(11) 99999-9999"
                        className={`h-11 rounded-md border px-3 text-sm text-brand-navy placeholder:text-neutral-400 outline-none transition-colors focus:border-brand-navy ${
                          errors.phone ? 'border-destructive' : 'border-brand-border'
                        }`}
                      />
                      {errors.phone && (
                        <span className="text-txt-xs text-destructive">{errors.phone}</span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col gap-1">
                      <label htmlFor="document" className="text-label text-brand-navy">
                        {product.documentLabel} <span className="text-brand-orange">*</span>
                      </label>
                      <input
                        id="document"
                        type="text"
                        inputMode="numeric"
                        value={form.document}
                        onChange={(e) => handleDocumentChange(e.target.value)}
                        placeholder={product.documentPlaceholder}
                        maxLength={product.documentMaxLength}
                        className={`h-11 rounded-md border px-3 text-sm text-brand-navy placeholder:text-neutral-400 outline-none transition-colors focus:border-brand-navy ${
                          errors.document ? 'border-destructive' : 'border-brand-border'
                        }`}
                      />
                      {errors.document && (
                        <span className="text-txt-xs text-destructive">{errors.document}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Método de pagamento */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-subtitle text-brand-navy">Como você quer pagar?</h2>
                <div className="flex flex-col gap-3">
                  {/* PIX */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('PIX')}
                    className={`flex items-center gap-4 rounded-lg border-2 p-4 text-left transition-colors ${
                      paymentMethod === 'PIX'
                        ? 'border-brand-orange bg-[#fff4f0]'
                        : 'border-brand-border hover:border-neutral-400'
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        paymentMethod === 'PIX' ? 'bg-brand-orange' : 'bg-neutral-200'
                      }`}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        className={paymentMethod === 'PIX' ? 'text-white' : 'text-foreground-alt'}
                      >
                        <path
                          d="M9.5 2C9.5 2 7 2 5.5 3.5C4 5 4 7.5 4 7.5V9M9.5 22C9.5 22 7 22 5.5 20.5C4 19 4 16.5 4 16.5V15M14.5 2C14.5 2 17 2 18.5 3.5C20 5 20 7.5 20 7.5V9M14.5 22C14.5 22 17 22 18.5 20.5C20 19 20 16.5 20 16.5V15"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <rect
                          x="7"
                          y="10"
                          width="10"
                          height="4"
                          rx="1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-brand-navy">PIX</p>
                      <p className="text-txt-xs text-foreground-alt">
                        À vista · aprovação em segundos
                      </p>
                    </div>
                    <div className="ml-auto">
                      <div
                        className={`h-5 w-5 rounded-full border-2 ${
                          paymentMethod === 'PIX'
                            ? 'border-brand-orange bg-brand-orange'
                            : 'border-brand-border'
                        }`}
                      />
                    </div>
                  </button>

                  {/* Cartão */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CREDIT_CARD')}
                    className={`flex items-center gap-4 rounded-lg border-2 p-4 text-left transition-colors ${
                      paymentMethod === 'CREDIT_CARD'
                        ? 'border-brand-orange bg-[#fff4f0]'
                        : 'border-brand-border hover:border-neutral-400'
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        paymentMethod === 'CREDIT_CARD' ? 'bg-brand-orange' : 'bg-neutral-200'
                      }`}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        className={
                          paymentMethod === 'CREDIT_CARD' ? 'text-white' : 'text-foreground-alt'
                        }
                      >
                        <rect
                          x="2"
                          y="5"
                          width="20"
                          height="14"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path d="M2 10h20" stroke="currentColor" strokeWidth="1.5" />
                        <path
                          d="M6 15h4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-brand-navy">Cartão de crédito</p>
                      <p className="text-txt-xs text-foreground-alt">
                        Até 3× · encargos do processador
                      </p>
                    </div>
                    <div className="ml-auto">
                      <div
                        className={`h-5 w-5 rounded-full border-2 ${
                          paymentMethod === 'CREDIT_CARD'
                            ? 'border-brand-orange bg-brand-orange'
                            : 'border-brand-border'
                        }`}
                      />
                    </div>
                  </button>

                  {/* Seletor de parcelas — aparece quando cartão está selecionado */}
                  {paymentMethod === 'CREDIT_CARD' && (
                    <div className="flex flex-col gap-1">
                      <label htmlFor="installments" className="text-label text-brand-navy">
                        Número de parcelas
                      </label>
                      <select
                        id="installments"
                        value={installments}
                        onChange={(e) => setInstallments(Number(e.target.value))}
                        className="h-11 rounded-md border border-brand-border bg-white px-3 text-sm text-brand-navy outline-none transition-colors focus:border-brand-navy"
                      >
                        {installmentOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Erro do servidor */}
              {serverError && (
                <p className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  {serverError}
                </p>
              )}

              {/* Botão submit — visível só no mobile (no desktop fica na sidebar) */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full lg:hidden"
              >
                {loading
                  ? 'Processando...'
                  : paymentMethod === 'PIX'
                  ? 'Gerar QR Code PIX'
                  : 'Pagar com cartão'}
              </button>
            </div>

            {/* ── Coluna direita: resumo do pedido ── */}
            <div className="flex w-full flex-col gap-4 lg:w-[340px] lg:sticky lg:top-8">
              {/* Card resumo */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-subtitle text-brand-navy">Resumo do pedido</h2>

                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm text-foreground-alt">{product.label}</span>
                    <span className="font-dm text-subtitle text-brand-navy">{product.price}</span>
                  </div>

                  <div className="border-t border-brand-border pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-brand-navy">Total</span>
                      <span className="font-dm text-h3 text-brand-navy">
                        {paymentMethod === 'CREDIT_CARD' && installments > 1
                          ? `R$ ${formatCurrency(totalWithInstallmentFee(product.priceInCents, installments))}`
                          : product.price}
                      </span>
                    </div>
                    <p className="mt-1 text-txt-xs text-foreground-alt">
                      {paymentMethod === 'PIX'
                        ? 'PIX à vista'
                        : installments === 1
                        ? '1× no cartão de crédito'
                        : `${installments}× de R$ ${formatCurrency(installmentValueCents(product.priceInCents, installments))} no cartão`}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <ul className="mt-4 flex flex-col gap-2 border-t border-brand-border pt-4">
                  {FEATURES.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Image src="/icons/icon-ast.svg" alt="" width={8} height={8} className="mt-1 shrink-0" />
                      <span className="text-txt-xs text-brand-navy">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Botão submit — desktop */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary mt-6 hidden w-full lg:flex"
                >
                  {loading
                    ? 'Processando...'
                    : paymentMethod === 'PIX'
                    ? 'Gerar QR Code PIX'
                    : 'Pagar com cartão'}
                </button>
              </div>

              {/* Garantia */}
              <div className="rounded-lg border border-brand-border bg-white p-4">
                <p className="text-txt-xs text-brand-navy">
                  <strong className="font-semibold">Garantia total de resultado</strong>
                  <br />
                  Nome limpo em até 30 dias úteis ou seu dinheiro de volta. Base legal: Art. 42 do
                  Código de Defesa do Consumidor.
                </p>
              </div>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-6 px-2">
                <div className="flex flex-col items-center gap-1">
                  <span className="font-dm text-h3 text-brand-orange">97%</span>
                  <span className="text-center text-txt-xs text-foreground-alt">taxa de sucesso</span>
                </div>
                <div className="h-8 w-px bg-brand-border" />
                <div className="flex flex-col items-center gap-1">
                  <span className="font-dm text-h3 text-brand-navy">1.142+</span>
                  <span className="text-center text-txt-xs text-foreground-alt">famílias atendidas</span>
                </div>
                <div className="h-8 w-px bg-brand-border" />
                <div className="flex flex-col items-center gap-1">
                  <span className="font-dm text-h3 text-brand-navy">30d</span>
                  <span className="text-center text-txt-xs text-foreground-alt">prazo máximo</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-border border-t-brand-orange" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}
