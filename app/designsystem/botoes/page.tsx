import { ArrowRight } from 'lucide-react'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function BotoesPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">
          Botões
        </h1>
        <p className="text-lg text-neutral-400 mb-8">
          Classes utilitárias de botão definidas em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">
            globals.css
          </code>
          . Usam DM Sans, height 62px e border-radius 36px.
        </p>
      </div>

      {/* btn-primary */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          .btn-primary
        </h2>
        <p className="text-sm text-neutral-400 mb-4">
          Fundo laranja (#ff4000), texto branco. Usado para a ação principal da página.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex items-center justify-center bg-neutral-50 mb-4">
        <button className="btn-primary">
          Quero regularizar meu CPF
        </button>
      </div>
      <CodeBlock
        code={`<button className="btn-primary">
  Quero regularizar meu CPF
</button>`}
      />

      {/* btn-primary with icon */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          .btn-primary com ícone
        </h2>
        <p className="text-sm text-neutral-400 mb-4">
          O botão já usa <code className="font-mono bg-neutral-50 px-1 rounded">gap-2</code>,
          basta adicionar um ícone ao lado do texto.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex items-center justify-center bg-neutral-50 mb-4">
        <button className="btn-primary">
          Começar agora
          <ArrowRight size={18} />
        </button>
      </div>
      <CodeBlock
        code={`import { ArrowRight } from 'lucide-react'

<button className="btn-primary">
  Começar agora
  <ArrowRight size={18} />
</button>`}
      />

      {/* btn-secondary */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          .btn-secondary
        </h2>
        <p className="text-sm text-neutral-400 mb-4">
          Fundo navy (#101c2e), texto branco. Usado para ações secundárias ou de contraste.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex items-center justify-center bg-neutral-50 mb-4">
        <button className="btn-secondary">
          Ver como funciona
        </button>
      </div>
      <CodeBlock
        code={`<button className="btn-secondary">
  Ver como funciona
</button>`}
      />

      {/* btn-secondary full width */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          .btn-secondary — largura total (checkout)
        </h2>
        <p className="text-sm text-neutral-400 mb-4">
          Variante usada no fluxo de checkout para os botões de navegação entre etapas (Avançar,
          Voltar ao site). Adiciona{' '}
          <code className="font-mono bg-neutral-50 px-1 rounded">w-full</code> e sobrescreve o
          border-radius padrão com{' '}
          <code className="font-mono bg-neutral-50 px-1 rounded">!rounded-md</code>.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex items-center justify-center bg-neutral-50 mb-4">
        <div className="w-full max-w-sm">
          <button className="btn-secondary w-full !rounded-md">
            Avançar
          </button>
        </div>
      </div>
      <CodeBlock
        code={`<button className="btn-secondary w-full !rounded-md">
  Avançar
</button>

{/* como link */}
<a href="/" className="btn-secondary w-full !rounded-md text-center">
  Voltar ao site
</a>`}
      />

      {/* btn-outline (Voltar) */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Botão outline branco — par de navegação (checkout)
        </h2>
        <p className="text-sm text-neutral-400 mb-4">
          Fundo branco, borda <code className="font-mono bg-neutral-50 px-1 rounded">brand-border</code>,
          texto navy. Usado ao lado do <code className="font-mono bg-neutral-50 px-1 rounded">btn-secondary</code>{' '}
          para o par Voltar / Avançar no fluxo de checkout. Usa o componente{' '}
          <code className="font-mono bg-neutral-50 px-1 rounded">Button variant="outline"</code> do shadcn/ui
          com overrides de altura, cor e border-radius.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex items-center justify-center bg-neutral-50 mb-4">
        <div className="w-full max-w-sm flex gap-3">
          <button className="flex-1 h-11 rounded-md border border-[#e2e8f0] bg-white text-[#101c2e] text-sm font-normal font-[DM_Sans,sans-serif] hover:bg-neutral-50 transition-colors">
            Voltar
          </button>
          <button className="btn-secondary flex-1 !rounded-md h-11">
            Avançar
          </button>
        </div>
      </div>
      <CodeBlock
        code={`import { Button } from '@/components/ui/button'

<div className="flex gap-3">
  <Button
    variant="outline"
    className="flex-1 h-11 rounded-md border-brand-border bg-white text-brand-navy hover:bg-neutral-50"
  >
    Voltar
  </Button>
  <button className="btn-secondary flex-1 !rounded-md h-11">
    Avançar
  </button>
</div>`}
      />

      {/* nav-link */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          .nav-link
        </h2>
        <p className="text-sm text-neutral-400 mb-4">
          Link de navegação. Texto navy, hover laranja com transição suave.
          Aplicado nos itens do Header.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex items-center justify-center gap-8 bg-neutral-50 mb-4">
        <a href="#" className="nav-link text-lg">
          Início
        </a>
        <a href="#" className="nav-link text-lg">
          Como funciona
        </a>
        <a href="#" className="nav-link text-lg">
          Depoimentos
        </a>
      </div>
      <CodeBlock
        code={`<a href="/como-funciona" className="nav-link">
  Como funciona
</a>`}
      />

      {/* Specs */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Especificações
        </h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Propriedade</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">btn-primary</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">btn-secondary</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">outline (checkout)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Altura', '62px', '62px / 44px (checkout)', '44px'],
              ['Border radius', '36px', '36px / md (checkout)', 'md'],
              ['Padding', '16px 24px', '12px 24px', '—'],
              ['Font size', '16px', '14px', '14px'],
              ['Font family', 'DM Sans', 'DM Sans', 'DM Sans'],
              ['Fundo', '#ff4000', '#101c2e', '#ffffff'],
              ['Texto', '#ffffff', '#ffffff', '#101c2e'],
              ['Hover', '#e63a00', '#1a2c45', 'neutral-50'],
            ].map(([prop, primary, secondary, outline], i) => (
              <tr
                key={prop}
                className={`border-b border-brand-border last:border-0 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'
                }`}
              >
                <td className="px-4 py-3 text-neutral-400">{prop}</td>
                <td className="px-4 py-3 font-mono text-brand-navy">{primary}</td>
                <td className="px-4 py-3 font-mono text-brand-navy">{secondary}</td>
                <td className="px-4 py-3 font-mono text-brand-navy">{outline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
