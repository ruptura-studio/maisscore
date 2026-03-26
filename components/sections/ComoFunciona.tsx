import { ShoppingCart, Search, Gavel, CheckCircle, CreditCard, FileText, Scale, BadgeCheck } from 'lucide-react'

function VisualCompra() {
  return (
    <div className="bg-[#f0f2f5] rounded-2xl p-6 w-full min-h-[280px] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-sm w-full max-w-[320px] overflow-hidden">
        <div className="bg-accent-dark px-5 py-3 flex items-center gap-2">
          <CreditCard size={16} className="text-white" />
          <span className="text-white text-para-sm font-semibold">Limpa Nome</span>
        </div>
        <div className="px-5 py-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-para-sm text-muted">Serviço</span>
            <span className="text-para-sm font-semibold text-foreground">Regularização CPF</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-para-sm text-muted">Prazo</span>
            <span className="text-para-sm font-semibold text-foreground">15 dias úteis</span>
          </div>
          <div className="h-px bg-border" />
          <div className="flex justify-between items-center">
            <span className="text-para-sm text-muted">Total</span>
            <span className="text-heading-4 font-bold text-accent-dark">R$ 297,00</span>
          </div>
          <div className="bg-accent-dark rounded-lg py-2.5 text-center">
            <span className="text-white text-para-sm font-semibold">Garantir meu acesso</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function VisualAnalise() {
  return (
    <div className="bg-[#f0f2f5] rounded-2xl p-6 w-full min-h-[280px] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-sm w-full max-w-[320px] p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-accent-dark" />
          <span className="text-para-sm font-semibold text-foreground">Análise do Caso</span>
          <span className="ml-auto bg-yellow-100 text-yellow-700 text-para-xs font-semibold px-2 py-0.5 rounded-full">
            Em análise
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { label: 'Restrição Serasa', width: '80%' },
            { label: 'Restrição SPC', width: '60%' },
            { label: 'Dívidas ativas', width: '40%' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full shrink-0 bg-red-400" />
              <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-accent-dark rounded-full" style={{ width: item.width }} />
              </div>
              <span className="text-para-xs text-muted w-24 text-right">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="bg-secondary rounded-lg p-3">
          <p className="text-para-xs text-foreground leading-relaxed">
            Nossos advogados identificaram <strong>3 restrições</strong> passíveis de remoção via processo judicial.
          </p>
        </div>
      </div>
    </div>
  )
}

function VisualAcao() {
  const steps = [
    { label: 'Petição inicial', done: true },
    { label: 'Protocolo no tribunal', done: true },
    { label: 'Liminar deferida', done: false },
    { label: 'Notificação Serasa/SPC', done: false },
  ]

  return (
    <div className="bg-[#f0f2f5] rounded-2xl p-6 w-full min-h-[280px] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-sm w-full max-w-[320px] p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Scale size={16} className="text-accent-dark" />
          <span className="text-para-sm font-semibold text-foreground">Processo Judicial</span>
        </div>
        <div className="flex flex-col gap-2">
          {steps.map((step) => (
            <div key={step.label} className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  step.done ? 'bg-green-100' : 'bg-border'
                }`}
              >
                {step.done && <CheckCircle size={12} className="text-green-600" />}
              </div>
              <span className={`text-para-xs ${step.done ? 'text-foreground font-medium' : 'text-muted'}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
        <div className="h-px bg-border" />
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-accent-dark rounded-full animate-pulse" />
          <span className="text-para-xs text-accent-dark font-medium">Processo em andamento</span>
        </div>
      </div>
    </div>
  )
}

function VisualConclusao() {
  return (
    <div className="bg-[#f0f2f5] rounded-2xl p-6 w-full min-h-[280px] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-sm w-full max-w-[320px] p-5 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <BadgeCheck size={20} className="text-green-600" />
          </div>
          <div>
            <p className="text-para-sm font-semibold text-foreground">Nome Regularizado!</p>
            <p className="text-para-xs text-muted">Certificado emitido</p>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-para-xs text-muted">Restrições removidas</span>
            <span className="text-para-xs font-bold text-green-700">3 de 3</span>
          </div>
          <div className="flex justify-between">
            <span className="text-para-xs text-muted">Score estimado</span>
            <span className="text-para-xs font-bold text-green-700">+220 pts</span>
          </div>
          <div className="flex justify-between">
            <span className="text-para-xs text-muted">Prazo total</span>
            <span className="text-para-xs font-bold text-green-700">18 dias</span>
          </div>
        </div>
        <div className="bg-[#25D366] rounded-lg py-2.5 flex items-center justify-center">
          <span className="text-white text-para-xs font-semibold">Receber certificado no WhatsApp</span>
        </div>
      </div>
    </div>
  )
}

const passos = [
  {
    numero: 1,
    icon: ShoppingCart,
    titulo: 'Você adquire o serviço',
    desc: 'Você compra o Limpa Nome em nosso site e preenche com seus dados para darmos início ao processo.',
    badge: '5 minutos',
    Visual: VisualCompra,
  },
  {
    numero: 2,
    icon: Search,
    titulo: 'Analisamos seu caso',
    desc: 'Nossos advogados analisam seu caso e fazem um mapeamento da melhor abordagem para iniciar o processo.',
    badge: '24 horas',
    Visual: VisualAnalise,
  },
  {
    numero: 3,
    icon: Gavel,
    titulo: 'Entramos em ação',
    desc: 'Nossa equipe jurídica realiza a abertura do processo para remoção de seu nome de sites de restrição de crédito.',
    badge: 'Em até 7 dias úteis',
    Visual: VisualAcao,
  },
  {
    numero: 4,
    icon: CheckCircle,
    titulo: 'Nome limpo',
    desc: 'Você recebe a confirmação com certificado pelo WhatsApp e pode retomar a busca por crédito sem preocupações.',
    badge: 'Entre 15 a 30 dias',
    Visual: VisualConclusao,
  },
]

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="w-full py-24 bg-white">
      <div className="container-ms flex flex-col gap-20">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="text-caption text-foreground uppercase tracking-[1.5px]">Nosso método reativa crédito</span>
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-tight tracking-[-1.5px] text-foreground max-w-[600px]">
            Como funciona o processo
          </h2>
        </div>

        {/* Steps — alternating layout */}
        <div className="flex flex-col gap-24">
          {passos.map((passo, i) => {
            const isEven = i % 2 === 0
            const Icon = passo.icon
            const Visual = passo.Visual
            return (
              <div
                key={passo.numero}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-16`}
              >
                {/* Text side */}
                <div className="flex-1 flex flex-col gap-5 max-w-[480px]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-foreground" />
                    </div>
                    <span className="text-para-xs font-semibold text-muted uppercase tracking-wider">
                      Passo {passo.numero}
                    </span>
                  </div>
                  <h3 className="text-[28px] md:text-[32px] font-semibold leading-tight tracking-[-0.5px] text-foreground">
                    {passo.titulo}
                  </h3>
                  <p className="text-para-md text-muted leading-relaxed">{passo.desc}</p>
                  <span className="inline-flex items-center self-start bg-accent-dark text-white text-para-xs font-semibold px-3 py-1.5 rounded-full">
                    {passo.badge}
                  </span>
                </div>

                {/* Visual side */}
                <div className="flex-1 w-full">
                  <Visual />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
