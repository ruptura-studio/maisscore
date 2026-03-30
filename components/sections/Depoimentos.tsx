'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'

const TESTIMONIALS = [
  {
    quote: 'Meu marido e eu tentamos resolver por mais de 4 anos. Com a Mais Score, em 12 dias limpamos nosso nome e conseguimos o financiamento da nossa casa.',
    name: 'Lúcia Pereira, Campinas, SP',
    avatar: '/img/avatar-lucia.png',
  },
  {
    quote: 'A empresa fazia análise de CPF na admissão e eu estava travado. A Mais Score limpou meu nome em 8 dias e consegui ser contratado. Valeu cada centavo.',
    name: 'João Lima, Curitiba, PR',
    avatar: '/img/avatar-joao.png',
  },
  {
    quote: 'Fiquei 6 anos com o nome sujo sem conseguir nada. Em 7 dias a Mais Score limpou tudo, e no mês seguinte comprei meu carro. Não acreditei que era tão simples.',
    name: 'Marcos Ribeiro, Belo Horizonte, MG',
    avatar: '/img/avatar-marcos.png',
  },
]

type TestimonialProps = {
  quote: string
  name: string
  avatar: string
}

function TestimonialCard({ quote, name, avatar }: TestimonialProps) {
  return (
    <div className="flex h-full flex-col items-center bg-white px-[45px] pb-[60px] pt-[69px]">
      {/* Quote icon */}
      <Image
        src="/icons/icon-aspas.svg"
        alt=""
        width={30}
        height={22}
        className="mb-[23px] shrink-0"
      />

      {/* Quote text */}
      <p className="font-dm text-[18px] font-light italic leading-[31.5px] text-brand-navy text-center">
        {quote}
      </p>

      {/* Author */}
      <div className="mt-[40px] flex flex-col items-center gap-[5px]">
        <Image
          src={avatar}
          alt={name}
          width={80}
          height={80}
          className="h-20 w-20 rounded-full object-cover"
        />
        <p className="mt-[10px] font-dm text-[18px] font-light text-brand-navy text-center">
          {name}
        </p>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} className="fill-[#EE9E16] text-[#EE9E16]" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function Depoimentos() {
  const [active, setActive] = useState(0)

  return (
    <section className="w-full bg-[#f2f2f2] py-[120px]">
      <div className="container-ms flex flex-col items-center gap-8">

        {/* Header */}
        <div className="flex flex-col items-center gap-5 pb-4">
          <p className="font-dm text-[10px] font-light uppercase tracking-[6px] text-brand-navy">
            Depoimentos
          </p>
          <h2 className="font-dm text-[40px] font-normal leading-[1] tracking-[-1px] text-brand-navy text-center lg:text-[60px] lg:leading-[60px]">
            O que nossos clientes dizem
          </h2>
        </div>

        {/* Desktop: 3 columns */}
        <div className="hidden w-full grid-cols-3 gap-[30px] lg:grid">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="flex w-full flex-col items-center gap-6 lg:hidden">
          <TestimonialCard {...TESTIMONIALS[active]} />
          <div className="flex items-center gap-[16px]">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Ir para depoimento ${i + 1}`}
                className={`h-[6px] w-[6px] rounded-full transition-colors ${
                  i === active ? 'bg-brand-orange' : 'bg-brand-navy'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
