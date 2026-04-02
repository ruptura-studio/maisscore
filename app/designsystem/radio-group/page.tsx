import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function RadioGroupPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">Radio Group</h1>
        <p className="text-lg text-neutral-400 mb-8">
          Grupo de opções mutuamente exclusivas. Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/radio-group.tsx</code>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Seleção de Origem</h2>
        <p className="text-sm text-neutral-400 mb-4">Uma opção exclusiva por vez.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-col gap-6 bg-neutral-50 mb-4">
        <RadioGroup defaultValue="serasa">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="serasa" id="serasa" />
            <Label htmlFor="serasa">Restrição no Serasa</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="spc" id="spc" />
            <Label htmlFor="spc">Restrição no SPC</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="ambos" id="ambos" />
            <Label htmlFor="ambos">Ambos (Serasa e SPC)</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="nao-sei" id="nao-sei" />
            <Label htmlFor="nao-sei">Não sei informar</Label>
          </div>
        </RadioGroup>
      </div>
      <CodeBlock code={`<RadioGroup defaultValue="serasa">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="serasa" id="serasa" />
    <Label htmlFor="serasa">Restrição no Serasa</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="spc" id="spc" />
    <Label htmlFor="spc">Restrição no SPC</Label>
  </div>
</RadioGroup>`} />

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
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">defaultValue</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">value</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">onValueChange</td><td className="px-4 py-3 text-neutral-500">(value: string) =&gt; void</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">disabled</td><td className="px-4 py-3 text-neutral-500">boolean</td><td className="px-4 py-3 text-neutral-400">false</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
