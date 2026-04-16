import { Icon } from '@/components/ui/icon'

const FEATURES = [
  {
    icon: 'calendar' as const,
    title: '7 dias úteis',
    description: 'Para dar início ao processo',
  },
  {
    icon: 'carro' as const,
    title: 'Sem fiador',
    description: 'Alugue ou financie no seu nome',
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
      <div className="container-ms flex flex-col gap-8 py-10 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-24 lg:py-0 lg:min-h-[305px]">

        {/* Heading com destaque laranja */}
        <p className="font-dm text-h2 text-brand-navy lg:flex-1">
          Seu nome limpo{' '}
          <span className="text-brand-orange">abre portas</span>{' '}
          que você nem sabia que existiam
        </p>

        {/* Features */}
        <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:gap-8 lg:flex-1 lg:gap-12 lg:flex-nowrap lg:justify-end">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="flex items-center gap-4">
              <Icon name={feature.icon} size={40} className="shrink-0" />
              <div className="flex flex-col gap-0">
                <span className="font-dm text-sm sm:text-base font-bold text-brand-navy">
                  {feature.title}
                </span>
                <span className="font-dm text-sm sm:text-p text-grafite">
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
