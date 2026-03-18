import { ShieldCheck } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { WHATSAPP_GERAL, WHATSAPP_COMPRAR } from '@/lib/config'

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
              href={WHATSAPP_GERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-w-[240px] px-6 py-[10px] rounded-lg border border-border-light bg-white shadow-sm text-para-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              <FaWhatsapp size={18} className="mr-2" />
              Falar com um especialista
            </a>

            {/* Comprar — filled */}
            <a
              href={WHATSAPP_COMPRAR}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-w-[240px] px-6 py-[10px] rounded-lg bg-accent-dark text-white text-para-sm font-medium hover:bg-accent-dark/85 transition-colors"
            >
              <ShieldCheck size={18} className="mr-2" />
              Comprar Limpa Nome
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
