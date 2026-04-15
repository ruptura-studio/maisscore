"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const FAQ_ESQUERDA = [
  {
    pergunta: 'O que exatamente a Mais Score faz?',
    resposta:
      'Removemos a exposição do seu CPF ou CNPJ dos sistemas Serasa, SPC, Boa Vista e Cartórios de Protesto por meio de um processo jurídico baseado no Art. 42 do Código de Defesa do Consumidor. Seu nome fica limpo enquanto o processo estiver ativo.',
  },
  {
    pergunta: 'A Mais Score quita minhas dívidas?',
    resposta:
      'Não. Nosso serviço não é uma renegociação de dívidas. As dívidas continuam existindo, mas a exposição do seu nome nos órgãos de proteção ao crédito é removida. Isso devolve seu acesso ao crédito sem que você precise pagar os valores originais das dívidas.',
  },
  {
    pergunta: 'Quanto tempo leva para meu nome ficar limpo?',
    resposta:
      'O processo começa em até 7 dias úteis após a contratação. O nome fica limpo em 15 a 30 dias úteis. É um prazo extremamente rápido considerando que muitas pessoas ficam anos negativadas sem perspectiva de solução.',
  },
  {
    pergunta: 'Isso é legal? Tenho medo de ser golpe.',
    resposta:
      'É 100% legal. O processo é fundamentado no Art. 42 do Código de Defesa do Consumidor (Lei 8.078/1990). Não prometemos crédito garantido, apenas a regularização do seu CPF — um direito previsto em lei. Nossa taxa de 97% de sucesso é resultado validado, não promessa de marketing.',
  },
  {
    pergunta: 'Como funciona o acompanhamento do processo?',
    resposta:
      'Todo o acompanhamento é feito pelo WhatsApp, do início ao fim. Você recebe atualizações em cada etapa e tem acesso direto à nossa equipe para tirar dúvidas. Não somos um software automatizado — somos pessoas cuidando de pessoas.',
  },
]

const FAQ_DIREITA = [
  {
    pergunta: 'Quanto custa e quais são as formas de pagamento?',
    resposta:
      'O serviço para CPF custa R$ 595,00 e para CNPJ R$ 795,00. Aceitamos PIX à vista ou parcelamento em 2× no cartão de crédito. Não há taxas ocultas nem cobranças adicionais durante o processo.',
  },
  {
    pergunta: 'Existe garantia se não funcionar?',
    resposta:
      'Sim. Se seu nome não ficar limpo em até 30 dias úteis, devolvemos 100% do valor investido. Sem letras miúdas, sem justificativas. A garantia está amparada no Art. 42 do Código de Defesa do Consumidor.',
  },
  {
    pergunta: 'Já tentei outras formas antes e não funcionou. Por que seria diferente?',
    resposta:
      'Nem toda abordagem é igual. Existem tentativas amadoras e estratégias juridicamente fundamentadas. O fato de não ter funcionado antes não significa que é impossível — significa que a abordagem usada era inadequada. Nossos 97% de sucesso comprovam isso na prática.',
  },
  {
    pergunta: 'Meu nome vai ficar limpo para sempre?',
    resposta:
      'O nome permanece limpo enquanto o processo jurídico estiver ativo. Se você contrair novas dívidas e ficar inadimplente, o nome pode ser negativado novamente. Também existe a possibilidade de Serasa, SPC ou Boa Vista derrubarem a liminar — neste caso, realizamos o reprotocolo.',
  },
  {
    pergunta: 'Após limpar o nome, consigo crédito automaticamente?',
    resposta:
      'Não automaticamente. A limpeza do nome remove o principal bloqueio para aprovação de crédito, mas a decisão final é de cada instituição financeira. Com o nome limpo, as chances aumentam significativamente — sem nome limpo, o crédito é praticamente impossível.',
  },
]

export function FAQ() {
  return (
    <section className="w-full bg-white py-10 sm:py-24">
      <div className="container-ms">
        {/* Cabeçalho */}
        <div className="mb-4 sm:mb-16 flex flex-col items-center gap-4 text-center">
          <p className="font-dm text-cap text-disabled">
            DÚVIDAS FREQUENTES
          </p>
          <h2 className="font-dm text-h2 text-brand-navy">
            Tudo que você precisa saber antes de começar
          </h2>
        </div>

        {/* Grid de duas colunas */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Coluna esquerda */}
          <Accordion
            type="single"
            collapsible
            className="w-full rounded-lg border border-brand-border bg-white divide-y divide-brand-border"
          >
            {FAQ_ESQUERDA.map((item, i) => (
              <AccordionItem key={i} value={`esq-${i}`} className="border-0">
                <AccordionTrigger className="px-5 py-4 text-left font-dm text-sm text-brand-navy/60 hover:no-underline hover:text-brand-orange [&[data-state=open]]:text-brand-navy">
                  {item.pergunta}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 font-dm text-p text-foreground-alt">
                  {item.resposta}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Coluna direita */}
          <Accordion
            type="single"
            collapsible
            className="w-full rounded-lg border border-brand-border bg-white divide-y divide-brand-border"
          >
            {FAQ_DIREITA.map((item, i) => (
              <AccordionItem key={i} value={`dir-${i}`} className="border-0">
                <AccordionTrigger className="px-5 py-4 text-left font-dm text-sm text-brand-navy/60 hover:no-underline hover:text-brand-orange [&[data-state=open]]:text-brand-navy">
                  {item.pergunta}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 font-dm text-p text-foreground-alt">
                  {item.resposta}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
