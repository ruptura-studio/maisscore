import { InputGroup } from '@/components/ui/input-group'
import { Input } from '@/components/ui/input'
import { Search, Mail, DollarSign, Phone } from 'lucide-react'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function InputGroupPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">Input Group</h1>
        <p className="text-lg text-neutral-400 mb-8">
          Wrapper que adiciona prefixo e/ou sufixo a um campo Input. Componente customizado em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/input-group.tsx</code>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Com Prefixo (ícone)</h2>
        <p className="text-sm text-neutral-400 mb-4">Ícone antes do campo.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-col gap-4 bg-neutral-50 mb-4">
        <InputGroup prefix={<Search className="h-4 w-4" />} className="max-w-sm">
          <Input placeholder="Buscar por CPF..." />
        </InputGroup>
        <InputGroup prefix={<Mail className="h-4 w-4" />} className="max-w-sm">
          <Input type="email" placeholder="joao@email.com" />
        </InputGroup>
        <InputGroup prefix={<Phone className="h-4 w-4" />} className="max-w-sm">
          <Input type="tel" placeholder="(11) 99999-9999" />
        </InputGroup>
      </div>
      <CodeBlock code={`<InputGroup prefix={<Search className="h-4 w-4" />}>
  <Input placeholder="Buscar por CPF..." />
</InputGroup>`} />

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Com Sufixo e Prefixo</h2>
        <p className="text-sm text-neutral-400 mb-4">Texto ou ícone em ambos os lados.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-col gap-4 bg-neutral-50 mb-4">
        <InputGroup prefix={<span className="text-sm">R$</span>} suffix={<span className="text-xs">/mês</span>} className="max-w-sm">
          <Input type="number" placeholder="0,00" />
        </InputGroup>
        <InputGroup prefix={<DollarSign className="h-4 w-4" />} suffix={<span className="text-xs text-muted-foreground">BRL</span>} className="max-w-sm">
          <Input type="number" placeholder="Valor da dívida" />
        </InputGroup>
      </div>
      <CodeBlock code={`<InputGroup
  prefix={<span className="text-sm">R$</span>}
  suffix={<span className="text-xs">/mês</span>}
>
  <Input type="number" placeholder="0,00" />
</InputGroup>`} />

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
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">prefix</td><td className="px-4 py-3 text-neutral-500">ReactNode</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">suffix</td><td className="px-4 py-3 text-neutral-500">ReactNode</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">className</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
