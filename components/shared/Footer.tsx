'use client'

import Image from 'next/image'
import { ChevronRight, Mail, ShieldCheck, FileText, Receipt } from 'lucide-react'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { usePathname } from 'next/navigation'

const itemClass = 'flex items-center gap-2 text-para-sm text-neutral-50 hover:text-white transition-colors whitespace-nowrap'
const iconClass = 'shrink-0 text-neutral-50'

const navLinks = [
  { label: 'Nossos clientes', href: '#depoimentos' },
  { label: 'Sobre nós', href: '#sobre' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'FAQ', href: '#faq' },
]

const contactLinks = [
  {
    icon: <FaWhatsapp size={20} className={iconClass} />,
    label: '(15) 97405-8014',
    href: 'https://wa.me/5515974058014',
    external: true,
  },
  {
    icon: <Mail size={20} className={iconClass} />,
    label: 'contato@maisscore.com.br',
    href: 'mailto:contato@maisscore.com.br',
    external: false,
  },
  {
    icon: <FaInstagram size={20} className={iconClass} />,
    label: '@mais.score.br',
    href: 'https://instagram.com/mais.score.br',
    external: true,
  },
]

const legalLinks = [
  { icon: <ShieldCheck size={20} className={iconClass} />, label: 'Política de privacidade', href: '/privacidade' },
  { icon: <FileText size={20} className={iconClass} />, label: 'Termos de uso', href: '/termos' },
  { icon: <Receipt size={20} className={iconClass} />, label: 'Política de reembolso', href: '/reembolso' },
]

export function Footer() {
  const year = new Date().getFullYear()
  const pathname = usePathname()
  const isDS = pathname.startsWith('/designsystem')

  return (
    <footer className="bg-grafite text-white">
      {!isDS && <div className="container-ms py-16">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Column 1 — Logo + tagline */}
          <div className="flex flex-col gap-4 flex-1 p-6">
            <a href="/" className="shrink-0">
              <Image
                src="/logos/logo-horizontal-dark.svg"
                alt="Mais Score"
                width={125}
                height={32}
              />
            </a>
            <p className="text-para-sm text-neutral-50 leading-6">
              Especialistas em remoção de restrições de crédito. Devolvendo a liberdade financeira para brasileiros desde 2021.
            </p>
          </div>

          {/* Column 2 — Nav links */}
          <div className="flex flex-col gap-4 p-6 shrink-0 w-full lg:w-[230px]">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={itemClass}>
                <ChevronRight size={20} className={iconClass} />
                {link.label}
              </a>
            ))}
          </div>

          {/* Column 3 — Fale conosco */}
          <div className="flex flex-col gap-4 flex-1 p-6">
            <p className="text-para-lg font-medium text-neutral-50">
              Fale conosco
            </p>
            {contactLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={itemClass}
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </div>

          {/* Column 4 — Institucional */}
          <div className="flex flex-col gap-4 flex-1 p-6">
            <p className="text-para-lg font-medium text-neutral-50">
              Institucional
            </p>
            {legalLinks.map((item) => (
              <a key={item.href} href={item.href} className={itemClass}>
                {item.icon}
                {item.label}
              </a>
            ))}
          </div>

        </div>
      </div>}

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-[#171717]">
        <div className="container-ms pt-4 pb-8 flex items-center justify-center">
          <p className="text-para-sm text-neutral-400 text-center">
            © {year} Mais Score, uma marca Ruptura Comércio Digital Ltda. | CNPJ: 64.945.712/0001-66
          </p>
        </div>
      </div>
    </footer>
  )
}
