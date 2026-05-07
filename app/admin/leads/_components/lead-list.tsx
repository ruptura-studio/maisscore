import Link from 'next/link'
import { Check } from 'lucide-react'

type LeadListItem = {
  id: string
  name: string | null
  phone: string
  status: string
  channel: string | null
  utmSource: string | null
  trafficTemperature: string
  currentTemperature: string | null
  isClient: boolean
  createdAt: Date
  orders: Array<{
    status: string
    pricePaid: number
  }>
  _count: {
    leadEvents: number
  }
}

type LeadListProps = {
  leads: LeadListItem[]
}

const STATUS_CLASS: Record<string, string> = {
  novo: 'bg-neutral-100 text-neutral-600',
  em_atendimento: 'bg-blue-100 text-blue-700',
  convertido: 'bg-green-100 text-green-700',
  perdido: 'bg-red-100 text-red-700',
}

const TEMPERATURE_CLASS: Record<string, string> = {
  cold: 'bg-blue-100 text-blue-700',
  warm: 'bg-yellow-100 text-yellow-700',
  hot: 'bg-red-100 text-red-700',
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR').format(date)
}

export function LeadList({ leads }: LeadListProps) {
  if (leads.length === 0) {
    return (
      <div className="rounded-xl border border-brand-border bg-white p-6 text-sm text-foreground-alt">
        Nenhum lead encontrado com os filtros atuais.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-brand-border bg-white">
      <table className="w-full text-left">
        <thead className="bg-neutral-50">
          <tr>
            <th className="px-4 py-3 text-xs font-semibold text-brand-navy">Nome</th>
            <th className="px-4 py-3 text-xs font-semibold text-brand-navy">Telefone</th>
            <th className="px-4 py-3 text-xs font-semibold text-brand-navy">Status</th>
            <th className="px-4 py-3 text-xs font-semibold text-brand-navy">Temperatura</th>
            <th className="px-4 py-3 text-xs font-semibold text-brand-navy">Origem</th>
            <th className="px-4 py-3 text-xs font-semibold text-brand-navy">Cliente</th>
            <th className="px-4 py-3 text-xs font-semibold text-brand-navy">Cadastro</th>
            <th className="px-4 py-3 text-xs font-semibold text-brand-navy">Ações</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => {
            const displayName = lead.name || lead.phone
            const statusClass = STATUS_CLASS[lead.status] ?? 'bg-neutral-100 text-neutral-600'
            const temperature = lead.currentTemperature || lead.trafficTemperature
            const temperatureClass = TEMPERATURE_CLASS[temperature] ?? 'bg-neutral-100 text-neutral-600'
            const source = lead.channel || lead.utmSource || '-'

            return (
              <tr key={lead.id} className="border-t border-brand-border">
                <td className="px-4 py-3 text-sm text-brand-navy">{displayName}</td>
                <td className="px-4 py-3 text-sm text-foreground-alt">{lead.phone}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusClass}`}>{lead.status}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${temperatureClass}`}>
                    {temperature}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-foreground-alt">{source}</td>
                <td className="px-4 py-3">
                  {lead.isClient ? (
                    <Check className="h-4 w-4 text-green-600" aria-label="Cliente" />
                  ) : (
                    <span className="text-sm text-foreground-alt">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-foreground-alt">{formatDate(lead.createdAt)}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/leads/${lead.id}`} className="btn-primary text-xs">
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
