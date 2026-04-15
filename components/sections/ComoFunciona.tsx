import Image from 'next/image'

const STEPS = [
  {
    title: 'Primeiro passo',
    body: 'Depois de ter certeza de como funciona nosso serviço e se ele vai te ajudar, siga para o checkout e preencha as informações corretamente.',
    badge: '100% Online',
    image: '/img/card-compra-limpa-nome.svg',
    imageAlt: 'Tela de contratação do serviço Mais Score',
    imageFirst: false,
  },
  {
    title: 'Segundo Passo',
    body: 'Depois de confirmado o pagamento, nossos advogados analisam seu caso, montam a petição inicial e enviam para o tribunal de justiça.',
    badge: 'Execução em até 7 dias úteis',
    image: '/img/card-nome-sujo.svg',
    imageAlt: 'Consulta de CPF com restrições encontradas',
    imageFirst: true,
  },
  {
    title: 'Terceiro Passo',
    body: 'Nosso sistema mantem você atualizado em todas as etapas do andamento do processo pelo whatsapp, até a conclusão do processo.',
    badge: 'Processo 100% legal',
    image: '/img/card-processo.svg',
    imageAlt: 'Processo jurídico em andamento',
    imageFirst: false,
  },
  {
    title: 'Nome Limpo!',
    body: 'E em até 30 dias úteis, seu nome deixa de aparecer nos sistemas do Serasa, SPC, Boa Vista e Cartórios de Protesto, mesmo sem ter pago a sua dívida.',
    badge: 'À caminho do crédito',
    image: '/img/card-nome-limpo.svg',
    imageAlt: 'Nome limpo e score subindo',
    imageFirst: true,
  },
]

export function ComoFunciona() {
  return (
    <section className="w-full bg-neutral-100 py-10 sm:py-24">
      <div className="container-ms flex flex-col items-center gap-8">

        {/* Title */}
        <div className="flex flex-col items-center gap-6">
          <p className="font-dm text-cap text-disabled">
            Nosso método
          </p>
          <h2 className="font-dm text-h2 text-brand-navy text-center">
            Como fazer para limpar o nome
          </h2>
        </div>

        {/* Steps */}
        <div className="flex w-full flex-col gap-8">
          {STEPS.map((step, i) => (
            <div key={i} className="flex flex-col gap-0">
              <div
                className={`flex flex-col items-center gap-8 lg:flex-row lg:justify-between ${
                  step.imageFirst ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Text */}
                <div className="flex flex-1 flex-col gap-2">
                  <h3 className="font-dm text-h3 text-brand-navy">
                    {step.title}
                  </h3>
                  <p className="font-dm text-p text-grafite">
                    {step.body}
                  </p>
                  <span className="inline-flex w-fit items-center gap-1 rounded-full bg-brand-orange px-3 py-1">
                    <Image
                      src="/icons/check-circle-icon.svg"
                      alt=""
                      width={8}
                      height={8}
                      className="shrink-0"
                    />
                    <span className="font-dm text-label text-white">
                      {step.badge}
                    </span>
                  </span>
                </div>

                {/* Image */}
                <div className="flex flex-1 justify-center">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    width={290}
                    height={214}
                    className="h-auto mx-auto"
                  />
                </div>
              </div>
              <div className="py-4">
                <hr className="border-neutral-200" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
