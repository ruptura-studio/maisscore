import { Skeleton } from '@/components/ui/skeleton'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function SkeletonPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-heading-2 font-dm font-normal text-brand-navy mb-2">Skeleton</h1>
        <p className="text-para-md text-neutral-400 mb-8">
          Placeholder animado para estados de carregamento. Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/skeleton.tsx</code>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Card de Perfil</h2>
        <p className="text-para-sm text-neutral-400 mb-4">Skeleton replicando a estrutura de um card de cliente.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-wrap gap-6 bg-neutral-50 mb-4">
        <div className="flex items-center gap-4 w-72">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      </div>
      <CodeBlock code={`<div className="flex items-center gap-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="flex flex-col gap-2">
    <Skeleton className="h-4 w-48" />
    <Skeleton className="h-3 w-32" />
  </div>
</div>`} />

      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Card de Status</h2>
        <p className="text-para-sm text-neutral-400 mb-4">Skeleton de card com múltiplas linhas.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-wrap gap-4 bg-neutral-50 mb-4">
        <div className="w-72 border border-brand-border rounded-lg p-4 bg-white flex flex-col gap-3">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
          <Skeleton className="h-3 w-2/3" />
          <Skeleton className="h-9 w-full mt-2" />
        </div>
      </div>
      <CodeBlock code={`<div className="w-72 border rounded-lg p-4 flex flex-col gap-3">
  <Skeleton className="h-4 w-1/2" />
  <Skeleton className="h-3 w-full" />
  <Skeleton className="h-3 w-4/5" />
  <Skeleton className="h-9 w-full mt-2" />
</div>`} />

      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Especificações</h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-para-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Prop</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Tipo</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">className</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">Define largura, altura e border-radius</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
