import { Star, Home, CreditCard, Briefcase, Car } from 'lucide-react'

const depoimentos = [
  {
    nome: 'Lúcia Pereira',
    cidade: 'Campinas, SP',
    desde: 'Cliente desde 2024',
    badge: 'Casa financiada',
    badgeIcon: Home,
    texto:
      '"Meu marido e eu tentamos regularizar nossas dívidas por mais de 4 anos. Com a Mais Score, em 12 dias limpamos nosso nome e financiamos nossa casa."',
    destaque: 'Limpo em 12 dias',
    foto: 'https://www.figma.com/api/mcp/asset/72b5c54f-9469-4c46-bf7c-f4a9989b8ec0',
    featured: true,
  },
  {
    nome: 'Carla Fernandes',
    cidade: 'Recife, PE',
    badge: 'Cartão aprovado',
    badgeIcon: CreditCard,
    texto:
      '"Processo completamente claro e transparente. Recebi todas as atualizações do andamento do processo no WhatsApp a cada etapa."',
    foto: 'https://www.figma.com/api/mcp/asset/263467bb-5673-43a7-b683-34bf79342086',
  },
  {
    nome: 'João Lima',
    cidade: 'Curitiba, PR',
    badge: 'Emprego conquistado',
    badgeIcon: Briefcase,
    texto:
      '"A empresa fazia análise de CPF na admissão. A Mais Score limpou meu nome em 8 dias e consegui ser contratado. Valeu cada centavo."',
    foto: 'https://www.figma.com/api/mcp/asset/28772545-0c5b-4256-94ff-eed6407e8f1f',
  },
  {
    nome: 'Marcos Ribeiro',
    cidade: 'Belo Horizonte, MG',
    badge: 'Carro financiado',
    badgeIcon: Car,
    texto:
      '"Seis anos com nome sujo sem poder fazer nada. Em 7 dias a Mais Score limpou tudo e em um mês comprei meu carro. Não acreditei que era tão simples."',
    foto: 'https://www.figma.com/api/mcp/asset/9ce3ff02-b3ac-45d5-931b-202723568728',
  },
  {
    nome: 'Ana Souza',
    cidade: 'São Paulo, SP',
    badge: 'Casa financiada',
    badgeIcon: Home,
    texto:
      '"Tinha medo de ser mais um golpe. Mas o processo foi totalmente transparente e meu nome ficou limpo em menos de duas semanas."',
    foto: 'https://www.figma.com/api/mcp/asset/fe149b14-179a-44ac-b4a7-363368046854',
  },
]

function StarRating() {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  )
}

function Badge({ label, Icon, variant = 'accent' }: { label: string; Icon: any; variant?: 'accent' | 'dark' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-para-xs font-semibold text-white ${
        variant === 'dark' ? 'bg-primary' : 'bg-accent-dark'
      }`}
    >
      <Icon size={10} />
      {label}
    </span>
  )
}

export function Depoimentos() {
  const featured = depoimentos[0]
  const others = depoimentos.slice(1)

  return (
    <section id="depoimentos" className="w-full py-24 bg-white">
      <div className="container-ms">
        {/* Title */}
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="text-caption text-muted uppercase tracking-[1.5px]">Nossos clientes</span>
          <h2 className="text-[40px] md:text-[48px] font-semibold leading-tight tracking-[-1.5px] text-foreground max-w-[760px]">
            Histórias reais de quem já sentiu na pele o prejuízo da negativação
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Featured card */}
          <div className="flex flex-col gap-6">
            <div className="bg-card border border-border rounded-lg p-6 flex flex-col gap-5">
              <Badge label={featured.badge} Icon={featured.badgeIcon} />
              <p className="text-para-lg text-foreground leading-relaxed">{featured.texto}</p>
              <div className="flex items-center gap-4">
                <img
                  src={featured.foto}
                  alt={featured.nome}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="text-para-md font-medium text-foreground">{featured.nome}</p>
                  <p className="text-para-sm text-grafite">{featured.cidade}</p>
                  <p className="text-para-xs text-grafite">{featured.desde}</p>
                </div>
              </div>
              <StarRating />
              <Badge label={featured.destaque!} Icon={featured.badgeIcon} variant="dark" />
            </div>
            {/* Dots indicator */}
            <div className="flex items-center gap-2 justify-center">
              <div className="w-6 h-2 bg-accent-dark rounded-full" />
              <div className="w-2 h-2 bg-border rounded-full" />
              <div className="w-2 h-2 bg-border rounded-full" />
            </div>
          </div>

          {/* Other cards */}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {others.map((d) => (
                <div key={d.nome} className="bg-card border border-border rounded-lg p-6 flex gap-3 items-start">
                  <img
                    src={d.foto}
                    alt={d.nome}
                    className="w-10 h-10 rounded-full object-cover shrink-0 mt-0.5"
                  />
                  <div className="flex flex-col gap-2">
                    <Badge label={d.badge} Icon={d.badgeIcon} />
                    <p className="text-para-xs text-foreground leading-relaxed">{d.texto}</p>
                    <div>
                      <p className="text-para-xs font-semibold text-foreground">{d.nome}</p>
                      <p className="text-para-xs text-grafite">{d.cidade}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
