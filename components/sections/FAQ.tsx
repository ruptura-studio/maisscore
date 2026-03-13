'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const perguntas = [
  {
    q: 'Como funciona o processo de limpeza de nome?',
    a: 'Nosso processo é 100% jurídico. Analisamos suas dívidas, identificamos quais podem ser removidas por vias legais e abrimos o processo. Você acompanha tudo pelo WhatsApp em tempo real.',
  },
  {
    q: 'Quanto tempo leva para o nome ficar limpo?',
    a: 'O prazo médio é de 15 dias úteis. Em muitos casos conseguimos resultados em 7 a 12 dias, dependendo do birô de crédito e da natureza da dívida.',
  },
  {
    q: 'Quais birôs de crédito vocês atendem?',
    a: 'Atuamos nos principais: Serasa, SPC/BOA VISTA, Quod e Cartórios de Protesto em todo o Brasil.',
  },
  {
    q: 'Preciso pagar as dívidas para limpar o nome?',
    a: 'Não necessariamente. Analisamos cada caso individualmente. Em muitas situações é possível remover a restrição sem quitar a dívida integral, utilizando recursos jurídicos legítimos.',
  },
  {
    q: 'O processo é garantido?',
    a: 'Temos 97% de taxa de sucesso. Nos casos em que não conseguimos o resultado, oferecemos reembolso total. Trabalhamos com transparência e sem promessas impossíveis.',
  },
  {
    q: 'Como acompanho o andamento do processo?',
    a: 'Você recebe atualizações automáticas pelo WhatsApp a cada etapa do processo. Sem precisar ligar ou enviar e-mail — você é notificado proativamente.',
  },
  {
    q: 'Qual o custo do serviço?',
    a: 'O valor varia de acordo com o número e tipo de restrições. A consulta inicial é gratuita. Fale com um especialista pelo WhatsApp para receber uma proposta personalizada.',
  },
]

function Item({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border last:border-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="text-para-md font-medium text-foreground">{pergunta}</span>
        <ChevronDown
          size={18}
          className={cn(
            'text-muted shrink-0 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          open ? 'max-h-48 pb-5' : 'max-h-0'
        )}
      >
        <p className="text-para-sm text-muted leading-relaxed">{resposta}</p>
      </div>
    </div>
  )
}

export function FAQ() {
  return (
    <section id="faq" className="w-full py-24 bg-white">
      <div className="container-ms">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left */}
          <div className="flex flex-col gap-4 lg:max-w-[320px] shrink-0">
            <span className="text-caption text-muted uppercase tracking-[1.5px]">Dúvidas</span>
            <h2 className="text-[36px] font-semibold leading-tight tracking-[-1.5px] text-foreground">
              Perguntas mais frequentes
            </h2>
            <p className="text-para-md text-muted leading-relaxed">
              Ainda tem dúvidas? Fale com um especialista gratuitamente pelo WhatsApp.
            </p>
            <a
              href="https://wa.me/5515974058014"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent-dark text-white font-medium text-para-sm px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors w-fit mt-2"
            >
              Falar com especialista
            </a>
          </div>

          {/* Right - accordion */}
          <div className="flex-1 w-full">
            {perguntas.map((p) => (
              <Item key={p.q} pergunta={p.q} resposta={p.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
