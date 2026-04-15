'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

/**
 * Hero section — Figma pixel-perfect (1920×1000px base).
 *
 * Animações:
 *  • Entry: fade-in + slide-up escalonado por card
 *  • Float: levitação contínua com duração diferente por card (dessincronizado)
 *  • Mouse parallax: CSS `translate` (independente de `transform`) via rAF + lerp
 *    Cada card tem profundidade diferente para efeito 3D orgânico.
 */
export function Hero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const card97Ref   = useRef<HTMLDivElement>(null)
  const card7Ref    = useRef<HTMLDivElement>(null)
  const cardPriceRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Respeita preferência de movimento reduzido
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const section = sectionRef.current
    if (!section) return

    // Profundidade máxima de deslocamento por eixo (px)
    const DEPTH = {
      card97: { x: -22, y: -16 },
      card7:  { x: -15, y: -12 },
      price:  { x: -28, y: -20 },
    } as const

    const EASE = 0.07 // fator de suavização (0 = estático, 1 = sem suavização)

    let targetX = 0, targetY = 0
    let isInside = false
    const cur = {
      c97:   { x: 0, y: 0 },
      c7:    { x: 0, y: 0 },
      price: { x: 0, y: 0 },
    }
    let rafId: number

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    function tick() {
      const tx = isInside ? targetX : 0
      const ty = isInside ? targetY : 0

      cur.c97.x   = lerp(cur.c97.x,   tx * DEPTH.card97.x, EASE)
      cur.c97.y   = lerp(cur.c97.y,   ty * DEPTH.card97.y, EASE)
      cur.c7.x    = lerp(cur.c7.x,    tx * DEPTH.card7.x,  EASE)
      cur.c7.y    = lerp(cur.c7.y,    ty * DEPTH.card7.y,  EASE)
      cur.price.x = lerp(cur.price.x, tx * DEPTH.price.x,  EASE)
      cur.price.y = lerp(cur.price.y, ty * DEPTH.price.y,  EASE)

      if (card97Ref.current)
        card97Ref.current.style.translate    = `${cur.c97.x}px ${cur.c97.y}px`
      if (card7Ref.current)
        card7Ref.current.style.translate     = `${cur.c7.x}px ${cur.c7.y}px`
      if (cardPriceRef.current)
        cardPriceRef.current.style.translate = `${cur.price.x}px ${cur.price.y}px`

      rafId = requestAnimationFrame(tick)
    }

    function onMouseMove(e: MouseEvent) {
      const rect = section!.getBoundingClientRect()
      targetX = (e.clientX - rect.left)  / rect.width  - 0.5
      targetY = (e.clientY - rect.top)   / rect.height - 0.5
      isInside = true
    }

    function onMouseLeave() {
      isInside = false
    }

    section.addEventListener('mousemove', onMouseMove)
    section.addEventListener('mouseleave', onMouseLeave)
    rafId = requestAnimationFrame(tick)

    return () => {
      section.removeEventListener('mousemove', onMouseMove)
      section.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden sm:h-[1000px] [@media(orientation:landscape)]:h-[calc(100dvh-var(--header-height))]"
    >
      {/* Background — desktop only */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none z-0">
        <Image
          src="/img/hero-bg-pattern.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* ══════════════════════════════════════════
          MOBILE LAYOUT (oculto em sm+)
      ══════════════════════════════════════════ */}
      <div className="sm:hidden flex flex-col h-full">

        {/* Imagem + cards sobrepostos */}
        <div className="relative w-full flex-1 flex justify-center" style={{ backgroundColor: '#DDDDDD' }}>
          <Image
            src="/img/pic-girl.png"
            alt="Mulher sorrindo com cartão de crédito"
            width={212}
            height={212}
            priority
            className="object-cover object-top"
          />

          {/* Card Início */}
          <div className="absolute top-[calc(8%+25px)] left-[calc(1rem+10px)] bg-white/80 rounded-xl shadow-card flex items-center gap-2 px-3 py-2">
            <span className="w-2 h-2 rounded-full bg-brand-orange flex-none" />
            <div className="flex flex-col">
              <span className="font-dm font-normal text-brand-navy text-txt-xs leading-tight">Início</span>
              <span className="font-dm font-normal text-brand-navy text-txt-xs leading-tight">Em até 7 dias</span>
            </div>
          </div>

          {/* Card Nome Limpo */}
          <div className="absolute top-[calc(8%+80px)] right-4 bg-white/80 rounded-xl shadow-card flex items-center gap-2 px-3 py-2">
            <span className="w-2 h-2 rounded-full bg-brand-orange flex-none" />
            <div className="flex flex-col">
              <span className="font-dm font-normal text-brand-navy text-txt-xs leading-tight">Nome Limpo</span>
              <span className="font-dm font-normal text-brand-navy text-txt-xs leading-tight">Em até 30 dias úteis</span>
            </div>
          </div>

          {/* Card Atendimento */}
          <div className="absolute bottom-[calc(8%+20px)] left-4 bg-white/80 rounded-xl shadow-card flex items-center gap-2 px-3 py-2">
            <span className="w-2 h-2 rounded-full bg-brand-orange flex-none" />
            <div className="flex flex-col">
              <span className="font-dm font-normal text-brand-navy text-txt-xs leading-tight">Atendimento</span>
              <span className="font-dm font-normal text-brand-navy text-txt-xs leading-tight">Direcionamento exclusivo</span>
            </div>
          </div>
        </div>

        {/* Faixa laranja com título */}
        <div className="bg-brand-orange px-5 py-4">
          <h1 className="font-dm font-normal text-white text-[18px] leading-[20px] text-center">
            Seu nome sujo está te custando muito mais do que você imagina!
          </h1>
        </div>

        {/* Texto + social proof */}
        <div className="bg-white px-5 py-8 flex items-center justify-between gap-4">
          <p className="font-dm font-normal text-brand-navy text-[14px] leading-[14px] flex-1 max-w-[144px]">
            Ter o nome limpo é um direito seu, que a gente faz valer.
          </p>

          {/* Social proof */}
          <div className="flex flex-col items-end flex-none">
            <div className="relative flex-none" style={{ width: '127px', height: '39px' }}>
              {([
                { i: 1, ml: 0 },
                { i: 2, ml: 22 },
                { i: 3, ml: 44 },
                { i: 4, ml: 66 },
                { i: 5, ml: 88 },
              ] as const).map(({ i, ml }) => (
                <div
                  key={i}
                  className="absolute rounded-full border-[2px] border-white overflow-hidden"
                  style={{ width: '39px', height: '39px', left: `${ml}px`, top: 0 }}
                >
                  <Image src={`/img/avatar-${i}.png`} alt={`Cliente ${i}`} fill className="object-cover" />
                </div>
              ))}
            </div>
            <span className="font-dm font-semibold text-brand-navy text-h2 mt-1">3.142+</span>
            <span className="font-sans font-normal text-grafite text-sm text-center">nomes limpos</span>
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════════
          DESKTOP LAYOUT (oculto abaixo de sm)
      ══════════════════════════════════════════ */}
      <div className="hidden sm:block container-ms h-full">
        <div className="grid grid-cols-2 h-full">

          {/* ── LEFT COLUMN ── */}
          <div className="relative z-10 flex flex-col justify-center gap-10 py-[8%]">
            <div className="flex flex-col gap-8">
              <h1
                className="font-dm font-normal text-brand-navy text-display"
                style={{ maxWidth: '34.375rem' }}
              >
                Seu nome sujo está te custando mais do que você imagina
              </h1>
              <div className="flex flex-col gap-4" style={{ maxWidth: '550px' }}>
                <p className="font-dm font-normal text-brand-navy text-h2">
                  Ter o nome limpo é um direito seu, que a gente faz valer.
                </p>
                <div className="font-sans font-normal text-grafite text-p">
                  <p>Via processo jurídico, com base no Art. 42 do CDC.</p>
                  <p>97% de sucesso. Resultado garantido ou seu dinheiro de volta.</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-4 flex-wrap">
              <a href="/checkout" className="btn-primary">
                Quero limpar meu nome agora <Image src="/icons/arrow-up-icon.svg" alt="" width={10} height={10} className="shrink-0" />
              </a>
              <a href="#como-funciona" className="btn-secondary">
                Como Funciona <Image src="/icons/arrow-up-icon.svg" alt="" width={10} height={10} className="shrink-0" />
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-0">
              <div className="relative flex-none" style={{ width: '165.67px', height: '50.016px' }}>
                {([
                  { i: 1, ml: 0 },
                  { i: 2, ml: 28.92 },
                  { i: 3, ml: 57.83 },
                  { i: 4, ml: 86.75 },
                  { i: 5, ml: 115.67 },
                ] as const).map(({ i, ml }) => (
                  <div
                    key={i}
                    className="absolute rounded-full border-[2px] border-white overflow-hidden"
                    style={{ width: '50.016px', height: '50.016px', left: `${ml}px`, top: 0 }}
                  >
                    <Image src={`/img/avatar-${i}.png`} alt={`Cliente ${i}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-start ml-8">
                <span className="font-dm font-normal text-brand-navy whitespace-nowrap text-h2">
                  3.142+
                </span>
                <span className="font-sans font-normal text-grafite whitespace-nowrap text-p">
                  famílias com o nome limpo
                </span>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="relative h-full">

            {/* Hero image */}
            <div className="absolute bottom-0 left-0 right-0" style={{ height: '92%' }}>
              <Image
                src="/img/pic-girl.png"
                alt="Mulher sorrindo com cartão de crédito"
                fill priority
                className="object-contain object-bottom"
                sizes="50vw"
              />
            </div>

            {/* Card 97% — entry 0.1s · float 4s · parallax depth -22/-16 */}
            <div
              ref={card97Ref}
              className="absolute bg-white rounded-[16px] shadow-card flex flex-col items-center justify-center gap-[3px] px-[13px] py-[13px]"
              style={{
                top: '8.7%', right: '12%',
                transform: 'scale(0.95)',
                willChange: 'transform, translate',
                animation: 'hero-card-in 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both, hero-float 4s ease-in-out 0.7s infinite',
              }}
            >
              <div className="relative" style={{ width: '51px', height: '51px' }}>
                <Image src="/img/hero-card-grafico.png" alt="" fill className="object-contain" />
              </div>
              <span className="font-dm font-normal text-brand-navy text-center text-lg">97%</span>
              <span className="font-dm font-normal text-brand-navy text-center text-txt-xs">taxa de sucesso</span>
            </div>

            {/* Card 7 dias — entry 0.35s · float 3.5s · parallax depth -15/-12 */}
            <div
              ref={card7Ref}
              className="absolute bg-white rounded-[16px] shadow-card flex items-center gap-[10px] px-[13px] py-[13px]"
              style={{
                top: 'calc(32% - 50px)', left: 'calc(4% - 30px)',
                transform: 'scale(0.95)',
                willChange: 'transform, translate',
                animation: 'hero-card-in 0.6s cubic-bezier(0.22,1,0.36,1) 0.35s both, hero-float 3.5s ease-in-out 0.95s infinite',
              }}
            >
              <div className="relative flex-none" style={{ width: '46px', height: '46px' }}>
                <Image src="/img/hero-card-calendar-bg.png" alt="" fill className="object-contain" />
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="font-dm font-normal text-brand-navy whitespace-nowrap text-lg">7 dias</span>
                <span className="font-dm font-normal text-brand-navy whitespace-nowrap text-txt-xs">Processo iniciado</span>
              </div>
            </div>

            {/* Card R$595 — entry 0.6s · float 5s · parallax depth -28/-20 */}
            <div
              ref={cardPriceRef}
              className="absolute bg-brand-orange rounded-[16px] flex items-center gap-[10px] px-[14px] py-[13px]"
              style={{
                bottom: '35%', right: '2%',
                transform: 'scale(0.95)',
                willChange: 'transform, translate',
                animation: 'hero-card-in 0.6s cubic-bezier(0.22,1,0.36,1) 0.6s both, hero-float 5s ease-in-out 1.2s infinite',
              }}
            >
              <div className="flex flex-col gap-[2px]">
                <div className="flex items-start text-white font-dm font-normal">
                  <span className="text-txt-xs" style={{ marginTop: '3px' }}>R$</span>
                  <span className="text-lg">595</span>
                </div>
                <span className="text-white font-dm font-normal text-txt-xs">para CPF à vista</span>
              </div>
              <div className="relative flex-none" style={{ width: '40px', height: '40px' }}>
                <Image src="/img/hero-card-price.png" alt="" fill className="object-contain" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
