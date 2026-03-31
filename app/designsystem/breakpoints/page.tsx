const breakpoints = [
  {
    token: 'sm',
    px: 390,
    use: 'Celular — iPhone SE, Android compacto',
  },
  {
    token: 'md',
    px: 768,
    use: 'Tablet — iPad vertical, telas médias',
  },
  {
    token: 'lg',
    px: 1024,
    use: 'Tablet landscape / laptop pequeno',
  },
  {
    token: 'xl',
    px: 1280,
    use: 'Desktop padrão',
  },
  {
    token: '2xl',
    px: 1536,
    use: 'Monitor grande',
  },
  {
    token: '3xl',
    px: 1920,
    use: 'Monitor ultrawide / 4K',
  },
]

const MAX_PX = 1920

export default function BreakpointsPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">
          Breakpoints
        </h1>
        <p className="text-p-lg text-neutral-400 mb-8">
          Pontos de quebra responsivos definidos no Tailwind config.
        </p>
      </div>

      {/* Table */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Tabela de Breakpoints
        </h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden mb-10">
        <table className="w-full text-p-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Token</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Valor</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Uso típico</th>
            </tr>
          </thead>
          <tbody>
            {breakpoints.map((bp, index) => (
              <tr
                key={bp.token}
                className={`border-b border-brand-border last:border-0 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'
                }`}
              >
                <td className="px-4 py-3 font-mono text-brand-orange">
                  {bp.token}:
                </td>
                <td className="px-4 py-3 font-mono text-brand-navy">
                  {bp.px}px
                </td>
                <td className="px-4 py-3 text-neutral-400">{bp.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visual scale */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Escala Visual
        </h2>
        <p className="text-p-sm text-neutral-400 mb-6">
          Representação proporcional dos breakpoints em relação ao maior ponto (1920px).
        </p>
      </div>
      <div className="preview-full relative bg-neutral-50 border border-brand-border rounded-lg p-6 overflow-x-auto">
        {/* Scale bar */}
        <div className="relative h-8 bg-brand-border/40 rounded-full mb-8 min-w-[400px]">
          {breakpoints.map((bp) => {
            const percent = (bp.px / MAX_PX) * 100
            return (
              <div
                key={bp.token}
                className="absolute top-0 bottom-0 flex flex-col items-center"
                style={{ left: `${percent}%` }}
              >
                <div className="w-px h-full bg-brand-orange/60" />
              </div>
            )
          })}
          {/* Filled area */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            {breakpoints.map((bp, i) => {
              const colors = [
                'bg-brand-orange/10',
                'bg-brand-orange/20',
                'bg-brand-orange/30',
                'bg-brand-orange/40',
                'bg-brand-orange/50',
                'bg-brand-orange/60',
              ]
              return (
                <div
                  key={bp.token}
                  className={`absolute top-0 bottom-0 ${colors[i]}`}
                  style={{ width: `${(bp.px / MAX_PX) * 100}%` }}
                />
              )
            })}
          </div>
        </div>

        {/* Labels */}
        <div className="relative min-w-[400px] h-12">
          {breakpoints.map((bp) => {
            const percent = (bp.px / MAX_PX) * 100
            return (
              <div
                key={bp.token}
                className="absolute flex flex-col items-center"
                style={{ left: `${percent}%`, transform: 'translateX(-50%)' }}
              >
                <span className="text-lable font-mono font-medium text-brand-orange">
                  {bp.token}
                </span>
                <span className="text-[10px] font-mono text-neutral-400">
                  {bp.px}px
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Usage note */}
      <div className="sg-prose mt-8">
        <div className="p-4 bg-brand-orange/5 border border-brand-orange/20 rounded-lg">
          <p className="text-p-sm text-grafite">
            <strong className="text-brand-orange">Dica:</strong> Use prefixo{' '}
            <code className="font-mono bg-white px-1 rounded">md:</code> para estilos
            que se aplicam a partir de 768px. Ex:{' '}
            <code className="font-mono bg-white px-1 rounded">
              className=&quot;px-6 md:px-16 xl:px-24&quot;
            </code>
          </p>
        </div>
      </div>
    </div>
  )
}
