'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Política de privacidade', href: '/privacidade' },
  { label: 'Termos de uso', href: '/termos' },
  { label: 'Políticas de reembolso', href: '/reembolso' },
]

const contactLinks = [
  { label: '15 97405-8014', href: 'https://wa.me/5515974058014', external: true },
  { label: 'contato@maisscore.com.br', href: 'mailto:contato@maisscore.com.br', external: false },
  { label: 'Instagram: @mais.score.br', href: 'https://instagram.com/mais.score.br', external: true },
]

const linkClass =
  'flex items-center gap-2 font-dm text-sm text-white/70 hover:text-white transition-colors'

export function Footer() {
  const pathname = usePathname()
  const isDS = pathname.startsWith('/designsystem')

  if (isDS) return null

  return (
    <footer>
      {/* Main content */}
      <div
        className="w-full bg-brand-navy bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/img/footer.png')",
        }}
      >
        <div className="container-ms py-[100px]">
          <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">

            {/* Coluna esquerda — logo + tagline */}
            <div className="flex flex-col gap-6 lg:max-w-[264px]">
              <a href="/">
                <Image
                  src="/img/logo-mais-score-white.svg"
                  alt="Mais Score"
                  width={239}
                  height={39}
                  className="h-auto w-auto max-w-[200px]"
                />
              </a>
              <p className="font-dm text-p text-white/80">
                Não somos uma empresa de negociação de dívidas. Somos especialistas em devolver o que
                o seu nome merece: acesso, crédito e dignidade.
              </p>
            </div>

            {/* Colunas direitas */}
            <div className="flex flex-1 flex-col gap-10">
              {/* Links + contatos */}
              <div className="flex flex-col gap-10 sm:flex-row sm:justify-end sm:gap-16">

                {/* Links institucionais */}
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a key={link.href} href={link.href} className={linkClass}>
                      <Image
                        src="/icons/chevron-right.svg"
                        alt=""
                        width={14}
                        height={14}
                        className="shrink-0"
                      />
                      {link.label}
                    </a>
                  ))}
                </div>

                {/* Contatos */}
                <div className="flex flex-col gap-4">
                  {contactLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className={linkClass}
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      <Image
                        src="/icons/chevron-right.svg"
                        alt=""
                        width={14}
                        height={14}
                        className="shrink-0"
                      />
                      {link.label}
                    </a>
                  ))}
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full bg-brand-navy border-t border-white/10">
        <div className="container-ms py-9 flex items-center justify-between gap-6">
          <p className="font-dm text-txt-xs text-brand-orange">
            © 2026 Mais Score — uma marca Ruptura Comércio Digital Ltda. | CNPJ: 64.945.712/0001-66
            - Alameda Rio Negro, 503, Alphaville, Barueri-SP
          </p>
          <Image
            src="/img/payments.png"
            alt="Visa, Mastercard e PIX"
            width={180}
            height={40}
            className="h-auto w-auto max-h-[30px] shrink-0"
          />
        </div>
      </div>
    </footer>
  )
}
