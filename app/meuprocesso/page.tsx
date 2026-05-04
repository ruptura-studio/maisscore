import type { Metadata } from 'next'
import type { ComponentType } from 'react'
import {
  Check,
  CircleDashed,
  CircleDotDashed,
  FileText,
  ShieldCheck,
  FileSearch,
  CalendarDays,
  FileDown,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getSessionFromCookie } from '@/lib/process-session'
import { prisma } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Meu Processo | Mais Score',
  description: 'Acompanhe o andamento do seu processo em uma timeline visual.',
}

type StepMeta = {
  step: number
  title: string
  description: string
  icon: ComponentType<{ className?: string }>
  defaultDocumentLabel?: string
}

const STEPS_META: StepMeta[] = [
  {
    step: 1,
    title: 'Onboarding',
    description: 'Recebemos seus dados e documentos iniciais. Essa etapa é necessária para iniciar a análise do seu caso com segurança.',
    icon: FileText,
  },
  {
    step: 2,
    title: 'Análise',
    description: 'Nossa equipe está analisando o seu caso, avaliando os dados disponíveis e a melhor estratégia para o seu processo.',
    icon: FileSearch,
  },
  {
    step: 3,
    title: 'Execução',
    description: 'O processo está em andamento. Nossa equipe está conduzindo as etapas necessárias junto aos responsáveis.',
    icon: CircleDotDashed,
  },
  {
    step: 4,
    title: 'Finalização',
    description: 'O processo foi concluído. O comprovante de regularização do seu nome está disponível abaixo.',
    icon: ShieldCheck,
    defaultDocumentLabel: 'Comprovante de nome limpo.pdf',
  },
]

function formatDate(iso: string | null) {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('pt-BR')
}

export default async function MeuProcessoPage() {
  const session = await getSessionFromCookie()

  const processData = session
    ? await prisma.process.findUnique({
        where: { id: session.processId },
        include: {
          steps: { orderBy: { step: 'asc' } },
          order: {
            include: {
              lead: { select: { onboardingCompletedAt: true } },
            },
          },
        },
      })
    : null

  const onboardingCompletedAt = processData?.order?.lead?.onboardingCompletedAt ?? null

  const steps = STEPS_META.map((meta) => {
    if (meta.step === 1) {
      const status: 'concluido' | 'em_andamento' | 'pendente' = onboardingCompletedAt
        ? 'concluido'
        : 'em_andamento'

      return {
        ...meta,
        status,
        completedAt: onboardingCompletedAt ? formatDate(onboardingCompletedAt.toISOString()) : null,
        documentUrl: null,
      }
    }

    const dbStep = processData?.steps.find((s) => s.step === meta.step)
    const status: 'concluido' | 'em_andamento' | 'pendente' = (dbStep?.status as any) ?? 'pendente'
    const description =
      meta.step === 3 && dbStep?.notes?.trim()
        ? dbStep.notes
        : meta.description

    return {
      ...meta,
      description,
      status,
      completedAt: dbStep?.completedAt ? formatDate(dbStep.completedAt.toISOString()) : null,
      documentUrl: dbStep?.documentUrl ?? null,
    }
  })

  const currentIndex = steps.findLastIndex((s) => s.status === 'em_andamento')
  const currentStep = currentIndex >= 0 ? currentIndex + 1 : steps.filter((s) => s.status === 'concluido').length
  const progressPct = Math.round((steps.filter((s) => s.status === 'concluido').length / steps.length) * 100)
  const currentMeta = steps[currentIndex] ?? steps[currentStep - 1] ?? steps[0]
  const nextMeta = steps[currentIndex + 1] ?? null
  const clientName = session?.name ?? null
  const onboardingToken = session?.onboardingToken ?? null

  return (
    <div className="min-h-screen bg-neutral-100 py-8 md:py-12">
      <div className="mx-auto w-full max-w-[560px] px-4">
        <div className="mb-6">
          <h1 className="font-dm text-h2 text-brand-navy">
            {clientName ? `Olá, ${clientName.split(' ')[0]}` : 'Meu Processo'}
          </h1>
          <p className="mt-2 text-sm text-foreground-alt">
            Acompanhe abaixo todas as etapas do seu processo jurídico e a situação atual de cada fase.
          </p>
        </div>

        <div className="mb-6 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-navy/60">
            Situação do processo
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-foreground-alt">Etapa atual</p>
              <p className="mt-1 text-sm font-medium text-brand-navy">
                {currentStep} de {steps.length} — {currentMeta?.title}
              </p>
            </div>
            <div>
              <p className="text-xs text-foreground-alt">Próxima etapa</p>
              <p className="mt-1 text-sm font-medium text-brand-navy">
                {nextMeta?.title ?? 'Processo concluído'}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-1.5 flex justify-between text-xs text-foreground-alt">
              <span>Progresso</span>
              <span>{progressPct}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-neutral-100">
              <div
                className="h-1.5 rounded-full bg-brand-orange transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            {onboardingToken && (
              <a
                href={`/onboarding/${onboardingToken}`}
                className="flex items-center gap-2 rounded-md border border-brand-navy/20 bg-brand-navy/5 px-3 py-2 text-xs text-brand-navy transition-colors hover:bg-brand-navy/10"
              >
                <FileText className="h-3.5 w-3.5 shrink-0 text-brand-navy" />
                <span className="flex-1 font-medium">Enviar documentos</span>
              </a>
            )}
            <a
              href="/documentos/termos-contrato-mais-score.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="flex items-center gap-2 rounded-md border border-brand-navy/20 bg-brand-navy/5 px-3 py-2 text-xs text-brand-navy transition-colors hover:bg-brand-navy/10"
            >
              <FileDown className="h-3.5 w-3.5 shrink-0 text-brand-navy" />
              <span className="flex-1 font-medium">Termos de aceite e contrato do serviço.pdf</span>
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-wide text-brand-navy/60">
            Etapas do processo
          </h2>

          <div className="flex flex-col gap-3">
            {steps.map((s, i) => {
              const completed = s.status === 'concluido'
              const isCurrent = s.status === 'em_andamento'
              const isLast = i === steps.length - 1
              const Icon = s.icon

              const statusLabel = completed ? 'Concluído' : isCurrent ? 'Em andamento' : 'Pendente'

              const statusVariant = completed
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : isCurrent
                ? 'bg-brand-orange text-white border-brand-orange'
                : 'bg-neutral-100 text-neutral-400 border-neutral-200'

              const dateLabel = completed
                ? `Data de conclusão: ${s.completedAt ?? '—'}`
                : `Data prevista: —`

              const documentUrl = s.documentUrl
              const documentLabel = s.defaultDocumentLabel

              return (
                <div key={s.step} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    {completed ? (
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#4B9857]">
                        <Check className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                      </span>
                    ) : isCurrent ? (
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-orange">
                        <Icon className="h-3.5 w-3.5 text-white" />
                      </span>
                    ) : (
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-200">
                        <CircleDashed className="h-3.5 w-3.5 text-neutral-400" strokeWidth={2} />
                      </span>
                    )}

                    {!isLast && (
                      <div
                        className={`mt-1 w-px flex-1 ${
                          completed ? 'bg-emerald-300' : isCurrent ? 'bg-brand-orange/30' : 'bg-brand-border'
                        }`}
                        style={{ minHeight: '1.5rem' }}
                      />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-1.5">
                    <span
                      className={`font-dm text-sm leading-none pt-1 ${
                        completed ? 'text-emerald-700' : isCurrent ? 'text-brand-orange' : 'text-brand-navy/50'
                      }`}
                    >
                      {s.title}
                    </span>

                    <div className={`rounded-md border p-4 ${isCurrent ? 'border-neutral-400' : 'border-neutral-200'}`}>
                      <div className="flex items-center justify-between gap-2">
                        <Badge className={statusVariant}>{statusLabel}</Badge>
                        <span className={`flex items-center gap-1 text-xs ${completed || !isCurrent ? 'text-brand-navy/30' : 'text-foreground-alt'}`}>
                          <CalendarDays className="h-3 w-3 shrink-0" />
                          {dateLabel}
                        </span>
                      </div>

                      <p className={`mt-2 text-sm ${
                        completed ? 'text-brand-navy/30' : isCurrent ? 'text-foreground-alt' : 'text-brand-navy/35'
                      }`}>
                        {s.description}
                      </p>

                      {documentLabel && (
                        documentUrl ? (
                          <a
                            href={documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="mt-3 flex items-center gap-2 rounded-md border border-brand-navy/20 bg-brand-navy/5 px-3 py-2 text-xs text-brand-navy transition-colors hover:bg-brand-navy/10"
                          >
                            <FileDown className="h-3.5 w-3.5 shrink-0 text-brand-navy" />
                            <span className="flex-1 truncate font-medium">{documentLabel}</span>
                          </a>
                        ) : (
                          <div className="mt-3 flex cursor-not-allowed items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-brand-navy/30">
                            <FileDown className="h-3.5 w-3.5 shrink-0" />
                            <span className="flex-1 truncate">{documentLabel}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <p className="mt-6 pb-4 text-center text-xs text-foreground-alt">
          Atualizações são enviadas pelo WhatsApp conforme o processo avança.
        </p>
      </div>
    </div>
  )
}
