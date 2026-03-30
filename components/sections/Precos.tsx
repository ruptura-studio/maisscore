import Image from 'next/image'
import { WHATSAPP_COMPRAR } from '@/lib/config'

const PLANOS = [
  {
    tipo: 'CPF',
    descricao: 'Regularização de pessoa física',
    // TODO: text-[48px] — sem token de 48px para preço; heading-1 é 48px mas com font-weight diferente
    preco: 'R$ 595',
    centavos: ',00',
    pagamento: 'PIX à vista ou 2× no cartão',
    features: [
      'Limpeza completa do nome no Serasa/SPC',
      'Acompanhamento individual até o resultado',
      'Segurança jurídica em todo o processo',
      'Resultado em 15 a 30 dias úteis',
    ],
  },
  {
    tipo: 'CNPJ',
    descricao: 'Regularização de pessoa jurídica',
    preco: 'R$ 795',
    centavos: ',00',
    pagamento: 'PIX à vista ou 2× no cartão',
    features: [
      'Limpeza completa do CNPJ no Serasa/SPC',
      'Acompanhamento individual até o resultado',
      'Segurança jurídica em todo o processo',
      'Resultado em 15 a 30 dias úteis',
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
      {/* Gradient branco cobrindo o fundo (top 100% → bottom 80%) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 100%)',
        }}
      />

      <div className="container-ms relative z-10 pt-[100px]">
        {/* Bloco de texto — max 550px */}
        <div className="mb-5 flex max-w-[550px] flex-col gap-4">
          {/* TODO: text-[60px] — sem token exato; display é 80px e heading-1 é 48px */}
          <h2
            className="font-dm text-[40px] font-normal leading-[1.0] tracking-[-1px] text-brand-navy lg:text-[60px]"
            style={{ textShadow: '0 2px 10px rgba(255,255,255,0.7)' }}
          >
            Quanto vale voltar a ter acesso ao crédito?
          </h2>
          <p className="font-dm text-[18px] leading-[1.3] text-grafite lg:text-[24px]">
            Enquanto seu nome estiver sujo, você paga mais em juros, perde financiamentos e depende
            de outras pessoas. Resolver agora custa menos do que continuar travado.
          </p>
        </div>

        {/* Linha inferior: imagem + cards */}
        <div className="flex flex-col items-end gap-8 lg:flex-row lg:gap-[55px]">
          {/* Imagem casal — visível só em desktop, alinhada à base */}
          <div className="hidden shrink-0 self-end lg:block">
            <Image
              src="/img/casal.png"
              alt="Casal comemorando a regularização do CPF"
              width={525}
              height={739}
              className="w-full max-w-[380px] object-contain xl:max-w-[525px]"
            />
          </div>

          {/* Lado direito: cards de preço + garantia */}
          <div className="flex w-full flex-1 flex-col gap-[30px] pb-[90px]">
            {/* Cards */}
            <div className="flex flex-col gap-[30px] md:flex-row">
              {PLANOS.map((plano) => (
                <div
                  key={plano.tipo}
                  className="flex flex-1 flex-col gap-[32px] rounded-xl bg-white px-[40px] py-[60px] shadow-[0_2px_8px_rgba(0,0,0,0.25)] xl:px-[60px] xl:py-[80px]"
                >
                  {/* Identificação do plano */}
                  <div className="flex flex-col gap-1">
                    <span className="font-dm text-[13px] font-bold uppercase tracking-[2px] text-brand-orange">
                      {plano.tipo}
                    </span>
                    <p className="font-dm text-para-sm text-foreground-alt">{plano.descricao}</p>
                  </div>

                  {/* Preço */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-0.5">
                      <span className="font-dm text-[44px] font-bold leading-none tracking-[-2px] text-brand-navy xl:text-[52px]">
                        {plano.preco}
                      </span>
                      <span className="font-dm text-[22px] font-bold text-brand-navy">
                        {plano.centavos}
                      </span>
                    </div>
                    <p className="font-dm text-para-xs text-foreground-alt">{plano.pagamento}</p>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-3">
                    {plano.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Image
                          src="/icons/check-circle-icon.svg"
                          alt=""
                          width={20}
                          height={20}
                          className="shrink-0"
                        />
                        <span className="font-dm text-para-sm text-brand-navy">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={WHATSAPP_COMPRAR}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full"
                  >
                    Resolver Agora
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
            <p className="max-w-[477px] font-dm text-para-sm leading-[1.3] text-brand-navy">
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
