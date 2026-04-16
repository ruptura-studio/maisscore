import Image from 'next/image'
import Link from 'next/link'

const PLANOS = [
  {
    tipo: 'CPF',
    descricao: 'Pessoa física',
    tipoColor: 'text-brand-orange',
    btnClass: 'btn-primary',
    btnLabel: 'Limpar meu CPF',
    moeda: 'R$',
    valor: '595',
    centavos: ',00',
    pagamento: 'PIX à vista ou 2× no cartão',
    features: [
      'Retirada de restrições Serasa, SPC e Boa Vista',
      'Retirada de restrições em Cartório de Protesto',
      'Acompanhamento pelo WhatsApp do início ao fim',
      'Processo inicia em até 7 dias úteis',
      'Resultado em até 30 dias úteis',
      'Guia: como aumentar o score após limpar o nome',
      'Checklist para aprovação de crédito',
    ],
  },
  {
    tipo: 'CNPJ',
    descricao: 'Pessoa jurídica',
    tipoColor: 'text-brand-navy',
    btnClass: 'btn-secondary',
    btnLabel: 'Limpar meu CNPJ',
    moeda: 'R$',
    valor: '795',
    centavos: ',00',
    pagamento: 'PIX à vista ou 2× no cartão',
    features: [
      'Retirada de restrições Serasa, SPC e Boa Vista',
      'Retirada de restrições em Cartório de Protesto',
      'Acompanhamento pelo WhatsApp do início ao fim',
      'Processo inicia em até 7 dias úteis',
      'Resultado em até 30 dias úteis',
      'Guia: como aumentar o score do seu CNPJ',
      'Checklist para aprovação de crédito empresarial',
    ],
  },
]

export function Precos() {
  return (
    <section className="relative w-full bg-neutral-200" style={{ backgroundImage: 'url(/img/background-preco.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>

      <div className="container-ms relative z-10 py-[100px]">
        {/* Imagem casal — desktop, ancorada no container */}
        <div className="pointer-events-none hidden lg:block absolute bottom-0 right-6 md:right-16 xl:right-24 z-20">
          <Image
            src="/img/casal.png"
            alt="Casal comemorando a regularização do CPF"
            width={525}
            height={739}
            className="object-contain max-h-[380px] w-auto"
          />
        </div>

        {/* Layout mobile: coluna única | desktop: texto esquerda + imagem direita */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-14">

          {/* Coluna esquerda: texto */}
          <div className="flex shrink-0 flex-col gap-8 mb-8 lg:mb-0 lg:max-w-[360px] xl:max-w-[440px]">
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

          {/* Imagem casal — mobile (inline) */}
          <div className="lg:hidden w-full flex justify-center">
            <Image
              src="/img/casal.png"
              alt="Casal comemorando a regularização do CPF"
              width={525}
              height={739}
              className="w-full max-w-[248px] object-contain"
            />
          </div>


          {/* Cards + garantia — visível apenas no mobile */}
          <div className="flex flex-1 flex-col gap-8 pb-10 sm:pb-24 lg:hidden">

            {/* Cards de preço */}
            <div className="flex flex-col sm:flex-row gap-4">
              {PLANOS.map((plano) => (
                <div
                  key={plano.tipo}
                  className="flex flex-1 flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm"
                >
                  {/* Header do card */}
                  <div className="flex flex-col gap-1">
                    <span className={`font-dm text-sm font-bold uppercase tracking-wider ${plano.tipoColor}`}>
                      {plano.tipo}
                    </span>
                    <span className="font-sans text-xs text-grafite">{plano.descricao}</span>
                  </div>

                  {/* Preço */}
                  <div className="flex items-baseline gap-0.5">
                    <span className="font-dm text-sm text-grafite">{plano.moeda}</span>
                    <span className="font-dm text-4xl font-bold text-brand-navy leading-none">{plano.valor}</span>
                    <span className="font-dm text-sm text-grafite">{plano.centavos}</span>
                  </div>
                  <span className="font-sans text-xs text-grafite -mt-4">{plano.pagamento}</span>

                  {/* Features */}
                  <ul className="flex flex-col gap-3">
                    {plano.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Image
                          src="/icons/check-circle-icon-orange.svg"
                          alt=""
                          width={16}
                          height={16}
                          className="mt-0.5 shrink-0"
                        />
                        <span className="font-sans text-xs text-grafite">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link href="/checkout" className={`${plano.btnClass} mt-auto justify-center`}>
                    {plano.btnLabel}
                  </Link>
                </div>
              ))}
            </div>

            {/* Bloco de garantia */}
            <div className="flex items-start gap-4 rounded-xl border border-brand-navy/10 bg-white/60 p-5">
              <Image
                src="/icons/check-circle-icon.svg"
                alt=""
                width={32}
                height={32}
                className="shrink-0 mt-0.5"
              />
              <div className="flex flex-col gap-1">
                <span className="font-dm text-sm font-bold text-brand-navy">
                  Garantia total ou seu dinheiro de volta
                </span>
                <span className="font-sans text-xs text-grafite">
                  Se não conseguirmos remover as restrições do seu CPF ou CNPJ dentro do prazo, devolvemos 100% do valor pago. Sem burocracia.
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
