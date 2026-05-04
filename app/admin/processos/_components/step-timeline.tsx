'use client'

import { useEffect, useMemo, useState, useTransition } from 'react'
import {
  getAnalysisMilestoneMessages,
  saveAnalysisMilestoneMessage,
  saveExecutionNotes,
  saveFinalizationDocument,
  triggerWhatsappCobranca,
} from '../[id]/actions'

type LeadOnboardingData = {
  name: string | null
  phone: string | null
  cpf: string | null
  email: string | null
  birthDate: Date | null
  addressStreet: string | null
  addressNumber: string | null
  addressComplement: string | null
  addressNeighborhood: string | null
  addressCity: string | null
  addressState: string | null
  addressZip: string | null
  identityDocument: string | null
  civilStatus: string | null
  profession: string | null
  valorDivida: string | null
  objetivo: string | null
  responsibleName: string | null
  responsibleCpf: string | null
  leadType: string | null
  onboardingToken: string | null
  onboardingCompletedAt: Date | null
  onboardingLastSeenAt: Date | null
}

type StepTimelineProps = {
  processId: string
  paymentConfirmedAt: Date | null
  analysisMilestoneMessages: Record<number, string>
  lead: LeadOnboardingData
  steps: Array<{
    id: string
    step: number
    status: string
    documentUrl: string | null
    notes: string | null
    completedAt: Date | null
    createdAt: Date
  }>
}

const STEP_LABELS: Record<number, string> = {
  1: 'Onboarding',
  2: 'Análise',
  3: 'Execução',
  4: 'Finalização',
}

const STEP_STATUS_CLASS: Record<string, string> = {
  pendente: 'bg-neutral-100 text-neutral-600',
  em_andamento: 'bg-brand-orange text-white',
  concluido: 'bg-success text-white',
}

const STEP_STATUS_LABEL: Record<string, string> = {
  pendente: 'Pendente',
  em_andamento: 'Em Andamento',
  concluido: 'Concluído',
}

function formatDate(date: Date | null): string {
  if (!date) return '-'
  return new Intl.DateTimeFormat('pt-BR').format(date)
}

function addBusinessDays(startDate: Date, businessDays: number): Date {
  const result = new Date(startDate)
  let added = 0

  while (added < businessDays) {
    result.setDate(result.getDate() + 1)
    const day = result.getDay()
    if (day !== 0 && day !== 6) added += 1
  }

  return result
}

function isBusinessDay(date: Date): boolean {
  const day = date.getDay()
  return day !== 0 && day !== 6
}

function moveToNextBusinessMoment(date: Date): Date {
  const result = new Date(date)
  while (!isBusinessDay(result)) {
    result.setDate(result.getDate() + 1)
    result.setHours(0, 0, 0, 0)
  }
  return result
}

function getBusinessMillisecondsElapsed(startDate: Date, endDate: Date): number {
  if (endDate <= startDate) return 0

  const clampedEnd = endDate
  const cursor = new Date(startDate)
  let total = 0

  while (cursor < clampedEnd) {
    const nextDay = new Date(cursor)
    nextDay.setHours(24, 0, 0, 0)
    const chunkEnd = nextDay < clampedEnd ? nextDay : clampedEnd

    if (isBusinessDay(cursor)) {
      total += chunkEnd.getTime() - cursor.getTime()
    }

    cursor.setTime(chunkEnd.getTime())
  }

  return total
}

function addBusinessMilliseconds(startDate: Date, msToAdd: number): Date {
  if (msToAdd <= 0) return new Date(startDate)

  let cursor = moveToNextBusinessMoment(startDate)
  let remaining = msToAdd

  while (remaining > 0) {
    if (!isBusinessDay(cursor)) {
      cursor = moveToNextBusinessMoment(cursor)
      continue
    }

    const nextDay = new Date(cursor)
    nextDay.setHours(24, 0, 0, 0)
    const available = nextDay.getTime() - cursor.getTime()

    if (remaining >= available) {
      remaining -= available
      cursor = moveToNextBusinessMoment(nextDay)
      continue
    }

    cursor = new Date(cursor.getTime() + remaining)
    remaining = 0
  }

  return cursor
}

type OnboardingDocumentBlockProps = {
  processId: string
  lead: LeadOnboardingData
  statusClass: string
  borderClass: string
}

type FieldDef = { key: keyof LeadOnboardingData; label: string; cnpjOnly?: boolean }

const ONBOARDING_FIELD_GROUPS: Array<{
  title: string
  fields: FieldDef[]
}> = [
  {
    title: 'Identificação',
    fields: [
      { key: 'email', label: 'E-mail' },
      { key: 'cpf', label: 'CPF' },
      { key: 'birthDate', label: 'Nascimento' },
      { key: 'identityDocument', label: 'RG ou CNH' },
      { key: 'civilStatus', label: 'Estado civil' },
      { key: 'profession', label: 'Profissão' },
      { key: 'responsibleName', label: 'Nome responsável', cnpjOnly: true },
      { key: 'responsibleCpf', label: 'CPF responsável', cnpjOnly: true },
    ],
  },
  {
    title: 'Endereço',
    fields: [
      { key: 'addressZip', label: 'CEP' },
      { key: 'addressStreet', label: 'Logradouro' },
      { key: 'addressNumber', label: 'Número' },
      { key: 'addressNeighborhood', label: 'Bairro' },
      { key: 'addressCity', label: 'Cidade' },
      { key: 'addressState', label: 'Estado' },
    ],
  },
  {
    title: 'Contexto do caso',
    fields: [
      { key: 'valorDivida', label: 'Valor da dívida' },
      { key: 'objetivo', label: 'Objetivo' },
    ],
  },
]

const DEBT_VALUE_LABELS: Record<string, string> = {
  ate_1000: 'Até R$1.000',
  '1000_5000': 'De R$1.000 a R$5.000',
  '5000_20000': 'De R$5.000 a R$20.000',
  '20000_50000': 'De R$20.000 a R$50.000',
  acima_50000: 'Acima de R$50.000',
}

const GOAL_LABELS: Record<string, string> = {
  regularizar_meu_nome: 'Regularizar Meu Nome',
  financiamento_imobiliario: 'Financiamento Imobiliário',
  financiamento_veiculo: 'Financiamento de Veículo',
  emprestimo_financeiro: 'Empréstimo Financeiro',
  cartao_de_credito: 'Cartão de Crédito',
  alugar_um_imovel: 'Alugar um Imóvel',
  abrir_minha_empresa: 'Abrir Minha Empresa',
}

const CIVIL_STATUS_LABELS: Record<string, string> = {
  solteiro: 'Solteiro',
  casado: 'Casado',
  divorciado: 'Divorciado',
  viuvo: 'Viúvo',
}

function hasField(value: unknown): boolean {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  return true
}

function formatDatetime(date: Date | null): string {
  if (!date) return '-'
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function formatCpf(value: string): string {
  const digits = value.replace(/\D/g, '')
  if (digits.length !== 11) return value
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}

function formatOnboardingFieldValue(field: FieldDef, lead: LeadOnboardingData): string {
  if (field.key === 'birthDate') return formatDate(lead.birthDate)

  const value = lead[field.key]
  if (field.key === 'cpf' && typeof value === 'string') {
    return formatCpf(value)
  }

  if (field.key === 'valorDivida' && typeof value === 'string') {
    return DEBT_VALUE_LABELS[value] ?? value
  }

  if (field.key === 'objetivo' && typeof value === 'string') {
    return GOAL_LABELS[value] ?? value
  }

  if (field.key === 'civilStatus' && typeof value === 'string') {
    return CIVIL_STATUS_LABELS[value] ?? value
  }

  return String(value)
}

function OnboardingDocumentBlock({ processId, lead, statusClass, borderClass }: OnboardingDocumentBlockProps) {
  const [isPending, startTransition] = useTransition()
  const [whatsappSent, setWhatsappSent] = useState(false)

  const isCnpj = lead.leadType === 'cnpj'
  const isCompleted = !!lead.onboardingCompletedAt

  const applicableFields = ONBOARDING_FIELD_GROUPS.flatMap((g) =>
    g.fields.filter((f) => !f.cnpjOnly || isCnpj)
  )
  const filledCount = applicableFields.filter((f) => hasField(lead[f.key])).length
  const totalCount = applicableFields.length
  const allFilled = filledCount === totalCount

  function handleWhatsapp() {
    startTransition(async () => {
      await triggerWhatsappCobranca(processId)
      setWhatsappSent(true)
      setTimeout(() => setWhatsappSent(false), 4000)
    })
  }

  return (
    <div className={`rounded-xl border p-4 ${borderClass} ${isCompleted ? 'bg-green-50' : 'bg-white'}`}>
      <div className="flex items-start gap-3">
        <p className={`flex items-center gap-1.5 text-sm font-semibold ${isCompleted ? 'text-success' : 'text-brand-orange'}`}>
          {isCompleted && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="7" fill="currentColor" opacity="0.15" />
              <path d="M4 7l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          1. Coleta de documentos
        </p>
        <div className="ml-auto flex items-center gap-3">
          <p className="text-xs text-foreground-alt">
            Conclusão: {isCompleted ? formatDatetime(lead.onboardingCompletedAt) : '-'}
          </p>
          <p className="text-xs text-foreground-alt">Última interação: {formatDatetime(lead.onboardingLastSeenAt)}</p>
          <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusClass}`}>
            {isCompleted ? STEP_STATUS_LABEL.concluido : STEP_STATUS_LABEL.em_andamento}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-medium text-brand-navy">
            Campos preenchidos: {filledCount}/{totalCount}
          </span>
          {allFilled && <span className="font-medium text-green-700">Completo</span>}
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full rounded-full bg-green-500 transition-all"
            style={{ width: `${(filledCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {ONBOARDING_FIELD_GROUPS.map((group) => {
        const groupFields = group.fields.filter((f) => !f.cnpjOnly || isCnpj)
        if (groupFields.length === 0) return null

        return (
          <div key={group.title} className="mt-4">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-brand-navy">
              {group.title}
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {groupFields.map((f) => {
                const filled = hasField(lead[f.key])

                return (
                  <div key={f.key} className="flex flex-col gap-0.5">
                    <span className={`text-[10px] font-medium uppercase tracking-wide ${filled ? 'text-foreground-alt' : 'text-brand-orange/70'}`}>
                      {f.label}
                    </span>
                    {filled ? (
                      <span className="text-xs text-brand-navy">
                        {formatOnboardingFieldValue(f, lead)}
                      </span>
                    ) : (
                      <span className="text-xs italic text-brand-orange/60">Pendente</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      <div className="mt-4 border-t border-brand-border pt-4">
        <button
          type="button"
          disabled={isCompleted || isPending || whatsappSent}
          onClick={handleWhatsapp}
          className="rounded border border-brand-border px-3 py-1.5 text-xs font-medium text-brand-navy disabled:cursor-not-allowed disabled:opacity-50"
        >
          {whatsappSent ? 'Mensagem enviada!' : isPending ? 'Enviando...' : 'Cobrar via WhatsApp'}
        </button>
      </div>
    </div>
  )
}

export function StepTimeline({ processId, paymentConfirmedAt, analysisMilestoneMessages, lead, steps }: StepTimelineProps) {
  const [isSavingMessages, startSavingMessages] = useTransition()
  const [now, setNow] = useState(() => new Date())
  const [messagesExpanded, setMessagesExpanded] = useState(false)
  const [executionNotes, setExecutionNotes] = useState(
    () => steps.find((step) => step.step === 3)?.notes ?? '',
  )
  const [isSavingNotes, startSavingNotes] = useTransition()
  const [finalizationDocUrl, setFinalizationDocUrl] = useState(
    () => steps.find((step) => step.step === 4)?.documentUrl ?? '',
  )
  const [isSavingDoc, startSavingDoc] = useTransition()
  const [milestoneMessages, setMilestoneMessages] = useState<Record<number, string>>({
    1: analysisMilestoneMessages[1] ?? '',
    2: analysisMilestoneMessages[2] ?? '',
    3: analysisMilestoneMessages[3] ?? '',
  })

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setMilestoneMessages({
      1: analysisMilestoneMessages[1] ?? '',
      2: analysisMilestoneMessages[2] ?? '',
      3: analysisMilestoneMessages[3] ?? '',
    })
  }, [analysisMilestoneMessages])

  useEffect(() => {
    let mounted = true

    ;(async () => {
      const latest = await getAnalysisMilestoneMessages(processId)
      if (!mounted) return
      setMilestoneMessages({
        1: latest[1] ?? '',
        2: latest[2] ?? '',
        3: latest[3] ?? '',
      })
    })()

    return () => {
      mounted = false
    }
  }, [processId])

  function handleSaveExecutionNotes() {
    startSavingNotes(async () => {
      await saveExecutionNotes(processId, executionNotes)
    })
  }

  function handleSaveFinalizationDoc() {
    startSavingDoc(async () => {
      await saveFinalizationDocument(processId, finalizationDocUrl)
    })
  }

  const stepsByNumber = useMemo(() => {
    const map = new Map<number, StepTimelineProps['steps'][number]>()
    for (const step of steps) {
      map.set(step.step, step)
    }
    return map
  }, [steps])

  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }, (_, index) => {
        const stepNumber = index + 1
        const isOnboardingStep = stepNumber === 1

        const stepStatus = isOnboardingStep
          ? lead.onboardingCompletedAt ? 'concluido' : 'em_andamento'
          : stepsByNumber.get(stepNumber)?.status ?? 'pendente'

        const step = isOnboardingStep ? null : stepsByNumber.get(stepNumber)
        const isAnalysisStep = stepNumber === 2
        const isExecucaoStep = stepNumber === 3
        const isFinalizacaoStep = stepNumber === 4
        const isEmAndamento = stepStatus === 'em_andamento'
        const isConcluido = stepStatus === 'concluido'
        const statusClass = STEP_STATUS_CLASS[stepStatus] ?? 'bg-neutral-100 text-neutral-600'
        const borderClass = isConcluido ? 'border-success' : isEmAndamento ? 'border-brand-orange' : 'border-brand-border'
        const completedAt = isOnboardingStep ? lead.onboardingCompletedAt : step?.completedAt ?? null
        const analysisStartedAt = isAnalysisStep
          ? (paymentConfirmedAt ?? step?.createdAt ?? null)
          : null
        const analysisDeadline = analysisStartedAt ? addBusinessDays(analysisStartedAt, 7) : null
        const analysisTotalBusinessMs =
          analysisStartedAt && analysisDeadline
            ? getBusinessMillisecondsElapsed(analysisStartedAt, analysisDeadline)
            : 0
        const analysisElapsedBusinessMs = analysisStartedAt
          ? getBusinessMillisecondsElapsed(analysisStartedAt, now)
          : 0
        const analysisElapsedClampedMs =
          analysisTotalBusinessMs > 0
            ? Math.min(analysisElapsedBusinessMs, analysisTotalBusinessMs)
            : 0
        const analysisSegmentTotalMs = analysisTotalBusinessMs / 3
        const analysisSegments = analysisStartedAt
          ? [0, 1, 2].map((index) => {
              const segmentStartMs = analysisSegmentTotalMs * index
              const elapsedInSegmentMs = Math.min(
                analysisSegmentTotalMs,
                Math.max(0, analysisElapsedClampedMs - segmentStartMs),
              )
              const progress = analysisSegmentTotalMs > 0
                ? (elapsedInSegmentMs / analysisSegmentTotalMs) * 100
                : 0

              return {
                index,
                startAt: addBusinessMilliseconds(analysisStartedAt, segmentStartMs),
                progress,
              }
            })
          : []

        return isOnboardingStep ? (
          <OnboardingDocumentBlock
            key={`${processId}-1`}
            processId={processId}
            lead={lead}
            statusClass={statusClass}
            borderClass={borderClass}
          />
        ) : (
          <div key={`${processId}-${stepNumber}`} className={`rounded-xl border bg-white p-4 ${borderClass}`}>
            <div className="flex items-center gap-3">
              <p className={`text-sm font-semibold ${isEmAndamento ? 'text-brand-orange' : 'text-brand-navy'}`}>
                {stepNumber}. {STEP_LABELS[stepNumber]}
              </p>

              <p className="ml-auto text-right text-xs text-foreground-alt">
                Conclusão: {isConcluido ? formatDate(completedAt) : '-'}
              </p>

              <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusClass}`}>
                {STEP_STATUS_LABEL[stepStatus] ?? stepStatus}
              </span>
            </div>

            {isAnalysisStep && stepStatus === 'pendente' && (
              <p className="mt-2 text-xs text-foreground-alt">
                Aguardando coleta de documentos
              </p>
            )}

            {isAnalysisStep && isEmAndamento && (
              <div className="mt-2 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setMessagesExpanded((prev) => !prev)}
                  className="text-xs text-foreground-alt hover:text-brand-navy"
                >
                  {messagesExpanded ? 'Ocultar mensagens' : 'Editar mensagens'}
                </button>
              </div>
            )}

            {isAnalysisStep && isEmAndamento && analysisDeadline && (
              <div className="mt-3 rounded-md bg-neutral-50 p-3">
                <div className="mt-2 grid gap-y-2 md:grid-cols-3 md:gap-x-8">
                  {analysisSegments.map((segment) => (
                    <div key={`${processId}-analysis-segment-${segment.index}`}>
                      <p className="mb-1 text-[10px] font-medium text-brand-navy">
                        Início: {formatDatetime(segment.startAt)}
                      </p>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
                        <div className="h-full rounded-full bg-brand-orange transition-all" style={{ width: `${segment.progress}%` }} />
                      </div>
                      {messagesExpanded && (
                        <div className="mt-2 flex items-center gap-2">
                          <input
                            type="text"
                            value={milestoneMessages[segment.index + 1] ?? ''}
                            onChange={(event) =>
                              setMilestoneMessages((prev) => ({
                                ...prev,
                                [segment.index + 1]: event.target.value,
                              }))
                            }
                            placeholder={`Mensagem do marco ${segment.index + 1}`}
                            className="h-8 w-full rounded border border-brand-border px-2 text-xs text-brand-navy"
                          />
                          <button
                            type="button"
                            disabled={isSavingMessages}
                            onClick={() =>
                              startSavingMessages(async () => {
                                await saveAnalysisMilestoneMessage(
                                  processId,
                                  segment.index + 1,
                                  milestoneMessages[segment.index + 1] ?? '',
                                )

                                const latest = await getAnalysisMilestoneMessages(processId)
                                setMilestoneMessages({
                                  1: latest[1] ?? '',
                                  2: latest[2] ?? '',
                                  3: latest[3] ?? '',
                                })
                              })
                            }
                            className="rounded border border-brand-border px-3 py-1.5 text-xs font-medium text-brand-navy disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Salvar
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isExecucaoStep && isEmAndamento && (
              <div className="mt-3">
                <p className="mb-1 text-xs font-medium text-brand-navy">
                  Descrição para o cliente
                </p>
                <div className="flex gap-2">
                  <textarea
                    value={executionNotes}
                    onChange={(event) => setExecutionNotes(event.target.value)}
                    placeholder="Descreva o andamento do processo para o cliente..."
                    rows={3}
                    className="w-full resize-none rounded border border-brand-border px-2 py-1.5 text-xs text-brand-navy"
                  />
                  <button
                    type="button"
                    disabled={isSavingNotes}
                    onClick={handleSaveExecutionNotes}
                    className="self-start rounded border border-brand-border px-3 py-1.5 text-xs font-medium text-brand-navy disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSavingNotes ? 'Salvando...' : 'Salvar'}
                  </button>
                </div>
              </div>
            )}

            {isFinalizacaoStep && isEmAndamento && (
              <div className="mt-3">
                <p className="mb-1 text-xs font-medium text-brand-navy">
                  URL do comprovante (PDF)
                </p>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={finalizationDocUrl}
                    onChange={(event) => setFinalizationDocUrl(event.target.value)}
                    placeholder="https://..."
                    className="h-8 w-full rounded border border-brand-border px-2 text-xs text-brand-navy"
                  />
                  <button
                    type="button"
                    disabled={isSavingDoc || !finalizationDocUrl.trim()}
                    onClick={handleSaveFinalizationDoc}
                    className="rounded border border-brand-border px-3 py-1.5 text-xs font-medium text-brand-navy disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSavingDoc ? 'Salvando...' : 'Salvar'}
                  </button>
                </div>
              </div>
            )}

            {isFinalizacaoStep && step?.documentUrl && (
              <a
                href={step.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-medium text-brand-navy underline"
              >
                Ver comprovante
              </a>
            )}

          </div>
        )
      })}
    </div>
  )
}
