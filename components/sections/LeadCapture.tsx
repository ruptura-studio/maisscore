'use client'

import { useState, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

const BIROS = ['Serasa', 'Boa Vista', 'SPC', 'Cartório de Protesto', 'Não tenho certeza'] as const

function maskCpf(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 3) return d
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`
}

function maskPhone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  // 11 dígitos = celular (9 dígitos após DDD): (xx) xxxxx-xxxx
  // 10 dígitos = fixo (8 dígitos após DDD):   (xx) xxxx-xxxx
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
}

function maskCnpj(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 14)
  if (d.length <= 2) return d
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`
}
type Biro = (typeof BIROS)[number]

// — Validações —
function validateCpf(cpf: string) {
  const d = cpf.replace(/\D/g, '')
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false
  let sum = 0
  for (let i = 0; i < 9; i++) sum += +d[i] * (10 - i)
  let r = (sum * 10) % 11
  if (r >= 10) r = 0
  if (r !== +d[9]) return false
  sum = 0
  for (let i = 0; i < 10; i++) sum += +d[i] * (11 - i)
  r = (sum * 10) % 11
  if (r >= 10) r = 0
  return r === +d[10]
}

function validateCnpj(cnpj: string) {
  const d = cnpj.replace(/\D/g, '')
  if (d.length !== 14 || /^(\d)\1{13}$/.test(d)) return false
  const calc = (s: string, len: number) => {
    let sum = 0, pos = len - 7
    for (let i = len; i >= 1; i--) {
      sum += +s[len - i] * pos--
      if (pos < 2) pos = 9
    }
    const r = sum % 11
    return r < 2 ? 0 : 11 - r
  }
  return calc(d, 12) === +d[12] && calc(d, 13) === +d[13]
}

const inputBase = 'w-full bg-white border rounded-lg px-3 py-[7.5px] text-para-sm text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2'
const inputClass = `${inputBase} border-border focus:ring-accent-dark/30`
const inputErrorClass = `${inputBase} border-red-500 focus:ring-red-500/30`

function useNumericField() {
  const [hint, setHint] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.ctrlKey || e.metaKey || e.altKey) return
    if (!/^\d$/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'].includes(e.key)) {
      e.preventDefault()
      setHint(true)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setHint(false), 2500)
    }
  }

  return { onKeyDown, hint }
}
const labelClass = 'text-para-sm font-medium text-foreground'
const fieldClass = 'flex flex-col gap-1'

export function LeadCapture() {
  const [form, setForm] = useState({
    documento: 'cpf',
    nome: '',
    cpf: '',
    whatsapp: '',
    email: '',
    objetivo: '',
    biros: [] as Biro[],
    termos: false,
  })

  const isCnpj = form.documento === 'cnpj'
  const docField = useNumericField()
  const phoneField = useNumericField()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function validateField(name: string, value: string): string {
    switch (name) {
      case 'nome':
        return value.trim().split(/\s+/).filter(Boolean).length < 2
          ? 'Informe seu nome completo.'
          : ''
      case 'cpf':
        if (isCnpj) return !validateCnpj(value) ? 'CNPJ inválido.' : ''
        return !validateCpf(value) ? 'CPF inválido.' : ''
      case 'whatsapp': {
        const d = value.replace(/\D/g, '')
        return d.length !== 10 && d.length !== 11 ? 'Número de telefone incompleto.' : ''
      }
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ? 'E-mail inválido.' : ''
      default:
        return ''
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target
    if (!value) return
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    const masked =
      name === 'cpf'
        ? (isCnpj ? maskCnpj(value) : maskCpf(value))
        : name === 'whatsapp'
        ? maskPhone(value)
        : name === 'email'
        ? value.toLowerCase()
        : type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value

    setForm((prev) => ({
      ...prev,
      [name]: masked,
      ...(name === 'documento' ? { cpf: '' } : {}),
    }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  function toggleBiro(biro: Biro) {
    setForm((prev) => ({
      ...prev,
      biros: prev.biros.includes(biro)
        ? prev.biros.filter((b) => b !== biro)
        : [...prev.biros, biro],
    }))
  }

  const isFormValid =
    form.nome.trim().split(/\s+/).filter(Boolean).length >= 2 &&
    (isCnpj ? validateCnpj(form.cpf) : validateCpf(form.cpf)) &&
    [10, 11].includes(form.whatsapp.replace(/\D/g, '').length) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email) &&
    form.objetivo !== '' &&
    form.biros.length > 0 &&
    form.termos

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const fields = ['nome', 'cpf', 'whatsapp', 'email'] as const
    const newErrors: Record<string, string> = {}
    fields.forEach((f) => {
      const err = validateField(f, form[f])
      if (err) newErrors[f] = err
    })
    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return
    }

    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.nome,
          phone: form.whatsapp.replace(/\D/g, ''),
          email: form.email,
          channel: 'site',
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        setSubmitError(json.error ?? 'Erro ao enviar. Tente novamente.')
      } else {
        setSubmitted(true)
      }
    } catch {
      setSubmitError('Sem conexão. Verifique sua internet e tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="w-full py-24 bg-secondary">
      <div className="container-ms">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — texto */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-caption text-foreground uppercase tracking-[1.5px]">Material gratuito</span>
              <h2 className="text-[32px] md:text-[40px] font-semibold leading-tight tracking-[-1.5px] text-foreground">
                Baixe nosso Super Guia +Score
              </h2>
              <p className="text-[18px] font-semibold text-foreground">
                Preencha o formulário e receba o Super Guia em seu e-mail
              </p>
              <p className="text-para-sm text-foreground">Não se preocupe, não vamos enviar spam.</p>
            </div>

            <p className="text-para-sm text-foreground leading-relaxed">
              O Super Guia +Score é o material mais completo que já produzimos. Nele, você vai
              entender como o sistema de crédito brasileiro funciona, quais são os seus direitos
              como consumidor e o que realmente pode ser feito para recuperar seu nome — sem
              promessas vazias.
            </p>
            <p className="text-para-sm text-foreground leading-relaxed">
              Dentro do guia, explicamos em linguagem simples os artigos do Código de Defesa do
              Consumidor que protegem você, como funciona o prazo de prescrição de dívidas, e quais
              estratégias você pode adotar hoje mesmo para começar a melhorar seu score,
              independentemente de contratar qualquer serviço.
            </p>
            <p className="text-para-sm text-foreground leading-relaxed">
              Este material é 100% gratuito e sem compromisso. Acreditamos que informação de
              qualidade é o primeiro passo para a liberdade financeira. Se depois de ler você quiser
              nossa ajuda profissional, estaremos aqui.
            </p>
          </div>

          {/* Right — form */}
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-lg p-6 flex flex-col gap-6"
          >
            {/* Qual documento */}
            <div className={fieldClass}>
              <label className={labelClass}>Qual documento você precisa limpar? *</label>
              <div className="relative">
                <select
                  name="documento"
                  value={form.documento}
                  onChange={handleChange}
                  className={inputClass + ' appearance-none pr-8'}
                  required
                >
                  <option value="cpf">CPF</option>
                  <option value="cnpj">CNPJ</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Nome + CPF */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className={fieldClass}>
                <label className={labelClass}>Nome Completo *</label>
                <input
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ex. Maria da Silva"
                  className={errors.nome ? inputErrorClass : inputClass}
                  required
                />
                {errors.nome && <span className="text-para-xs text-red-500">{errors.nome}</span>}
              </div>
              <div className={fieldClass}>
                <label className={labelClass}>{isCnpj ? 'CNPJ' : 'CPF'} *</label>
                <input
                  name="cpf"
                  value={form.cpf}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={docField.onKeyDown}
                  inputMode="numeric"
                  placeholder={isCnpj ? '00.000.000/0001-00' : '000.000.000-00'}
                  className={errors.cpf ? inputErrorClass : inputClass}
                  required
                />
                {docField.hint && !errors.cpf && (
                  <span className="text-para-xs text-amber-600">Digite apenas números.</span>
                )}
                {errors.cpf && <span className="text-para-xs text-red-500">{errors.cpf}</span>}
              </div>
            </div>

            {/* WhatsApp + E-Mail */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className={fieldClass}>
                <label className={labelClass}>WhatsApp *</label>
                <input
                  name="whatsapp"
                  value={form.whatsapp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={phoneField.onKeyDown}
                  inputMode="numeric"
                  placeholder="(00) 00000-0000"
                  className={errors.whatsapp ? inputErrorClass : inputClass}
                  required
                />
                {phoneField.hint && !errors.whatsapp && (
                  <span className="text-para-xs text-amber-600">Digite apenas números.</span>
                )}
                {errors.whatsapp && <span className="text-para-xs text-red-500">{errors.whatsapp}</span>}
              </div>
              <div className={fieldClass}>
                <label className={labelClass}>E-Mail *</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="seu@email.com"
                  className={errors.email ? inputErrorClass : inputClass}
                  required
                />
                {errors.email && <span className="text-para-xs text-red-500">{errors.email}</span>}
              </div>
            </div>

            <div className="w-full h-px bg-border" />

            {/* Objetivo */}
            <div className={fieldClass}>
              <label className={labelClass}>O que espera conseguir com o Limpa Nome? *</label>
              <div className="relative">
                <select
                  name="objetivo"
                  value={form.objetivo}
                  onChange={handleChange}
                  className={inputClass + ' appearance-none pr-8'}
                  required
                >
                  <option value="" disabled>Selecione uma resposta</option>
                  <option value="financiamento_imovel">Financiar imóvel</option>
                  <option value="financiamento_veiculo">Financiar veículo</option>
                  <option value="cartao_credito">Cartão de crédito</option>
                  <option value="emprestimo">Empréstimo</option>
                  <option value="outro">Outro</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Birôs */}
            <div className={fieldClass}>
              <label className={labelClass}>Marque as opções onde seu nome está negativado *</label>
              <div className="flex flex-col gap-1 mt-1">
                {BIROS.map((biro) => (
                  <label key={biro} className="flex items-center gap-2 cursor-pointer h-6">
                    <input
                      type="checkbox"
                      checked={form.biros.includes(biro)}
                      onChange={() => toggleBiro(biro)}
                      className="shrink-0 accent-accent-dark size-4"
                    />
                    <span className="text-para-sm text-foreground">{biro}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-border" />

            {/* Termos + Botão */}
            <div className="flex flex-col gap-6 items-center">
              <label className="flex items-start gap-2 cursor-pointer w-full">
                <input
                  type="checkbox"
                  name="termos"
                  checked={form.termos}
                  onChange={handleChange}
                  className="mt-0.5 shrink-0 accent-accent-dark size-4"
                  required
                />
                <span className="text-para-sm text-foreground leading-5">
                  Concordo com a{' '}
                  <a href="#" className="text-accent-dark underline">Política de Privacidade</a>
                  {' '}e autorizo o uso dos meus dados para contato e análise do meu caso, conforme a LGPD.
                </span>
              </label>

              {submitError && (
                <p className="text-para-xs text-red-500 text-center w-full">{submitError}</p>
              )}

              {submitted ? (
                <div className="w-full rounded-lg bg-green-50 border border-green-200 px-6 py-4 text-center flex flex-col gap-1">
                  <p className="text-para-sm font-semibold text-green-800">Guia enviado com sucesso!</p>
                  <p className="text-para-xs text-green-700">Verifique seu e-mail em breve.</p>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={!isFormValid || submitting}
                  className="w-full bg-accent-dark text-white font-medium text-para-md py-3 px-8 rounded-lg transition-colors hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-accent-dark"
                >
                  {submitting ? 'Enviando…' : 'Receber meu Super Guia'}
                </button>
              )}
            </div>

            <div className="w-full h-px bg-border" />

            <p className="text-para-xs text-foreground text-center">
              🔒 Seus dados estão protegidos com criptografia SSL
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
