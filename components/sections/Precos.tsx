import Image from 'next/image'
import { WHATSAPP_COMPRAR } from '@/lib/config'

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
    <section
      className="relative w-full overflow-hidden"
      style={{
        backgroundImage: "url('/img/background-preco.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >

      <div className="container-ms relative z-10 pt-24">
        {/* Layout: coluna esquerda (texto + imagem) | coluna direita (cards) */}
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-14">

          {/* Imagem casal — ancorada na base do container principal */}
          <div className="pointer-events-none absolute bottom-0 left-0 hidden lg:block">
            <Image
              src="/img/casal.png"
              alt="Casal comemorando a regularização do CPF"
              width={525}
              height={739}
              className="w-full max-w-[330px] object-contain"
            />
          </div>

          {/* Coluna esquerda: texto */}
          <div className="flex shrink-0 flex-col gap-8 lg:max-w-[240px] xl:max-w-[288px]">
            {/* Bloco de texto */}
            <div className="flex flex-col gap-4">
              <h2 className="font-dm text-h2 text-brand-navy">
                Quanto vale voltar a ter acesso ao crédito?
              </h2>
              <p className="text-p text-grafite">
                Enquanto seu nome estiver sujo, você paga mais em juros, perde financiamentos e depende
                de outras pessoas. Resolver agora custa menos do que continuar travado.
              </p>
            </div>
          </div>

          {/* Coluna direita: cards de preço + garantia */}
          <div className="flex flex-1 flex-col gap-8 pb-24">
            {/* Cards */}
            <div className="flex flex-col gap-4 md:flex-row">
              {PLANOS.map((plano) => (
                <div
                  key={plano.tipo}
                  className="flex flex-1 flex-col gap-4 rounded-lg bg-white p-8 shadow-md"
                >
                  {/* Identificação do plano */}
                  <div className="flex flex-col gap-1">
                    <span className={`text-subtitle ${plano.tipoColor}`}>
                      {plano.tipo}
                    </span>
                    <p className="text-label text-foreground-alt">{plano.descricao}</p>
                  </div>

                  {/* Preço */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-start">
                      <span className="font-dm text-price-sm text-brand-navy mt-1">
                        {plano.moeda}
                      </span>
                      <span className="font-dm text-price tracking-price text-brand-navy">
                        {plano.valor}
                      </span>
                      <span className="font-dm text-price-sm text-brand-navy mt-1">
                        {plano.centavos}
                      </span>
                    </div>
                    <p className="font-dm text-label text-foreground-alt">{plano.pagamento}</p>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-3">
                    {plano.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Image
                          src="/icons/icon-ast.svg"
                          alt=""
                          width={8}
                          height={8}
                          className="shrink-0"
                        />
                        <span className="text-label text-brand-navy">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="/checkout"
                    className={`${plano.btnClass} w-full`}
                  >
                    {plano.btnLabel}
                    <Image
                      src="/icons/arrow-up-icon.svg"
                      alt=""
                      width={10}
                      height={10}
                      className="shrink-0"
                    />
                  </a>
                </div>
              ))}
            </div>

            {/* Texto de garantia */}
            <p className="w-full text-txt-xs text-brand-navy">
              <strong className="font-semibold">Garantia total de resultado</strong>
              <br />
              Se seu nome não ficar limpo em até 30 dias úteis, você recebe o dinheiro de volta. Sem
              letras miúdas, sem desculpa. Base legal: Art. 42 do Código de Defesa do Consumidor.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
