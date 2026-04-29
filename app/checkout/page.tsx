'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { totalWithInstallmentFee, installmentValueCents } from '@/lib/installment-fees'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ButtonGroup } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'
import { Shield, Info, User, Building2 } from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────

type Product = 'cpf' | 'cnpj'
type PaymentMethod = 'PIX' | 'CREDIT_CARD'

// ── Constants ──────────────────────────────────────────────────────────────

const PRODUCTS = {
  cpf: {
    slug: 'limpa-nome-cpf' as const,
    label: 'Limpar CPF',
    icon: User,
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
    icon: Building2,
    price: 'R$ 697,00',
    priceInCents: 69700,
    maxInstallments: 3,
    documentType: 'CNPJ' as const,
    documentLabel: 'CNPJ',
    documentPlaceholder: '00.000.000/0000-00',
    documentMaxLength: 18,
  },
}

const TERMOS_SECTIONS = [
  { title: '1. Aceitação dos Termos', content: `Ao acessar o site <strong>maisscore.com.br</strong> ou contratar qualquer serviço da <strong>Mais Score</strong> (marca da Ruptura Comércio Digital Ltda., CNPJ 64.945.712/0001-66), você declara ter lido, compreendido e concordado com estes Termos de Uso. Caso não concorde com alguma disposição, pedimos que não utilize nossos serviços.` },
  { title: '2. Descrição do Serviço', content: `A Mais Score oferece serviços de <strong>regularização de CPF e melhoria de score de crédito</strong> por meio de processo jurídico próprio, que inclui:\n    <ul>\n      <li>Análise da situação cadastral junto aos órgãos de proteção ao crédito (Serasa, SPC e similares).</li>\n      <li>Identificação de restrições indevidas ou passíveis de contestação.</li>\n      <li>Condução do processo de exclusão ou regularização dessas restrições.</li>\n      <li>Acompanhamento e comunicação sobre o andamento do processo.</li>\n    </ul>\n    <strong>Não somos uma empresa de negociação ou quitação de dívidas.</strong> Nosso serviço atua exclusivamente na via jurídica para remoção de restrições ilegais ou irregulares.` },
  { title: '3. Elegibilidade', content: `Para contratar nossos serviços, o usuário deve:\n    <ul>\n      <li>Ser pessoa física brasileira, maior de 18 anos ou emancipada legalmente.</li>\n      <li>Possuir CPF válido e ativo perante a Receita Federal.</li>\n      <li>Fornecer informações verdadeiras, completas e atualizadas no momento do cadastro.</li>\n    </ul>\n    A Mais Score reserva-se o direito de recusar a prestação de serviços caso as condições acima não sejam atendidas.` },
  { title: '4. Cadastro e Responsabilidades do Usuário', content: `O usuário é responsável por:\n    <ul>\n      <li>Fornecer dados verdadeiros e manter suas informações atualizadas.</li>\n      <li>Guardar sigilo de quaisquer credenciais de acesso eventualmente criadas.</li>\n      <li>Não utilizar o serviço para fins ilícitos, fraudulentos ou lesivos a terceiros.</li>\n      <li>Comunicar imediatamente a Mais Score caso identifique uso não autorizado de seus dados.</li>\n    </ul>\n    A Mais Score não se responsabiliza por danos decorrentes de informações incorretas fornecidas pelo usuário.` },
  { title: '5. Contratação e Pagamento', content: `O serviço é contratado mediante:\n    <ul>\n      <li>Aceite eletrônico destes Termos de Uso e da Política de Privacidade.</li>\n      <li>Pagamento do valor acordado, conforme plano escolhido, via cartão de crédito, PIX ou boleto.</li>\n    </ul>\n    O pagamento é processado por gateways certificados e seguros. Após a confirmação do pagamento, o processo de análise e regularização será iniciado em até <strong>2 dias úteis</strong>.` },
  { title: '6. Prazo e Entrega', content: `O prazo estimado para a regularização é de <strong>até 30 dias úteis</strong> a partir do início do processo, podendo variar conforme a complexidade do caso e os prazos legais dos órgãos competentes. A Mais Score manterá o cliente informado sobre o andamento via WhatsApp e e-mail.` },
  { title: '7. Taxa de Sucesso e Garantias', content: `A Mais Score possui taxa histórica de sucesso de <strong>97%</strong>. Nos casos em que não seja possível obter a regularização, o cliente será comunicado com a devida justificativa. As condições de reembolso, quando aplicáveis, estão descritas na Política de Reembolso.` },
  { title: '8. Propriedade Intelectual', content: `Todo o conteúdo disponível no site maisscore.com.br — incluindo textos, imagens, logotipos, layout e código-fonte — é de propriedade exclusiva da Ruptura Comércio Digital Ltda. e está protegido pela legislação brasileira de direitos autorais.` },
  { title: '9. Limitação de Responsabilidade', content: `A Mais Score não se responsabiliza por:\n    <ul>\n      <li>Resultados adversos decorrentes de informações incorretas fornecidas pelo cliente.</li>\n      <li>Atrasos causados por demoras nos sistemas dos órgãos de proteção ao crédito.</li>\n      <li>Danos indiretos, lucros cessantes ou perdas consequenciais de qualquer natureza.</li>\n    </ul>` },
  { title: '10. Rescisão e Cancelamento', content: `O usuário pode solicitar o cancelamento do serviço a qualquer momento pelo WhatsApp (15) 99237-7755 ou pelo e-mail contato@maisscore.com.br. O direito de arrependimento, conforme o Código de Defesa do Consumidor (Art. 49), pode ser exercido em até <strong>7 dias úteis</strong> após a contratação, com reembolso integral.` },
  { title: '11. Alterações nos Termos', content: `A Mais Score pode atualizar estes Termos a qualquer momento. Alterações relevantes serão comunicadas por e-mail ou por aviso no site.` },
  { title: '12. Lei Aplicável e Foro', content: `Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da Comarca de Itapetininga-SP para dirimir quaisquer controvérsias.` },
  { title: '13. Contato', content: `<ul><li><strong>E-mail:</strong> contato@maisscore.com.br</li><li><strong>WhatsApp:</strong> (15) 99237-7755</li></ul>` },
]

const PRIVACIDADE_SECTIONS = [
  { title: '1. Quem somos', content: `A <strong>Mais Score</strong> é uma marca da <strong>Ruptura Comércio Digital Ltda.</strong>, inscrita no CNPJ 64.945.712/0001-66.` },
  { title: '2. Dados que coletamos', content: `Coletamos apenas os dados necessários para a prestação dos nossos serviços:\n    <ul>\n      <li><strong>Dados de identificação:</strong> nome completo, CPF, data de nascimento e e-mail.</li>\n      <li><strong>Dados de contato:</strong> número de telefone (WhatsApp) e endereço.</li>\n      <li><strong>Dados de navegação:</strong> endereço IP, tipo de navegador, páginas visitadas e tempo de sessão.</li>\n      <li><strong>Dados de pagamento:</strong> processados por gateways certificados (Asaas); não armazenamos dados de cartão em nossos servidores.</li>\n    </ul>` },
  { title: '3. Como usamos seus dados', content: `Utilizamos seus dados para:\n    <ul>\n      <li>Prestar o serviço de regularização de CPF e score de crédito contratado.</li>\n      <li>Comunicar atualizações sobre o andamento do seu processo via WhatsApp e e-mail.</li>\n      <li>Processar pagamentos e emitir documentos fiscais.</li>\n      <li>Cumprir obrigações legais e regulatórias.</li>\n    </ul>` },
  { title: '4. Base legal para o tratamento', content: `Tratamos seus dados com base nas hipóteses legais previstas na <strong>LGPD (Lei 13.709/2018)</strong>: execução de contrato, cumprimento de obrigação legal, legítimo interesse e consentimento.` },
  { title: '5. Compartilhamento de dados', content: `Não vendemos seus dados. Podemos compartilhá-los somente com parceiros operacionais, autoridades públicas quando exigido por lei, e assessores jurídicos necessários ao processo.` },
  { title: '6. Cookies e rastreamento', content: `Utilizamos cookies essenciais, analíticos (Google Analytics) e de marketing (Meta Pixel, ativados somente com consentimento).` },
  { title: '7. Por quanto tempo guardamos seus dados', content: `Retemos seus dados pelo tempo necessário para cumprir a finalidade para a qual foram coletados e atender obrigações legais (mínimo 5 anos para documentos fiscais).` },
  { title: '8. Seus direitos como titular', content: `Conforme a LGPD, você tem direito a acesso, correção, exclusão, portabilidade, revogação do consentimento e oposição. Para exercer seus direitos: <strong>privacidade@maisscore.com.br</strong>. Respondemos em até 15 dias úteis.` },
  { title: '9. Segurança dos dados', content: `Adotamos criptografia em trânsito (TLS), controle de acesso por perfil e monitoramento contínuo de incidentes.` },
  { title: '10. Alterações nesta Política', content: `Podemos atualizar esta Política periodicamente, com notificação por e-mail ou aviso no site.` },
  { title: '11. Contato e Encarregado (DPO)', content: `<ul><li><strong>E-mail:</strong> privacidade@maisscore.com.br</li><li><strong>WhatsApp:</strong> (15) 99237-7755</li></ul>` },
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

// ── Terms checkbox + modals ───────────────────────────────────────────────────

function LegalModal({ open, onClose, title, sections }: {
  open: boolean
  onClose: () => void
  title: string
  sections: { title: string; content: string }[]
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-dm text-h3 text-brand-navy">{title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 pt-2">
          {sections.map((s) => (
            <div key={s.title} className="border-t border-brand-border pt-4">
              <h3 className="mb-2 font-dm text-xs font-semibold uppercase tracking-wide text-brand-navy/60">{s.title}</h3>
              <div
                className="text-sm text-brand-navy/70 leading-relaxed prose-section"
                dangerouslySetInnerHTML={{ __html: s.content }}
              />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function TermsBlock({
  value,
  onChange,
}: {
  value: boolean
  onChange: (checked: boolean) => void
}) {
  const [openModal, setOpenModal] = useState<'termos' | 'privacidade' | null>(null)
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-brand-orange"
        />
        <span className="text-sm text-brand-navy">
          Declaro que li e concordo com os{' '}
          <button
            type="button"
            onClick={() => setOpenModal('termos')}
            className="text-brand-orange underline hover:opacity-80"
          >
            Termos e condições
          </button>{' '}
          do serviço e{' '}
          <button
            type="button"
            onClick={() => setOpenModal('privacidade')}
            className="text-brand-orange underline hover:opacity-80"
          >
            Política de privacidade
          </button>
          .
        </span>
      </label>

      <LegalModal
        open={openModal === 'termos'}
        onClose={() => setOpenModal(null)}
        title="Termos e Condições"
        sections={TERMOS_SECTIONS}
      />
      <LegalModal
        open={openModal === 'privacidade'}
        onClose={() => setOpenModal(null)}
        title="Política de Privacidade"
        sections={PRIVACIDADE_SECTIONS}
      />
    </div>
  )
}

// ── CheckoutContent ──────────────────────────────────────────────────────────

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialProduct = searchParams.get('produto') as Product | null
  const initialPhone = searchParams.get('phone') ?? ''
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    initialProduct === 'cnpj' ? 'cnpj' : initialProduct === 'cpf' ? 'cpf' : null
  )
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('PIX')
  const [installments, setInstallments] = useState(1)

  const [form, setForm] = useState({ name: '', email: '', phone: initialPhone, document: '', companyName: '' })
  const [address, setAddress] = useState({
    cep: '',
    number: '',
    complement: '',
  })
  const [card, setCard] = useState({ number: '', month: '', year: '', cvv: '' })
  const [cardHolderDiffers, setCardHolderDiffers] = useState(false)
  const [cardHolder, setCardHolder] = useState({ name: '', cpfCnpj: '', phone: '' })
  const [pixTerm, setPixTerm] = useState(false)
  const [cardTerm, setCardTerm] = useState(false)
  const [addressInfo, setAddressInfo] = useState<{ logradouro: string; bairro: string; localidade: string; uf: string } | null>(null)
  const [clientIp, setClientIp] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showValidationAlert, setShowValidationAlert] = useState(false)
  const [dbPrices, setDbPrices] = useState<Record<string, number>>({})

  const product = selectedProduct ? PRODUCTS[selectedProduct] : null
  const productPrice = selectedProduct
    ? (dbPrices[PRODUCTS[selectedProduct].slug] ?? PRODUCTS[selectedProduct].priceInCents)
    : 0
  const installmentOptions = product ? getInstallmentOptions(productPrice, product.maxInstallments) : []
  const stepLabels =
    paymentMethod === 'PIX' ? ['Cadastro', 'Confirmação'] : ['Cadastro', 'Pagamento', 'Confirmação']

  // Carrega preços do banco de dados
  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          const map: Record<string, number> = {}
          for (const p of d.data) map[p.slug] = p.price
          setDbPrices(map)
        }
      })
      .catch(() => {})
  }, [])

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
              documentType: product?.documentType,
              product: product?.slug,
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

  // CEP change handler
  function handleCepChange(value: string) {
    const formatted = formatCep(value)
    setAddress((a) => ({ ...a, cep: formatted }))
    const digits = formatted.replace(/\D/g, '')
    if (digits.length === 8) {
      fetch(`https://viacep.com.br/ws/${digits}/json/`)
        .then((r) => r.json())
        .then((d) => {
          if (!d.erro) setAddressInfo({ logradouro: d.logradouro, bairro: d.bairro, localidade: d.localidade, uf: d.uf })
          else setAddressInfo(null)
        })
        .catch(() => setAddressInfo(null))
    } else {
      setAddressInfo(null)
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
    if (docDigits.length !== expectedLen) e.document = `${product?.documentLabel} inválido`
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
      if (!canAdvanceStep1) { setShowValidationAlert(true); return }
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
          documentType: product?.documentType,
          razaoSocial: form.companyName.trim() || undefined,
          productSlug: product?.slug,
        }),
      }).catch(() => {})
      setStep(2)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (step === 2 && paymentMethod === 'CREDIT_CARD') {
      if (!canAdvanceStep2Card) { setShowValidationAlert(true); return }
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
          productSlug: product?.slug,
          addressStreet: addressInfo?.logradouro || undefined,
          addressNeighborhood: addressInfo?.bairro || undefined,
          addressCity: addressInfo?.localidade || undefined,
          addressState: addressInfo?.uf || undefined,
          addressZip: address.cep.replace(/\D/g, '') || undefined,
          addressNumber: address.number.trim() || undefined,
          addressComplement: address.complement.trim() || undefined,
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
          documentType: product?.documentType,
          razaoSocial: form.companyName.trim() || undefined,
          addressStreet: addressInfo?.logradouro || undefined,
          addressNeighborhood: addressInfo?.bairro || undefined,
          addressCity: addressInfo?.localidade || undefined,
          addressState: addressInfo?.uf || undefined,
          addressZip: address.cep.replace(/\D/g, '') || undefined,
          addressNumber: address.number.trim() || undefined,
          addressComplement: address.complement.trim() || undefined,
          productSlug: product?.slug,
          paymentMethod,
          installments: paymentMethod === 'CREDIT_CARD' ? installments : 1,
          remoteIp: clientIp || undefined,
          ...(paymentMethod === 'CREDIT_CARD'
            ? {
                postalCode: address.cep.replace(/\D/g, ''),
                addressNumber: address.number.trim(),
                complement: address.complement.trim() || undefined,
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

  const totalCents = product
    ? paymentMethod === 'CREDIT_CARD' && installments > 1
      ? totalWithInstallmentFee(productPrice, installments)
      : productPrice
    : 0

  const allPixTerms = pixTerm
  const allCardTerms = cardTerm

  const canAdvanceStep1 =
    !!selectedProduct &&
    form.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.phone.replace(/\D/g, '').length >= 10 &&
    form.document.replace(/\D/g, '').length === (selectedProduct === 'cpf' ? 11 : 14) &&
    (selectedProduct !== 'cnpj' || form.companyName.trim().length > 0)

  const canAdvanceStep2Card =
    card.number.replace(/\s/g, '').length === 16 &&
    !!card.month &&
    !!card.year &&
    card.cvv.length === 3 &&
    address.cep.replace(/\D/g, '').length === 8 &&
    address.number.trim().length > 0 &&
    (!cardHolderDiffers || (
      cardHolder.name.trim().length >= 2 &&
      (cardHolder.cpfCnpj.replace(/\D/g, '').length === 11 || cardHolder.cpfCnpj.replace(/\D/g, '').length === 14) &&
      cardHolder.phone.replace(/\D/g, '').length >= 10
    ))

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
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-navy/60">Selecione o serviço</h2>
                <ButtonGroup variant="spaced" className="w-full">
                  {(Object.entries(PRODUCTS) as [Product, typeof PRODUCTS.cpf][]).map(([key, p]) => {
                    const Icon = p.icon
                    const isSelected = selectedProduct === key
                    return (
                      <Button
                        key={key}
                        type="button"
                        variant="outline"
                        onClick={() => setSelectedProduct(key)}
                        className={`flex flex-1 items-center justify-start gap-3 px-3 py-2.5 h-auto bg-white hover:bg-[#fff4f0] hover:border-brand-orange/40 ${
                          isSelected ? 'bg-[#fff4f0] border-brand-orange text-brand-navy' : ''
                        }`}
                      >
                        <Icon size={16} className={`shrink-0 ${isSelected ? 'text-brand-orange' : 'text-brand-navy/50'}`} />
                        <div className="flex flex-col items-start">
                          <span className={`text-xs font-semibold leading-tight ${isSelected ? 'text-brand-orange' : ''}`}>{p.label}</span>
                          <span className={`text-xs ${isSelected ? 'text-brand-orange/80' : 'text-brand-navy/60'}`}>
                            {dbPrices[p.slug] != null ? `R$ ${formatCurrency(dbPrices[p.slug]!)}` : p.price}
                          </span>
                        </div>
                      </Button>
                    )
                  })}
                </ButtonGroup>
              </div>

              {/* Dados pessoais */}
              {selectedProduct && <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-navy/60">Seus dados</h2>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button type="button" className="text-brand-navy/50 hover:text-brand-navy transition-colors">
                        <Info size={16} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="max-w-xs text-sm text-brand-navy">
                      Os dados cadastrados no formulário abaixo, serão utilizados para dar entrada no processo jurídico. É importante que você preencha corretamente para não invalidar o processo.
                    </PopoverContent>
                  </Popover>
                </div>
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

                    <Field label={product?.documentLabel ?? 'Documento'} error={errors.document} required>
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
                        placeholder={product?.documentPlaceholder ?? '000.000.000-00'}
                        maxLength={product?.documentMaxLength ?? 14}
                        className={inputCls(errors.document)}
                      />
                    </Field>
                  </div>
                </div>
              </div>}

              <button
                type="button"
                onClick={goNext}
                className="btn-secondary w-full !rounded-md h-11"
              >
                Avançar
              </button>
            </div>
          )}

          {/* ── Step 2 (PIX): Revisão + Termos ───────────────────────── */}
          {step === 2 && paymentMethod === 'PIX' && (
            <div className="flex flex-col gap-4">
              {/* Seleção de método */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-navy/60">Como você quer pagar?</h2>
                <PaymentMethodSelector method={paymentMethod} onChange={setPaymentMethod} />

                {/* Resumo do serviço */}
                <div className="mt-4 rounded-lg border border-brand-border bg-neutral-50 p-4">
                  <p className="text-sm font-medium text-brand-navy">
                    Serviço: {product?.label}
                  </p>
                  <p className="mt-0.5 text-sm text-brand-navy">
                    Valor: R$ {formatCurrency(productPrice)}
                  </p>
                  <hr className="my-3 border-brand-border" />
                  <p className="text-xs text-foreground-alt">
                    QR Code e Pix Copia e Cola disponíveis na próxima etapa
                  </p>
                </div>
              </div>

              {/* Termos */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <TermsBlock value={pixTerm} onChange={setPixTerm} />
                <hr className="my-4 border-brand-border" />
                <p className="flex items-center justify-center gap-2 text-sm text-brand-navy">
                  <Shield className="h-4 w-4 shrink-0 text-brand-orange" />
                  Garantia de 7 dias — reembolso integral
                </p>
              </div>

              {serverError && (
                <p className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  {serverError}
                </p>
              )}

              <button
                type="button"
                onClick={() => {
                  if (!allPixTerms) { setShowValidationAlert(true); return }
                  if (!loading) handleSubmit()
                }}
                className="btn-secondary w-full !rounded-md h-11"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Processando...
                  </span>
                ) : (
                  'Avançar'
                )}
              </button>
            </div>
          )}

          {/* ── Step 2 (Cartão): Dados do cartão + endereço ──────────── */}
          {step === 2 && paymentMethod === 'CREDIT_CARD' && (
            <div className="flex flex-col gap-4">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-navy/60">Como você quer pagar?</h2>
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
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-navy/60">Endereço do titular</h2>
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

                  {addressInfo && (
                    <p className="text-sm text-foreground-alt">
                      {addressInfo.logradouro}, {addressInfo.bairro} — {addressInfo.localidade}/{addressInfo.uf}
                    </p>
                  )}

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
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  className="flex-1 h-11 rounded-md border-brand-border bg-white text-brand-navy hover:bg-neutral-50"
                >
                  Voltar
                </Button>
                <button type="button" onClick={goNext} className="btn-secondary flex-1 !rounded-md h-11">
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
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-navy/60">Resumo do pedido</h2>
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm text-foreground-alt">{product?.label}</span>
                    <span className="font-dm text-subtitle text-brand-navy">R$ {formatCurrency(productPrice)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground-alt">Taxas e encargos</span>
                    <span className="text-sm text-foreground-alt">
                      {installments > 1 && product
                        ? `R$ ${formatCurrency(
                            totalWithInstallmentFee(productPrice, installments) -
                              productPrice
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
                            installmentValueCents(productPrice, installments)
                          )} no cartão`}
                    </p>
                  </div>

                  <div className="border-t border-brand-border pt-3 text-sm">
                    <p className="text-foreground-alt">
                      <span className="font-medium text-brand-navy">Titular:</span>{' '}
                      {cardHolderDiffers && cardHolder.name ? cardHolder.name : form.name}
                    </p>
                    <p className="mt-0.5 text-foreground-alt">
                      <span className="font-medium text-brand-navy">{product?.documentLabel}:</span>{' '}
                      {form.document}
                    </p>
                  </div>
                </div>
              </div>

              {/* Termos */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <TermsBlock value={cardTerm} onChange={setCardTerm} />
                <hr className="my-4 border-brand-border" />
                <p className="flex items-center justify-center gap-2 text-sm text-brand-navy">
                  <Shield className="h-4 w-4 shrink-0 text-brand-orange" />
                  Garantia de 7 dias — reembolso integral
                </p>
              </div>

              {serverError && (
                <p className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  {serverError}
                </p>
              )}

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  className="flex-1 h-11 rounded-md border-brand-border bg-white text-brand-navy hover:bg-neutral-50"
                >
                  Voltar
                </Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="flex-1">
                      <button
                        type="button"
                        onClick={allCardTerms ? handleSubmit : undefined}
                        disabled={loading || !allCardTerms}
                        className="btn-secondary w-full !rounded-md h-11 disabled:opacity-50"
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
                      Para prosseguir é preciso aceitar os termos acima.
                    </TooltipContent>
                  )}
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      </div>
      <AlertDialog open={showValidationAlert} onOpenChange={setShowValidationAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Campos incompletos</AlertDialogTitle>
            <AlertDialogDescription>
              Antes de prosseguir, preencha corretamente todos os campos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowValidationAlert(false)}>
              Entendi
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  )
}

// ── PaymentMethodSelector ─────────────────────────────────────────────────────

function PaymentMethodSelector({
  method,
  onChange,
}: {
  method: PaymentMethod
  onChange: (m: PaymentMethod) => void
}) {
  return (
    <Select value={method} onValueChange={(v) => onChange(v as PaymentMethod)}>
      <SelectTrigger className="h-11 w-full border-brand-border text-brand-navy focus:ring-brand-navy">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PIX">PIX — Aprovação em segundos</SelectItem>
        <SelectItem value="CREDIT_CARD">Cartão de Crédito</SelectItem>
      </SelectContent>
    </Select>
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
