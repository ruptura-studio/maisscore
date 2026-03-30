import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

const clientes = [
  { nome: 'João da Silva', cpf: '000.000.000-01', divida: 'R$ 3.200', status: 'Concluído' },
  { nome: 'Maria Oliveira', cpf: '000.000.000-02', divida: 'R$ 1.500', status: 'Em andamento' },
  { nome: 'Carlos Santos', cpf: '000.000.000-03', divida: 'R$ 8.700', status: 'Análise' },
  { nome: 'Ana Pereira', cpf: '000.000.000-04', divida: 'R$ 540', status: 'Concluído' },
]

const statusVariant: Record<string, 'default' | 'secondary' | 'outline'> = {
  'Concluído': 'default',
  'Em andamento': 'secondary',
  'Análise': 'outline',
}

export default function TablePage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-heading-2 font-dm font-normal text-brand-navy mb-2">Table</h1>
        <p className="text-para-md text-neutral-400 mb-8">
          Tabela semântica com header, body e footer. Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/table.tsx</code>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Lista de Clientes</h2>
        <p className="text-para-sm text-neutral-400 mb-4">Tabela com status como Badge.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-4 bg-neutral-50 mb-4 overflow-x-auto">
        <Table>
          <TableCaption>Clientes atendidos — Mais Score</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Dívida</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes.map((c) => (
              <TableRow key={c.cpf}>
                <TableCell className="font-medium">{c.nome}</TableCell>
                <TableCell>{c.cpf}</TableCell>
                <TableCell>{c.divida}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={statusVariant[c.status]}>{c.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total de clientes</TableCell>
              <TableCell className="text-right">{clientes.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <CodeBlock code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Nome</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>João da Silva</TableCell>
      <TableCell><Badge>Concluído</Badge></TableCell>
    </TableRow>
  </TableBody>
</Table>`} />

      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Sub-componentes</h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-para-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Componente</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Equivalente HTML</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">Table</td><td className="px-4 py-3 text-neutral-500">&lt;table&gt;</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">TableHeader</td><td className="px-4 py-3 text-neutral-500">&lt;thead&gt;</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">TableBody</td><td className="px-4 py-3 text-neutral-500">&lt;tbody&gt;</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">TableFooter</td><td className="px-4 py-3 text-neutral-500">&lt;tfoot&gt;</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">TableRow</td><td className="px-4 py-3 text-neutral-500">&lt;tr&gt;</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">TableHead</td><td className="px-4 py-3 text-neutral-500">&lt;th&gt;</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">TableCell</td><td className="px-4 py-3 text-neutral-500">&lt;td&gt;</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">TableCaption</td><td className="px-4 py-3 text-neutral-500">&lt;caption&gt;</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
