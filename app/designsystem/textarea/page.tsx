import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function TextareaPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">Textarea</h1>
        <p className="text-lg text-neutral-400 mb-8">
          Campo de texto multilinha para entradas longas. Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/textarea.tsx</code>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Padrão</h2>
        <p className="text-sm text-neutral-400 mb-4">Textarea com label e placeholder.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-col gap-6 bg-neutral-50 mb-4">
        <div className="grid gap-2 w-full max-w-sm">
          <Label>Descreva sua situação</Label>
          <Textarea placeholder="Informe detalhes sobre as restrições em seu CPF, credores envolvidos e valor aproximado das dívidas..." />
        </div>
        <div className="grid gap-2 w-full max-w-sm">
          <Label>Desabilitado</Label>
          <Textarea disabled placeholder="Campo desabilitado" />
        </div>
        <div className="grid gap-2 w-full max-w-sm">
          <Label>Com erro</Label>
          <Textarea className="border-destructive" placeholder="Campo com erro" />
          <p className="text-xs text-destructive">Descrição muito curta. Mínimo 20 caracteres.</p>
        </div>
      </div>
      <CodeBlock code={`<Textarea
  placeholder="Informe detalhes sobre as restrições..."
/>

<Textarea disabled placeholder="Campo desabilitado" />

<Textarea className="border-destructive" />`} />

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
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">placeholder</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">rows</td><td className="px-4 py-3 text-neutral-500">number</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">disabled</td><td className="px-4 py-3 text-neutral-500">boolean</td><td className="px-4 py-3 text-neutral-400">false</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">className</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
