import Image from 'next/image'
import { cn } from '@/lib/utils'

export const icons = {
  // Navegação
  'arrow-right':        '/icons/arrow-right.svg',
  'arrow-up':           '/icons/arrow-up-icon.svg',
  'chevron-right':      '/icons/chevron-right.svg',
  // Status
  'check-circle':       '/icons/check-circle-icon.svg',
  'check-circle-orange': '/icons/check-circle-icon-orange.svg',
  // Contato
  'email':              '/icons/email-icon.svg',
  'location':           '/icons/location-icon.svg',
  'whatsapp':           '/icons/whatsapp-icon.svg',
  // Negócio
  'banco':              '/icons/icon-banco.svg',
  'calendar':           '/icons/icon-calendar.svg',
  'card-slash':         '/icons/icon-card-slash.svg',
  'carro':              '/icons/icon-carro.svg',
  'casa':               '/icons/icon-casa.svg',
  'justice':            '/icons/icon-justice.svg',
  'negativados':        '/icons/icon-negativados.svg',
  // UI
  'aspas':              '/icons/icon-aspas.svg',
  'ast':                '/icons/icon-ast.svg',
  'dialogo':            '/icons/icon-dialogo.svg',
  'visibilidade':       '/icons/icon-visibilidade.svg',
  // Marca
  'symbol':             '/icons/Symbol.svg',
} as const

export type IconName = keyof typeof icons

interface IconProps {
  name: IconName
  size?: number
  className?: string
  alt?: string
}

export function Icon({ name, size = 24, className, alt = '' }: IconProps) {
  return (
    <Image
      src={icons[name]}
      alt={alt}
      width={size}
      height={size}
      className={cn(className)}
    />
  )
}
