import Link from 'next/link'
import { Check, X } from 'lucide-react'

type OnboardingListItem = {
  id: string
  checklistStatus: string
  createdAt: Date
  lead: {
    name: string | null
    phone: string
    onboardingCompletedAt: Date | null
  }
  order: {
    product: {
      name: string
    }
    onboardingDocuments: Array<{
      status: string
    }>
  }
}

type OnboardingListProps = {
  handoffs: OnboardingListItem[]
}

const CHECKLIST_STATUS_CLASS: Record<string, string> = {
  complete: 'bg-green-100 text-green-700',
  incomplete: 'bg-yellow-100 text-yellow-700',
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR').format(date)
}

export function OnboardingList({ handoffs }: OnboardingListProps) {
  if (handoffs.length === 0) {
    return (
      <div className="rounded-xl border border-brand-border bg-white p-6 text-sm text-foreground-alt">
        Nenhum onboarding encontrado.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-brand-border bg-white">
      <table className="w-full text-left">
        <thead className="bg-neutral-50">
          <tr>
            <th className="px-4 py-3 text-xs font-semibold text-brand-navy">Cliente</th>
            <th className="px-4 py-3 text-xs font-semibold text-brand-navy">Produto</th>
            <th className="px-4 py-3 text-xs font-semibold text-brand-navy">Status checklist</th>
            <th className="px-4 py-3 text-xs font-semibold text-brand-navy">Docs enviados</th>
            <th className="px-4 py-3 text-xs font-semibold text-brand-navy">Onboarding completo</th>
            <th className="px-4 py-3 text-xs font-semibold text-brand-navy">Criado em</th>
            <th className="px-4 py-3 text-xs font-semibold text-brand-navy">Ações</th>
          </tr>
        </thead>
        <tbody>
          {handoffs.map((handoff) => {
            const clientName = handoff.lead.name || handoff.lead.phone
            const statusClass = CHECKLIST_STATUS_CLASS[handoff.checklistStatus] ?? 'bg-neutral-100 text-neutral-600'
            const totalDocs = handoff.order.onboardingDocuments.length
            const receivedDocs = handoff.order.onboardingDocuments.filter((doc) => doc.status === 'received').length

            return (
              <tr key={handoff.id} className="border-t border-brand-border">
                <td className="px-4 py-3 text-sm text-brand-navy">{clientName}</td>
                <td className="px-4 py-3 text-sm text-foreground-alt">{handoff.order.product.name}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusClass}`}>
                    {handoff.checklistStatus}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-foreground-alt">
                  {receivedDocs}/{totalDocs}
                </td>
                <td className="px-4 py-3">
                  {handoff.lead.onboardingCompletedAt ? (
                    <Check className="h-4 w-4 text-green-600" aria-label="Onboarding completo" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" aria-label="Onboarding pendente" />
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-foreground-alt">{formatDate(handoff.createdAt)}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/onboardings/${handoff.id}`} className="btn-primary text-xs">
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
