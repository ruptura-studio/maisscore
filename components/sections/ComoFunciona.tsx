import { ShoppingCart, Search, Gavel, CheckCircle } from 'lucide-react'

const passos = [
  {
    numero: 1,
    icon: ShoppingCart,
    titulo: 'Você adquire o serviço',
    desc: 'Você compra o Limpa Nome em nosso site e preenche com seus dados para darmos início ao processo.',
    badge: '5 minutos',
  },
  {
    numero: 2,
    icon: Search,
    titulo: 'Analisamos seu caso',
    desc: 'Nossos advogados analisam seu caso e fazem um mapeamento da melhor abordagem para iniciar o processo.',
    badge: '24 horas',
  },
  {
    numero: 3,
    icon: Gavel,
    titulo: 'Entramos em ação',
    desc: 'Nossa equipe jurídica realiza a abertura do processo para remoção de seu nome de sites de restrição de crédito.',
    badge: 'Em até 7 dias úteis',
  },
  {
    numero: 4,
    icon: CheckCircle,
    titulo: 'Nome limpo',
    desc: 'Você recebe a confirmação com certificado pelo WhatsApp e pode retomar a busca por crédito sem preocupações.',
    badge: 'Em até 15 dias',
  },
]

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="w-full py-24 bg-white">
      <div className="container-ms flex flex-col gap-12">
        {/* Title */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="text-caption text-foreground uppercase tracking-[1.5px]">Nosso processo</span>
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-tight tracking-[-1.5px] text-foreground max-w-[700px]">
            Como funciona o processo de limpa nome da Mais Score
          </h2>
        </div>

        {/* Step cards + markers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {passos.map((passo, i) => (
            <div key={passo.numero} className="flex flex-col gap-3">
              {/* Card */}
              <div className="bg-card border border-border rounded-lg p-6 flex flex-col gap-4 flex-1">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center shrink-0">
                  <passo.icon size={16} className="text-foreground" />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="text-heading-4 font-semibold text-foreground">{passo.titulo}</h3>
                  <p className="text-para-sm text-foreground leading-relaxed">{passo.desc}</p>
                </div>
                <span className="inline-flex items-center self-start gap-1 bg-accent-dark text-white text-para-xs font-semibold px-3 py-1 rounded-full">
                  {passo.badge}
                </span>
              </div>

              {/* Step marker with trailing connector */}
              <div className="flex items-center h-8">
                <div className="w-8 h-8 rounded-full border-2 border-border bg-white flex items-center justify-center shrink-0">
                  <span className="text-para-xs font-semibold text-accent-dark">{passo.numero}</span>
                </div>
                <div className="flex-1 h-[2px] bg-border" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
