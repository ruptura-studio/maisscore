import { Eye, ShieldCheck, Zap, Home, Car, CreditCard, HandCoins } from 'lucide-react'

const diferenciais = [
  {
    icon: Eye,
    titulo: 'Transparência total',
    desc: 'Você sabe exatamente o que está acontecendo com o seu processo. Sem surpresas, sem letras miúdas.',
  },
  {
    icon: ShieldCheck,
    titulo: 'Processo 100% legal',
    desc: 'Atuamos exclusivamente por vias jurídicas reconhecidas. Nada de gambiarras ou promessas vazias.',
  },
  {
    icon: Zap,
    titulo: 'Resultado em até 15 dias',
    desc: 'Prazo médio de 15 dias úteis para seu nome aparecer limpo nos principais birôs de crédito.',
  },
]

const beneficios = [
  { icon: Home, label: 'Financiamento Imobiliário' },
  { icon: Car, label: 'Financiamento de Veículos' },
  { icon: CreditCard, label: 'Cartão de Crédito' },
  { icon: HandCoins, label: 'Empréstimos' },
]

export function Diferenciais() {
  return (
    <section className="w-full py-24 bg-secondary">
      <div className="container-ms flex flex-col gap-16">
        {/* Title */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="text-caption text-muted uppercase tracking-[1.5px]">Por que a Mais Score</span>
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-tight tracking-[-1.5px] text-foreground max-w-[700px]">
            Existimos para provar que dívida do passado não define seu futuro
          </h2>
        </div>

        {/* Diferencial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {diferenciais.map((d) => (
            <div key={d.titulo} className="bg-card border border-border rounded-lg p-6 flex flex-col gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <d.icon size={24} className="text-accent-dark" />
              </div>
              <h3 className="text-heading-4 font-semibold text-foreground">{d.titulo}</h3>
              <p className="text-para-sm text-muted leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>

        {/* Benefícios após nome limpo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="rounded-lg overflow-hidden w-full aspect-[4/3]">
            <img
              src="https://www.figma.com/api/mcp/asset/b55fa801-c1bf-443f-a4c3-786c01a98598"
              alt="Pessoa feliz após limpar o nome"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Benefits list */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-caption text-muted uppercase tracking-[1.5px]">Depois do processo</span>
              <h3 className="text-[32px] font-semibold leading-tight tracking-[-1px] text-foreground">
                E depois que eu conseguir limpar meu nome?
              </h3>
              <p className="text-para-md text-muted leading-relaxed">
                Com o CPF regularizado, portas que estavam fechadas voltam a se abrir. Veja o que
                você poderá acessar novamente:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {beneficios.map((b) => (
                <div key={b.label} className="flex items-center gap-3 bg-card border border-border rounded-lg p-4">
                  <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <b.icon size={18} className="text-accent-dark" />
                  </div>
                  <span className="text-para-md font-medium text-foreground">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
