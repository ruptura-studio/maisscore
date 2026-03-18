import Image from 'next/image'

const cards = [
  {
    title: 'Nascemos de uma crise, crescemos com propósito',
    desc: 'Em 2021, no auge da pandemia, vimos famílias inteiras sendo excluídas do sistema financeiro por dívidas que a vida — e não o descuido — havia criado. Foi dessa dor que surgiu a Mais Score: com a missão de devolver dignidade e oportunidades a quem mais precisava.',
  },
  {
    title: 'Construímos o caminho que não existia',
    desc: 'Não havia um método simples, acessível e juridicamente seguro para limpar o nome no Brasil. Então criamos o nosso. Um processo próprio, eficaz e transparente, que hoje remove restrições nas principais plataformas de dívida ativa — com 97% de taxa de sucesso.',
  },
  {
    title: 'Ir além é parte do nosso processo',
    desc: 'Limpar o nome abre portas, mas manter elas abertas exige orientação. Por isso, cada cliente da Mais Score recebe acompanhamento sobre como preservar o score saudável, evitar novas negativações e construir um histórico de crédito que sustente os sonhos que agora voltaram a ser possíveis.',
  },
  {
    title: 'Nossas pessoas cuidando de pessoas',
    desc: 'Não somos um software nem um serviço automatizado. Somos um time que acredita que cada CPF tem uma história — e que essa história merece atenção real. Cada caso é tratado com seriedade, empatia e o compromisso de que o nosso trabalho só termina quando você conquista o que precisa.',
  },
]

export function SobreNos() {
  return (
    <section id="sobre" className="w-full py-24 bg-secondary">
      <div className="container-ms flex flex-col gap-16">
        {/* Title */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="text-caption text-foreground uppercase tracking-[1.5px]">Sobre nós</span>
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-tight tracking-[-1.5px] text-foreground max-w-[760px]">
            Existimos para provar que dívida do passado não define seu futuro
          </h2>
        </div>

        {/* Office photo + cards */}
        <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-8 items-stretch">
          {/* Photo with overlay text */}
          <div className="relative rounded-lg overflow-hidden w-full lg:max-w-[450px] min-h-[480px] lg:min-h-0 bg-gray-900">
            <Image
              src="/img/foto-escrit%C3%B3rio-alphaville.png"
              alt="Equipe Mais Score"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 450px"
            />
            {/* Gradiente garante legibilidade do texto sobre qualquer imagem */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
            <div className="absolute top-0 left-0 p-8 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
              <p className="text-[20px] font-semibold leading-tight mb-3 text-white">
                Muito mais que uma empresa, somos o seu recomeço
              </p>
              <p className="text-para-sm text-white leading-relaxed">
                Limpar o nome é só o primeiro passo, por isso, cada cliente que passa pela Mais Score
                recebe toda orientação possível sobre como manter o score saudável e evitar novas
                negativações no mercado.
              </p>
            </div>
          </div>

          {/* Cards 2x2 — sem ícones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
            {cards.map((card) => (
              <div key={card.title} className="border border-border rounded-lg p-6 flex flex-col gap-3">
                <h3 className="text-heading-4 font-semibold text-foreground">{card.title}</h3>
                <p className="text-para-sm text-foreground leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
