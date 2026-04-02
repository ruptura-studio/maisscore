import Image from 'next/image'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { WHATSAPP_GERAL } from '@/lib/config'

export function HeaderTopBar() {
  return (
    <div className="hidden lg:block border-b border-brand-border">
      <div className="container-ms grid grid-cols-3 items-center py-2">
        {/* Left: email */}
        <div className="flex items-center">
          <a
            href="mailto:contato@maisscore.com.br"
            className="flex items-center gap-2 text-txt-sm text-disabled hover:text-brand-orange transition-colors"
          >
            <Image src="/icons/email-icon.svg" alt="" width={12} height={12} className="shrink-0" />
            contato@maisscore.com.br
          </a>
        </div>

        {/* Center: address */}
        <div className="flex items-center justify-center">
          <span className="flex items-center gap-2 text-txt-sm text-disabled">
            <Image src="/icons/location-icon.svg" alt="" width={12} height={12} className="shrink-0" />
            Alameda Rio Negro, 503, Alphaville, Barueri-SP
          </span>
        </div>

        {/* Right: social */}
        <div className="flex items-center justify-end gap-2.5 text-txt-sm">
          <a
            href="https://instagram.com/maisscore"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-disabled hover:text-brand-orange transition-colors"
          >
            <span className="text-brand-orange">/</span>
            <FaInstagram size={12} className="text-brand-orange" />
            <span>Instagram</span>
          </a>
          <a
            href={WHATSAPP_GERAL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-disabled hover:text-brand-orange transition-colors"
          >
            <span className="text-brand-orange">/</span>
            <FaWhatsapp size={12} className="text-brand-orange" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  )
}
