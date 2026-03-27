'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { cn } from '@/lib/utils'
import { WHATSAPP_GERAL } from '@/lib/config'
import Image from 'next/image'

const navLinks = [
  { label: 'Nossos Clientes', href: '#depoimentos' },
  { label: 'Sobre Nós', href: '#sobre' },
  { label: 'Como Funciona', href: '#como-funciona' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#cta' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isStyleguide = pathname.startsWith('/styleguide')

  return (
    <header className={cn('w-full bg-white border-b border-brand-border sticky top-0 z-50', isStyleguide && 'm-0')}>
      {/* Top bar */}
      <div className={cn('hidden lg:block border-b border-brand-border', isStyleguide && '!hidden')}>
        <div className="container-ms grid grid-cols-3 items-center py-2">
          {/* Left: email */}
          <div className="flex items-center">
            <a
              href="mailto:contato@maisscore.com.br"
              className="flex items-center gap-2 text-[14px] text-brand-navy hover:text-brand-orange transition-colors"
            >
              <Image src="/icons/email-icon.svg" alt="" width={14} height={14} className="shrink-0" />
              contato@maisscore.com.br
            </a>
          </div>

          {/* Center: address */}
          <div className="flex items-center justify-center">
            <span className="flex items-center gap-2 text-[14px] text-brand-navy">
              <Image src="/icons/location-icon.svg" alt="" width={14} height={14} className="shrink-0" />
              Alameda Rio Negro, 503, Alphaville, Barueri-SP
            </span>
          </div>

          {/* Right: social */}
          <div className="flex items-center justify-end gap-[10px] text-[12px]">
            <a
              href="https://instagram.com/maisscore"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-brand-orange transition-colors"
            >
              <span className="text-brand-orange">/</span>
              <FaInstagram size={14} className="text-brand-orange" />
              <span className="text-brand-navy">Instagram</span>
            </a>
            <a
              href={WHATSAPP_GERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-brand-orange transition-colors"
            >
              <span className="text-brand-orange">/</span>
              <FaWhatsapp size={14} className="text-brand-orange" />
              <span className="text-brand-navy">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className={cn('flex items-center justify-between', isStyleguide ? 'py-4 px-4' : 'container-ms py-4 lg:py-5')}>
        {/* Logo */}
        <a href={isStyleguide ? '/styleguide' : '/'} className="flex items-center shrink-0">
          <Image
            src="/img/logo-mais-score-black.svg"
            alt="Mais Score"
            width={160}
            height={42}
            priority
          />
        </a>

        {/* Desktop Nav */}
        <nav className={cn('hidden lg:flex items-center gap-1', isStyleguide && '!hidden')}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link flex items-center gap-1 px-3 py-2 text-[15px] font-light whitespace-nowrap"
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
          className={cn('hidden lg:flex items-center gap-2 text-brand-navy font-medium text-[16px] hover:text-brand-orange transition-colors', isStyleguide && '!hidden')}
        >
          <Image src="/icons/whatsapp-icon.svg" alt="" width={28} height={28} className="shrink-0" />
          15 97405-8014
        </a>

        {/* Mobile Menu Toggle */}
        {!isStyleguide && (
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
              className="px-3 py-3 text-[15px] text-brand-navy hover:text-brand-orange transition-colors border-b border-[#f0f0f0]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+5515974058014"
            className="mt-3 flex items-center gap-2 text-brand-navy font-medium text-[15px] px-3 py-2"
          >
            <Image src="/icons/whatsapp-icon.svg" alt="" width={20} height={20} className="shrink-0" />
            15 97405-8014
          </a>
          <a
            href={WHATSAPP_GERAL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 btn-primary !h-auto py-3 px-4 text-[15px] rounded-full"
          >
            <FaWhatsapp size={16} />
            Falar com especialista
          </a>
        </nav>
      </div>
    </header>
  )
}
