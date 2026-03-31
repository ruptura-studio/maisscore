import Image from 'next/image'

function MockupCredito() {
  return (
    // TODO: gap-[0.55rem] (8.8px) sem token — usando gap-2 (8px) como aproximação
    <div className="flex flex-col gap-2">
      <Image src="/img/card-line-emergencia.svg" alt="" width={263} height={34} className="h-auto w-full" />
      <Image src="/img/card-line-saude.svg" alt="" width={263} height={34} className="h-auto w-full" />
      <Image src="/img/card-line-oportunidades.svg" alt="" width={263} height={34} className="h-auto w-full" />
    </div>
  )
}

function MockupCards() {
  return (
    <div className="flex items-end justify-center overflow-hidden h-full">
      <Image
        src="/img/cards.png"
        alt=""
        width={206}
        height={127}
        className="block w-auto h-full mx-auto"
      />
    </div>
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
    <div className="w-full overflow-hidden">
      <Image
        src="/img/card-carro-finance.svg"
        alt=""
        width={263}
        height={124}
        className="h-auto w-full min-h-[100px]"
      />
    </div>
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
    title: 'Cartão de crédito',
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
    // TODO: py-[110px] sem token — usando py-24 (96px) como aproximação
    <section className="w-full bg-brand-navy/10 py-24">
      {/* TODO: gap-5 (20px) fora da escala DS — usando gap-4 (16px) */}
      <div className="container-ms flex flex-col gap-4">

        {/* Heading */}
        <div className="flex flex-col items-center gap-4 pb-8">
          {/* TODO: text-[10px] sem token — usando text-lable (12px); tracking-[6px] sem token de letter-spacing no DS */}
          <p className="font-dm text-lable font-light uppercase tracking-[6px] text-brand-navy">
            Limpar o nome é apenas o começo
          </p>
          {/* TODO: text-[40px]/lg:text-[60px] sem tokens exatos — usando text-h1 (48px); leading/tracking removidos (baked no token) */}
          <h2 className="text-center font-dm text-h1 font-normal text-brand-navy">
            Agora você pode ter
          </h2>
        </div>

        {/* Cards */}
        {/* TODO: rounded-xl não existe no DS — usando rounded-lg (var(--radius)) como aproximação */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {CARDS.map((card, i) => (
            <div
              key={i}
              className={`flex flex-col gap-3 overflow-hidden rounded-lg bg-white/60 ${'noPb' in card && card.noPb ? 'px-4 pb-0 pt-4' : 'p-4'}`}
            >
              <div className="flex flex-col gap-2">
                <h3 className="font-dm text-subtitle text-brand-navy">
                  {card.title}
                </h3>
                {/* text-[12px] leading-[16px] → text-lable (12px/16px, exato); TODO: tracking-[-0.24px] sem token no DS */}
                {/* text-neutral-700 sem token no DS — usando text-foreground-alt (#404040, mais próximo) */}
                <p className="font-dm text-lable font-normal text-foreground-alt">
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
