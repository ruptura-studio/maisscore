import Link from 'next/link'

type ProcessListItem = {
  id: string
  status: string
  createdAt: Date
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
      onboardingCompletedAt: Date | null
    }
  }
  steps: Array<{
    step: number
    status: string
  }>
}

type ProcessListProps = {
  processes: ProcessListItem[]
}

type ProcessPhase = 'Onboarding' | 'Análise' | 'Execução' | 'Finalização' | 'Concluído'

function getProcessPhase(
  steps: Array<{ step: number; status: string }>,
  onboardingCompletedAt: Date | null,
): ProcessPhase {
  const finalizacao = steps.find((step) => step.step === 4)
  if (finalizacao?.status === 'concluido') return 'Concluído'
  if (finalizacao?.status === 'em_andamento') return 'Finalização'

  const execucao = steps.find((step) => step.step === 3)
  if (execucao?.status === 'em_andamento' || execucao?.status === 'concluido') return 'Execução'

  const analise = steps.find((step) => step.step === 2)
  if (analise?.status === 'em_andamento' || analise?.status === 'concluido') return 'Análise'

  if (onboardingCompletedAt) return 'Análise'

  return 'Onboarding'
}

const PHASE_CLASS: Record<ProcessPhase, string> = {
  Onboarding: 'bg-neutral-100 text-neutral-600',
  Análise: 'bg-blue-100 text-blue-700',
  Execução: 'bg-brand-orange/10 text-brand-orange',
  Finalização: 'bg-purple-100 text-purple-700',
  Concluído: 'bg-green-100 text-green-700',
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
            const onboardingDone = process.order.lead.onboardingCompletedAt ? 1 : 0
            const stepsDone = process.steps.filter((step) => step.status === 'concluido').length
            const completedSteps = onboardingDone + stepsDone
            const clientName = process.order.lead.name || process.order.lead.phone
            const document = process.order.lead.cpf || process.order.document || '-'
            const phase = getProcessPhase(process.steps, process.order.lead.onboardingCompletedAt)
            const phaseClass = PHASE_CLASS[phase]

            return (
              <tr key={process.id} className="border-t border-brand-border">
                <td className="px-4 py-3 text-sm text-brand-navy">{clientName}</td>
                <td className="px-4 py-3 text-sm text-foreground-alt">{document}</td>
                <td className="px-4 py-3 text-sm text-foreground-alt">{process.order.product.name}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${phaseClass}`}>
                    {phase}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-foreground-alt">{completedSteps}/4</td>
                <td className="px-4 py-3 text-sm text-foreground-alt">{formatDate(process.createdAt)}</td>
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
