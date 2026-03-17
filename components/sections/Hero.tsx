import { BookOpen } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/img/hero-background.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container-ms relative z-10 py-32 md:py-40">
        <div className="flex flex-col gap-8 max-w-[560px]">
          {/* Heading */}
          <h1 className="text-white font-semibold text-[40px] md:text-[48px] leading-tight tracking-[-1.5px]">
            Já recuperamos a liberdade financeira de 1.142 famílias endividadas
          </h1>

          {/* Description */}
          <p className="text-white/90 text-para-lg leading-relaxed">
            A Mais Score é especialista em remover restrições de crédito de sites como Serasa, SPC,
            Boa Vista e Cartórios de Protesto. Tudo por meio de um processo legalizado, rápido e sem
            promessas milagrosas.
          </p>

          <p className="text-white font-semibold text-heading-3 tracking-[-1px]">
            Não existe método mágico!
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-3 w-full max-w-[350px]">
            <a
              href="#como-funciona"
              className="flex items-center justify-center gap-2 bg-accent-dark text-white font-medium text-para-md px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full"
            >
              <BookOpen size={16} />
              Você já conhece o Limpa Nome?
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
