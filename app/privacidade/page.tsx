import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade — Mais Score',
  description:
    'Saiba como a Mais Score coleta, utiliza e protege seus dados pessoais conforme a Lei Geral de Proteção de Dados (LGPD).',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://maisscore.com.br/privacidade' },
}

const sections = [
  {
    title: '1. Quem somos',
    content: `A <strong>Mais Score</strong> é uma marca da <strong>Ruptura Comércio Digital Ltda.</strong>, inscrita no CNPJ 64.945.712/0001-66. Somos responsáveis pelo tratamento dos seus dados pessoais conforme descrito nesta Política.`,
  },
  {
    title: '2. Dados que coletamos',
    content: `Coletamos apenas os dados necessários para a prestação dos nossos serviços:
    <ul>
      <li><strong>Dados de identificação:</strong> nome completo, CPF, data de nascimento e e-mail.</li>
      <li><strong>Dados de contato:</strong> número de telefone (WhatsApp) e endereço.</li>
      <li><strong>Dados de navegação:</strong> endereço IP, tipo de navegador, páginas visitadas e tempo de sessão, coletados automaticamente via cookies.</li>
      <li><strong>Dados de pagamento:</strong> processados por gateways certificados (Stripe/Asaas); não armazenamos dados de cartão em nossos servidores.</li>
    </ul>`,
  },
  {
    title: '3. Como usamos seus dados',
    content: `Utilizamos seus dados para:
    <ul>
      <li>Prestar o serviço de regularização de CPF e score de crédito contratado.</li>
      <li>Comunicar atualizações sobre o andamento do seu processo via WhatsApp e e-mail.</li>
      <li>Processar pagamentos e emitir documentos fiscais.</li>
      <li>Cumprir obrigações legais e regulatórias.</li>
      <li>Melhorar a experiência de navegação no site (analytics agregado e anonimizado).</li>
    </ul>`,
  },
  {
    title: '4. Base legal para o tratamento',
    content: `Tratamos seus dados com base nas seguintes hipóteses legais previstas na <strong>LGPD (Lei 13.709/2018)</strong>:
    <ul>
      <li><strong>Execução de contrato</strong> — para entregar o serviço que você contratou.</li>
      <li><strong>Cumprimento de obrigação legal</strong> — quando exigido por lei ou autoridade competente.</li>
      <li><strong>Legítimo interesse</strong> — para melhorias de produto e comunicações relacionadas ao serviço.</li>
      <li><strong>Consentimento</strong> — para envio de comunicações de marketing, que pode ser revogado a qualquer momento.</li>
    </ul>`,
  },
  {
    title: '5. Compartilhamento de dados',
    content: `Não vendemos seus dados. Podemos compartilhá-los somente com:
    <ul>
      <li><strong>Parceiros operacionais:</strong> plataformas de pagamento, serviços de e-mail e WhatsApp necessários à execução do serviço.</li>
      <li><strong>Autoridades públicas:</strong> quando exigido por lei, ordem judicial ou solicitação de autoridade reguladora.</li>
      <li><strong>Assessores jurídicos:</strong> na medida necessária para conduzir o processo de regularização do seu CPF.</li>
    </ul>
    Todos os parceiros estão sujeitos a obrigações contratuais de confidencialidade e conformidade com a LGPD.`,
  },
  {
    title: '6. Cookies e rastreamento',
    content: `Utilizamos cookies para:
    <ul>
      <li><strong>Cookies essenciais:</strong> necessários para o funcionamento do site (não podem ser desativados).</li>
      <li><strong>Cookies analíticos:</strong> medem o uso do site de forma agregada (ex: Google Analytics). Você pode recusá-los nas configurações do seu navegador.</li>
      <li><strong>Cookies de marketing:</strong> utilizados para exibir anúncios relevantes (ex: Meta Pixel). Ativados somente com seu consentimento.</li>
    </ul>`,
  },
  {
    title: '7. Por quanto tempo guardamos seus dados',
    content: `Retemos seus dados pelo tempo necessário para:
    <ul>
      <li>Cumprir a finalidade para a qual foram coletados.</li>
      <li>Atender obrigações legais (prazo mínimo de 5 anos para documentos fiscais conforme legislação tributária).</li>
      <li>Exercer direitos em processos judiciais, administrativos ou arbitrais.</li>
    </ul>
    Após o término do prazo de retenção, os dados são excluídos ou anonimizados de forma segura.`,
  },
  {
    title: '8. Seus direitos como titular',
    content: `Conforme a LGPD, você tem direito a:
    <ul>
      <li><strong>Acesso:</strong> confirmar se tratamos seus dados e obter uma cópia.</li>
      <li><strong>Correção:</strong> corrigir dados incompletos, inexatos ou desatualizados.</li>
      <li><strong>Exclusão:</strong> solicitar a exclusão de dados tratados com base em consentimento.</li>
      <li><strong>Portabilidade:</strong> receber seus dados em formato estruturado e interoperável.</li>
      <li><strong>Revogação do consentimento:</strong> retirar seu consentimento a qualquer momento.</li>
      <li><strong>Oposição:</strong> opor-se ao tratamento realizado com base em legítimo interesse.</li>
    </ul>
    Para exercer seus direitos, entre em contato pelo e-mail <strong>privacidade@maisscore.com.br</strong>. Respondemos em até 15 dias úteis.`,
  },
  {
    title: '9. Segurança dos dados',
    content: `Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda, destruição ou divulgação indevida, incluindo criptografia em trânsito (TLS), controle de acesso por perfil e monitoramento contínuo de incidentes.`,
  },
  {
    title: '10. Alterações nesta Política',
    content: `Podemos atualizar esta Política periodicamente. Quando fizermos alterações relevantes, notificaremos você por e-mail ou por aviso em destaque no site. A data da última atualização é sempre indicada no topo desta página.`,
  },
  {
    title: '11. Contato e Encarregado (DPO)',
    content: `Para dúvidas, solicitações ou reclamações relacionadas à privacidade:
    <ul>
      <li><strong>E-mail:</strong> privacidade@maisscore.com.br</li>
      <li><strong>WhatsApp:</strong> (15) 99237-7755</li>
    </ul>
    Você também pode registrar reclamações junto à <strong>ANPD</strong> (Autoridade Nacional de Proteção de Dados) em <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" class="text-brand-orange hover:underline">gov.br/anpd</a>.`,
  },
]

export default function PrivacidadePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-brand-navy">
        <div className="container-ms py-16 md:py-20">
          <p className="font-dm text-cap text-brand-orange mb-4 tracking-[6px] uppercase">
            Legal
          </p>
          <h1 className="font-dm text-h2 md:text-display text-white font-normal mb-4">
            Política de Privacidade
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
                Política de Privacidade
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
            A sua privacidade é importante para nós. Esta Política descreve como a Mais Score coleta,
            usa, armazena e protege suas informações pessoais, em conformidade com a{' '}
            <strong>Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018)</strong>.
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
