'use client'

import { useState, useEffect } from 'react'
import { Star, Home, CreditCard, Briefcase, Car, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  },
  {
    nome: 'Carla Fernandes',
    cidade: 'Recife, PE',
    badge: 'Cartão aprovado',
    badgeIcon: CreditCard,
    destaque: 'Limpo em 15 dias',
    texto:
      '"Processo completamente claro e transparente. Recebi todas as atualizações do andamento do processo no WhatsApp a cada etapa."',
    foto: 'https://www.figma.com/api/mcp/asset/263467bb-5673-43a7-b683-34bf79342086',
  },
  {
    nome: 'João Lima',
    cidade: 'Curitiba, PR',
    badge: 'Emprego conquistado',
    badgeIcon: Briefcase,
    destaque: 'Limpo em 8 dias',
    texto:
      '"A empresa fazia análise de CPF na admissão. A Mais Score limpou meu nome em 8 dias e consegui ser contratado. Valeu cada centavo."',
    foto: 'https://www.figma.com/api/mcp/asset/28772545-0c5b-4256-94ff-eed6407e8f1f',
  },
  {
    nome: 'Marcos Ribeiro',
    cidade: 'Belo Horizonte, MG',
    badge: 'Carro financiado',
    badgeIcon: Car,
    destaque: 'Limpo em 7 dias',
    texto:
      '"Seis anos com nome sujo sem poder fazer nada. Em 7 dias a Mais Score limpou tudo e em um mês comprei meu carro. Não acreditei que era tão simples."',
    foto: 'https://www.figma.com/api/mcp/asset/9ce3ff02-b3ac-45d5-931b-202723568728',
  },
  {
    nome: 'Mariana Rodrigues',
    cidade: 'Canoas, RS',
    badge: 'Cartão aprovado',
    badgeIcon: CreditCard,
    destaque: 'Limpo em 16 dias',
    texto:
      '"Nunca pensei que um dia iria conhecer Maragogi, sempre pareceu um sonho distante. Com a Mais Score, consegui meu cartão de crédito e partiu viagem!"',
    foto: 'https://www.figma.com/api/mcp/asset/fe149b14-179a-44ac-b4a7-363368046854',
  },
]

const INTERVAL_MS = 5000

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
      className={`inline-flex w-fit items-center gap-1 px-1.5 py-px rounded-full text-[10px] font-medium text-white ${
        variant === 'dark' ? 'bg-primary' : 'bg-accent-dark'
      }`}
    >
      <Icon size={8} />
      {label}
    </span>
  )
}

export function Depoimentos() {
  const [activeIndex, setActiveIndex] = useState(0)

  // Pré-carrega todas as fotos na montagem
  useEffect(() => {
    depoimentos.forEach((d) => {
      const img = new window.Image()
      img.src = d.foto
    })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % depoimentos.length)
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [])

  const featured = depoimentos[activeIndex]
  const others = depoimentos.slice(1)

  return (
    <section id="depoimentos" className="w-full py-24 bg-white">
      <div className="container-ms">
        {/* Title */}
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="text-caption text-foreground-alt uppercase tracking-[1.5px]">Nossos clientes</span>
          <h2 className="text-[40px] md:text-[48px] font-semibold leading-tight tracking-[-1.5px] text-foreground-alt max-w-[760px]">
            Histórias reais de quem já sentiu na pele o prejuízo da negativação
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6">
          {/* Featured card */}
          <div key={activeIndex} className="bg-card border border-border rounded-lg p-6 flex flex-col justify-between gap-4 animate-fade-in">
            <div className="flex flex-col gap-3">
              <Badge label={featured.badge} Icon={featured.badgeIcon} />
              <p className="text-para-sm text-foreground-alt leading-relaxed line-clamp-4">{featured.texto}</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={featured.foto}
                  alt={featured.nome}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="text-para-sm font-medium text-foreground-alt">{featured.nome}</p>
                  <p className="text-para-xs text-foreground-alt">{featured.cidade}</p>
                  {featured.desde && <p className="text-para-xs text-foreground-alt">{featured.desde}</p>}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <StarRating />
                {featured.destaque && (
                  <Badge label={featured.destaque} Icon={Clock} variant="dark" />
                )}
              </div>
            </div>
          </div>

          {/* Other cards */}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {others.map((d) => (
                <button
                  key={d.nome}
                  onClick={() => setActiveIndex(depoimentos.indexOf(d))}
                  className="h-[140px] overflow-hidden bg-card border border-border rounded-lg px-4 py-6 flex gap-3 items-start text-left hover:border-accent-dark transition-colors"
                >
                  <img
                    src={d.foto}
                    alt={d.nome}
                    className="w-10 h-10 rounded-full object-cover shrink-0 mt-0.5"
                  />
                  <div className="flex flex-col justify-between min-w-0 flex-1 h-full">
                    <div className="flex flex-col gap-2 min-w-0">
                      <Badge label={d.badge} Icon={d.badgeIcon} />
                      <p className="text-para-xs text-foreground-alt leading-relaxed line-clamp-2">{d.texto}</p>
                    </div>
                    <div>
                      <p className="text-para-xs font-semibold text-foreground-alt">{d.nome}</p>
                      <p className="text-para-xs text-foreground-alt">{d.cidade}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex items-center gap-2 justify-center mt-6">
          {depoimentos.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                'rounded-full transition-all duration-300',
                i === activeIndex ? 'w-6 h-2 bg-accent-dark' : 'w-2 h-2 bg-border'
              )}
              aria-label={`Ver depoimento ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
