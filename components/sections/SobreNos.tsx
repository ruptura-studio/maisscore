import Image from 'next/image'

const INFOBOXES = [
  {
    overline: '2021',
    heading: 'Nascemos de uma crise, crescemos com propósito',
    body: 'No auge da pandemia, vimos famílias inteiras sendo excluídas do sistema financeiro por dívidas que a vida havia criado. Foi dessa dor que surgiu a Mais Score.',
  },
  {
    overline: 'O MÉTODO',
    heading: 'Construímos o caminho que não existia para ninguém',
    body: 'Não havia um processo simples, acessível e juridicamente seguro para limpar o nome no Brasil. Então criamos o nosso, com 97% de taxa de sucesso.',
  },
  {
    overline: 'A GARANTIA',
    heading: 'Ir além é a parte fundamental de todo o nosso processo',
    body: 'Se não conseguirmos regularizar o seu CPF em 30 dias, devolvemos o seu investimento. Nossa taxa de 97% de sucesso não é marketing, é resultado validado.',
  },
  {
    overline: 'AS PESSOAS',
    heading: 'Equipe formada por pessoas cuidando de outras pessoas',
    body: 'Não somos um software nem um serviço automatizado. Somos um time que acredita que cada CPF tem uma história e que essa história merece atenção real.',
  },
]

export function SobreNos() {
  return (
    <>
      {/* Seção 1 — Hero com imagem de fundo */}
      <section
        className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/background-cpf-negativado.png')" }}
      >
        <div className="container-ms flex flex-col-reverse items-center gap-10 pt-16 lg:flex-row lg:items-end lg:gap-10 lg:pt-[145px]">
          {/* Imagem da garota */}
          <Image
            src="/img/garota-mostrando-score.png"
            alt="Garota mostrando score no celular"
            width={637}
            height={710}
            className="w-full max-w-[420px] self-end object-contain lg:max-w-[637px]"
          />

          {/* Bloco de texto */}
          <div className="flex flex-col gap-10 pb-10 lg:max-w-[530px] lg:pb-20">
            <p className="font-dm text-[24px] font-bold tracking-[-0.48px] text-brand-orange">
              SOBRE NÓS
            </p>
            {/* TODO: text-[60px] — sem token de 60px no design system; heading-1 é 48px e display é 80px */}
            <h2 className="font-dm text-[40px] font-normal leading-[1.05] tracking-[-1px] text-brand-navy lg:text-[60px]">
              Por trás de cada CPF desbloqueado, existe uma história que recomeçou
            </h2>
            <p className="font-dm text-[18px] leading-[1.5] text-brand-navy lg:text-[24px]">
              Por trás de cada CPF negativado existe uma pessoa que quer voltar a crescer. A Mais Score existe para isso... devolver o acesso ao crédito de forma legal, rápida e garantida.
            </p>
          </div>
        </div>
      </section>

      {/* Seção 2 — Nossa História (4 cards) */}
      <section className="w-full border-b border-brand-navy/10 bg-white pb-[110px] pt-[60px]">
        <div className="container-ms">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {INFOBOXES.map((item, i) => (
              // TODO: bg-[#f2f2f2] — sem token equivalente no design system
              <div
                key={i}
                className="flex flex-col gap-[10px] rounded-xl bg-[#f2f2f2] px-[45px] pb-[60px] pt-[69px]"
              >
                <p className="font-dm text-[16px] font-bold tracking-[-0.48px] text-brand-orange">
                  {item.overline}
                </p>
                <h3 className="font-dm text-[24px] font-bold leading-[1.05] tracking-[-0.48px] text-brand-navy">
                  {item.heading}
                </h3>
                <p className="font-dm text-[18px] leading-[1.3] tracking-[-0.28px] text-foreground-alt">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
