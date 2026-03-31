const fontFamilies = [
  {
    token: 'font-dm',
    cssVar: '--font-dm-sans',
    name: 'DM Sans',
    fontClass: 'font-dm',
    usage: 'Headings, botões, CTAs, cap, lable',
  },
  {
    token: 'font-sans',
    cssVar: '--font-geist-sans',
    name: 'Geist Sans',
    fontClass: 'font-sans',
    usage: 'Parágrafos, UI geral (p, p-lg, p-sm, txt-*)',
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
    size: '64px',
    lineHeight: '74px',
    weight: '400',
    font: 'DM Sans',
    fontClass: 'font-dm',
    capitalizacao: 'as typed',
    tracking: '0',
  },
  {
    token: 'text-h1',
    size: '48px',
    lineHeight: '52px',
    weight: '600',
    font: 'DM Sans',
    fontClass: 'font-dm',
    capitalizacao: 'as typed',
    tracking: '0',
  },
  {
    token: 'text-h2',
    size: '36px',
    lineHeight: '40px',
    weight: '600',
    font: 'DM Sans',
    fontClass: 'font-dm',
    capitalizacao: 'as typed',
    tracking: '0',
  },
  {
    token: 'text-h3',
    size: '36px',
    lineHeight: '40px',
    weight: '400',
    font: 'DM Sans',
    fontClass: 'font-dm',
    capitalizacao: 'as typed',
    tracking: '0',
  },
  {
    token: 'text-h4',
    size: '24px',
    lineHeight: '28px',
    weight: '600',
    font: 'DM Sans',
    fontClass: 'font-dm',
    capitalizacao: 'as typed',
    tracking: '0',
  },
  {
    token: 'text-h5',
    size: '24px',
    lineHeight: '28px',
    weight: '400',
    font: 'DM Sans',
    fontClass: 'font-dm',
    capitalizacao: 'as typed',
    tracking: '0',
  },
  {
    token: 'text-h6',
    size: '18px',
    lineHeight: '22px',
    weight: '600',
    font: 'DM Sans',
    fontClass: 'font-dm',
    capitalizacao: 'as typed',
    tracking: '0',
  },
  {
    token: 'text-subtitle',
    size: '16px',
    lineHeight: '20px',
    weight: '600',
    font: 'DM Sans',
    fontClass: 'font-dm',
    capitalizacao: 'as typed',
    tracking: '0',
  },
  {
    token: 'text-cap',
    size: '14px',
    lineHeight: '18px',
    weight: '400',
    font: 'DM Sans',
    fontClass: 'font-dm',
    capitalizacao: 'uppercase',
    tracking: '6px',
    extraClass: 'uppercase tracking-[6px]',
  },
  {
    token: 'text-p-sm',
    size: '14px',
    lineHeight: '16px',
    weight: '400',
    font: 'Geist Sans',
    fontClass: 'font-sans',
    capitalizacao: 'as typed',
    tracking: '-2px',
  },
  {
    token: 'text-p',
    size: '14px',
    lineHeight: '18px',
    weight: '400',
    font: 'Geist Sans',
    fontClass: 'font-sans',
    capitalizacao: 'as typed',
    tracking: '-2px',
  },
  {
    token: 'text-p-lg',
    size: '16px',
    lineHeight: '20px',
    weight: '400',
    font: 'Geist Sans',
    fontClass: 'font-sans',
    capitalizacao: 'as typed',
    tracking: '0',
  },
  {
    token: 'text-lable',
    size: '12px',
    lineHeight: '14px',
    weight: '400',
    font: 'DM Sans',
    fontClass: 'font-dm',
    capitalizacao: 'as typed',
    tracking: '0',
  },
  {
    token: 'text-txt-sm',
    size: '12px',
    lineHeight: '14px',
    weight: '400',
    font: 'Geist Sans',
    fontClass: 'font-sans',
    capitalizacao: 'as typed',
    tracking: '-2px',
  },
  {
    token: 'text-txt-xs',
    size: '10px',
    lineHeight: '12px',
    weight: '400',
    font: 'Geist Sans',
    fontClass: 'font-sans',
    capitalizacao: 'as typed',
    tracking: '-2px',
  },
]

export default function TipografiaPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">
          Tipografia
        </h1>
        <p className="text-p text-neutral-400 mb-8">
          Famílias tipográficas, escala de tamanhos e tokens de fonte do projeto.
        </p>
      </div>

      {/* Font Families */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Famílias Tipográficas
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        {fontFamilies.map((family) => (
          <div
            key={family.token}
            className="border border-brand-border rounded-lg p-6 bg-white"
          >
            <p className={`text-[32px] font-normal text-brand-navy mb-3 ${family.fontClass}`}>
              Aa Bb Cc
            </p>
            <p className="text-lable font-mono text-brand-orange mb-1">
              {family.token}
            </p>
            <p className="text-p-sm font-medium text-brand-navy mb-1">
              {family.name}
            </p>
            <p className="text-lable font-mono text-neutral-400 mb-2">
              {family.cssVar}
            </p>
            <p className="text-lable text-neutral-400">{family.usage}</p>
          </div>
        ))}
      </div>

      {/* Font Scale */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Escala de Tamanhos
        </h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-p-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Token</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Tamanho</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium hidden md:table-cell">Line Height</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium hidden md:table-cell">Peso</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium hidden lg:table-cell">Fonte</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium hidden lg:table-cell">Capitalização</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium hidden lg:table-cell">Tracking</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Preview</th>
            </tr>
          </thead>
          <tbody>
            {fontScale.map((item, index) => (
              <tr
                key={`${item.token}-${index}`}
                className={`border-b border-brand-border last:border-0 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'
                }`}
              >
                <td className="px-4 py-3 font-mono text-brand-orange text-lable">
                  {item.token}
                </td>
                <td className="px-4 py-3 text-neutral-400 font-mono">{item.size}</td>
                <td className="px-4 py-3 text-neutral-400 font-mono hidden md:table-cell">
                  {item.lineHeight}
                </td>
                <td className="px-4 py-3 text-neutral-400 hidden md:table-cell">
                  {item.weight}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className={`text-lable ${item.fontClass} text-brand-navy`}>{item.font}</span>
                </td>
                <td className="px-4 py-3 text-neutral-400 hidden lg:table-cell text-lable">
                  {item.capitalizacao}
                </td>
                <td className="px-4 py-3 text-neutral-400 font-mono hidden lg:table-cell text-lable">
                  {item.tracking}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`${item.token} ${item.fontClass}${'extraClass' in item ? ` ${item.extraClass}` : ''} text-brand-navy`}
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
