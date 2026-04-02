import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Reembolso — Mais Score',
  description:
    'Entenda as condições de cancelamento e reembolso dos serviços da Mais Score, incluindo o direito de arrependimento previsto no Código de Defesa do Consumidor.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://maisscore.com.br/reembolso' },
}

const sections = [
  {
    title: '1. Direito de Arrependimento',
    content: `Conforme o <strong>Art. 49 do Código de Defesa do Consumidor (Lei 8.078/1990)</strong>, o cliente que contratar nossos serviços por meio eletrônico tem direito a cancelar a contratação em até <strong>7 dias corridos</strong> a partir da data de pagamento, sem necessidade de justificativa e com reembolso integral do valor pago.
    <br/><br/>
    Para exercer esse direito, basta entrar em contato pelos canais indicados na seção 6 desta Política dentro do prazo estabelecido.`,
  },
  {
    title: '2. Cancelamento Após o Prazo de Arrependimento',
    content: `Após o prazo de 7 dias, o reembolso depende da fase em que o processo se encontra:
    <ul>
      <li><strong>Processo não iniciado:</strong> reembolso integral, desde que nenhuma ação jurídica ou análise tenha sido realizada.</li>
      <li><strong>Processo em andamento (análise ou protocolo iniciado):</strong> reembolso de <strong>50% do valor pago</strong>, para cobrir os custos operacionais e jurídicos já incorridos.</li>
      <li><strong>Processo concluído (regularização obtida):</strong> não há reembolso, pois o serviço foi integralmente prestado.</li>
    </ul>`,
  },
  {
    title: '3. Casos de Insucesso',
    content: `Nos casos excepcionais em que a Mais Score não consiga obter a regularização do CPF, o cliente terá direito a:
    <ul>
      <li><strong>Reembolso integral</strong> do valor pago, sem qualquer desconto, desde que o insucesso não seja decorrente de informações incorretas ou omissões fornecidas pelo próprio cliente.</li>
      <li>O cliente será notificado por WhatsApp e e-mail com a justificativa técnica e jurídica do insucesso.</li>
      <li>O reembolso será processado em até <strong>10 dias úteis</strong> após a notificação.</li>
    </ul>`,
  },
  {
    title: '4. Situações Não Elegíveis para Reembolso',
    content: `Não haverá reembolso nos seguintes casos:
    <ul>
      <li>O cliente forneceu informações falsas, incompletas ou documentos inválidos que impediram o andamento do processo.</li>
      <li>O cliente deixou de cumprir solicitações essenciais da equipe da Mais Score para o prosseguimento do processo (ex: envio de documentos ou assinatura de documentos necessários).</li>
      <li>O processo foi concluído com sucesso e a regularização foi obtida.</li>
      <li>O pedido de cancelamento foi realizado após o prazo de arrependimento e o processo já se encontra concluído.</li>
    </ul>`,
  },
  {
    title: '5. Prazo e Forma de Reembolso',
    content: `Os reembolsos são processados da seguinte forma:
    <ul>
      <li><strong>Cartão de crédito:</strong> o estorno é solicitado à operadora em até 5 dias úteis. O crédito pode aparecer na fatura em até 2 ciclos de cobrança, conforme política da operadora.</li>
      <li><strong>PIX ou boleto:</strong> o valor é transferido para a conta do titular em até <strong>5 dias úteis</strong> após a aprovação do reembolso.</li>
    </ul>
    A Mais Score não se responsabiliza por atrasos decorrentes de processos internos das instituições financeiras.`,
  },
  {
    title: '6. Como Solicitar o Reembolso',
    content: `Para solicitar o cancelamento ou reembolso, entre em contato com nossa equipe pelos canais abaixo:
    <ul>
      <li><strong>WhatsApp:</strong> (15) 97405-8014 — atendimento de segunda a sexta, das 9h às 18h</li>
      <li><strong>E-mail:</strong> contato@maisscore.com.br</li>
    </ul>
    Informe seu nome completo, CPF e o motivo do cancelamento. Nossa equipe retornará em até <strong>1 dia útil</strong> para confirmar o pedido e orientar sobre os próximos passos.`,
  },
  {
    title: '7. Alterações nesta Política',
    content: `A Mais Score pode atualizar esta Política a qualquer momento. Alterações relevantes serão comunicadas por e-mail ou por aviso em destaque no site. A data da última atualização é sempre indicada no topo desta página.`,
  },
]

export default function ReembolsoPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-brand-navy">
        <div className="container-ms py-16 md:py-20">
          <p className="font-dm text-cap text-brand-orange mb-4 tracking-[6px] uppercase">
            Legal
          </p>
          <h1 className="font-dm text-h2 md:text-display text-white font-normal mb-4">
            Política de Reembolso
          </h1>
          <p className="font-sans text-p md:text-lg text-white/70 max-w-[600px]">
            Última atualização: 1º de abril de 2026
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="border-b border-brand-border">
        <div className="container-ms py-3">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 font-sans text-sm text-neutral-400">
              <li>
                <a href="/" className="hover:text-brand-orange transition-colors">
                  Início
                </a>
              </li>
              <li aria-hidden="true" className="text-brand-border">›</li>
              <li className="text-brand-navy" aria-current="page">
                Política de Reembolso
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container-ms py-16 md:py-20">
        <div className="max-w-[760px]">
          {/* Intro */}
          <p className="font-sans text-lg text-brand-navy/80 mb-12 leading-relaxed">
            A Mais Score preza pela transparência e pela satisfação dos nossos clientes. Esta Política
            descreve as condições de cancelamento e reembolso dos nossos serviços, em conformidade
            com o <strong>Código de Defesa do Consumidor (Lei 8.078/1990)</strong>.
          </p>

          {/* Sections */}
          <div className="flex flex-col gap-10">
            {sections.map((section) => (
              <div
                key={section.title}
                className="border-t border-brand-border pt-8"
              >
                <h2 className="font-dm text-h3 text-brand-navy font-semibold mb-4">
                  {section.title}
                </h2>
                <div
                  className="font-sans text-p text-brand-navy/70 leading-relaxed prose-section"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
