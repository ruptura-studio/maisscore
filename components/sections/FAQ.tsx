'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const perguntas = [
  // — Descoberta —
  {
    q: 'Como faço para saber se estou com restrição no meu nome?',
    a: 'Você pode procurar a empresa que fez a restrição, ou pode fazer uma consulta aqui com a Mais Score mesmo.',
  },
  {
    q: 'Quando faz sentido eu solicitar o serviço de Limpa Nome?',
    a: 'Sempre que você estiver com o nome restrito e precisando de empréstimo, financiamento ou cartão de crédito.',
  },
  {
    q: 'Vocês atendem Pessoa Física e Empresas?',
    a: 'Sim, fazemos o mesmo trabalho para CPF e CNPJ.',
  },
  {
    q: 'Vocês atendem todo o Brasil?',
    a: 'Sim. Nosso processo é 100% digital e atendemos clientes em todos os estados brasileiros. Todo o acompanhamento é feito pelo WhatsApp, sem necessidade de presença física.',
  },
  // — Como funciona —
  {
    q: 'Como funciona o Limpa Nome?',
    a: 'Depois que você adquire o serviço, nossos advogados entram com uma liminar solicitando a remoção do seu nome de sistemas da Serasa, SPC, Boa Vista e de Cartórios de Protesto.',
  },
  {
    q: 'Quanto tempo leva para o nome ficar limpo?',
    a: 'Esse processo leva 7 dias úteis para iniciar, e depois que inicia, em no máximo até 15 dias úteis, seu nome estará limpo e você acompanha todo o processo pelo WhatsApp.',
  },
  {
    q: 'Existe alguma garantia de que meu nome vai sair destes sites?',
    a: 'Damos garantia absoluta e em contrato de que seu nome vai deixar de aparecer no Serasa, Boa Vista, SPC ou Cartórios de Protesto em até 15 dias úteis após a execução do processo. Temos 97% de taxa de sucesso e nos raros casos em que não conseguimos o resultado, oferecemos reembolso total. Trabalhamos com transparência e sem promessas impossíveis.',
  },
  // — Expectativas —
  {
    q: 'Depois que eu fizer o Limpa Nome, minhas dívidas deixam de existir?',
    a: 'Não, você continuará devendo, porém, seu nome não será mais exposto por sistemas como Serasa, Boa Vista, SPC ou em Cartórios de Protesto.',
  },
  {
    q: 'Este processo pode prejudicar meu Score?',
    a: 'Não. A remoção da restrição via processo jurídico não prejudica seu score — pelo contrário, tende a melhorá-lo progressivamente à medida que as negativações são retiradas.',
  },
  {
    q: 'O Limpa Nome garante que vou conseguir Crédito ou Financiamento?',
    a: 'Não. Mesmo estando com o nome limpo, o banco ou financeira podem negar o serviço financeiro por vários outros motivos.',
  },
  {
    q: 'Meu nome pode voltar a ficar com restrições depois do Limpa Nome?',
    a: 'Sim e na maioria esmagadora dos casos são por dois motivos:\n1 - Se você fizer uma nova dívida e ficar inadimplente, seu nome volta a ter restrições.\n2 - Como se trata de um processo jurídico real, se a nossa liminar cair, seu nome também volta a aparecer nestes sistemas.\nMas nos dois casos, leva muito tempo para isso acontecer. É importante que você consiga alcançar seus objetivos como financiamento, empréstimo ou conseguir um cartão de crédito.',
  },
  // — Fora do escopo —
  {
    q: 'Vocês fazem a renegociação da minha dívida?',
    a: 'Não, para isso, você deve procurar empresas como o Serasa, Boa Vista, SPC ou o Cartório onde seu nome está restrito.',
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
            'text-foreground shrink-0 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          open ? 'max-h-[600px] pb-5' : 'max-h-0'
        )}
      >
        <p className="text-para-sm text-foreground leading-relaxed whitespace-pre-line">{resposta}</p>
      </div>
    </div>
  )
}

export function FAQ() {
  return (
    <section id="faq" className="w-full py-24 bg-white">
      <div className="container-ms">
        <div className="flex flex-col items-center gap-12 max-w-[800px] mx-auto">
          {/* Title — centered */}
          <div className="flex flex-col items-center text-center gap-3 w-full">
            <span className="text-caption text-foreground uppercase tracking-[1.5px]">Dúvidas</span>
            <h2 className="text-[36px] font-semibold leading-tight tracking-[-1.5px] text-foreground">
              Perguntas mais frequentes
            </h2>
          </div>

          {/* Accordion — full width */}
          <div className="w-full">
            {perguntas.map((p) => (
              <Item key={p.q} pergunta={p.q} resposta={p.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
