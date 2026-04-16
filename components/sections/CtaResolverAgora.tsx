import Image from 'next/image'

export function CtaResolverAgora() {
  return (
    <section className="relative w-full overflow-hidden py-10 sm:py-24">
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
        <div className="flex flex-col gap-8 max-w-[60%] sm:max-w-content-lg">
          <blockquote className="font-dm text-white text-[14px] leading-[16px] sm:text-h2">
            "Enquanto você espera, seu CPF continua bloqueando crédito, emprego e oportunidades."
          </blockquote>
        </div>
      </div>
    </section>
  )
}
