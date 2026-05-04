import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { StepTimeline } from '../_components/step-timeline'
import { updateProcessStatus } from './actions'

type ProcessDetailPageProps = {
  params: Promise<{ id: string }>
}

function formatDate(date: Date | null): string {
  if (!date) return '-'
  return new Intl.DateTimeFormat('pt-BR').format(date)
}

function formatCurrency(amountInCents: number | null): string {
  if (amountInCents === null) return '-'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amountInCents / 100)
}

export default async function AdminProcessDetailPage({ params }: ProcessDetailPageProps) {
  const { id } = await params

  const process = await prisma.process.findUnique({
    where: { id },
    include: {
      steps: { orderBy: { step: 'asc' } },
      order: {
        include: {
          lead: true,
          product: true,
          payment: { select: { confirmedAt: true, amount: true, method: true } },
        },
      },
    },
  })

  if (!process) {
    notFound()
  }

  const clientName = process.order.lead.name || process.order.lead.phone
  const clientDocument = process.order.lead.cpf || process.order.document || '-'
  const paidAmount = formatCurrency(process.order.payment?.amount ?? null)
  const confirmedAt = formatDate(process.order.payment?.confirmedAt ?? null)

  async function handleProcessStatusUpdate(formData: FormData) {
    'use server'

    const nextStatus = formData.get('status')
    if (
      nextStatus !== 'aguardando_inicio' &&
      nextStatus !== 'em_andamento' &&
      nextStatus !== 'concluido' &&
      nextStatus !== 'cancelado'
    ) {
      return
    }

    await updateProcessStatus(id, nextStatus)
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-brand-border bg-white p-5">
        <h1 className="text-xl font-semibold text-brand-navy">{clientName}</h1>
        <div className="mt-3 grid gap-2 text-sm text-foreground-alt md:grid-cols-2">
          <p>
            <span className="font-medium text-brand-navy">CPF/Doc:</span> {clientDocument}
          </p>
          <p>
            <span className="font-medium text-brand-navy">Produto:</span> {process.order.product.name}
          </p>
          <p>
            <span className="font-medium text-brand-navy">Valor pago:</span> {paidAmount}
          </p>
          <p>
            <span className="font-medium text-brand-navy">Pagamento confirmado em:</span> {confirmedAt}
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-brand-border bg-white p-5">
        <h2 className="text-sm font-semibold text-brand-navy">Status geral do processo</h2>
        <p className="mt-1 text-sm text-foreground-alt">
          Status atual: <span className="font-medium text-brand-navy">{process.status}</span>
        </p>
        <form action={handleProcessStatusUpdate} className="mt-3 flex flex-wrap items-center gap-2">
          <select
            name="status"
            defaultValue={process.status}
            className="h-9 rounded border border-brand-border px-2 text-sm text-brand-navy"
          >
            <option value="aguardando_inicio">aguardando_inicio</option>
            <option value="em_andamento">em_andamento</option>
            <option value="concluido">concluido</option>
            <option value="cancelado">cancelado</option>
          </select>
          <button type="submit" className="btn-primary text-xs">
            Salvar status
          </button>
        </form>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-brand-navy">Timeline de Steps</h2>
        <StepTimeline
          processId={process.id}
          steps={process.steps.map((step) => ({
            id: step.id,
            step: step.step,
            status: step.status,
            documentUrl: step.documentUrl,
            completedAt: step.completedAt,
          }))}
        />
      </section>
    </div>
  )
}
