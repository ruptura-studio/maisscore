import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function SelectPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">Select</h1>
        <p className="text-p-lg text-neutral-400 mb-8">
          Campo de seleção nativo com estilo customizado. Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/select.tsx</code>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Seleção Simples</h2>
        <p className="text-p-sm text-neutral-400 mb-4">Lista de opções sem agrupamento.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-wrap items-center gap-4 bg-neutral-50 mb-4">
        <Select>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Selecionar estado..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sp">São Paulo</SelectItem>
            <SelectItem value="rj">Rio de Janeiro</SelectItem>
            <SelectItem value="mg">Minas Gerais</SelectItem>
            <SelectItem value="ba">Bahia</SelectItem>
            <SelectItem value="pr">Paraná</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <CodeBlock code={`<Select>
  <SelectTrigger className="w-56">
    <SelectValue placeholder="Selecionar estado..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="sp">São Paulo</SelectItem>
    <SelectItem value="rj">Rio de Janeiro</SelectItem>
  </SelectContent>
</Select>`} />

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Com Grupos</h2>
        <p className="text-p-sm text-neutral-400 mb-4">Opções agrupadas por categoria.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-wrap items-center gap-4 bg-neutral-50 mb-4">
        <Select>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Tipo de restrição..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Órgãos de proteção</SelectLabel>
              <SelectItem value="serasa">Serasa</SelectItem>
              <SelectItem value="spc">SPC Brasil</SelectItem>
              <SelectItem value="boa-vista">Boa Vista (SCPC)</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Outros</SelectLabel>
              <SelectItem value="cartorio">Cartório</SelectItem>
              <SelectItem value="judicial">Processo judicial</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <CodeBlock code={`<Select>
  <SelectTrigger>
    <SelectValue placeholder="Tipo de restrição..." />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Órgãos de proteção</SelectLabel>
      <SelectItem value="serasa">Serasa</SelectItem>
      <SelectItem value="spc">SPC Brasil</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`} />

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Especificações</h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-p-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Prop (Select)</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Tipo</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Default</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">value</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">defaultValue</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">onValueChange</td><td className="px-4 py-3 text-neutral-500">(value: string) =&gt; void</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">disabled</td><td className="px-4 py-3 text-neutral-500">boolean</td><td className="px-4 py-3 text-neutral-400">false</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
