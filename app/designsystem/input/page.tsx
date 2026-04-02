import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function InputPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">Input</h1>
        <p className="text-lg text-neutral-400 mb-8">
          Campo de texto para formulários. Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/input.tsx</code>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Tipos</h2>
        <p className="text-sm text-neutral-400 mb-4">Variações por tipo de dado.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-col gap-4 bg-neutral-50 mb-4">
        <div className="grid gap-2 w-full max-w-sm">
          <Label>Nome completo</Label>
          <Input type="text" placeholder="João da Silva" />
        </div>
        <div className="grid gap-2 w-full max-w-sm">
          <Label>E-mail</Label>
          <Input type="email" placeholder="joao@email.com" />
        </div>
        <div className="grid gap-2 w-full max-w-sm">
          <Label>WhatsApp</Label>
          <Input type="tel" placeholder="(11) 99999-9999" />
        </div>
        <div className="grid gap-2 w-full max-w-sm">
          <Label>CPF</Label>
          <Input type="text" placeholder="000.000.000-00" />
        </div>
        <div className="grid gap-2 w-full max-w-sm">
          <Label>Senha</Label>
          <Input type="password" placeholder="••••••••" />
        </div>
      </div>
      <CodeBlock code={`<Input type="text" placeholder="João da Silva" />
<Input type="email" placeholder="joao@email.com" />
<Input type="tel" placeholder="(11) 99999-9999" />`} />

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Estados</h2>
        <p className="text-sm text-neutral-400 mb-4">Disabled e com erro.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-col gap-4 bg-neutral-50 mb-4">
        <div className="grid gap-2 w-full max-w-sm">
          <Label>Desabilitado</Label>
          <Input disabled placeholder="Campo desabilitado" />
        </div>
        <div className="grid gap-2 w-full max-w-sm">
          <Label>Com erro</Label>
          <Input className="border-destructive" placeholder="CPF inválido" />
          <p className="text-xs text-destructive">CPF não encontrado na base.</p>
        </div>
      </div>
      <CodeBlock code={`<Input disabled placeholder="Campo desabilitado" />
<Input className="border-destructive" placeholder="CPF inválido" />`} />

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
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">type</td><td className="px-4 py-3 text-neutral-500">HTMLInputTypeAttribute</td><td className="px-4 py-3 text-neutral-400">"text"</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">placeholder</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">disabled</td><td className="px-4 py-3 text-neutral-500">boolean</td><td className="px-4 py-3 text-neutral-400">false</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">className</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
