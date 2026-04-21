import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termos de Uso — Mais Score',
  description:
    'Leia os Termos de Uso da Mais Score e entenda as condições para utilização dos nossos serviços de regularização de CPF e score de crédito.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://maisscore.com.br/termos' },
}

const sections = [
  {
    title: '1. Aceitação dos Termos',
    content: `Ao acessar o site <strong>maisscore.com.br</strong> ou contratar qualquer serviço da <strong>Mais Score</strong> (marca da Ruptura Comércio Digital Ltda., CNPJ 64.945.712/0001-66), você declara ter lido, compreendido e concordado com estes Termos de Uso. Caso não concorde com alguma disposição, pedimos que não utilize nossos serviços.`,
  },
  {
    title: '2. Descrição do Serviço',
    content: `A Mais Score oferece serviços de <strong>regularização de CPF e melhoria de score de crédito</strong> por meio de processo jurídico próprio, que inclui:
    <ul>
      <li>Análise da situação cadastral junto aos órgãos de proteção ao crédito (Serasa, SPC e similares).</li>
      <li>Identificação de restrições indevidas ou passíveis de contestação.</li>
      <li>Condução do processo de exclusão ou regularização dessas restrições.</li>
      <li>Acompanhamento e comunicação sobre o andamento do processo.</li>
    </ul>
    <strong>Não somos uma empresa de negociação ou quitação de dívidas.</strong> Nosso serviço atua exclusivamente na via jurídica para remoção de restrições ilegais ou irregulares.`,
  },
  {
    title: '3. Elegibilidade',
    content: `Para contratar nossos serviços, o usuário deve:
    <ul>
      <li>Ser pessoa física brasileira, maior de 18 anos ou emancipada legalmente.</li>
      <li>Possuir CPF válido e ativo perante a Receita Federal.</li>
      <li>Fornecer informações verdadeiras, completas e atualizadas no momento do cadastro.</li>
    </ul>
    A Mais Score reserva-se o direito de recusar a prestação de serviços caso as condições acima não sejam atendidas.`,
  },
  {
    title: '4. Cadastro e Responsabilidades do Usuário',
    content: `O usuário é responsável por:
    <ul>
      <li>Fornecer dados verdadeiros e manter suas informações atualizadas.</li>
      <li>Guardar sigilo de quaisquer credenciais de acesso eventualmente criadas.</li>
      <li>Não utilizar o serviço para fins ilícitos, fraudulentos ou lesivos a terceiros.</li>
      <li>Comunicar imediatamente a Mais Score caso identifique uso não autorizado de seus dados.</li>
    </ul>
    A Mais Score não se responsabiliza por danos decorrentes de informações incorretas fornecidas pelo usuário.`,
  },
  {
    title: '5. Contratação e Pagamento',
    content: `O serviço é contratado mediante:
    <ul>
      <li>Aceite eletrônico destes Termos de Uso e da Política de Privacidade.</li>
      <li>Pagamento do valor acordado, conforme plano escolhido, via cartão de crédito, PIX ou boleto.</li>
    </ul>
    O pagamento é processado por gateways certificados e seguros. Após a confirmação do pagamento, o processo de análise e regularização será iniciado em até <strong>2 dias úteis</strong>.`,
  },
  {
    title: '6. Prazo e Entrega',
    content: `O prazo estimado para a regularização é de <strong>até 30 dias úteis</strong> a partir do início do processo, podendo variar conforme a complexidade do caso e os prazos legais dos órgãos competentes. A Mais Score manterá o cliente informado sobre o andamento via WhatsApp e e-mail.`,
  },
  {
    title: '7. Taxa de Sucesso e Garantias',
    content: `A Mais Score possui taxa histórica de sucesso de <strong>97%</strong>. Nos casos em que não seja possível obter a regularização, o cliente será comunicado com a devida justificativa. As condições de reembolso, quando aplicáveis, estão descritas na <a href="/reembolso" class="text-brand-orange hover:underline">Política de Reembolso</a>.`,
  },
  {
    title: '8. Propriedade Intelectual',
    content: `Todo o conteúdo disponível no site maisscore.com.br — incluindo textos, imagens, logotipos, layout e código-fonte — é de propriedade exclusiva da Ruptura Comércio Digital Ltda. e está protegido pela legislação brasileira de direitos autorais. É vedada a reprodução, distribuição ou uso comercial sem autorização expressa e por escrito.`,
  },
  {
    title: '9. Limitação de Responsabilidade',
    content: `A Mais Score não se responsabiliza por:
    <ul>
      <li>Resultados adversos decorrentes de informações incorretas fornecidas pelo cliente.</li>
      <li>Atrasos causados por demoras nos sistemas ou processos internos dos órgãos de proteção ao crédito.</li>
      <li>Danos indiretos, lucros cessantes ou perdas consequenciais de qualquer natureza.</li>
      <li>Indisponibilidades temporárias do site por motivos de manutenção ou falhas técnicas.</li>
    </ul>`,
  },
  {
    title: '10. Rescisão e Cancelamento',
    content: `O usuário pode solicitar o cancelamento do serviço a qualquer momento pelo WhatsApp (15) 97405-8014 ou pelo e-mail contato@maisscore.com.br. O direito de arrependimento, conforme o Código de Defesa do Consumidor (Art. 49), pode ser exercido em até <strong>7 dias úteis</strong> após a contratação, com reembolso integral. Após esse prazo, aplicam-se as condições da Política de Reembolso.`,
  },
  {
    title: '11. Alterações nos Termos',
    content: `A Mais Score pode atualizar estes Termos a qualquer momento. Alterações relevantes serão comunicadas por e-mail ou por aviso no site. O uso continuado do serviço após a publicação das alterações implica aceitação das novas condições.`,
  },
  {
    title: '12. Lei Aplicável e Foro',
    content: `Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da Comarca de Itapetininga-SP para dirimir quaisquer controvérsias decorrentes deste instrumento, com renúncia a qualquer outro, por mais privilegiado que seja.`,
  },
  {
    title: '13. Contato',
    content: `Para dúvidas ou solicitações relacionadas a estes Termos:
    <ul>
      <li><strong>E-mail:</strong> contato@maisscore.com.br</li>
      <li><strong>WhatsApp:</strong> (15) 97405-8014</li>
    </ul>`,
  },
]

export default function TermosPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-brand-navy">
        <div className="container-ms py-16 md:py-20">
          <p className="font-dm text-cap text-brand-orange mb-4 tracking-[6px] uppercase">
            Legal
          </p>
          <h1 className="font-dm text-h2 md:text-display text-white font-normal mb-4">
            Termos de Uso
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
                Termos de Uso
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
            Estes Termos de Uso regulam a relação entre a <strong>Mais Score</strong> e o usuário
            que acessa o site ou contrata nossos serviços de regularização de CPF e score de crédito.
            Leia com atenção antes de prosseguir.
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
