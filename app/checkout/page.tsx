'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { totalWithInstallmentFee, installmentValueCents } from '@/lib/installment-fees'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// ── Types ──────────────────────────────────────────────────────────────────

type Product = 'cpf' | 'cnpj'
type PaymentMethod = 'PIX' | 'CREDIT_CARD'

// ── Constants ──────────────────────────────────────────────────────────────

const PRODUCTS = {
  cpf: {
    slug: 'limpa-nome-cpf' as const,
    label: 'Limpar CPF',
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
    label: 'Limpar CNPJ',
    price: 'R$ 795,00',
    priceInCents: 79500,
    maxInstallments: 3,
    documentType: 'CNPJ' as const,
    documentLabel: 'CNPJ',
    documentPlaceholder: '00.000.000/0000-00',
    documentMaxLength: 18,
  },
}

const TERMS = [
  'Que este serviço não quitará minhas dívidas.',
  'Que este serviço apenas removerá as restrições em meu CPF ou CNPJ.',
  'Que executar este serviço não me garante crédito.',
  'Que o prazo para remoção das restrições é entre 15 a 30 dias úteis.',
  'Com a Política de Privacidade e Termos de Utilização do site Mais Score.',
]

// ── Formatters ──────────────────────────────────────────────────────────────

function formatCurrency(cents: number) {
  return (cents / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function getInstallmentOptions(priceInCents: number, max: number) {
  return Array.from({ length: max }, (_, i) => {
    const n = i + 1
    if (n === 1) return { value: 1, label: `1× de R$ ${formatCurrency(priceInCents)} (à vista)` }
    const total = totalWithInstallmentFee(priceInCents, n)
    const perInstallment = installmentValueCents(priceInCents, n)
    return {
      value: n,
      label: `${n}× de R$ ${formatCurrency(perInstallment)} — total R$ ${formatCurrency(total)}`,
    }
  })
}

function formatCpf(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11)
  return d.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

function formatCnpj(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 14)
  return d
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
}

function formatPhone(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '')
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '')
}

function formatCep(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 8)
  return d.replace(/(\d{5})(\d{0,3})/, '$1-$2').replace(/-$/, '')
}

function formatCardNumber(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 16)
  return d.replace(/(\d{4})(?=\d)/g, '$1 ')
}

// ── Field wrapper ────────────────────────────────────────────────────────────

function Field({
  label,
  children,
  error,
  required,
}: {
  label: string
  children: React.ReactNode
  error?: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-label text-brand-navy">
        {label} {required && <span className="text-brand-orange">*</span>}
      </label>
      {children}
      {error && <span className="text-txt-xs text-destructive">{error}</span>}
    </div>
  )
}

const inputCls = (error?: string) =>
  `h-11 w-full rounded-md border px-3 text-sm text-brand-navy placeholder:text-neutral-400 outline-none transition-colors focus:border-brand-navy ${
    error ? 'border-destructive' : 'border-brand-border'
  }`

// ── Stepper ──────────────────────────────────────────────────────────────────

function Stepper({ step, labels }: { step: number; labels: string[] }) {
  return (
    <div className="mb-8 flex items-start justify-center">
      {labels.map((label, i) => {
        const n = i + 1
        const done = n < step
        const active = n === step
        return (
          <div key={n} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  done
                    ? 'bg-brand-orange text-white'
                    : active
                    ? 'bg-brand-navy text-white'
                    : 'bg-neutral-200 text-neutral-500'
                }`}
              >
                {done ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7l3.5 3.5L12 3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  n
                )}
              </div>
              <span
                className={`whitespace-nowrap text-xs ${
                  active ? 'font-medium text-brand-navy' : 'text-neutral-400'
                }`}
              >
                {label}
              </span>
            </div>
            {i < labels.length - 1 && (
              <div
                className={`mx-2 mb-5 h-px w-12 transition-colors sm:w-16 ${
                  done ? 'bg-brand-orange' : 'bg-neutral-200'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Terms checkboxes ─────────────────────────────────────────────────────────

function TermsBlock({
  values,
  onChange,
}: {
  values: boolean[]
  onChange: (i: number, checked: boolean) => void
}) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-subtitle text-brand-navy">Declaro que estou ciente:</h2>
      {TERMS.map((term, i) => (
        <label key={i} className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={values[i]}
            onChange={(e) => onChange(i, e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-brand-orange"
          />
          <span className="text-sm text-brand-navy">{term}</span>
        </label>
      ))}
    </div>
  )
}

// ── CheckoutContent ──────────────────────────────────────────────────────────

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialProduct = (searchParams.get('produto') as Product) || 'cpf'
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    initialProduct === 'cnpj' ? 'cnpj' : 'cpf'
  )
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('PIX')
  const [installments, setInstallments] = useState(1)

  const [form, setForm] = useState({ name: '', email: '', phone: '', document: '', companyName: '' })
  const [address, setAddress] = useState({
    cep: '',
    street: '',
    neighborhood: '',
    city: '',
    state: '',
    number: '',
    complement: '',
  })
  const [cepLoading, setCepLoading] = useState(false)
  const [card, setCard] = useState({ number: '', month: '', year: '', cvv: '' })
  const [cardHolderDiffers, setCardHolderDiffers] = useState(false)
  const [cardHolder, setCardHolder] = useState({ name: '', cpfCnpj: '', phone: '' })
  const [pixTerms, setPixTerms] = useState<boolean[]>(Array(5).fill(false))
  const [cardTerms, setCardTerms] = useState<boolean[]>(Array(5).fill(false))
  const [clientIp, setClientIp] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const product = PRODUCTS[selectedProduct]
  const installmentOptions = getInstallmentOptions(product.priceInCents, product.maxInstallments)
  const stepLabels =
    paymentMethod === 'PIX' ? ['Cadastro', 'Confirmação'] : ['Cadastro', 'Pagamento', 'Confirmação']

  // Captura IP do cliente
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((r) => r.json())
      .then((d) => setClientIp(d.ip ?? ''))
      .catch(() => {})
  }, [])

  useEffect(() => {
    setForm((f) => ({ ...f, document: '', companyName: '' }))
    setErrors({})
    setInstallments(1)
  }, [selectedProduct])

  // Abandoned tracking
  useEffect(() => {
    function saveAbandoned() {
      if (submitted) return
      const { name, email, phone, document } = form
      if (!name && !email && !phone && !document) return
      navigator.sendBeacon(
        '/api/checkout/abandoned',
        new Blob(
          [
            JSON.stringify({
              name: name || null,
              email: email || null,
              phone: phone.replace(/\D/g, '') || null,
              document: document.replace(/\D/g, '') || null,
              documentType: product.documentType,
              product: product.slug,
              paymentMethod,
              installments: paymentMethod === 'CREDIT_CARD' ? installments : null,
            }),
          ],
          { type: 'application/json' }
        )
      )
    }
    window.addEventListener('beforeunload', saveAbandoned)
    return () => window.removeEventListener('beforeunload', saveAbandoned)
  }, [form, submitted, paymentMethod, installments, product])

  // CEP auto-complete
  async function handleCepChange(value: string) {
    const formatted = formatCep(value)
    setAddress((a) => ({ ...a, cep: formatted }))
    const digits = value.replace(/\D/g, '')
    if (digits.length === 8) {
      setCepLoading(true)
      try {
        const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`)
        const data = await res.json()
        if (!data.erro) {
          setAddress((a) => ({
            ...a,
            street: data.logradouro || '',
            neighborhood: data.bairro || '',
            city: data.localidade || '',
            state: data.uf || '',
          }))
        }
      } catch {
        // silent fail
      } finally {
        setCepLoading(false)
      }
    }
  }

  // ── Validations ────────────────────────────────────────────────────────────

  function validateStep1(): Record<string, string> {
    const e: Record<string, string> = {}
    if (form.name.trim().length < 2) e.name = 'Nome deve ter pelo menos 2 caracteres'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'E-mail inválido'
    if (form.phone.replace(/\D/g, '').length < 10) e.phone = 'Telefone inválido'
    const docDigits = form.document.replace(/\D/g, '')
    const expectedLen = selectedProduct === 'cpf' ? 11 : 14
    if (docDigits.length !== expectedLen) e.document = `${product.documentLabel} inválido`
    if (selectedProduct === 'cnpj' && !form.companyName.trim()) {
      e.companyName = 'Razão Social obrigatória'
    }
    return e
  }

  function validateStep2Card(): Record<string, string> {
    const e: Record<string, string> = {}
    if (card.number.replace(/\s/g, '').length !== 16) e.cardNumber = 'Número do cartão inválido'
    if (!card.month) e.cardMonth = 'Selecione o mês'
    if (!card.year) e.cardYear = 'Selecione o ano'
    if (card.cvv.length !== 3) e.cardCvv = 'CVV inválido'
    if (address.cep.replace(/\D/g, '').length !== 8) e.cep = 'CEP inválido'
    if (!address.street.trim()) e.street = 'Endereço obrigatório'
    if (!address.neighborhood.trim()) e.neighborhood = 'Bairro obrigatório'
    if (!address.city.trim()) e.city = 'Cidade obrigatória'
    if (!address.state.trim()) e.state = 'UF obrigatória'
    if (!address.number.trim()) e.number = 'Número obrigatório'
    if (cardHolderDiffers) {
      if (cardHolder.name.trim().length < 2) e.holderName = 'Nome do titular obrigatório'
      const holderDoc = cardHolder.cpfCnpj.replace(/\D/g, '')
      if (holderDoc.length !== 11 && holderDoc.length !== 14) e.holderCpfCnpj = 'CPF ou CNPJ inválido'
      if (cardHolder.phone.replace(/\D/g, '').length < 10) e.holderPhone = 'Telefone inválido'
    }
    return e
  }

  // ── Navigation ─────────────────────────────────────────────────────────────

  async function goNext() {
    setServerError('')
    if (step === 1) {
      const errs = validateStep1()
      if (Object.keys(errs).length > 0) { setErrors(errs); return }
      setErrors({})
      // Fire-and-forget progress tracking
      fetch('/api/checkout/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          step: 1,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.replace(/\D/g, ''),
          document: form.document.replace(/\D/g, ''),
          documentType: product.documentType,
          razaoSocial: form.companyName.trim() || undefined,
          productSlug: product.slug,
        }),
      }).catch(() => {})
      setStep(2)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (step === 2 && paymentMethod === 'CREDIT_CARD') {
      const errs = validateStep2Card()
      if (Object.keys(errs).length > 0) { setErrors(errs); return }
      setErrors({})
      fetch('/api/checkout/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          step: 2,
          phone: form.phone.replace(/\D/g, ''),
          paymentMethod: 'CREDIT_CARD',
          productSlug: product.slug,
        }),
      }).catch(() => {})
      setStep(3)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function goBack() {
    setErrors({})
    setServerError('')
    if (step === 2) setStep(1)
    else if (step === 3) setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── Submit (PIX: step 2, Cartão: step 3) ──────────────────────────────────

  async function handleSubmit() {
    setServerError('')
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
          razaoSocial: form.companyName.trim() || undefined,
          productSlug: product.slug,
          paymentMethod,
          installments: paymentMethod === 'CREDIT_CARD' ? installments : 1,
          remoteIp: clientIp || undefined,
          ...(paymentMethod === 'CREDIT_CARD'
            ? {
                postalCode: address.cep.replace(/\D/g, ''),
                address: address.street.trim(),
                addressNumber: address.number.trim(),
                complement: address.complement.trim() || undefined,
                neighborhood: address.neighborhood.trim(),
                city: address.city.trim(),
                state: address.state.trim(),
                creditCard: {
                  holderName: cardHolderDiffers ? cardHolder.name.trim() : form.name.trim(),
                  number: card.number.replace(/\s/g, ''),
                  expiryMonth: card.month,
                  expiryYear: card.year,
                  ccv: card.cvv,
                },
                cardHolderDiffers,
                ...(cardHolderDiffers
                  ? {
                      cardHolderInfo: {
                        name: cardHolder.name.trim(),
                        cpfCnpj: cardHolder.cpfCnpj.replace(/\D/g, ''),
                        phone: cardHolder.phone.replace(/\D/g, ''),
                      },
                    }
                  : {}),
              }
            : {}),
        }),
      })
      const data = await res.json()
      if (!data.success) {
        setServerError(data.error || 'Erro ao processar. Tente novamente.')
        return
      }
      setSubmitted(true)
      router.push(`/checkout/obrigado?orderId=${data.data.orderId}`)
    } catch {
      setServerError('Erro de conexão. Verifique sua internet e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const totalCents =
    paymentMethod === 'CREDIT_CARD' && installments > 1
      ? totalWithInstallmentFee(product.priceInCents, installments)
      : product.priceInCents

  const allPixTerms = pixTerms.every(Boolean)
  const allCardTerms = cardTerms.every(Boolean)

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-neutral-100 py-8 md:py-12">
        <div className="mx-auto w-full max-w-[560px] px-4">
          <Stepper step={step} labels={stepLabels} />

          {/* ── Step 1: Cadastro ──────────────────────────────────────── */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              {/* Seleção de produto */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-subtitle text-brand-navy">Selecione o serviço</h2>
                <div className="flex flex-col gap-3 sm:flex-row">
                  {(Object.entries(PRODUCTS) as [Product, typeof PRODUCTS.cpf][]).map(([key, p]) => (
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
                      <span className="font-dm text-h3 text-brand-navy">{p.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dados pessoais */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-subtitle text-brand-navy">Seus dados</h2>
                <div className="flex flex-col gap-4">
                  <Field label="Nome completo" error={errors.name} required>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Seu nome completo"
                      className={inputCls(errors.name)}
                    />
                  </Field>

                  <Field label="E-mail" error={errors.email} required>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="seu@email.com"
                      className={inputCls(errors.email)}
                    />
                  </Field>

                  {selectedProduct === 'cnpj' && (
                    <Field label="Razão Social" error={errors.companyName} required>
                      <input
                        type="text"
                        value={form.companyName}
                        onChange={(e) => setForm((f) => ({ ...f, companyName: e.target.value }))}
                        placeholder="Nome da empresa"
                        className={inputCls(errors.companyName)}
                      />
                    </Field>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Celular (WhatsApp)" error={errors.phone} required>
                      <input
                        type="tel"
                        inputMode="numeric"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, phone: formatPhone(e.target.value) }))
                        }
                        placeholder="(11) 99999-9999"
                        className={inputCls(errors.phone)}
                      />
                    </Field>

                    <Field label={product.documentLabel} error={errors.document} required>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={form.document}
                        onChange={(e) => {
                          const formatted =
                            selectedProduct === 'cpf'
                              ? formatCpf(e.target.value)
                              : formatCnpj(e.target.value)
                          setForm((f) => ({ ...f, document: formatted }))
                        }}
                        placeholder={product.documentPlaceholder}
                        maxLength={product.documentMaxLength}
                        className={inputCls(errors.document)}
                      />
                    </Field>
                  </div>
                </div>
              </div>

              <button type="button" onClick={goNext} className="btn-secondary w-full">
                Avançar
              </button>
            </div>
          )}

          {/* ── Step 2 (PIX): Revisão + Termos ───────────────────────── */}
          {step === 2 && paymentMethod === 'PIX' && (
            <div className="flex flex-col gap-4">
              {/* Seleção de método */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-subtitle text-brand-navy">Como você quer pagar?</h2>
                <PaymentMethodSelector method={paymentMethod} onChange={setPaymentMethod} />

                {/* Resumo do serviço */}
                <div className="mt-4 rounded-lg border border-brand-border bg-neutral-50 p-4">
                  <p className="text-sm font-medium text-brand-navy">
                    Serviço: {product.label}
                  </p>
                  <p className="mt-0.5 text-sm text-brand-navy">
                    Valor: R$ {formatCurrency(product.priceInCents)}
                  </p>
                  <hr className="my-3 border-brand-border" />
                  <p className="text-xs text-foreground-alt">
                    QR Code e Pix Copia e Cola disponíveis na próxima etapa
                  </p>
                </div>
              </div>

              {/* Termos */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <TermsBlock
                  values={pixTerms}
                  onChange={(i, checked) =>
                    setPixTerms((t) => t.map((v, idx) => (idx === i ? checked : v)))
                  }
                />
              </div>

              {serverError && (
                <p className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  {serverError}
                </p>
              )}

              <div className="flex gap-3">
                <button type="button" onClick={goBack} className="btn-secondary flex-1">
                  Voltar
                </button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="flex-1">
                      <button
                        type="button"
                        onClick={allPixTerms ? handleSubmit : undefined}
                        disabled={loading || !allPixTerms}
                        className="btn-primary w-full disabled:opacity-50"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                            Processando...
                          </span>
                        ) : (
                          'AVANÇAR'
                        )}
                      </button>
                    </span>
                  </TooltipTrigger>
                  {!allPixTerms && (
                    <TooltipContent>
                      Para prosseguir é preciso aceitar e concordar com todos os termos acima.
                    </TooltipContent>
                  )}
                </Tooltip>
              </div>
            </div>
          )}

          {/* ── Step 2 (Cartão): Dados do cartão + endereço ──────────── */}
          {step === 2 && paymentMethod === 'CREDIT_CARD' && (
            <div className="flex flex-col gap-4">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-subtitle text-brand-navy">Como você quer pagar?</h2>
                <PaymentMethodSelector method={paymentMethod} onChange={setPaymentMethod} />

                <div className="mt-4 flex flex-col gap-4">
                  <Field label="Número do cartão" error={errors.cardNumber} required>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={card.number}
                      onChange={(e) =>
                        setCard((c) => ({ ...c, number: formatCardNumber(e.target.value) }))
                      }
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      className={inputCls(errors.cardNumber)}
                    />
                  </Field>

                  <div className="grid grid-cols-3 gap-3">
                    <Field label="Mês" error={errors.cardMonth} required>
                      <select
                        value={card.month}
                        onChange={(e) => setCard((c) => ({ ...c, month: e.target.value }))}
                        className={`h-11 w-full rounded-md border bg-white px-3 text-sm text-brand-navy outline-none transition-colors focus:border-brand-navy ${
                          errors.cardMonth ? 'border-destructive' : 'border-brand-border'
                        }`}
                      >
                        <option value="">MM</option>
                        {Array.from({ length: 12 }, (_, i) => {
                          const m = String(i + 1).padStart(2, '0')
                          return (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          )
                        })}
                      </select>
                    </Field>

                    <Field label="Ano" error={errors.cardYear} required>
                      <select
                        value={card.year}
                        onChange={(e) => setCard((c) => ({ ...c, year: e.target.value }))}
                        className={`h-11 w-full rounded-md border bg-white px-3 text-sm text-brand-navy outline-none transition-colors focus:border-brand-navy ${
                          errors.cardYear ? 'border-destructive' : 'border-brand-border'
                        }`}
                      >
                        <option value="">AAAA</option>
                        {Array.from({ length: 35 }, (_, i) => {
                          const y = String(2026 + i)
                          return (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          )
                        })}
                      </select>
                    </Field>

                    <Field label="CVV" error={errors.cardCvv} required>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={card.cvv}
                        onChange={(e) =>
                          setCard((c) => ({
                            ...c,
                            cvv: e.target.value.replace(/\D/g, '').slice(0, 3),
                          }))
                        }
                        placeholder="CVV"
                        maxLength={4}
                        className={inputCls(errors.cardCvv)}
                      />
                    </Field>
                  </div>

                  <Field label="Número de parcelas" required>
                    <select
                      value={installments}
                      onChange={(e) => setInstallments(Number(e.target.value))}
                      className="h-11 w-full rounded-md border border-brand-border bg-white px-3 text-sm text-brand-navy outline-none transition-colors focus:border-brand-navy"
                    >
                      {installmentOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <hr className="border-brand-border" />

                  {/* Titular diferente */}
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={cardHolderDiffers}
                      onChange={(e) => setCardHolderDiffers(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-brand-orange"
                    />
                    <span className="text-sm text-brand-navy">
                      O nome impresso no cartão é diferente de{' '}
                      <strong>{form.name || 'seu nome'}</strong>
                    </span>
                  </label>

                  {cardHolderDiffers && (
                    <div className="flex flex-col gap-4 rounded-lg border border-brand-border bg-neutral-50 p-4">
                      <h3 className="text-label font-semibold text-brand-navy">Dados do titular do cartão</h3>
                      <Field label="Nome no cartão" error={errors.holderName} required>
                        <input
                          type="text"
                          value={cardHolder.name}
                          onChange={(e) => setCardHolder((h) => ({ ...h, name: e.target.value }))}
                          placeholder="Nome impresso no cartão"
                          className={inputCls(errors.holderName)}
                        />
                      </Field>
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="CPF/CNPJ do titular" error={errors.holderCpfCnpj} required>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={cardHolder.cpfCnpj}
                            onChange={(e) =>
                              setCardHolder((h) => ({ ...h, cpfCnpj: e.target.value.replace(/\D/g, '').slice(0, 14) }))
                            }
                            placeholder="000.000.000-00"
                            className={inputCls(errors.holderCpfCnpj)}
                          />
                        </Field>
                        <Field label="Celular do titular" error={errors.holderPhone} required>
                          <input
                            type="tel"
                            inputMode="numeric"
                            value={cardHolder.phone}
                            onChange={(e) =>
                              setCardHolder((h) => ({ ...h, phone: formatPhone(e.target.value) }))
                            }
                            placeholder="(11) 99999-9999"
                            className={inputCls(errors.holderPhone)}
                          />
                        </Field>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Endereço */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-subtitle text-brand-navy">Endereço do titular</h2>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="CEP" error={errors.cep} required>
                      <div className="relative">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={address.cep}
                          onChange={(e) => handleCepChange(e.target.value)}
                          placeholder="00000-000"
                          maxLength={9}
                          className={inputCls(errors.cep)}
                        />
                        {cepLoading && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-border border-t-brand-navy" />
                          </div>
                        )}
                      </div>
                    </Field>

                    <Field label="Número" error={errors.number} required>
                      <input
                        type="text"
                        value={address.number}
                        onChange={(e) => setAddress((a) => ({ ...a, number: e.target.value }))}
                        placeholder="123"
                        className={inputCls(errors.number)}
                      />
                    </Field>
                  </div>

                  <Field label="Endereço (Rua / Av.)" error={errors.street} required>
                    <input
                      type="text"
                      value={address.street}
                      onChange={(e) => setAddress((a) => ({ ...a, street: e.target.value }))}
                      placeholder="Rua das Flores"
                      className={inputCls(errors.street)}
                    />
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Bairro" error={errors.neighborhood} required>
                      <input
                        type="text"
                        value={address.neighborhood}
                        onChange={(e) => setAddress((a) => ({ ...a, neighborhood: e.target.value }))}
                        placeholder="Centro"
                        className={inputCls(errors.neighborhood)}
                      />
                    </Field>

                    <Field label="Complemento">
                      <input
                        type="text"
                        value={address.complement}
                        onChange={(e) => setAddress((a) => ({ ...a, complement: e.target.value }))}
                        placeholder="Bloco A, Apto 42"
                        className={inputCls()}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <Field label="Cidade" error={errors.city} required>
                        <input
                          type="text"
                          value={address.city}
                          onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
                          placeholder="São Paulo"
                          className={inputCls(errors.city)}
                        />
                      </Field>
                    </div>

                    <Field label="UF" error={errors.state} required>
                      <input
                        type="text"
                        value={address.state}
                        onChange={(e) =>
                          setAddress((a) => ({
                            ...a,
                            state: e.target.value.toUpperCase().slice(0, 2),
                          }))
                        }
                        placeholder="SP"
                        maxLength={2}
                        className={inputCls(errors.state)}
                      />
                    </Field>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={goBack} className="btn-secondary flex-1">
                  Voltar
                </button>
                <button type="button" onClick={goNext} className="btn-secondary flex-1">
                  Avançar
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3 (Cartão): Resumo + Termos ─────────────────────── */}
          {step === 3 && (
            <div className="flex flex-col gap-4">
              {/* Resumo do pedido */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-subtitle text-brand-navy">Resumo do pedido</h2>
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm text-foreground-alt">{product.label}</span>
                    <span className="font-dm text-subtitle text-brand-navy">{product.price}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground-alt">Taxas e encargos</span>
                    <span className="text-sm text-foreground-alt">
                      {installments > 1
                        ? `R$ ${formatCurrency(
                            totalWithInstallmentFee(product.priceInCents, installments) -
                              product.priceInCents
                          )}`
                        : 'R$ 0,00'}
                    </span>
                  </div>

                  <div className="border-t border-brand-border pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-brand-navy">Total</span>
                      <span className="font-dm text-h3 text-brand-navy">
                        R$ {formatCurrency(totalCents)}
                      </span>
                    </div>
                    <p className="mt-1 text-txt-xs text-foreground-alt">
                      {installments === 1
                        ? '1× no cartão de crédito'
                        : `${installments}× de R$ ${formatCurrency(
                            installmentValueCents(product.priceInCents, installments)
                          )} no cartão`}
                    </p>
                  </div>

                  <div className="border-t border-brand-border pt-3 text-sm">
                    <p className="text-foreground-alt">
                      <span className="font-medium text-brand-navy">Titular:</span>{' '}
                      {cardHolderDiffers && cardHolder.name ? cardHolder.name : form.name}
                    </p>
                    <p className="mt-0.5 text-foreground-alt">
                      <span className="font-medium text-brand-navy">{product.documentLabel}:</span>{' '}
                      {form.document}
                    </p>
                  </div>
                </div>
              </div>

              {/* Termos */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <TermsBlock
                  values={cardTerms}
                  onChange={(i, checked) =>
                    setCardTerms((t) => t.map((v, idx) => (idx === i ? checked : v)))
                  }
                />
              </div>

              {serverError && (
                <p className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  {serverError}
                </p>
              )}

              <div className="flex gap-3">
                <button type="button" onClick={goBack} className="btn-secondary flex-1">
                  Voltar
                </button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="flex-1">
                      <button
                        type="button"
                        onClick={allCardTerms ? handleSubmit : undefined}
                        disabled={loading || !allCardTerms}
                        className="btn-primary w-full disabled:opacity-50"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                            Processando...
                          </span>
                        ) : (
                          'PAGAR AGORA'
                        )}
                      </button>
                    </span>
                  </TooltipTrigger>
                  {!allCardTerms && (
                    <TooltipContent>
                      Para prosseguir é preciso aceitar e concordar com todos os termos acima.
                    </TooltipContent>
                  )}
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}

// ── PaymentMethodSelector (extracted to avoid repetition) ────────────────────

function PaymentMethodSelector({
  method,
  onChange,
}: {
  method: PaymentMethod
  onChange: (m: PaymentMethod) => void
}) {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => onChange('PIX')}
        className={`flex flex-1 items-center gap-3 rounded-lg border-2 p-4 transition-colors ${
          method === 'PIX'
            ? 'border-brand-orange bg-[#fff4f0]'
            : 'border-brand-border hover:border-neutral-400'
        }`}
      >
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
            method === 'PIX' ? 'bg-brand-orange' : 'bg-neutral-200'
          }`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className={method === 'PIX' ? 'text-white' : 'text-foreground-alt'}
          >
            <path
              d="M9.5 2C9.5 2 7 2 5.5 3.5C4 5 4 7.5 4 7.5V9M9.5 22C9.5 22 7 22 5.5 20.5C4 19 4 16.5 4 16.5V15M14.5 2C14.5 2 17 2 18.5 3.5C20 5 20 7.5 20 7.5V9M14.5 22C14.5 22 17 22 18.5 20.5C20 19 20 16.5 20 16.5V15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="7" y="10" width="10" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-brand-navy">PIX</p>
          <p className="text-txt-xs text-foreground-alt">Aprovação em segundos</p>
        </div>
        <div
          className={`h-5 w-5 shrink-0 rounded-full border-2 ${
            method === 'PIX' ? 'border-brand-orange bg-brand-orange' : 'border-brand-border'
          }`}
        />
      </button>

      <button
        type="button"
        onClick={() => onChange('CREDIT_CARD')}
        className={`flex flex-1 items-center gap-3 rounded-lg border-2 p-4 transition-colors ${
          method === 'CREDIT_CARD'
            ? 'border-brand-orange bg-[#fff4f0]'
            : 'border-brand-border hover:border-neutral-400'
        }`}
      >
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
            method === 'CREDIT_CARD' ? 'bg-brand-orange' : 'bg-neutral-200'
          }`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className={method === 'CREDIT_CARD' ? 'text-white' : 'text-foreground-alt'}
          >
            <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2 10h20" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-brand-navy">Cartão de crédito</p>
          <p className="text-txt-xs text-foreground-alt">Até 3× com encargos</p>
        </div>
        <div
          className={`h-5 w-5 shrink-0 rounded-full border-2 ${
            method === 'CREDIT_CARD'
              ? 'border-brand-orange bg-brand-orange'
              : 'border-brand-border'
          }`}
        />
      </button>
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
