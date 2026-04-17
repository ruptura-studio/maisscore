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
        <div className="container-ms flex flex-col-reverse items-center gap-10 pt-10 sm:pt-24 lg:flex-row lg:items-center lg:gap-10">
          {/* Imagem da garota */}
          <div className="flex w-full items-end justify-center lg:w-1/2">
            <Image
              src="/img/garota-mostrando-score.png"
              alt="Garota mostrando score no celular"
              width={319}
              height={355}
              className="w-full max-w-[210px] self-end object-contain lg:max-w-[319px]"
            />
          </div>

          {/* Bloco de texto */}
          <div className="flex w-full flex-col justify-center gap-6 lg:w-1/2">
            <p className="font-dm text-subtitle text-brand-orange">
              SOBRE NÓS
            </p>
            <h2 className="font-dm text-h2 text-brand-navy">
              Por trás de cada CPF desbloqueado, existe uma história que recomeçou
            </h2>
            <p className="font-dm text-p text-brand-navy">
              Por trás de cada CPF negativado existe uma pessoa que quer voltar a crescer. A Mais Score existe para isso... devolver o acesso ao crédito de forma legal, rápida e garantida.
            </p>
          </div>
        </div>
      </section>

      {/* Seção 2 — Nossa História (4 cards) */}
      <section className="w-full bg-white pb-1 sm:pb-3 pt-8 sm:pt-0">
        <div className="container-ms">
          <div className="grid grid-cols-1 gap-6 no-touch:sm:grid-cols-2 no-touch:xl:grid-cols-4">
            {INFOBOXES.map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 rounded-lg bg-neutral-100 p-8"
              >
                <p className="font-dm text-subtitle text-brand-orange">
                  {item.overline}
                </p>
                <h3 className="font-dm text-subtitle text-foreground">
                  {item.heading}
                </h3>
                <p className="font-dm text-p text-foreground-alt">
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
