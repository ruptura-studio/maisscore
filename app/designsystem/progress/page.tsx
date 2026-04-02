import { Progress } from '@/components/ui/progress'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function ProgressPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">Progress</h1>
        <p className="text-lg text-neutral-400 mb-8">
          Barra de progresso para indicar o avanço de um processo. Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/progress.tsx</code>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Valores</h2>
        <p className="text-sm text-neutral-400 mb-4">Progress em diferentes percentuais.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-col gap-6 bg-neutral-50 mb-4">
        <div className="flex flex-col gap-2 w-full max-w-sm">
          <div className="flex justify-between text-sm text-brand-navy"><span>Análise do caso</span><span>25%</span></div>
          <Progress value={25} />
        </div>
        <div className="flex flex-col gap-2 w-full max-w-sm">
          <div className="flex justify-between text-sm text-brand-navy"><span>Negociação com credores</span><span>60%</span></div>
          <Progress value={60} />
        </div>
        <div className="flex flex-col gap-2 w-full max-w-sm">
          <div className="flex justify-between text-sm text-brand-navy"><span>Regularização concluída</span><span>97%</span></div>
          <Progress value={97} />
        </div>
        <div className="flex flex-col gap-2 w-full max-w-sm">
          <div className="flex justify-between text-sm text-brand-navy"><span>Completo</span><span>100%</span></div>
          <Progress value={100} />
        </div>
      </div>
      <CodeBlock code={`<Progress value={25} />
<Progress value={60} />
<Progress value={97} />`} />

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Especificações</h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Prop</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Tipo</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Default</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">value</td><td className="px-4 py-3 text-neutral-500">number | null</td><td className="px-4 py-3 text-neutral-400">0</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">className</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
