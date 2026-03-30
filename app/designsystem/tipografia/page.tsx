const fontFamilies = [
  {
    token: 'font-dm',
    cssVar: '--font-dm-sans',
    name: 'DM Sans',
    fontClass: 'font-dm',
    usage: 'Botões, CTAs, headings da marca',
  },
  {
    token: 'font-sans',
    cssVar: '--font-geist-sans',
    name: 'Geist Sans',
    fontClass: 'font-sans',
    usage: 'Corpo de texto, UI geral',
  },
  {
    token: 'font-mono',
    cssVar: '--font-geist-mono',
    name: 'Geist Mono',
    fontClass: 'font-mono',
    usage: 'Código, tokens, snippets',
  },
]

const fontScale = [
  {
    token: 'text-display',
    size: '80px',
    lineHeight: '70px',
    weight: '400',
    letterSpacing: '-3px',
    fontClass: 'font-dm',
    fontName: 'DM Sans',
  },
  {
    token: 'text-heading-1',
    size: '48px',
    lineHeight: '48px',
    weight: '600',
    letterSpacing: '-1.5px',
    fontClass: 'font-dm',
    fontName: 'DM Sans',
  },
  {
    token: 'text-heading-2',
    size: '36px',
    lineHeight: '40px',
    weight: '600',
    letterSpacing: '-1px',
    fontClass: 'font-dm',
    fontName: 'DM Sans',
  },
  {
    token: 'text-stat',
    size: '36px',
    lineHeight: '46.8px',
    weight: '400',
    letterSpacing: '-1px',
    fontClass: 'font-dm',
    fontName: 'DM Sans',
  },
  {
    token: 'text-card-stat',
    size: '26px',
    lineHeight: '32px',
    weight: '400',
    letterSpacing: '-0.5px',
    fontClass: 'font-dm',
    fontName: 'DM Sans',
  },
  {
    token: 'text-heading-3',
    size: '24px',
    lineHeight: '28.8px',
    weight: '600',
    letterSpacing: '-1px',
    fontClass: 'font-dm',
    fontName: 'DM Sans',
  },
  {
    token: 'text-heading-5',
    size: '22px',
    lineHeight: '27.2px',
    weight: '400',
    letterSpacing: '0',
    fontClass: 'font-dm',
    fontName: 'DM Sans',
  },
  {
    token: 'text-heading-4',
    size: '16px',
    lineHeight: '16px',
    weight: '500',
    letterSpacing: '0',
    fontClass: 'font-dm',
    fontName: 'DM Sans',
  },
  {
    token: 'text-para-lg',
    size: '18px',
    lineHeight: '27px',
    weight: '400',
    letterSpacing: '0',
    fontClass: 'font-sans',
    fontName: 'Geist Sans',
  },
  {
    token: 'text-para-md',
    size: '16px',
    lineHeight: '24px',
    weight: '400',
    letterSpacing: '0',
    fontClass: 'font-sans',
    fontName: 'Geist Sans',
  },
  {
    token: 'text-para-sm',
    size: '14px',
    lineHeight: '20px',
    weight: '400',
    letterSpacing: '0',
    fontClass: 'font-sans',
    fontName: 'Geist Sans',
  },
  {
    token: 'text-caption',
    size: '14px',
    lineHeight: '21px',
    weight: '400',
    letterSpacing: '1.5px',
    fontClass: 'font-sans',
    fontName: 'Geist Sans',
  },
  {
    token: 'text-label-sm',
    size: '13px',
    lineHeight: '18px',
    weight: '400',
    letterSpacing: '0',
    fontClass: 'font-dm',
    fontName: 'DM Sans',
  },
  {
    token: 'text-para-xs',
    size: '12px',
    lineHeight: '16px',
    weight: '400',
    letterSpacing: '0',
    fontClass: 'font-sans',
    fontName: 'Geist Sans',
  },
  {
    token: 'text-label-xs',
    size: '12px',
    lineHeight: '18px',
    weight: '400',
    letterSpacing: '0',
    fontClass: 'font-dm',
    fontName: 'DM Sans',
  },
]

export default function TipografiaPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-heading-2 font-dm font-normal text-brand-navy mb-2">
          Tipografia
        </h1>
        <p className="text-para-md text-neutral-400 mb-8">
          Famílias tipográficas, escala de tamanhos e tokens de fonte do projeto.
        </p>
      </div>

      {/* Font Families */}
      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Famílias Tipográficas
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        {fontFamilies.map((family) => (
          <div
            key={family.token}
            className="border border-brand-border rounded-lg p-6 bg-white"
          >
            <p
              className={`text-[32px] font-normal text-brand-navy mb-3 ${family.fontClass}`}
            >
              Aa Bb Cc
            </p>
            <p className="text-para-xs font-mono text-brand-orange mb-1">
              {family.token}
            </p>
            <p className="text-para-sm font-medium text-brand-navy mb-1">
              {family.name}
            </p>
            <p className="text-para-xs font-mono text-neutral-400 mb-2">
              {family.cssVar}
            </p>
            <p className="text-para-xs text-neutral-400">{family.usage}</p>
          </div>
        ))}
      </div>

      {/* Font Scale */}
      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Escala de Tamanhos
        </h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-para-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Token</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Tamanho</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium hidden md:table-cell">Line Height</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium hidden md:table-cell">Peso</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium hidden md:table-cell">Fonte</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Preview</th>
            </tr>
          </thead>
          <tbody>
            {fontScale.map((item, index) => (
              <tr
                key={item.token}
                className={`border-b border-brand-border last:border-0 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'
                }`}
              >
                <td className="px-4 py-3 font-mono text-brand-orange text-para-xs">
                  {item.token}
                </td>
                <td className="px-4 py-3 text-neutral-400 font-mono">{item.size}</td>
                <td className="px-4 py-3 text-neutral-400 font-mono hidden md:table-cell">
                  {item.lineHeight}
                </td>
                <td className="px-4 py-3 text-neutral-400 hidden md:table-cell">
                  {item.weight}
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`text-para-xs ${item.fontClass} text-brand-navy`}>{item.fontName}</span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`${item.token} ${item.fontClass} text-brand-navy`}
                    style={{ fontWeight: item.weight }}
                  >
                    Mais Score
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
