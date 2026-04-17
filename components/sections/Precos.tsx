import Image from 'next/image'

export function Precos() {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-200">

      <div className="container-ms relative z-10 pt-10 no-touch:sm:pt-24">
        {/* Layout: coluna esquerda (texto + imagem) | coluna direita (cards) */}
        <div className="relative flex flex-col gap-0 no-touch:lg:flex-row no-touch:lg:items-start no-touch:lg:gap-14">

          {/* Coluna esquerda: texto */}
          <div className="flex shrink-0 flex-col gap-8 mb-8 no-touch:lg:mb-0 no-touch:lg:max-w-[240px] no-touch:xl:max-w-[288px]">
            {/* Bloco de texto */}
            <div className="flex flex-col gap-4">
              <h2 className="font-dm text-h2 text-brand-navy">
                Quanto vale voltar a ter acesso ao crédito?
              </h2>
              <p className="text-sm text-grafite">
                Enquanto seu nome estiver sujo, você paga mais em juros, perde financiamentos e depende
                de outras pessoas. Resolver agora custa menos do que continuar travado.
              </p>
            </div>
          </div>

          {/* Imagem casal — mobile */}
          <div className="no-touch:hidden w-full flex justify-center">
            <Image
              src="/img/casal.png"
              alt="Casal comemorando a regularização do CPF"
              width={525}
              height={739}
              className="w-full max-w-[248px] object-contain"
            />
          </div>

          {/* Imagem casal — desktop */}
          <div className="pointer-events-none absolute bottom-0 left-0 touch:hidden no-touch:block">
            <Image
              src="/img/casal.png"
              alt="Casal comemorando a regularização do CPF"
              width={525}
              height={739}
              className="w-full max-w-[248px] object-contain"
            />
          </div>

          {/* Coluna direita: cards de preço + garantia */}
          <div className="flex flex-1 flex-col gap-8">
          </div>
        </div>
      </div>
    </section>
  )
}
