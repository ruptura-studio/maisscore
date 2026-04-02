import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function LabelPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">Label</h1>
        <p className="text-lg text-neutral-400 mb-8">
          Rótulo acessível associado a campos de formulário via <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">htmlFor</code>. Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/label.tsx</code>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Com Input</h2>
        <p className="text-sm text-neutral-400 mb-4">Label associado a campo de texto.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-col gap-6 bg-neutral-50 mb-4">
        <div className="grid gap-2 max-w-sm">
          <Label htmlFor="nome-label">Nome completo</Label>
          <Input id="nome-label" placeholder="João da Silva" />
        </div>
        <div className="grid gap-2 max-w-sm">
          <Label htmlFor="cpf-label">CPF</Label>
          <Input id="cpf-label" placeholder="000.000.000-00" />
        </div>
      </div>
      <CodeBlock code={`<Label htmlFor="nome">Nome completo</Label>
<Input id="nome" placeholder="João da Silva" />`} />

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Com Checkbox</h2>
        <p className="text-sm text-neutral-400 mb-4">Label ao lado de um checkbox — clicável na área do texto.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-col gap-3 bg-neutral-50 mb-4">
        <div className="flex items-center gap-2">
          <Checkbox id="aceito-label" />
          <Label htmlFor="aceito-label">Aceito os termos de uso e política de privacidade</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="news-label" defaultChecked />
          <Label htmlFor="news-label">Desejo receber novidades por WhatsApp</Label>
        </div>
      </div>
      <CodeBlock code={`<div className="flex items-center gap-2">
  <Checkbox id="aceito" />
  <Label htmlFor="aceito">Aceito os termos de uso</Label>
</div>`} />

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
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">htmlFor</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">className</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
