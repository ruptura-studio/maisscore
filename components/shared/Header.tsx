'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { cn } from '@/lib/utils'
import { WHATSAPP_GERAL } from '@/lib/config'
import Image from 'next/image'
import { HeaderTopBar } from '@/components/shared/HeaderTopBar'

const navLinks = [
  { label: 'Como Funciona', href: '#como-funciona' },
  { label: 'Nossos Clientes', href: '#depoimentos' },
  { label: 'Sobre Nós', href: '#sobre' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Preço', href: '#precos' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isDS = pathname.startsWith('/designsystem')
  const isLegal = pathname === '/privacidade' || pathname === '/termos' || pathname === '/reembolso'
  const isCheckout = pathname.startsWith('/checkout')
  const hideNav = isDS || isLegal || isCheckout

  return (
    <header className={cn('w-full bg-white border-b border-brand-border sticky top-0 z-50', isDS && 'm-0')}>
      {/* Top bar */}
      {!hideNav && <HeaderTopBar />}

      {/* Main nav */}
      <div className={cn('flex items-center justify-between', isDS ? 'py-4 px-4' : 'container-ms py-4 lg:py-5')}>
        {/* Logo */}
        <a href={isDS ? '/designsystem' : '/'} className="flex items-center shrink-0">
          <Image
            src="/img/logo-mais-score-black.svg"
            alt="Mais Score"
            width={144}
            height={38}
            priority
          />
        </a>

        {/* Desktop Nav */}
        <nav className={cn('hidden lg:flex items-center gap-1', hideNav && '!hidden')}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link flex items-center gap-1 px-3 py-2 whitespace-nowrap"
            >
              {link.label}
              <svg width="6" height="4" viewBox="0 0 6 4" fill="none" className="text-brand-orange">
                <path d="M1 1L3 3L5 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ))}
        </nav>

        {/* Phone CTA */}
        <a
          href="tel:+5515974058014"
          className={cn('hidden lg:flex items-center gap-2 text-brand-navy text-lg hover:text-brand-orange transition-colors', hideNav && '!hidden')}
        >
          <Image src="/icons/whatsapp-icon.svg" alt="" width={28} height={28} className="shrink-0" />
          15 97405-8014
        </a>

        {/* Voltar — páginas legais */}
        {isLegal && (
          <a href="/" className="flex items-center gap-1 text-sm text-brand-navy hover:text-brand-orange transition-colors">
            <Image src="/icons/chevron-right.svg" alt="" width={10} height={10} className="shrink-0 rotate-180" />
            Voltar
          </a>
        )}

        {/* Mobile Menu Toggle */}
        {!hideNav && (
          <button
            className="lg:hidden text-brand-navy p-2"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        )}
      </div>

      {/* Mobile Nav */}
      <div className={cn(
        'lg:hidden bg-white border-t border-brand-border overflow-hidden transition-all duration-300',
        open ? 'max-h-[500px]' : 'max-h-0'
      )}>
        <nav className="container-ms flex flex-col py-4 gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-3 py-3 text-sm text-brand-navy hover:text-brand-orange transition-colors border-b border-neutral-100"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+5515974058014"
            className="mt-3 flex items-center gap-2 text-brand-navy text-sm px-3 py-2"
          >
            <Image src="/icons/whatsapp-icon.svg" alt="" width={20} height={20} className="shrink-0" />
            15 97405-8014
          </a>
          <a
            href={WHATSAPP_GERAL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 btn-primary !h-auto py-3 px-4 text-sm rounded-full"
          >
            <FaWhatsapp size={16} />
            Falar com especialista
          </a>
        </nav>
      </div>
    </header>
  )
}
