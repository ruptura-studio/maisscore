import Image from 'next/image'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { WHATSAPP_GERAL } from '@/lib/config'

export function HeaderSimple() {
  return (
    <header className="w-full bg-white border-b border-brand-border">
      <div className="container-ms flex items-center justify-between py-4 lg:py-5">
        <a href="/" className="flex items-center shrink-0">
          <Image
            src="/img/logo-mais-score-black.svg"
            alt="Mais Score"
            width={144}
            height={38}
            priority
          />
        </a>

        <div className="flex items-center gap-4 text-txt-sm">
          <a
            href="https://www.instagram.com/maisscore.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-disabled hover:text-brand-orange transition-colors"
          >
            <FaInstagram size={14} className="text-brand-orange" />
            <span>Instagram</span>
          </a>
          <a
            href={WHATSAPP_GERAL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-disabled hover:text-brand-orange transition-colors"
          >
            <FaWhatsapp size={14} className="text-brand-orange" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  )
}
