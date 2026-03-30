function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

const columns = Array.from({ length: 12 }, (_, i) => i + 1)

const columnColors = [
  'bg-brand-orange/20',
  'bg-brand-orange/30',
  'bg-brand-orange/20',
  'bg-brand-orange/30',
  'bg-brand-orange/20',
  'bg-brand-orange/30',
  'bg-brand-orange/20',
  'bg-brand-orange/30',
  'bg-brand-orange/20',
  'bg-brand-orange/30',
  'bg-brand-orange/20',
  'bg-brand-orange/30',
]

export default function GridPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-heading-2 font-dm font-normal text-brand-navy mb-2">
          Grid & Container
        </h1>
        <p className="text-para-md text-neutral-400 mb-8">
          Classes de container e grade de 12 colunas do sistema de layout.
        </p>
      </div>

      {/* container-ms */}
      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          .container-ms
        </h2>
        <p className="text-para-sm text-neutral-400 mb-4">
          Container padrão com padding horizontal responsivo e largura máxima de 1440px.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg overflow-hidden mb-4">
        <div className="bg-brand-navy/5 p-1">
          <div className="container-ms bg-brand-orange/10 border border-brand-orange/30 rounded py-4 text-center">
            <span className="text-para-xs font-mono text-brand-orange font-medium">
              .container-ms — max-w-[1440px], px-6 md:px-16 xl:px-24
            </span>
          </div>
        </div>
      </div>
      <CodeBlock
        code={`.container-ms {
  @apply w-full mx-auto px-6 md:px-16 xl:px-24 max-w-[1440px];
}`}
      />

      {/* content-ms */}
      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          .content-ms
        </h2>
        <p className="text-para-sm text-neutral-400 mb-4">
          Conteúdo interno centralizado com max-width do container (1440px).
          Usado dentro do{' '}
          <code className="font-mono bg-neutral-50 px-1 rounded">.container-ms</code>{' '}
          para centralizar conteúdo estreito.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg overflow-hidden mb-4">
        <div className="bg-brand-navy/5 p-1">
          <div className="bg-white border border-dashed border-brand-border py-2 px-2">
            <div className="content-ms bg-brand-navy/10 border border-brand-navy/20 rounded py-4 text-center">
              <span className="text-para-xs font-mono text-brand-navy font-medium">
                .content-ms — max-w-container mx-auto
              </span>
            </div>
          </div>
        </div>
      </div>
      <CodeBlock
        code={`.content-ms {
  @apply max-w-container mx-auto;
  /* max-w-container = 1440px */
}`}
      />

      {/* 12-column grid */}
      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Grade de 12 Colunas
        </h2>
        <p className="text-para-sm text-neutral-400 mb-4">
          Use{' '}
          <code className="font-mono bg-neutral-50 px-1 rounded">grid grid-cols-12</code>{' '}
          com{' '}
          <code className="font-mono bg-neutral-50 px-1 rounded">col-span-N</code>{' '}
          para layouts baseados em colunas.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-4 mb-4">
        <div className="grid grid-cols-12 gap-1">
          {columns.map((col, i) => (
            <div
              key={col}
              className={`${columnColors[i]} border border-brand-orange/30 rounded py-3 flex items-center justify-center`}
            >
              <span className="text-[10px] font-mono font-medium text-brand-orange">
                {col}
              </span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-12 gap-1 mt-2">
          <div className="col-span-6 bg-brand-navy/10 border border-brand-navy/20 rounded py-2 flex items-center justify-center">
            <span className="text-para-xs font-mono text-brand-navy">col-span-6</span>
          </div>
          <div className="col-span-6 bg-brand-navy/10 border border-brand-navy/20 rounded py-2 flex items-center justify-center">
            <span className="text-para-xs font-mono text-brand-navy">col-span-6</span>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-1 mt-2">
          <div className="col-span-4 bg-brand-orange/15 border border-brand-orange/30 rounded py-2 flex items-center justify-center">
            <span className="text-para-xs font-mono text-brand-orange">col-span-4</span>
          </div>
          <div className="col-span-4 bg-brand-orange/15 border border-brand-orange/30 rounded py-2 flex items-center justify-center">
            <span className="text-para-xs font-mono text-brand-orange">col-span-4</span>
          </div>
          <div className="col-span-4 bg-brand-orange/15 border border-brand-orange/30 rounded py-2 flex items-center justify-center">
            <span className="text-para-xs font-mono text-brand-orange">col-span-4</span>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-1 mt-2">
          <div className="col-span-3 bg-brand-navy/10 border border-brand-navy/20 rounded py-2 flex items-center justify-center">
            <span className="text-para-xs font-mono text-brand-navy">3</span>
          </div>
          <div className="col-span-9 bg-brand-navy/10 border border-brand-navy/20 rounded py-2 flex items-center justify-center">
            <span className="text-para-xs font-mono text-brand-navy">col-span-9</span>
          </div>
        </div>
      </div>
      <CodeBlock
        code={`{/* Grade de 12 colunas */}
<div className="grid grid-cols-12 gap-4">
  <div className="col-span-6">Metade esquerda</div>
  <div className="col-span-6">Metade direita</div>
</div>

{/* Layout sidebar + conteúdo */}
<div className="grid grid-cols-12 gap-6">
  <aside className="col-span-3">Sidebar</aside>
  <main className="col-span-9">Conteúdo principal</main>
</div>`}
      />

      {/* Spacing reference */}
      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Resumo do Sistema de Espaçamento
        </h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-para-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Classe</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Comportamento</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Quando usar</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['.container-ms', 'padding responsivo + max-w 1440px', 'Wrapper de seção — envolve todo o conteúdo'],
              ['.content-ms', 'max-width 1440px centralizado', 'Conteúdo estreito dentro de seção wide'],
              ['grid-cols-12', 'grade de 12 colunas', 'Layouts com múltiplas colunas'],
              ['gap-4 / gap-6', '16px / 24px de espaço', 'Gutter entre colunas do grid'],
            ].map(([cls, behavior, when], i) => (
              <tr
                key={cls}
                className={`border-b border-brand-border last:border-0 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'
                }`}
              >
                <td className="px-4 py-3 font-mono text-brand-orange">{cls}</td>
                <td className="px-4 py-3 text-neutral-400">{behavior}</td>
                <td className="px-4 py-3 text-neutral-400">{when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
