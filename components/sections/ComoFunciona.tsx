import Image from 'next/image'

const STEPS = [
  {
    title: 'Comece em menos de 5 minutos',
    body: 'Preencha seus dados e contrate diretamente pelo site, de onde estiver. Não precisa ir a nenhum escritório, não tem papelada para assinar, não tem fila para esperar. Em poucos cliques, seu processo já está aberto e nossa equipe entra em ação.',
    badge: '100% Online',
    image: '/img/card-compra-limpa-nome.svg',
    imageAlt: 'Tela de contratação do serviço Mais Score',
    imageFirst: false,
  },
  {
    title: 'Nossos advogados analisam o seu caso',
    body: 'Assim que você contrata, nossa equipe jurídica inicia a análise do seu CPF. Em até 24 horas mapeamos todas as restrições ativas no Serasa e SPC, e definimos a estratégia legal mais eficiente para removê-las com base no Art. 42 do Código de Defesa do Consumidor.',
    badge: 'Retorno em até 24 horas',
    image: '/img/card-nome-sujo.svg',
    imageAlt: 'Consulta de CPF com restrições encontradas',
    imageFirst: true,
  },
  {
    title: 'Entramos em ação pelo seu nome',
    body: 'Com o diagnóstico em mãos, abrimos o processo judicial em até 7 dias úteis e notificamos formalmente o Serasa, SPC e demais birôs de crédito. Nossa equipe acompanha cada etapa do processo até a remoção ser confirmada — você não precisa fazer absolutamente nada.',
    badge: 'Processo 100% legal',
    image: '/img/card-processo.svg',
    imageAlt: 'Processo jurídico em andamento',
    imageFirst: false,
  },
  {
    title: 'Seu nome limpo, direto no WhatsApp',
    body: 'Entre 15 e 30 dias úteis, você recebe o certificado de regularização do CPF diretamente no seu WhatsApp. E se por algum motivo não resolvermos, você recebe seu dinheiro de volta — sem burocracia, sem discussão.',
    badge: '30 dias ou seu dinheiro de volta',
    image: '/img/card-nome-limpo.svg',
    imageAlt: 'Nome limpo e score subindo',
    imageFirst: true,
  },
]

export function ComoFunciona() {
  return (
    // TODO: bg-neutral-100 sem token no DS — usando bg-neutral-50; py-[120px] sem token — usando py-24 (96px) como aproximação
    <section className="w-full bg-neutral-50 py-24">
      {/* TODO: gap-10 (40px) fora da escala do DS — usando gap-8 (32px) */}
      <div className="container-ms flex flex-col items-center gap-8">

        {/* Title */}
        <div className="flex flex-col items-center gap-6">
          {/* TODO: text-[10px] sem token — usando text-lable (12px); tracking-[6px] sem token de letter-spacing no DS */}
          <p className="font-dm text-lable font-light uppercase tracking-[6px] text-brand-navy">
            Nosso método reativa crédito
          </p>
          {/* TODO: text-[40px]/lg:text-[60px] sem tokens exatos — usando text-h1 (48px) para ambos; 60px não tem token entre heading-1 e display */}
          <h2 className="font-dm text-h1 font-normal text-brand-navy text-center">
            Como a Mais Score limpa seu nome
          </h2>
        </div>

        {/* Steps */}
        <div className="flex w-full flex-col gap-8">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className={`flex flex-col items-center gap-8 lg:flex-row lg:justify-between ${
                step.imageFirst ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Text */}
              <div className="flex flex-col gap-4 lg:max-w-[550px]">
                {/* text-[28px] → text-h4 (24px, mais próximo); lg:text-[36px] → lg:text-h2 (36px, exato) */}
                <h3 className="font-dm text-h4 font-bold text-brand-navy lg:text-h2">
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
                  {/* text-[10px] → text-lable (12px, mais próximo disponível no DS) */}
                  <span className="font-dm text-lable font-normal text-white">
                    {step.badge}
                  </span>
                </span>
              </div>

              {/* Image */}
              <div className="w-full shrink-0 lg:w-[576px]">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  width={576}
                  height={424}
                  className="h-auto w-full"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
