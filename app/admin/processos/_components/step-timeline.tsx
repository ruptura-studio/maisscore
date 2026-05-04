'use client'

import { useMemo, useTransition } from 'react'
import { updateStepDocumentUrl, updateStepStatus } from '../[id]/actions'

type StepTimelineProps = {
  processId: string
  steps: Array<{
    id: string
    step: number
    status: string
    documentUrl: string | null
    completedAt: Date | null
  }>
}

const STEP_LABELS = ['Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa 4', 'Etapa 5', 'Etapa 6', 'Etapa 7']

const STEP_STATUS_CLASS: Record<string, string> = {
  pendente: 'bg-neutral-100 text-neutral-600',
  em_andamento: 'bg-blue-100 text-blue-700',
  concluido: 'bg-green-100 text-green-700',
}

function formatDate(date: Date | null): string {
  if (!date) return '-'
  return new Intl.DateTimeFormat('pt-BR').format(date)
}

export function StepTimeline({ processId, steps }: StepTimelineProps) {
  const [isPending, startTransition] = useTransition()

  const stepsByNumber = useMemo(() => {
    const map = new Map<number, StepTimelineProps['steps'][number]>()
    for (const step of steps) {
      map.set(step.step, step)
    }
    return map
  }, [steps])

  return (
    <div className="space-y-3">
      {Array.from({ length: 7 }, (_, index) => {
        const stepNumber = index + 1
        const step = stepsByNumber.get(stepNumber)
        const stepStatus = step?.status ?? 'pendente'
        const isPendente = stepStatus === 'pendente'
        const isEmAndamento = stepStatus === 'em_andamento'
        const isConcluido = stepStatus === 'concluido'
        const canSaveUrl = isConcluido && !!step?.id
        const statusClass = STEP_STATUS_CLASS[stepStatus] ?? 'bg-neutral-100 text-neutral-600'

        return (
          <div key={`${processId}-${stepNumber}`} className="rounded-xl border border-brand-border bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-brand-navy">
                  {stepNumber}. {STEP_LABELS[index]}
                </p>
                <p className="mt-1 text-xs text-foreground-alt">
                  Conclusão: {isConcluido ? formatDate(step?.completedAt ?? null) : '-'}
                </p>
              </div>

              <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusClass}`}>{stepStatus}</span>
            </div>

            {step?.documentUrl && (
              <a
                href={step.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-medium text-brand-navy underline"
              >
                Ver documento
              </a>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={isPending || !isPendente || !step?.id}
                onClick={() =>
                  step?.id &&
                  startTransition(async () => {
                    await updateStepStatus(step.id, 'em_andamento')
                  })
                }
                className="rounded border border-brand-border px-3 py-1.5 text-xs font-medium text-brand-navy disabled:cursor-not-allowed disabled:opacity-50"
              >
                Iniciar
              </button>

              <button
                type="button"
                disabled={isPending || !isEmAndamento || !step?.id}
                onClick={() =>
                  step?.id &&
                  startTransition(async () => {
                    await updateStepStatus(step.id, 'concluido')
                  })
                }
                className="rounded border border-brand-border px-3 py-1.5 text-xs font-medium text-brand-navy disabled:cursor-not-allowed disabled:opacity-50"
              >
                Concluir
              </button>

              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  if (!canSaveUrl) return

                  const formData = new FormData(event.currentTarget)
                  const documentUrl = formData.get('documentUrl')
                  if (typeof documentUrl !== 'string') return

                  startTransition(async () => {
                    await updateStepDocumentUrl(step.id, documentUrl)
                  })
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  name="documentUrl"
                  defaultValue={step?.documentUrl ?? ''}
                  placeholder="https://..."
                  disabled={!isConcluido || !step?.id || isPending}
                  className="h-8 w-[220px] rounded border border-brand-border px-2 text-xs text-brand-navy disabled:cursor-not-allowed disabled:bg-neutral-100"
                />
                <button
                  type="submit"
                  disabled={!canSaveUrl || isPending}
                  className="rounded border border-brand-border px-3 py-1.5 text-xs font-medium text-brand-navy disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Salvar URL
                </button>
              </form>
            </div>
          </div>
        )
      })}
    </div>
  )
}
