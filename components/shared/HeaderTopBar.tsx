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
  )
}
