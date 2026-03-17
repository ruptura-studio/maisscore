import { Eye, ShieldCheck, Zap, Search } from 'lucide-react'

const diferenciais = [
  {
    icon: Eye,
    titulo: 'Transparência',
    desc: 'Cada etapa do processo de Limpa Nome é comunicada em tempo real pelo WhatsApp. Você sempre sabe exatamente o que está acontecendo com o seu caso, sem surpresas e sem letras miúdas.',
  },
  {
    icon: ShieldCheck,
    titulo: 'Confiança',
    desc: '1.142 famílias já passaram pelo nosso processo de limpa nome. Com 97% de taxa de sucesso nosso trabalho fala por si. Cada caso é tratado com a seriedade e a abordagem individualizada que merece.',
  },
  {
    icon: Zap,
    titulo: 'Agilidade',
    desc: 'Nosso método foi desenvolvido para entregar resultados no menor prazo possível. O prazo médio de resolução é de 15 dias úteis — porque sabemos que cada dia com restrição é um dia de oportunidade perdida.',
  },
]

export function Diferenciais() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="container-ms flex flex-col gap-12">
        {/* Title */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="text-caption text-foreground uppercase tracking-[1.5px]">Valor nas conexões</span>
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-tight tracking-[-1.5px] text-foreground max-w-[700px]">
            Por trás de cada CPF regularizado, existe uma história que recomeçou
          </h2>
        </div>

        {/* Diferencial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {diferenciais.map((d) => (
            <div key={d.titulo} className="bg-card border border-border rounded-lg p-6 flex flex-col gap-4">
              <div className="w-6 h-6 flex items-center justify-center">
                <d.icon size={24} className="text-accent-dark" />
              </div>
              <h3 className="text-heading-4 font-semibold text-foreground">{d.titulo}</h3>
              <p className="text-para-sm text-foreground leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border" />

        {/* CPF check CTA */}
        <div className="flex flex-col items-center text-center gap-3">
          <h3 className="text-[20px] md:text-[24px] font-semibold text-foreground">
            Não tem certeza dos órgãos em que está negativado?
          </h3>
          <p className="text-para-md text-foreground">
            Faça uma consulta do seu CPF ou CNPJ clicando no botão abaixo.
          </p>
          <a
            href="https://wa.me/5515974058014?text=Ol%C3%A1%2C%20vim%20por%20meio%20do%20site%20e%20quero%20fazer%20uma%20consulta%20no%20meu%20CPF%20ou%20CNPJ."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent-dark text-white font-semibold text-para-sm px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors uppercase tracking-[1px] mt-2"
          >
            <Search size={16} />
            Consultar CPF ou CNPJ
          </a>
        </div>
      </div>
    </section>
  )
}
