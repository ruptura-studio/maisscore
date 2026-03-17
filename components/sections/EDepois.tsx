const cards = [
  {
    titulo: 'Financiar Imóveis',
    desc: 'Com o nome limpo, bancos e financeiras voltam a enxergar você como um bom pagador. Isso abre portas para tentar financiar a casa própria com grandes chances de aprovação e taxas mais acessíveis.',
  },
  {
    titulo: 'Financiar Veículos',
    desc: 'Sem restrições no CPF, concessionárias e bancos podem aprovar seu financiamento com mais facilidade. Muitos dos nossos clientes conseguiram financiamento em menos de 30 dias após a limpeza.',
  },
  {
    titulo: 'Cartão de crédito',
    desc: 'Portas que estavam fechadas se abrem novamente. Com o score recuperado, fica mais fácil tentar conseguir cartões de crédito, parcelamentos e recuperar seu poder de compra.',
  },
  {
    titulo: 'Empréstimos',
    desc: 'Precisar de crédito não deveria ser um problema. Com o nome regularizado, fica mais fácil tentar conseguir linhas de crédito pessoal, consignado e emergencial com taxas justas e aprovação simplificada.',
  },
]

export function EDepois() {
  return (
    <section className="w-full relative">
      {/* Background image */}
      <img
        src="/img/background-facilitando-avida.png"
        alt="Pessoa feliz após limpar o nome"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Content */}
      <div className="relative container-ms py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column — empty, shows the background image */}
          <div />

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {/* Title */}
            <div className="flex flex-col gap-4 text-center px-4 py-6">
              <span className="text-caption text-foreground uppercase tracking-[1.5px]">
                facilitando a vida
              </span>
              <h2 className="text-[36px] md:text-[48px] font-semibold leading-tight tracking-[-1.5px] text-foreground">
                E depois que eu conseguir limpar meu nome?
              </h2>
              <p className="text-para-lg text-foreground max-w-[400px] mx-auto">
                Com o CPF regularizado, o que antes parecia impossível volta a estar ao seu alcance.
              </p>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-4">
              {cards.map((card) => (
                <div
                  key={card.titulo}
                  className="bg-white/90 border border-border rounded-lg p-6 flex flex-col gap-2"
                >
                  <h3 className="text-heading-4 font-semibold text-foreground">{card.titulo}</h3>
                  <p className="text-para-md text-foreground leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
