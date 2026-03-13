import { MessageCircle } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

const WHATSAPP_URL = 'https://wa.me/5515974058014?text=Ol%C3%A1%2C%20quero%20regularizar%20meu%20CPF'

export function CTA() {
  return (
    <section id="cta" className="w-full py-24 bg-primary">
      <div className="container-ms flex flex-col items-center text-center gap-8">
        <div className="flex flex-col gap-4 max-w-[640px]">
          <span className="text-caption text-accent uppercase tracking-[1.5px]">Pronto para recomeçar?</span>
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-tight tracking-[-1.5px] text-white">
            Fale com um de nossos especialistas
          </h2>
          <p className="text-para-lg text-white/80 leading-relaxed">
            A consulta inicial é gratuita. Em menos de 5 minutos você saberá se podemos limpar o
            seu nome e quanto tempo vai levar.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-8 w-full max-w-[480px]">
          {[
            { value: '1.142', label: 'Famílias atendidas' },
            { value: '97%', label: 'Taxa de sucesso' },
            { value: '15 dias', label: 'Prazo médio' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span className="text-[28px] font-semibold text-white leading-tight">{s.value}</span>
              <span className="text-para-xs text-white/60">{s.label}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-[#25D366] text-white font-semibold text-para-lg px-8 py-4 rounded-lg hover:bg-[#20b558] transition-colors shadow-lg"
        >
          <FaWhatsapp size={22} />
          Falar pelo WhatsApp agora
        </a>

        <p className="text-para-xs text-white/40">
          (15) 97405-8014 · contato@maisscore.com.br · Atendimento de seg a sex, 8h às 18h
        </p>
      </div>
    </section>
  )
}
