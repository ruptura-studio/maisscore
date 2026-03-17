import { ShieldCheck } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

const WHATSAPP_URL = 'https://wa.me/5515974058014?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20limpeza%20do%20meu%20nome.'
const COMPRAR_URL = 'https://wa.me/5515974058014?text=Ol%C3%A1%2C%20quero%20comprar%20o%20Limpa%20Nome'

export function CTA() {
  return (
    <section id="cta" className="w-full py-24 bg-white">
      <div className="container-ms flex flex-col items-center text-center gap-6 max-w-[720px] mx-auto">

        {/* Title */}
        <div className="flex flex-col gap-4 items-center px-4 py-6 w-full">
          <span className="text-caption text-muted-foreground uppercase tracking-[1.5px]">
            não perca esta oportunidade
          </span>
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-tight tracking-[-1.5px] text-foreground">
            Fale com um de nossos especialistas
          </h2>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-6 items-center w-full">
          <p className="text-para-md text-muted-foreground text-center max-w-[560px]">
            Nosso atendimento está disponível 24 horas por dia e 7 dias por semana.
            <br />
            Mande um olá no WhatsApp e tire todas as suas dúvidas
          </p>

          {/* Buttons */}
          <div className="flex gap-6 items-end justify-center flex-wrap">
            {/* WhatsApp — outline */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-w-[240px] px-6 py-[10px] rounded-lg border border-[#d4d4d4] bg-white shadow-sm text-para-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              <FaWhatsapp size={18} className="mr-2" />
              Falar com um especialista
            </a>

            {/* Comprar — filled */}
            <div className="flex flex-col gap-2 items-center">
              <a
                href={COMPRAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-w-[240px] px-6 py-[10px] rounded-lg bg-accent-dark text-white text-para-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <ShieldCheck size={18} className="mr-2" />
                Comprar Limpa Nome
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
