import { Item } from '@/components/ui/item'
import { CheckCircle, ChevronRight, Star, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function ItemPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">Item</h1>
        <p className="text-p-lg text-neutral-400 mb-8">
          Linha de lista com suporte a ícone, título, descrição e ação. Componente customizado em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/item.tsx</code>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Lista de Benefícios</h2>
        <p className="text-p-sm text-neutral-400 mb-4">Items estáticos com ícone leading.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-4 flex flex-col bg-neutral-50 mb-4">
        <div className="bg-white rounded-lg border border-brand-border divide-y divide-brand-border">
          <Item leading={<CheckCircle className="h-4 w-4 text-green-500" />} title="Análise jurídica gratuita" description="Avaliamos seu caso sem custo inicial" />
          <Item leading={<CheckCircle className="h-4 w-4 text-green-500" />} title="97% de taxa de sucesso" description="Comprovada em mais de 1.142 casos" />
          <Item leading={<CheckCircle className="h-4 w-4 text-green-500" />} title="Resultado em até 30 dias úteis" description="Prazo garantido por contrato" />
        </div>
      </div>
      <CodeBlock code={`<Item
  leading={<CheckCircle className="h-4 w-4 text-green-500" />}
  title="Análise jurídica gratuita"
  description="Avaliamos seu caso sem custo inicial"
/>`} />

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Items Interativos</h2>
        <p className="text-p-sm text-neutral-400 mb-4">Com <code className="font-mono bg-neutral-50 px-1 rounded">interactive</code> habilitado — hover com destaque.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-4 flex flex-col bg-neutral-50 mb-4">
        <div className="bg-white rounded-lg border border-brand-border divide-y divide-brand-border">
          <Item interactive leading={<User className="h-4 w-4" />} trailing={<ChevronRight className="h-4 w-4" />} title="João da Silva" description="CPF: 000.000.000-00" />
          <Item interactive leading={<Star className="h-4 w-4" />} trailing={<Badge variant="secondary">Novo</Badge>} title="Plano Premium" description="Cobertura completa" />
        </div>
      </div>
      <CodeBlock code={`<Item
  interactive
  leading={<User className="h-4 w-4" />}
  trailing={<ChevronRight className="h-4 w-4" />}
  title="João da Silva"
  description="CPF: 000.000.000-00"
/>`} />

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
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">title</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">description</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">leading</td><td className="px-4 py-3 text-neutral-500">ReactNode</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">trailing</td><td className="px-4 py-3 text-neutral-500">ReactNode</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">interactive</td><td className="px-4 py-3 text-neutral-500">boolean</td><td className="px-4 py-3 text-neutral-400">false</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
