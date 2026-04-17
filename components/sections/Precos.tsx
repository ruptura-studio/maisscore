import Image from 'next/image'

export function Precos() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-neutral-200 pointer-events-none" />

      <div className="container-ms relative z-10 pt-2.5 no-touch:sm:pt-6">
        <div className="relative flex flex-col gap-0 no-touch:lg:flex-row no-touch:lg:items-end no-touch:lg:justify-between">

          {/* Coluna esquerda: texto */}
          <div className="flex shrink-0 flex-col gap-8 mb-8 no-touch:lg:mb-0 no-touch:lg:max-w-[400px] no-touch:lg:pb-16">
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

          {/* Imagem casal — desktop (coluna direita, ancorada no fundo) */}
          <div className="touch:hidden no-touch:flex no-touch:items-end no-touch:justify-end no-touch:flex-1">
            <Image
              src="/img/casal.png"
              alt="Casal comemorando a regularização do CPF"
              width={525}
              height={739}
              className="object-contain max-h-[420px] w-auto"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
