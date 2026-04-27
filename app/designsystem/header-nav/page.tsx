import { HeaderTopBar } from '@/components/shared/HeaderTopBar'
import { Header } from '@/components/shared/Header'
import { HeaderSimple } from '@/components/shared/HeaderSimple'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function HeaderNavPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">
          Header & Nav
        </h1>
        <p className="text-lg text-neutral-400 mb-8">
          Componentes de navegação e estrutura do header do site.
        </p>
      </div>

      {/* Header principal */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Header
        </h2>
        <p className="text-sm text-neutral-400 mb-4">
          Header principal do site — logo, navegação desktop, CTA de telefone e menu mobile.
          No styleguide, nav e CTA ficam ocultos automaticamente (detecção via{' '}
          <code className="font-mono bg-neutral-50 px-1 rounded">usePathname</code>).
          Inclui <code className="font-mono bg-neutral-50 px-1 rounded">HeaderTopBar</code> em produção.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg overflow-hidden mb-4">
        <Header />
      </div>
      <CodeBlock
        code={`import { Header } from '@/components/shared/Header'

// Já incluso no layout raiz (app/layout.tsx)
<Header />`}
      />

      {/* HeaderTopBar */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          HeaderTopBar
        </h2>
        <p className="text-sm text-neutral-400 mb-4">
          Barra superior do header — email, endereço e redes sociais. Visível apenas em desktop{' '}
          (<code className="font-mono bg-neutral-50 px-1 rounded">lg:</code>).
          Oculta no styleguide e em mobile.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg overflow-hidden mb-4">
        <HeaderTopBar />
      </div>
      <CodeBlock
        code={`import { HeaderTopBar } from '@/components/shared/HeaderTopBar'

<HeaderTopBar />`}
      />

      {/* HeaderSimple */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          HeaderSimple
        </h2>
        <p className="text-sm text-neutral-400 mb-4">
          Header minimalista — logo à esquerda e links de Instagram e WhatsApp à direita.
          Indicado para páginas sem navegação principal (ex: checkout, obrigado, campanhas).
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg overflow-hidden mb-4">
        <HeaderSimple />
      </div>
      <CodeBlock
        code={`import { HeaderSimple } from '@/components/shared/HeaderSimple'

<HeaderSimple />`}
      />
    </div>
  )
}
