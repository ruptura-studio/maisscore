import config from '@/tailwind.config'

// Extrai fontSize do Tailwind config — fonte única da verdade
const twFontSize = (config.theme?.extend?.fontSize ?? {}) as Record<
  string,
  [string, { lineHeight?: string; fontWeight?: string; letterSpacing?: string }]
>

function getTokenProps(key: string) {
  const entry = twFontSize[key]
  if (!entry) return { size: '—', lineHeight: '—', weight: '—', letterSpacing: '0' }
  const [size, opts] = entry
  return {
    size,
    lineHeight: opts.lineHeight ?? '—',
    weight: opts.fontWeight ?? '400',
    letterSpacing: opts.letterSpacing ?? '0',
  }
}

const fontFamilies = [
  {
    token: 'font-dm',
    cssVar: '--font-dm-sans',
    name: 'DM Sans',
    fontClass: 'font-dm',
    usage: 'Headings, botões, CTAs, cap, label',
  },
  {
    token: 'font-sans',
    cssVar: '--font-geist-sans',
    name: 'Geist Sans',
    fontClass: 'font-sans',
    usage: 'Parágrafos, UI geral (p, lg, sm, txt-*)',
  },
  {
    token: 'font-mono',
    cssVar: '--font-geist-mono',
    name: 'Geist Mono',
    fontClass: 'font-mono',
    usage: 'Código, tokens, snippets',
  },
]

// Metadados que não vêm do Tailwind config
const fontScaleMeta: {
  token: string
  font: string
  fontClass: string
  capitalizacao: string
  extraClass?: string
}[] = [
  { token: 'text-display',  font: 'DM Sans',    fontClass: 'font-dm',   capitalizacao: 'as typed' },
  { token: 'text-h2',       font: 'DM Sans',    fontClass: 'font-dm',   capitalizacao: 'as typed' },
  { token: 'text-h3',       font: 'DM Sans',    fontClass: 'font-dm',   capitalizacao: 'as typed' },
  { token: 'text-subtitle', font: 'DM Sans',    fontClass: 'font-dm',   capitalizacao: 'as typed' },
  { token: 'text-cap',      font: 'DM Sans',    fontClass: 'font-dm',   capitalizacao: 'uppercase', extraClass: 'uppercase tracking-[6px]' },
  { token: 'text-sm',     font: 'Geist Sans', fontClass: 'font-sans', capitalizacao: 'as typed' },
  { token: 'text-p',        font: 'Geist Sans', fontClass: 'font-sans', capitalizacao: 'as typed' },
  { token: 'text-lg',     font: 'Geist Sans', fontClass: 'font-sans', capitalizacao: 'as typed' },
  { token: 'text-label',    font: 'DM Sans',    fontClass: 'font-dm',   capitalizacao: 'as typed' },
  { token: 'text-txt-sm',   font: 'Geist Sans', fontClass: 'font-sans', capitalizacao: 'as typed' },
  { token: 'text-txt-xs',   font: 'Geist Sans', fontClass: 'font-sans', capitalizacao: 'as typed' },
]

export default function TipografiaPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm text-brand-navy mb-2">
          Tipografia
        </h1>
        <p className="text-p text-neutral-400 mb-8">
          Famílias tipográficas, escala de tamanhos e tokens de fonte do projeto.
        </p>
      </div>

      {/* Font Families */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-dm text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Famílias Tipográficas
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        {fontFamilies.map((family) => (
          <div
            key={family.token}
            className="border border-brand-border rounded-lg p-6 bg-white"
          >
            <p className={`text-[32px] text-brand-navy mb-3 ${family.fontClass}`}>
              Aa Bb Cc
            </p>
            <p className="text-label font-mono text-brand-orange mb-1">
              {family.token}
            </p>
            <p className="text-sm text-brand-navy mb-1">
              {family.name}
            </p>
            <p className="text-label font-mono text-neutral-400 mb-2">
              {family.cssVar}
            </p>
            <p className="text-label text-neutral-400">{family.usage}</p>
          </div>
        ))}
      </div>

      {/* Font Scale */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-dm text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Escala de Tamanhos
        </h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy">Token</th>
              <th className="text-left px-4 py-3 text-brand-navy">Tamanho</th>
              <th className="text-left px-4 py-3 text-brand-navy hidden md:table-cell">Line Height</th>
              <th className="text-left px-4 py-3 text-brand-navy hidden md:table-cell">Peso</th>
              <th className="text-left px-4 py-3 text-brand-navy hidden lg:table-cell">Fonte</th>
              <th className="text-left px-4 py-3 text-brand-navy hidden lg:table-cell">Capitalização</th>
              <th className="text-left px-4 py-3 text-brand-navy hidden lg:table-cell">Tracking</th>
              <th className="text-left px-4 py-3 text-brand-navy">Preview</th>
            </tr>
          </thead>
          <tbody>
            {fontScaleMeta.map((item, index) => {
              const { size, lineHeight, weight, letterSpacing } = getTokenProps(
                item.token.replace('text-', '')
              )
              return (
                <tr
                  key={item.token}
                  className={`border-b border-brand-border last:border-0 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'
                  }`}
                >
                  <td className="px-4 py-3 font-mono text-brand-orange text-label">
                    {item.token}
                  </td>
                  <td className="px-4 py-3 text-neutral-400 font-mono">{size}</td>
                  <td className="px-4 py-3 text-neutral-400 font-mono hidden md:table-cell">
                    {lineHeight}
                  </td>
                  <td className="px-4 py-3 text-neutral-400 hidden md:table-cell">
                    {weight}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className={`text-label ${item.fontClass} text-brand-navy`}>{item.font}</span>
                  </td>
                  <td className="px-4 py-3 text-neutral-400 hidden lg:table-cell text-label">
                    {item.capitalizacao}
                  </td>
                  <td className="px-4 py-3 text-neutral-400 font-mono hidden lg:table-cell text-label">
                    {letterSpacing}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`${item.token} ${item.fontClass}${item.extraClass ? ` ${item.extraClass}` : ''} text-brand-navy`}
                    >
                      Mais Score
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
