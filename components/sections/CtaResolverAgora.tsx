import Image from 'next/image'
import { WHATSAPP_COMPRAR } from '@/lib/config'

export function CtaResolverAgora() {
  return (
    <section className="relative w-full overflow-hidden py-24">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/img/cta-resolver-agora.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Dark gradient overlay — heavy on the right, fades left */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to left, rgba(16,28,46,0.90) 0%, rgba(16,28,46,0.75) 40%, rgba(16,28,46,0.30) 70%, rgba(16,28,46,0.05) 100%)',
        }}
      />

      {/* Content — right-aligned */}
      <div className="container-ms relative z-10 flex justify-end">
        <div className="flex flex-col gap-8 max-w-content-lg">
          <blockquote className="font-dm text-white text-h2">
            "Enquanto você espera, seu CPF continua bloqueando crédito, emprego e oportunidades."
          </blockquote>

          <p className="font-sans text-white/75 text-p">
            Cada dia com o nome sujo é um dia pagando mais caro: em juros, em oportunidades
            perdidas, em dependência. O problema não se resolve sozinho.
          </p>

          <div>
            <a
              href="/checkout"
              className="btn-primary"
            >
              Resolver Agora
              <Image src="/icons/arrow-up-icon.svg" alt="" width={10} height={10} className="shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
