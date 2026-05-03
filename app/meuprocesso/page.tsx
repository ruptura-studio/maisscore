import type { Metadata } from 'next'
import type { ComponentType } from 'react'
import {
  ArrowUpRight,
  CheckCircle2,
  CircleDotDashed,
  FileText,
  Gavel,
  ShieldCheck,
  FileSearch,
  Scale,
  Clock3,
  MapPin,
} from 'lucide-react'
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from '@/components/reui/timeline'

export const metadata: Metadata = {
  title: 'Meu Processo | Mais Score',
  description: 'Acompanhe o andamento do seu processo em uma timeline visual.',
}

type StepStatus = 'Concluído' | 'Em andamento' | 'Pendente'

type ProcessStep = {
  step: number
  date: string
  title: string
  description: string
  status: StepStatus
  current?: boolean
  icon: ComponentType<{ className?: string }>
}

const STEPS: ProcessStep[] = [
  {
    step: 1,
    date: '12/05/2026',
    title: 'Coleta de documentos',
    description:
      'Recebemos os documentos iniciais e validamos se o material está completo para iniciar a análise com segurança.',
    status: 'Concluído',
    icon: FileText,
  },
  {
    step: 2,
    date: '15/05/2026',
    title: 'Análise de caso',
    description:
      'Nossa equipe avaliou o contexto do cliente, os dados disponíveis e a estratégia mais adequada para seguir com o processo.',
    status: 'Concluído',
    icon: FileSearch,
  },
  {
    step: 3,
    date: '20/05/2026',
    title: 'Início do processo',
    description:
      'A ação foi protocolada e os próximos movimentos começaram a ser conduzidos junto aos responsáveis e ao andamento jurídico.',
    status: 'Em andamento',
    current: true,
    icon: CircleDotDashed,
  },
  {
    step: 4,
    date: '27/05/2026',
    title: 'Restrição removida',
    description:
      'Etapa de confirmação da baixa da restrição e atualização da situação do caso após a consolidação da medida.',
    status: 'Pendente',
    icon: ShieldCheck,
  },
  {
    step: 5,
    date: '30/05/2026',
    title: 'Defesa (contestação)',
    description:
      'Se houver necessidade, a defesa formal será apresentada com base nos documentos e nas informações levantadas até aqui.',
    status: 'Pendente',
    icon: Gavel,
  },
  {
    step: 6,
    date: '05/06/2026',
    title: 'Fase recursal',
    description:
      'Caso o cenário exija, a estratégia recursal será aplicada para manter o caso ativo e ampliar a chance de êxito.',
    status: 'Pendente',
    icon: ArrowUpRight,
  },
  {
    step: 7,
    date: '12/06/2026',
    title: 'Cumprimento da sentença',
    description:
      'Última etapa do fluxo, com monitoramento do cumprimento e verificação final do encerramento do processo.',
    status: 'Pendente',
    icon: Scale,
  },
]

const currentStep = STEPS.findIndex((s) => s.current) + 1

function statusBadge(status: StepStatus, current?: boolean) {
  if (status === 'Concluído')
    return (
      <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
        Concluído
      </span>
    )
  if (current || status === 'Em andamento')
    return (
      <span className="inline-flex items-center rounded-full border border-brand-orange/20 bg-[#fff4f0] px-2 py-0.5 text-xs font-medium text-brand-orange">
        Em andamento
      </span>
    )
  return (
    <span className="inline-flex items-center rounded-full border border-brand-border bg-white px-2 py-0.5 text-xs font-medium text-brand-navy/50">
      Pendente
    </span>
  )
}

export default function MeuProcessoPage() {
  return (
    <div className="min-h-screen bg-neutral-100 py-8 md:py-12">
      <div className="mx-auto w-full max-w-[560px] px-4">

        {/* Cabeçalho */}
        <div className="mb-6">
          <h1 className="font-dm text-h2 text-brand-navy">Meu Processo</h1>
          <p className="mt-2 text-sm leading-relaxed text-foreground-alt">
            Acompanhe abaixo todas as etapas do seu processo jurídico e a situação atual de cada fase.
          </p>
        </div>

        {/* Card de resumo */}
        <div className="mb-6 rounded-lg bg-white p-5 shadow-sm">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-navy/60">
            Situação do processo
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-foreground-alt">Etapa atual</p>
              <p className="mt-1 text-sm font-medium text-brand-navy">
                {currentStep} de {STEPS.length} — {STEPS[currentStep - 1]?.title}
              </p>
            </div>
            <div>
              <p className="text-xs text-foreground-alt">Próxima atualização</p>
              <p className="mt-1 text-sm font-medium text-brand-navy">
                {STEPS[currentStep]?.date ?? 'Em definição'}
              </p>
            </div>
          </div>

          {/* Barra de progresso */}
          <div className="mt-4">
            <div className="mb-1.5 flex justify-between text-xs text-foreground-alt">
              <span>Progresso</span>
              <span>{Math.round(((currentStep - 1) / STEPS.length) * 100)}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-neutral-100">
              <div
                className="h-1.5 rounded-full bg-brand-orange transition-all"
                style={{ width: `${Math.round(((currentStep - 1) / STEPS.length) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-wide text-brand-navy/60">
            Etapas do processo
          </h2>

          <Timeline defaultValue={currentStep} className="ms-2">
            {STEPS.map((s) => {
              const completed = s.status === 'Concluído'
              const Icon = s.icon

              return (
                <TimelineItem key={s.step} step={s.step}>
                  <TimelineSeparator
                    className={
                      completed
                        ? 'bg-emerald-500'
                        : s.current
                          ? 'bg-brand-orange/40'
                          : undefined
                    }
                  />

                  <TimelineIndicator
                    className={
                      completed
                        ? 'border-emerald-500 bg-emerald-50'
                        : s.current
                          ? 'border-brand-orange bg-[#fff4f0] ring-2 ring-brand-orange/20'
                          : 'border-brand-border bg-white'
                    }
                  >
                    {completed ? (
                      <CheckCircle2 className="size-2.5 text-emerald-600" />
                    ) : (
                      <Icon
                        className={`size-2.5 ${s.current ? 'text-brand-orange' : 'text-brand-navy/30'}`}
                      />
                    )}
                  </TimelineIndicator>

                  <TimelineHeader>
                    <TimelineDate className="flex items-center gap-1.5 text-foreground-alt">
                      <Clock3 className="size-3 shrink-0 text-brand-orange/70" />
                      {s.date}
                    </TimelineDate>

                    <div className="flex flex-wrap items-center gap-2">
                      <TimelineTitle
                        className={`text-[15px] font-dm font-normal leading-snug ${
                          s.current
                            ? 'text-brand-navy'
                            : completed
                              ? 'text-brand-navy'
                              : 'text-brand-navy/50'
                        }`}
                      >
                        {s.title}
                      </TimelineTitle>
                      {statusBadge(s.status, s.current)}
                    </div>
                  </TimelineHeader>

                  <TimelineContent
                    className={`text-sm leading-relaxed ${
                      completed || s.current ? 'text-foreground-alt' : 'text-brand-navy/35'
                    }`}
                  >
                    {s.description}

                    {s.current && (
                      <div className="mt-3 flex items-start gap-2 rounded-md border border-brand-orange/20 bg-[#fffaf8] px-3 py-2.5">
                        <MapPin className="mt-0.5 size-3.5 shrink-0 text-brand-orange" />
                        <p className="text-xs text-brand-navy/70">
                          <span className="font-semibold text-brand-navy">Você está aqui.</span>{' '}
                          O próximo avanço esperado é a consolidação da execução do processo.
                        </p>
                      </div>
                    )}
                  </TimelineContent>
                </TimelineItem>
              )
            })}
          </Timeline>
        </div>

        <p className="mt-6 text-center text-xs text-foreground-alt pb-4">
          Atualizações são enviadas pelo WhatsApp conforme o processo avança.
        </p>

      </div>
    </div>
  )
}
