import Image from 'next/image'

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
    <section className="relative w-full overflow-hidden bg-neutral-200">

      <div className="container-ms relative z-10 pt-10 sm:pt-24">
        {/* Layout: coluna esquerda (texto + imagem) | coluna direita (cards) */}
        <div className="relative flex flex-col gap-0 lg:flex-row lg:items-start lg:gap-14">

          {/* Coluna esquerda: texto */}
          <div className="flex shrink-0 flex-col gap-8 mb-8 lg:mb-0 lg:max-w-[240px] xl:max-w-[288px]">
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
          <div className="lg:hidden w-full flex justify-center">
            <Image
              src="/img/casal.png"
              alt="Casal comemorando a regularização do CPF"
              width={525}
              height={739}
              className="w-full max-w-[248px] object-contain"
            />
          </div>

          {/* Imagem casal — desktop */}
          <div className="pointer-events-none absolute bottom-0 left-0 hidden lg:block">
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
