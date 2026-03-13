import { MessageCircle, ChevronRight } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/5515974058014?text=Ol%C3%A1%2C%20quero%20regularizar%20meu%20CPF'

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://www.figma.com/api/mcp/asset/249e8c4c-2fd6-4c40-bbb5-b2b0755aa176"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
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
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-accent-dark text-white font-medium text-para-md px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full"
            >
              <MessageCircle size={16} />
              Fale com um especialista
            </a>

            <a
              href="#como-funciona"
              className="flex items-center justify-center gap-2 bg-secondary text-primary font-medium text-para-md px-6 py-3 rounded-lg hover:bg-white transition-colors w-full"
            >
              <ChevronRight size={16} />
              Como funciona
            </a>
          </div>

          {/* Social proof badges */}
          <div className="flex flex-wrap gap-3 mt-2">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
              <span className="text-white text-para-xs font-semibold">⭐ 4.8 no Google</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
              <span className="text-white text-para-xs font-semibold">✅ 97% de sucesso</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
              <span className="text-white text-para-xs font-semibold">⚡ 15 dias úteis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
