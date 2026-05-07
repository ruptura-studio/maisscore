import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'

type LeadDetailPageProps = {
  params: Promise<{ id: string }>
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

const EVENT_LABELS: Record<string, string> = {
  lead_capturado: 'Lead capturado',
  triagem_completa: 'Triagem completa',
  checkout_enviado: 'Checkout enviado',
  pagamento_confirmado: 'Pagamento confirmado',
  posvendas_iniciado: 'Pós-venda iniciado',
  perdido: 'Lead perdido',
}

function formatDate(date: Date | null): string {
  if (!date) return '-'
  return new Intl.DateTimeFormat('pt-BR').format(date)
}

function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function formatCurrency(valueInCents: number | null): string {
  if (valueInCents === null) return '-'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valueInCents / 100)
}

function truncateMessage(message: string | null): string {
  if (!message) return '-'
  if (message.length <= 100) return message
  return `${message.slice(0, 100)}...`
}

export default async function AdminLeadDetailPage({ params }: LeadDetailPageProps) {
  const { id } = await params

  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      leadEvents: { orderBy: { createdAt: 'desc' } },
      nurtureLog: { orderBy: { sentAt: 'desc' }, take: 20 },
      orders: {
        include: {
          product: { select: { name: true } },
          payment: { select: { status: true, amount: true, confirmedAt: true } },
          process: { select: { id: true, status: true } },
        },
      },
    },
  })

  if (!lead) {
    notFound()
  }

  const temperature = lead.currentTemperature || lead.trafficTemperature
  const statusClass = STATUS_CLASS[lead.status] ?? 'bg-neutral-100 text-neutral-600'
  const temperatureClass = TEMPERATURE_CLASS[temperature] ?? 'bg-neutral-100 text-neutral-600'
  const hasUtmData = Boolean(lead.channel || lead.utmSource || lead.utmMedium || lead.utmCampaign)
  const processOrder = lead.orders.find((order) => order.process)

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-brand-border bg-white p-5">
        <h1 className="text-xl font-semibold text-brand-navy">{lead.name || lead.phone}</h1>
        <div className="mt-3 grid gap-2 text-sm text-foreground-alt md:grid-cols-2">
          <p>
            <span className="font-medium text-brand-navy">Telefone:</span> {lead.phone}
          </p>
          <p>
            <span className="font-medium text-brand-navy">Email:</span> {lead.email || '-'}
          </p>
          <p>
            <span className="font-medium text-brand-navy">CPF:</span> {lead.cpf || '-'}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusClass}`}>{lead.status}</span>
          <span className={`rounded-full px-2 py-1 text-xs font-medium ${temperatureClass}`}>{temperature}</span>
          {lead.isClient ? (
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">cliente</span>
          ) : (
            <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600">não cliente</span>
          )}
        </div>
      </section>

      {lead.isClient ? (
        <section className="rounded-xl border border-brand-border bg-white p-5">
          <h2 className="text-sm font-semibold text-brand-navy">Dados de aquisição</h2>
          <div className="mt-3 grid gap-2 text-sm text-foreground-alt md:grid-cols-2">
            <p>
              <span className="font-medium text-brand-navy">Produto adquirido:</span> {lead.acquisition || '-'}
            </p>
            <p>
              <span className="font-medium text-brand-navy">Valor pago:</span> {formatCurrency(lead.acquisitionValue)}
            </p>
            <p>
              <span className="font-medium text-brand-navy">Data de conversão:</span> {formatDate(lead.convertedAt)}
            </p>
          </div>

          {processOrder?.process ? (
            <div className="mt-4">
              <Link href={`/admin/processos/${processOrder.process.id}`} className="btn-primary text-xs">
                Ver processo
              </Link>
            </div>
          ) : null}
        </section>
      ) : null}

      {hasUtmData ? (
        <section className="rounded-xl border border-brand-border bg-white p-5">
          <h2 className="text-sm font-semibold text-brand-navy">UTM / Origem</h2>
          <div className="mt-3 grid gap-2 text-sm text-foreground-alt md:grid-cols-2">
            <p>
              <span className="font-medium text-brand-navy">Canal:</span> {lead.channel || '-'}
            </p>
            <p>
              <span className="font-medium text-brand-navy">UTM Source:</span> {lead.utmSource || '-'}
            </p>
            <p>
              <span className="font-medium text-brand-navy">UTM Medium:</span> {lead.utmMedium || '-'}
            </p>
            <p>
              <span className="font-medium text-brand-navy">UTM Campaign:</span> {lead.utmCampaign || '-'}
            </p>
          </div>
        </section>
      ) : null}

      <section className="rounded-xl border border-brand-border bg-white p-5">
        <h2 className="text-sm font-semibold text-brand-navy">Histórico de eventos</h2>
        {lead.leadEvents.length > 0 ? (
          <ul className="mt-3 space-y-3">
            {lead.leadEvents.map((event) => (
              <li key={event.id} className="rounded-lg border border-brand-border p-3 text-sm text-foreground-alt">
                <p className="font-medium text-brand-navy">{EVENT_LABELS[event.type] ?? event.type}</p>
                <p className="mt-1">Valor: {event.value || '-'}</p>
                <p className="mt-1">Data: {formatDateTime(event.createdAt)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-foreground-alt">Sem eventos registrados.</p>
        )}
      </section>

      <section className="rounded-xl border border-brand-border bg-white p-5">
        <h2 className="text-sm font-semibold text-brand-navy">Log de nurture</h2>
        {lead.nurtureLog.length > 0 ? (
          <ul className="mt-3 space-y-3">
            {lead.nurtureLog.map((entry) => (
              <li key={entry.id} className="rounded-lg border border-brand-border p-3 text-sm text-foreground-alt">
                <p>
                  <span className="font-medium text-brand-navy">Canal:</span> {entry.channel}
                </p>
                <p>
                  <span className="font-medium text-brand-navy">Tipo:</span> {entry.type}
                </p>
                <p>
                  <span className="font-medium text-brand-navy">Mensagem:</span> {truncateMessage(entry.message)}
                </p>
                <p>
                  <span className="font-medium text-brand-navy">Data:</span> {formatDateTime(entry.sentAt)}
                </p>
                <p>
                  <span className="font-medium text-brand-navy">Status:</span> {entry.status}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-foreground-alt">Sem registros de nurture.</p>
        )}
      </section>
    </div>
  )
}
