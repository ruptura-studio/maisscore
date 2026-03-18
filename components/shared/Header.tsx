'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { cn } from '@/lib/utils'
import { WHATSAPP_GERAL } from '@/lib/config'
import Image from 'next/image'

const navLinks = [
  { label: 'Nossos clientes', href: '#depoimentos' },
  { label: 'Sobre nós', href: '#sobre' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#cta' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300',
      scrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'
    )}>
      <div className="container-ms flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="flex items-center shrink-0">
          <Image
            src="/logos/logo-horizontal-dark.svg"
            alt="Mais Score"
            width={140}
            height={40}
            priority
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-para-md text-white hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <a
          href={WHATSAPP_GERAL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-secondary text-accent-dark font-medium text-para-sm px-4 py-2 rounded-lg hover:bg-white transition-colors"
        >
          <FaWhatsapp size={16} />
          Falar com um especialista
        </a>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={cn(
        'md:hidden bg-black/90 border-t border-white/10 overflow-hidden transition-all duration-300',
        open ? 'max-h-[400px]' : 'max-h-0'
      )}>
        <nav className="container-ms flex flex-col py-4 gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-3 py-3 text-para-md text-white hover:text-accent transition-colors border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_GERAL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 bg-secondary text-accent-dark font-medium text-para-sm px-4 py-3 rounded-lg"
          >
            <FaWhatsapp size={16} />
            Falar com um especialista
          </a>
        </nav>
      </div>
    </header>
  )
}
