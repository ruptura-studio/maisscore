import Image from 'next/image'
import { WHATSAPP_GERAL } from '@/lib/config'

export function CtaWhatsapp() {
  return (
    <section className="relative w-full overflow-hidden bg-brand-navy">
      {/* Imagem da mulher — lado esquerdo */}
      <div className="absolute bottom-0 left-0 h-full w-3/4 hidden lg:block">
        <Image
          src="/img/cta-whatsapp.png"
          alt="Mulher segurando tablet"
          fill
          className="object-cover object-left-top"
          sizes="50vw"
        />
        {/* Fade para a direita para blend com o fundo */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(16,28,46,0) 40%, rgba(16,28,46,0.5) 70%, rgba(16,28,46,1) 100%)',
          }}
        />
      </div>

      {/* Conteúdo — lado direito */}
      <div
        className="container-ms relative z-10 flex items-center justify-end py-10 sm:py-20"
      >
        <div className="flex w-full flex-col gap-6 lg:max-w-content-md">
          <h2 className="font-dm text-h2 text-white">
            Falar com um especialista pelo WhatsApp agora!
          </h2>
          {/* text-[16px] → text-lg (16px/Geist); lg:text-[18px] → lg:text-h3 (18px/DM) */}
          <p className="font-sans text-sm text-white/70 pb-4">
            Nossa equipe está pronta para tirar suas dúvidas, avaliar o seu caso e
            iniciar o processo de regularização agora mesmo.
          </p>
          <div>
            <a
              href={WHATSAPP_GERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto justify-center text-lg"
            >
              Falar no WhatsApp
              <Image
                src="/icons/arrow-up-icon.svg"
                alt=""
                width={10}
                height={10}
                className="shrink-0"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
