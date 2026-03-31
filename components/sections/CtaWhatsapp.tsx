import Image from 'next/image'
import { WHATSAPP_GERAL } from '@/lib/config'

export function CtaWhatsapp() {
  return (
    <section className="relative w-full overflow-hidden bg-brand-navy" style={{ minHeight: '560px' }}>
      {/* Imagem da mulher — lado esquerdo */}
      <div className="absolute bottom-0 left-0 h-full w-1/2 hidden lg:block">
        <Image
          src="/img/cta-whatsapp.png"
          alt="Mulher segurando tablet"
          fill
          className="object-cover object-right-bottom"
          sizes="50vw"
        />
        {/* Fade para a direita para blend com o fundo */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(16,28,46,0) 50%, rgba(16,28,46,1) 100%)',
          }}
        />
      </div>

      {/* Conteúdo — lado direito */}
      <div
        className="container-ms relative z-10 flex items-center justify-end py-20"
        style={{ minHeight: '560px' }}
      >
        <div className="flex w-full flex-col gap-6 lg:max-w-[520px]">
          {/* TODO: text-[52px] sem token — usando text-h1 (48px, mais próximo) */}
          <h2 className="font-dm text-h1 font-normal text-white">
            Fale com a gente agora pelo WhatsApp
          </h2>
          {/* text-[16px] → text-p-lg (16px/Geist); lg:text-[18px] → lg:text-h6 font-normal (18px/DM) */}
          <p className="font-sans text-p-lg text-white/70 lg:text-h6 lg:font-normal">
            Nossa equipe está pronta para tirar suas dúvidas, avaliar o seu caso e
            iniciar o processo de regularização do seu CPF ainda hoje.
          </p>
          <div>
            <a
              href={WHATSAPP_GERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
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
