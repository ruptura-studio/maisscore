import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function FieldPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-heading-2 font-dm font-normal text-brand-navy mb-2">Field</h1>
        <p className="text-para-md text-neutral-400 mb-8">
          Wrapper de campo de formulário com label, hint e mensagem de erro. Componente customizado em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/field.tsx</code>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Variantes</h2>
        <p className="text-para-sm text-neutral-400 mb-4">Field com label, com hint e com erro.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-col gap-6 bg-neutral-50 mb-4">
        <Field label="Nome completo" required>
          <Input placeholder="João da Silva" />
        </Field>
        <Field label="CPF" hint="Somente números, sem pontuação.">
          <Input placeholder="000.000.000-00" />
        </Field>
        <Field label="E-mail" error="E-mail inválido. Verifique e tente novamente.">
          <Input placeholder="joao@email.com" className="border-destructive" />
        </Field>
      </div>
      <CodeBlock code={`<Field label="Nome completo" required>
  <Input placeholder="João da Silva" />
</Field>

<Field label="CPF" hint="Somente números, sem pontuação.">
  <Input placeholder="000.000.000-00" />
</Field>

<Field label="E-mail" error="E-mail inválido.">
  <Input placeholder="joao@email.com" />
</Field>`} />

      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Especificações</h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-para-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Prop</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Tipo</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Default</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">label</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">hint</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">error</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">required</td><td className="px-4 py-3 text-neutral-500">boolean</td><td className="px-4 py-3 text-neutral-400">false</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
