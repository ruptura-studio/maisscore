import { Spinner } from '@/components/ui/spinner'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function SpinnerPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">Spinner</h1>
        <p className="text-p-lg text-neutral-400 mb-8">
          Indicador de carregamento animado. Componente customizado em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/spinner.tsx</code>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Tamanhos</h2>
        <p className="text-p-sm text-neutral-400 mb-4">4 tamanhos disponíveis via prop <code className="font-mono bg-neutral-50 px-1 rounded">size</code>.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-wrap items-center gap-8 bg-neutral-50 mb-4">
        <div className="flex flex-col items-center gap-2">
          <Spinner size="sm" />
          <span className="text-xs text-neutral-400">sm</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Spinner size="default" />
          <span className="text-xs text-neutral-400">default</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Spinner size="lg" />
          <span className="text-xs text-neutral-400">lg</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Spinner size="xl" />
          <span className="text-xs text-neutral-400">xl</span>
        </div>
      </div>
      <CodeBlock code={`<Spinner size="sm" />
<Spinner size="default" />
<Spinner size="lg" />
<Spinner size="xl" />`} />

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Em Botão</h2>
        <p className="text-p-sm text-neutral-400 mb-4">Spinner inline dentro de um botão de loading.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-wrap items-center gap-4 bg-neutral-50 mb-4">
        <button className="btn-primary flex items-center gap-2" disabled>
          <Spinner size="sm" />
          Consultando Serasa...
        </button>
        <button className="btn-secondary flex items-center gap-2" disabled>
          <Spinner size="sm" />
          Processando...
        </button>
      </div>
      <CodeBlock code={`<button className="btn-primary flex items-center gap-2" disabled>
  <Spinner size="sm" />
  Consultando Serasa...
</button>`} />

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Especificações</h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-p-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Prop</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Tipo</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Default</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">size</td><td className="px-4 py-3 text-neutral-500">"sm" | "default" | "lg" | "xl"</td><td className="px-4 py-3 text-neutral-400">"default"</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">label</td><td className="px-4 py-3 text-neutral-500">string (sr-only)</td><td className="px-4 py-3 text-neutral-400">"Carregando..."</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
