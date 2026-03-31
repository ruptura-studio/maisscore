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
      {/* TODO: gap-10 fora da escala DS — usando gap-8 (32px); lg:gap-20 (80px) sem token — usando lg:gap-24 (96px); py-16 (64px) sem token no DS; lg:min-h-[305px] sem token */}
      <div className="container-ms flex flex-col gap-8 py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-24 lg:py-0 lg:min-h-[305px]">

        {/* Heading com destaque laranja */}
        {/* text-[28px] → text-h4 (24px, mais próximo); lg:text-[36px] → lg:text-h2 (36px, exato); leading/tracking removidos (baked no token) */}
        <p className="font-dm text-h4 font-normal text-brand-navy lg:text-h2 lg:max-w-[500px]">
          Seu nome limpo{' '}
          <span className="text-brand-orange">abre portas</span>{' '}
          que você nem sabia que existiam
        </p>

        {/* Features */}
        {/* lg:gap-[45px] (45px) sem token — usando lg:gap-8 (32px) com TODO */}
        <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:gap-8 lg:gap-8 lg:flex-nowrap">
          {/* TODO: lg:gap-[45px] sem token equivalente no DS — usando lg:gap-8 (32px) como aproximação */}
          {FEATURES.map((feature) => (
            <div key={feature.title} className="flex items-center gap-4">
              <Icon name={feature.icon} size={50} className="shrink-0" />
              {/* gap-1.5 (6px) fora da escala DS — usando gap-2 (8px) */}
              <div className="flex flex-col gap-2">
                {/* leading-tight removido — deixando o lineHeight do token text-h6 */}
                <span className="font-dm text-h6 font-bold text-brand-navy">
                  {feature.title}
                </span>
                <span className="font-dm text-lable text-grafite">
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
