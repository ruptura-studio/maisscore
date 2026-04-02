const brandColors = [
  { token: 'brand-orange', hex: '#ff4000', textClass: 'text-white' },
  { token: 'brand-navy', hex: '#101c2e', textClass: 'text-white' },
  { token: 'brand-border', hex: '#d4d4d4', textClass: 'text-grafite' },
  { token: 'white', hex: '#ffffff', textClass: 'text-grafite' },
]

const neutralColors = [
  { token: 'grafite', hex: '#2E2E2E', textClass: 'text-white' },
  { token: 'neutral-400', hex: '#a3a3a3', textClass: 'text-white' },
  { token: 'neutral-50', hex: '#fafafa', textClass: 'text-grafite' },
  { token: 'foreground-alt', hex: '#404040', textClass: 'text-white' },
]

const shadcnTokens = [
  '--background',
  '--foreground',
  '--primary',
  '--secondary',
  '--muted',
  '--accent',
  '--destructive',
  '--border',
]

type Swatch = { token: string; hex: string; textClass: string }

const figmaColorGroups: { title: string; colors: Swatch[] }[] = [
  {
    title: 'Marca',
    colors: [
      { token: 'PRIMARY',  hex: '#FF4000', textClass: 'text-white' },
      { token: 'SECONDARY', hex: '#101C2E', textClass: 'text-white' },
      { token: 'WHITE',    hex: '#FFFFFF', textClass: 'text-[#484848]' },
      { token: 'BLACK',    hex: '#000000', textClass: 'text-white' },
    ],
  },
  {
    title: 'Cinzas',
    colors: [
      { token: 'GREY_5',  hex: '#F2F2F2', textClass: 'text-[#484848]' },
      { token: 'GREY_10', hex: '#E9E9E9', textClass: 'text-[#484848]' },
      { token: 'GREY_20', hex: '#F6F6F6', textClass: 'text-[#484848]' },
      { token: 'GREY_25', hex: '#E5E5EC', textClass: 'text-[#484848]' },
      { token: 'GREY_30', hex: '#D3D3D3', textClass: 'text-[#484848]' },
      { token: 'GREY_40', hex: '#BDBDBD', textClass: 'text-[#484848]' },
      { token: 'GREY_45', hex: '#939393', textClass: 'text-white' },
      { token: 'GREY_50', hex: '#6B6B6B', textClass: 'text-white' },
    ],
  },
  {
    title: 'Texto',
    colors: [
      { token: 'TEXT_WHITE',          hex: '#FDFDFD',   textClass: 'text-[#484848]' },
      { token: 'TEXT_DISABLED',       hex: '#A0A0A0',   textClass: 'text-white' },
      { token: 'TEXT_DEFAULT',        hex: '#484848',   textClass: 'text-white' },
      { token: 'TEXT_LEAD_PRIMARY',   hex: '#FF4000',   textClass: 'text-white' },
      { token: 'TEXT_LEAD_SECONDARY', hex: '#101C2E',   textClass: 'text-white' },
    ],
  },
  {
    title: 'Preto com opacidade',
    colors: [
      { token: 'BLACK_15', hex: '#00000026', textClass: 'text-[#484848]' },
      { token: 'BLACK_50', hex: '#00000080', textClass: 'text-white' },
      { token: 'BLACK_70', hex: '#000000B3', textClass: 'text-white' },
    ],
  },
  {
    title: 'Azul com opacidade',
    colors: [
      { token: 'BLUE_10', hex: '#101C2E1A', textClass: 'text-[#484848]' },
      { token: 'BLUE_25', hex: '#101C2E40', textClass: 'text-[#484848]' },
    ],
  },
  {
    title: 'Semânticas',
    colors: [
      { token: 'GREEN',  hex: '#4B9857', textClass: 'text-white' },
      { token: 'YELLOW', hex: '#ECBB2A', textClass: 'text-[#484848]' },
      { token: 'RED',    hex: '#FF4840', textClass: 'text-white' },
    ],
  },
]

function ColorSwatch({ token, hex, textClass }: Swatch) {
  return (
    <div className="rounded-lg overflow-hidden border border-brand-border">
      <div className="h-20 w-full" style={{ backgroundColor: hex }} />
      <div className="p-3 bg-white">
        <p className="text-sm font-medium text-brand-navy font-mono">{token}</p>
        <p className="text-label text-neutral-400 font-mono">{hex}</p>
      </div>
    </div>
  )
}

export default function CoresPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">
          Cores
        </h1>
        <p className="text-lg text-neutral-400 mb-8">
          Paleta de marca, tokens neutros e variáveis CSS do shadcn/ui.
        </p>
      </div>

      {/* Neutros */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Neutros
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {neutralColors.map((color) => (
          <ColorSwatch key={color.token} {...color} />
        ))}
      </div>

      {/* Figma Design Tokens */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-1 mt-10 pb-2 border-b border-brand-border">
          Tokens Figma
        </h2>
        <p className="text-sm text-neutral-400 mb-6">
          Paleta oficial do Figma — nomes exatos dos tokens de design.
        </p>
      </div>
      {figmaColorGroups.map((group) => (
        <div key={group.title}>
          <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-400 mb-3 mt-6">
            {group.title}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {group.colors.map((color) => (
              <ColorSwatch key={color.token} {...color} />
            ))}
          </div>
        </div>
      ))}

      {/* shadcn/ui Tokens */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Tokens shadcn/ui
        </h2>
        <p className="text-sm text-neutral-400 mb-4">
          Variáveis CSS usadas pelos componentes shadcn/ui. Os valores são definidos
          em <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">globals.css</code>.
        </p>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Variável CSS</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Uso</th>
            </tr>
          </thead>
          <tbody>
            {shadcnTokens.map((token, index) => (
              <tr key={token} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                <td className="px-4 py-3 font-mono text-brand-orange">{token}</td>
                <td className="px-4 py-3 text-neutral-400">hsl(var({token}))</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
