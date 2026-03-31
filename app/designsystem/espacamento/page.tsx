const spacingScale = [
  { token: 'spacing-1', tailwind: 'p-1 / m-1', value: '4px', px: 4 },
  { token: 'spacing-2', tailwind: 'p-2 / m-2', value: '8px', px: 8 },
  { token: 'spacing-3', tailwind: 'p-3 / m-3', value: '12px', px: 12 },
  { token: 'spacing-4', tailwind: 'p-4 / m-4', value: '16px', px: 16 },
  { token: 'spacing-6', tailwind: 'p-6 / m-6', value: '24px', px: 24 },
  { token: 'spacing-8', tailwind: 'p-8 / m-8', value: '32px', px: 32 },
  { token: 'spacing-24', tailwind: 'p-24 / m-24', value: '96px', px: 96 },
]

const shadows = [
  {
    token: 'shadow-xs',
    value: '0 1px 2px rgba(0,0,0,0.05)',
    tailwind: 'shadow-xs',
  },
  {
    token: 'shadow-sm',
    value: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
    tailwind: 'shadow-sm',
  },
  {
    token: 'shadow-md',
    value: '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04)',
    tailwind: 'shadow-md',
  },
  {
    token: 'shadow-lg',
    value: '0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.04)',
    tailwind: 'shadow-lg',
  },
  {
    token: 'shadow-card',
    value: '0 8px 40px rgba(0,0,0,0.10)',
    tailwind: 'shadow-card',
  },
]

const borderRadii = [
  { token: 'rounded-sm', label: 'sm', style: 'calc(var(--radius) - 4px)' },
  { token: 'rounded-md', label: 'md', style: 'calc(var(--radius) - 2px)' },
  { token: 'rounded-lg', label: 'lg', style: 'var(--radius)' },
  { token: 'rounded-full', label: 'full', style: '9999px' },
]

const MAX_BAR_PX = 96

export default function EspacamentoPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">
          Espaçamento & Sombras
        </h1>
        <p className="text-p-lg text-neutral-400 mb-8">
          Escala de espaçamento, elevações e raios de borda do sistema de design.
        </p>
      </div>

      {/* Spacing */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Espaçamento
        </h2>
      </div>
      <div className="flex flex-col gap-3">
        {spacingScale.map((item) => (
          <div key={item.token} className="flex items-center gap-4">
            <div className="w-28 shrink-0">
              <p className="text-lable font-mono text-brand-orange">{item.tailwind}</p>
              <p className="text-lable text-neutral-400">{item.value}</p>
            </div>
            <div
              className="h-6 rounded bg-brand-orange/20 border border-brand-orange/40"
              style={{ width: `${(item.px / MAX_BAR_PX) * 100}%` }}
            />
          </div>
        ))}
      </div>

      {/* Shadows */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Sombras
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {shadows.map((shadow) => (
          <div key={shadow.token} className="flex flex-col items-center gap-3">
            <div
              className={`w-full h-20 bg-white rounded-lg ${shadow.tailwind} border border-brand-border/40`}
            />
            <div className="text-center">
              <p className="text-lable font-mono text-brand-orange">{shadow.token}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Border Radius */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Border Radius
        </h2>
      </div>
      <div className="flex flex-wrap gap-6 items-end">
        {borderRadii.map((item) => (
          <div key={item.token} className="flex flex-col items-center gap-3">
            <div
              className="w-20 h-20 bg-brand-navy/10 border-2 border-brand-navy/20"
              style={{ borderRadius: item.style }}
            />
            <div className="text-center">
              <p className="text-lable font-mono text-brand-orange">{item.token}</p>
              <p className="text-lable text-neutral-400">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
