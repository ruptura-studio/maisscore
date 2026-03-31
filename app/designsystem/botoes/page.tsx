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
        <p className="text-p-lg text-neutral-400 mb-8">
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
        <p className="text-p-sm text-neutral-400 mb-4">
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
        <p className="text-p-sm text-neutral-400 mb-4">
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
        <p className="text-p-sm text-neutral-400 mb-4">
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

      {/* nav-link */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          .nav-link
        </h2>
        <p className="text-p-sm text-neutral-400 mb-4">
          Link de navegação. Texto navy, hover laranja com transição suave.
          Aplicado nos itens do Header.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex items-center justify-center gap-8 bg-neutral-50 mb-4">
        <a href="#" className="nav-link text-p-lg">
          Início
        </a>
        <a href="#" className="nav-link text-p-lg">
          Como funciona
        </a>
        <a href="#" className="nav-link text-p-lg">
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
        <table className="w-full text-p-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Propriedade</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">btn-primary</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">btn-secondary</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Altura', '62px', '62px'],
              ['Border radius', '36px', '36px'],
              ['Padding', '16px 24px', '16px 24px'],
              ['Font size', '16px', '16px'],
              ['Font family', 'DM Sans', 'DM Sans'],
              ['Fundo', '#ff4000', '#101c2e'],
              ['Texto', '#ffffff', '#ffffff'],
              ['Hover', '#e63a00', '#1a2c45'],
            ].map(([prop, primary, secondary], i) => (
              <tr
                key={prop}
                className={`border-b border-brand-border last:border-0 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'
                }`}
              >
                <td className="px-4 py-3 text-neutral-400">{prop}</td>
                <td className="px-4 py-3 font-mono text-brand-navy">{primary}</td>
                <td className="px-4 py-3 font-mono text-brand-navy">{secondary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
