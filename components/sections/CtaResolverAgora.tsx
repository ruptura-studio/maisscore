import Image from 'next/image'

export function CtaResolverAgora() {
  return (
    <section className="relative w-full overflow-hidden py-12 sm:py-28 bg-brand-navy">
      {/* Container-scoped background */}
      <div className="absolute inset-0 flex justify-center">
        <div className="container-ms relative w-full">
          <Image
            src="/img/cta-resolver-agora.png"
            alt=""
            fill
            className="object-cover object-center "
            sizes="100vw"
          />
          {/* Gradient overlay — fade direita */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to left, rgba(16,28,46,0.90) 0%, rgba(16,28,46,0.75) 40%, rgba(16,28,46,0.30) 70%, rgba(16,28,46,0.05) 100%)',
            }}
          />
          {/* Fade lateral esquerda */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(16,28,46,0.90) 0%, rgba(16,28,46,0.00) 25%)',
            }}
          />
        </div>
      </div>

      {/* Content — right-aligned */}
      <div className="container-ms relative z-10 flex justify-end">
        <div className="flex flex-col gap-8 max-w-[60%] sm:max-w-[310px]">
          <blockquote className="font-dm text-white text-[14px] leading-[16px] sm:text-h2">
            "Enquanto você espera, seu CPF continua bloqueando crédito, emprego e oportunidades."
          </blockquote>
        </div>
      </div>
    </section>
  )
}
