import { Icon } from '@/components/ui/icon'

const FEATURES = [
  {
    icon: 'calendar' as const,
    title: '7 dias úteis',
    description: 'Para dar início ao processo',
  },
  {
    icon: 'carro' as const,
    title: 'Financie um veículo',
    description: 'Carro ou moto no seu nome',
  },
  {
    icon: 'dialogo' as const,
    title: '100% online',
    description: 'Acompanhe pelo WhatsApp',
  },
]

export function BeneficiosBar() {
  return (
    <section className="w-full bg-white border-t border-brand-navy/10">
      <div className="container-ms flex flex-col gap-10 py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-20 lg:py-0 lg:min-h-[305px]">

        {/* Heading com destaque laranja */}
        <p className="font-dm text-[28px] font-normal leading-[1.15] tracking-[-0.5px] text-brand-navy lg:text-[36px] lg:max-w-[500px]">
          Seu nome limpo{' '}
          <span className="text-brand-orange">abre portas</span>{' '}
          que você nem sabia que existiam
        </p>

        {/* Features */}
        <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:gap-8 lg:gap-[45px] lg:flex-nowrap">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="flex items-center gap-4">
              <Icon name={feature.icon} size={50} className="shrink-0" />
              <div className="flex flex-col gap-1.5">
                <span className="font-dm text-para-lg font-bold leading-tight text-brand-navy">
                  {feature.title}
                </span>
                <span className="font-dm text-para-xs text-grafite">
                  {feature.description}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
