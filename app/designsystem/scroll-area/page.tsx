import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

const clientes = [
  { nome: 'João da Silva', cpf: '000.000.000-01', status: 'Concluído' },
  { nome: 'Maria Oliveira', cpf: '000.000.000-02', status: 'Em andamento' },
  { nome: 'Carlos Santos', cpf: '000.000.000-03', status: 'Concluído' },
  { nome: 'Ana Pereira', cpf: '000.000.000-04', status: 'Em andamento' },
  { nome: 'Pedro Costa', cpf: '000.000.000-05', status: 'Concluído' },
  { nome: 'Fernanda Lima', cpf: '000.000.000-06', status: 'Análise' },
  { nome: 'Roberto Alves', cpf: '000.000.000-07', status: 'Concluído' },
  { nome: 'Juliana Souza', cpf: '000.000.000-08', status: 'Em andamento' },
]

export default function ScrollAreaPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-heading-2 font-dm font-normal text-brand-navy mb-2">Scroll Area</h1>
        <p className="text-para-md text-neutral-400 mb-8">
          Área de rolagem com scrollbar customizada. Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/scroll-area.tsx</code>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Lista de Clientes</h2>
        <p className="text-para-sm text-neutral-400 mb-4">Conteúdo longo com scroll vertical limitado por altura fixa.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex items-center justify-center bg-neutral-50 mb-4">
        <ScrollArea className="h-64 w-72 rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Clientes</h4>
            {clientes.map((c, i) => (
              <div key={i}>
                <div className="text-sm py-2">
                  <p className="font-medium text-brand-navy">{c.nome}</p>
                  <p className="text-muted-foreground text-xs">{c.cpf} · {c.status}</p>
                </div>
                {i < clientes.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <CodeBlock code={`<ScrollArea className="h-64 w-72 rounded-md border">
  <div className="p-4">
    {items.map((item) => (
      <div key={item.id}>
        <p>{item.nome}</p>
        <Separator />
      </div>
    ))}
  </div>
</ScrollArea>`} />

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
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">className</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">type</td><td className="px-4 py-3 text-neutral-500">"auto" | "always" | "scroll" | "hover"</td><td className="px-4 py-3 text-neutral-400">"hover"</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
