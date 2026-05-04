import Link from 'next/link'

type ProcessListItem = {
  id: string
  status: string
  startedAt: Date | null
  order: {
    document: string | null
    product: {
      name: string
    }
    lead: {
      id: string
      name: string | null
      phone: string
      cpf: string | null
    }
  }
  steps: Array<{
    status: string
  }>
}

type ProcessListProps = {
  processes: ProcessListItem[]
}

const PROCESS_STATUS_CLASS: Record<string, string> = {
  aguardando_inicio: 'bg-neutral-100 text-neutral-600',
  em_andamento: 'bg-blue-100 text-blue-700',
  concluido: 'bg-green-100 text-green-700',
  cancelado: 'bg-red-100 text-red-700',
}

function formatDate(date: Date | null): string {
  if (!date) return '-'
  return new Intl.DateTimeFormat('pt-BR').format(date)
}

export function ProcessList({ processes }: ProcessListProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-brand-border bg-white">
      <table className="w-full text-left">
        <thead className="bg-neutral-50">
          <tr>
            <th className="px-4 py-3 text-xs font-semibold text-brand-navy">Cliente</th>
            <th className="px-4 py-3 text-xs font-semibold text-brand-navy">CPF/Doc</th>
            <th className="px-4 py-3 text-xs font-semibold text-brand-navy">Produto</th>
            <th className="px-4 py-3 text-xs font-semibold text-brand-navy">Status</th>
            <th className="px-4 py-3 text-xs font-semibold text-brand-navy">Steps concluídos</th>
            <th className="px-4 py-3 text-xs font-semibold text-brand-navy">Início</th>
            <th className="px-4 py-3 text-xs font-semibold text-brand-navy">Ações</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((process) => {
            const completedSteps = process.steps.filter((step) => step.status === 'concluido').length
            const clientName = process.order.lead.name || process.order.lead.phone
            const document = process.order.lead.cpf || process.order.document || '-'
            const statusClass = PROCESS_STATUS_CLASS[process.status] ?? 'bg-neutral-100 text-neutral-600'

            return (
              <tr key={process.id} className="border-t border-brand-border">
                <td className="px-4 py-3 text-sm text-brand-navy">{clientName}</td>
                <td className="px-4 py-3 text-sm text-foreground-alt">{document}</td>
                <td className="px-4 py-3 text-sm text-foreground-alt">{process.order.product.name}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusClass}`}>
                    {process.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-foreground-alt">{completedSteps}/7</td>
                <td className="px-4 py-3 text-sm text-foreground-alt">{formatDate(process.startedAt)}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/processos/${process.id}`} className="btn-primary text-xs">
                    Ver
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
