'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { WHATSAPP_COMPRAR } from '@/lib/config'

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
      // Normalizado: -0.5 (esquerda/cima) → 0 (centro) → +0.5 (direita/baixo)
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
      className="relative w-full bg-[#e9e9e9] overflow-hidden h-[1000px] [@media(orientation:landscape)]:h-[calc(100dvh-var(--header-height))]"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/img/hero-bg-pattern.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Container responsivo */}
      <div className="container-ms h-full">
        <div className="grid grid-cols-2 h-full">

          {/* ── LEFT COLUMN ── */}
          <div className="relative z-10 flex flex-col justify-center gap-10 py-[8%]">
            <div className="flex flex-col gap-[40px]">
              <h1
                className="font-dm font-normal text-brand-navy"
                style={{ fontSize: '5rem', lineHeight: '0.925', maxWidth: '34.375rem' }}
              >
                Limpe seu nome em até 30 dias
              </h1>
              <div className="flex flex-col gap-[16px]" style={{ maxWidth: '550px' }}>
                <p
                  className="font-dm font-medium text-brand-navy"
                  style={{ fontSize: '22px', lineHeight: '27.2px' }}
                >
                  Mesmo sem quitar as suas dívidas
                </p>
                <div
                  className="font-dm font-light text-brand-navy"
                  style={{ fontSize: '16px', lineHeight: '25.6px' }}
                >
                  <p>Via processo jurídico, com base no Art. 42 do CDC.</p>
                  <p>97% de sucesso. Resultado garantido ou seu dinheiro de volta.</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href={WHATSAPP_COMPRAR}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Quero limpar meu nome agora <Image src="/icons/arrow-up-icon.svg" alt="" width={10} height={10} className="shrink-0" />
              </a>
              <a
                href="#como-funciona"
                className="btn-secondary"
              >
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
                <span
                  className="font-dm font-normal text-brand-navy whitespace-nowrap"
                  style={{ fontSize: '36px', lineHeight: '46.8px', letterSpacing: '-1px' }}
                >
                  3.142+
                </span>
                <span
                  className="font-dm font-light text-brand-navy whitespace-nowrap"
                  style={{ fontSize: '16px', lineHeight: '25.6px' }}
                >
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
              className="absolute bg-white rounded-[16px] shadow-[0_8px_40px_rgba(0,0,0,0.10)] flex flex-col items-center justify-center gap-[4px] px-[16px]"
              style={{
                top: '8.7%', right: '12%', width: '138px', height: '180px',
                transform: 'scale(0.95)',
                willChange: 'transform, translate',
                animation: 'hero-card-in 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both, hero-float 4s ease-in-out 0.7s infinite',
              }}
            >
              <div className="relative" style={{ width: '64px', height: '64px' }}>
                <Image src="/img/hero-card-grafico.png" alt="" fill className="object-contain" />
              </div>
              <span
                className="font-dm font-normal text-brand-navy text-center"
                style={{ fontSize: '26px', lineHeight: '32px', letterSpacing: '-0.5px' }}
              >97%</span>
              <span
                className="font-dm font-light text-brand-navy text-center"
                style={{ fontSize: '13px', lineHeight: '18px' }}
              >taxa de sucesso</span>
            </div>

            {/* Card 7 dias — entry 0.35s · float 3.5s · parallax depth -15/-12 */}
            <div
              ref={card7Ref}
              className="absolute bg-white rounded-[16px] shadow-[0_8px_40px_rgba(0,0,0,0.10)] flex items-center gap-[12px] px-[16px]"
              style={{
                top: 'calc(32% - 50px)', left: 'calc(4% - 30px)', width: '196px', height: '106px',
                transform: 'scale(0.95)',
                willChange: 'transform, translate',
                animation: 'hero-card-in 0.6s cubic-bezier(0.22,1,0.36,1) 0.35s both, hero-float 3.5s ease-in-out 0.95s infinite',
              }}
            >
              <div className="relative flex-none" style={{ width: '58px', height: '58px' }}>
                <Image src="/img/hero-card-calendar-bg.png" alt="" fill className="object-contain" />
              </div>
              <div className="flex flex-col gap-[2px]">
                <span
                  className="font-dm font-normal text-brand-navy whitespace-nowrap"
                  style={{ fontSize: '26px', lineHeight: '32px', letterSpacing: '-0.5px' }}
                >7 dias</span>
                <span
                  className="font-dm font-light text-neutral-400 whitespace-nowrap"
                  style={{ fontSize: '12px', lineHeight: '18px' }}
                >Processo iniciado</span>
              </div>
            </div>

            {/* Card R$595 — entry 0.6s · float 5s · parallax depth -28/-20 */}
            <div
              ref={cardPriceRef}
              className="absolute bg-brand-orange rounded-[16px] flex items-center justify-between px-[18px]"
              style={{
                bottom: '35%', right: '2%', width: '194px', height: '90px',
                transform: 'scale(0.95)',
                willChange: 'transform, translate',
                animation: 'hero-card-in 0.6s cubic-bezier(0.22,1,0.36,1) 0.6s both, hero-float 5s ease-in-out 1.2s infinite',
              }}
            >
              <div className="flex flex-col gap-[2px]">
                <div className="flex items-start text-white font-dm font-normal">
                  <span style={{ fontSize: '10px', lineHeight: '10px', marginTop: '6px' }}>R$</span>
                  <span style={{ fontSize: '26px', lineHeight: '32px', letterSpacing: '-0.5px' }}>595</span>
                </div>
                <span
                  className="text-white font-dm font-light"
                  style={{ fontSize: '13px', lineHeight: '18px', width: '90px' }}
                >para CPF à vista</span>
              </div>
              <div className="relative flex-none" style={{ width: '50px', height: '50px' }}>
                <Image src="/img/hero-card-price.png" alt="" fill className="object-contain" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

function ArrowRight() {
  return (
    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" className="shrink-0">
      <path d="M1 5.5H9M9 5.5L5.5 2M9 5.5L5.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
