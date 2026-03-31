import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function CheckboxPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">Checkbox</h1>
        <p className="text-p-lg text-neutral-400 mb-8">
          Caixa de seleção para opções binárias ou múltiplas escolhas. Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/checkbox.tsx</code>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Padrão</h2>
        <p className="text-p-sm text-neutral-400 mb-4">Checkbox simples com label associado.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-wrap items-center gap-6 bg-neutral-50 mb-4">
        <div className="flex items-center gap-2">
          <Checkbox id="termos" />
          <Label htmlFor="termos">Aceito os termos de uso</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="news" defaultChecked />
          <Label htmlFor="news">Receber novidades por e-mail</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="disabled" disabled />
          <Label htmlFor="disabled" className="opacity-50">Opção desabilitada</Label>
        </div>
      </div>
      <CodeBlock code={`<div className="flex items-center gap-2">
  <Checkbox id="termos" />
  <Label htmlFor="termos">Aceito os termos de uso</Label>
</div>`} />

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
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">checked</td><td className="px-4 py-3 text-neutral-500">boolean | "indeterminate"</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">defaultChecked</td><td className="px-4 py-3 text-neutral-500">boolean</td><td className="px-4 py-3 text-neutral-400">false</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">onCheckedChange</td><td className="px-4 py-3 text-neutral-500">(checked: boolean) =&gt; void</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">disabled</td><td className="px-4 py-3 text-neutral-500">boolean</td><td className="px-4 py-3 text-neutral-400">false</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
