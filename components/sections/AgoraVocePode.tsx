import Image from 'next/image'

function MockupCredito() {
  return (
    <div className="flex flex-col gap-2">
      <Image src="/img/card-line-emergencia.svg" alt="" width={263} height={34} className="h-auto w-full" />
      <Image src="/img/card-line-saude.svg" alt="" width={263} height={34} className="h-auto w-full" />
      <Image src="/img/card-line-oportunidades.svg" alt="" width={263} height={34} className="h-auto w-full" />
    </div>
  )
}

function MockupCards() {
  return (
    <Image
      src="/img/cards.png"
      alt=""
      width={167}
      height={103}
      className="block w-auto max-h-[90px] mx-auto mt-auto"
    />
  )
}

function MockupFinanciamento() {
  return (
    <div className="flex flex-col gap-4">
      <Image src="/img/card-line-financiamento.svg" alt="" width={263} height={53} className="h-auto w-full" />
      <Image src="/img/card-line-aluguel.svg" alt="" width={263} height={44} className="h-auto w-full" />
    </div>
  )
}

function MockupVeiculo() {
  return (
    <Image
      src="/img/card-carro-finance.svg"
      alt=""
      width={263}
      height={124}
      className="h-auto w-full min-h-[100px] mt-auto"
    />
  )
}

function MockupEmpresa() {
  return (
    <div className="w-full overflow-hidden">
      <Image
        src="/img/grafico-card.svg"
        alt=""
        width={263}
        height={104}
        className="mt-1 h-auto w-full max-h-[82px] object-contain"
      />
    </div>
  )
}

const CARDS = [
  {
    title: 'Seu novo cartão de crédito',
    description: 'Ter limite no seu próprio cartão de crédito sem depender de ninguém.',
    mockup: <MockupCards />,
    noPb: true,
    bottomMockup: true,
  },
  {
    title: 'Casa própria ou alugada',
    description: 'Financiar ou alugar sua casa nova sem o CPF te barrando na aprovação.',
    mockup: <MockupFinanciamento />,
  },
  {
    title: 'Seu carro financiado',
    description: 'Comprar seu veículo com as melhores condições do mercado.',
    mockup: <MockupVeiculo />,
    noPb: true,
    gap: 'gap-1',
    bottomMockup: true,
  },
  {
    title: 'Crédito de emergência',
    description: 'Ter seu empréstimo de emergência sem humilhação ou negativa.',
    mockup: <MockupCredito />,
  },
  {
    title: 'Sua empresa crescendo',
    description: 'Abrir ou expandir sua empresa com acesso a crédito e condições.',
    mockup: <MockupEmpresa />,
  },
]

export function AgoraVocePode() {
  return (
    <section className="w-full bg-brand-navy/10 py-10 sm:py-24">
      <div className="container-ms flex flex-col gap-4 sm:gap-16">

        {/* Heading */}
        <div className="flex flex-col items-center gap-4 pb-8">
          <p className="font-dm text-cap text-disabled">
            Hora de recomeçar
          </p>
          <h2 className="text-center font-dm text-h2 text-brand-navy">
            Agora você pode ter
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {CARDS.map((card, i) => (
            <div
              key={i}
              className={`flex flex-col ${'gap' in card ? card.gap : 'gap-3'} overflow-hidden rounded-lg bg-white/60 ${'noPb' in card && card.noPb ? 'px-4 pb-0 pt-4' : 'p-4'}`}
            >
              <div className="flex flex-col gap-2">
                <h3 className="font-dm text-subtitle text-brand-navy">
                  {card.title}
                </h3>
                <p className="text-p text-foreground-alt">
                  {card.description}
                </p>
              </div>
              <div className={'bottomMockup' in card && card.bottomMockup ? 'flex-1 flex items-end justify-center' : 'mt-2'}>{card.mockup}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
