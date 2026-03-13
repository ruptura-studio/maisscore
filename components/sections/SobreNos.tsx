import { Eye, ShieldCheck, Zap, Users } from 'lucide-react'

const stats = [
  { value: '1.142', label: 'Famílias atendidas' },
  { value: '97%', label: 'Taxa de sucesso' },
  { value: '15', label: 'Dias úteis (média)' },
  { value: '4.8', label: 'Nota no Google' },
]

const cards = [
  {
    icon: Zap,
    title: 'Nascemos de uma crise, crescemos com propósito',
    desc: 'Em 2021, vimos de perto o quanto a negativação paralisa vidas. Decidimos fazer algo real a respeito — e nunca mais paramos.',
  },
  {
    icon: Eye,
    title: 'Construímos o caminho que não existia',
    desc: 'Desenvolvemos um processo jurídico próprio, ágil e acessível. Transparência em cada etapa, atualizações pelo WhatsApp.',
  },
  {
    icon: ShieldCheck,
    title: 'Ir além é parte do nosso processo',
    desc: 'Não apenas limpamos o nome — orientamos cada cliente para que o crédito recuperado vire oportunidade real de vida.',
  },
  {
    icon: Users,
    title: 'Pessoas cuidando de pessoas',
    desc: 'Nossa equipe é formada por quem acredita que finanças são humanas. Cada CPF regularizado representa uma família que recomeçou.',
  },
]

export function SobreNos() {
  return (
    <section id="sobre" className="w-full py-24 bg-secondary">
      <div className="container-ms flex flex-col gap-16">
        {/* Title */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="text-caption text-muted uppercase tracking-[1.5px]">Sobre nós</span>
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-tight tracking-[-1.5px] text-foreground max-w-[760px]">
            Por trás de cada CPF regularizado, existe uma história que recomeçou
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 text-center">
              <span className="text-[40px] font-semibold text-accent-dark leading-tight">{s.value}</span>
              <span className="text-para-sm text-muted">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Office photo + cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Photo */}
          <div className="rounded-lg overflow-hidden w-full aspect-[4/3]">
            <img
              src="https://www.figma.com/api/mcp/asset/abbd6a8b-170e-411b-b456-555164b510dd"
              alt="Escritório Mais Score - Alphaville"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Cards 2x2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card) => (
              <div key={card.title} className="bg-card border border-border rounded-lg p-6 flex flex-col gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                  <card.icon size={20} className="text-accent-dark" />
                </div>
                <h3 className="text-heading-4 font-semibold text-foreground">{card.title}</h3>
                <p className="text-para-sm text-muted leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Missão */}
        <div className="bg-primary rounded-lg p-8 md:p-10 text-center max-w-3xl mx-auto">
          <p className="text-para-lg text-white/90 leading-relaxed italic">
            "Devolver a liberdade financeira a brasileiros negativados por meio de um processo
            jurídico seguro, transparente e acessível — porque nenhuma família deveria ter seu
            futuro bloqueado por dívidas do passado."
          </p>
          <p className="mt-4 text-para-sm text-accent font-medium">Nossa missão</p>
        </div>
      </div>
    </section>
  )
}
