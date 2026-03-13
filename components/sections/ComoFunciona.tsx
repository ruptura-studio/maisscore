import { MessageCircle, Search, FileCheck, CheckCircle } from 'lucide-react'

const passos = [
  {
    numero: '01',
    icon: MessageCircle,
    titulo: 'Entre em contato',
    desc: 'Fale com um especialista pelo WhatsApp. A consulta inicial é gratuita e sem compromisso.',
  },
  {
    numero: '02',
    icon: Search,
    titulo: 'Análise do seu caso',
    desc: 'Nossa equipe jurídica analisa suas dívidas e identifica quais podem ser removidas via processo legal.',
  },
  {
    numero: '03',
    icon: FileCheck,
    titulo: 'Processo em andamento',
    desc: 'Abrimos o processo e você recebe atualizações em tempo real pelo WhatsApp a cada etapa.',
  },
  {
    numero: '04',
    icon: CheckCircle,
    titulo: 'Nome limpo, vida nova',
    desc: 'Em média 15 dias úteis seu nome já aparece limpo nos birôs de crédito. Garantia total.',
  },
]

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="w-full py-24 bg-white">
      <div className="container-ms flex flex-col gap-12">
        {/* Title */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="text-caption text-muted uppercase tracking-[1.5px]">Processo</span>
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-tight tracking-[-1.5px] text-foreground max-w-[700px]">
            Como funciona o processo de limpa nome da Mais Score
          </h2>
          <p className="text-para-lg text-muted max-w-[560px]">
            Um processo jurídico próprio, transparente e acessível. Sem promessas milagrosas.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {passos.map((passo, i) => (
            <div key={passo.numero} className="flex flex-col gap-4 relative">
              {/* Connector line (desktop) */}
              {i < passos.length - 1 && (
                <div className="hidden lg:block absolute top-5 left-[calc(50%+24px)] right-[-50%] h-px bg-border z-0" />
              )}

              <div className="relative z-10 w-10 h-10 bg-accent-dark rounded-lg flex items-center justify-center shrink-0">
                <passo.icon size={20} className="text-white" />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-caption text-accent font-semibold tracking-[1.5px]">
                  {passo.numero}
                </span>
                <h3 className="text-heading-4 font-semibold text-foreground">{passo.titulo}</h3>
                <p className="text-para-sm text-muted leading-relaxed">{passo.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-4">
          <a
            href="https://wa.me/5515974058014"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-accent-dark text-white font-medium text-para-md px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MessageCircle size={16} />
            Iniciar meu processo agora
          </a>
        </div>
      </div>
    </section>
  )
}
