'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'
import { triggerN8nWebhook } from '@/lib/n8n'

type StepStatus = 'pendente' | 'em_andamento' | 'concluido'
type ProcessStatus = 'aguardando_inicio' | 'em_andamento' | 'concluido' | 'cancelado'

function getAnalysisMilestoneTemplateSlug(processId: string, milestone: number): string {
  return `processo_${processId}_analise_marco_${milestone}`
}

const STEP_TITLES: Record<number, string> = {
  1: 'Coleta de documentos',
  2: 'Analise de caso',
  3: 'Inicio do processo',
  4: 'Restricao removida',
  5: 'Defesa (contestacao)',
  6: 'Fase recursal',
  7: 'Cumprimento da sentenca',
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

function getBusinessMillisecondsElapsed(startDate: Date, endDate: Date): number {
  if (endDate <= startDate) return 0

  const cursor = new Date(startDate)
  let total = 0

  while (cursor < endDate) {
    const nextDay = new Date(cursor)
    nextDay.setHours(24, 0, 0, 0)
    const chunkEnd = nextDay < endDate ? nextDay : endDate

    if (isBusinessDay(cursor)) {
      total += chunkEnd.getTime() - cursor.getTime()
    }

    cursor.setTime(chunkEnd.getTime())
  }

  return total
}

export async function updateStepStatus(stepId: string, status: StepStatus): Promise<void> {
  const currentStep = await prisma.processStep.findUnique({
    where: { id: stepId },
    select: { processId: true, step: true, createdAt: true },
  })

  if (!currentStep) return

  if (currentStep.step === 2 && status === 'concluido') {
    const process = await prisma.process.findUnique({
      where: { id: currentStep.processId },
      select: {
        order: {
          select: {
            payment: { select: { confirmedAt: true } },
          },
        },
      },
    })

    const slaStartDate = process?.order.payment?.confirmedAt ?? currentStep.createdAt
    const deadline = addBusinessDays(slaStartDate, 7)
    if (new Date() < deadline) return
  }

  await prisma.processStep.update({
    where: { id: stepId },
    data: {
      status,
      completedAt: status === 'concluido' ? new Date() : null,
    },
  })

  const fullStep = await prisma.processStep.findUnique({
    where: { id: stepId },
    include: {
      process: {
        include: {
          order: {
            include: {
              lead: { select: { phone: true, name: true } },
            },
          },
          steps: true,
        },
      },
    },
  })

  if (fullStep) {
    const stepPayload = {
      processId: fullStep.processId,
      stepId: fullStep.id,
      stepNumber: fullStep.step,
      stepTitle: STEP_TITLES[fullStep.step],
      status,
      leadPhone: fullStep.process.order.lead.phone,
      documentUrl: fullStep.documentUrl,
    }

    if (status === 'em_andamento') {
      void triggerN8nWebhook('painel-step-iniciado', stepPayload)
    }

    if (status === 'concluido') {
      void triggerN8nWebhook('painel-step-concluido', stepPayload)

      const nextStepNumber = fullStep.step + 1

      if (nextStepNumber <= 7) {
        const nextStep = await prisma.processStep.findUnique({
          where: {
            processId_step: {
              processId: fullStep.processId,
              step: nextStepNumber,
            },
          },
          select: { id: true, status: true },
        })

        if (!nextStep) {
          const createdNextStep = await prisma.processStep.create({
            data: {
              processId: fullStep.processId,
              step: nextStepNumber,
              status: 'em_andamento',
            },
          })

          void triggerN8nWebhook('painel-step-iniciado', {
            processId: fullStep.processId,
            stepId: createdNextStep.id,
            stepNumber: nextStepNumber,
            stepTitle: STEP_TITLES[nextStepNumber],
            status: 'em_andamento',
            leadPhone: fullStep.process.order.lead.phone,
            documentUrl: null,
          })
        } else if (nextStep.status === 'pendente') {
          await prisma.processStep.update({
            where: { id: nextStep.id },
            data: { status: 'em_andamento', completedAt: null },
          })

          void triggerN8nWebhook('painel-step-iniciado', {
            processId: fullStep.processId,
            stepId: nextStep.id,
            stepNumber: nextStepNumber,
            stepTitle: STEP_TITLES[nextStepNumber],
            status: 'em_andamento',
            leadPhone: fullStep.process.order.lead.phone,
            documentUrl: null,
          })
        }
      }

      await prisma.process.update({
        where: { id: fullStep.process.id },
        data: { status: nextStepNumber <= 7 ? 'em_andamento' : 'concluido' },
      })

      const refreshedSteps = await prisma.processStep.findMany({
        where: { processId: fullStep.process.id },
        select: { status: true },
      })

      const allStepsConcluded =
        refreshedSteps.length === 7 &&
        refreshedSteps.every((step) => step.status === 'concluido')

      if (allStepsConcluded) {
        void triggerN8nWebhook('painel-processo-concluido', {
          processId: fullStep.process.id,
          leadPhone: fullStep.process.order.lead.phone,
          leadName: fullStep.process.order.lead.name,
        })
      }
    }
  }

  revalidatePath('/admin/processos')
  revalidatePath(`/admin/processos/${currentStep.processId}`)
}

export async function autoConcludeAnalysisStepIfDue(processId: string): Promise<void> {
  const analysisStep = await prisma.processStep.findUnique({
    where: {
      processId_step: {
        processId,
        step: 2,
      },
    },
    select: { id: true, status: true, createdAt: true },
  })

  if (!analysisStep || analysisStep.status !== 'em_andamento') return

  const process = await prisma.process.findUnique({
    where: { id: processId },
    select: {
      order: {
        select: {
          payment: { select: { confirmedAt: true } },
        },
      },
    },
  })

  const slaStartDate = process?.order.payment?.confirmedAt ?? analysisStep.createdAt
  const deadline = addBusinessDays(slaStartDate, 7)
  if (new Date() < deadline) return

  await updateStepStatus(analysisStep.id, 'concluido')
}

export async function processAnalysisStepMilestones(processId: string): Promise<void> {
  const process = await prisma.process.findUnique({
    where: { id: processId },
    include: {
      steps: {
        where: { step: 2 },
        select: { id: true, status: true, createdAt: true },
      },
      order: {
        include: {
          payment: { select: { confirmedAt: true } },
          lead: { select: { id: true, phone: true, name: true, onboardingToken: true } },
        },
      },
    },
  })

  if (!process) return

  const analysisStep = process.steps[0]
  if (!analysisStep || analysisStep.status !== 'em_andamento') return

  const templateSlugs = [1, 2, 3].map((milestone) =>
    getAnalysisMilestoneTemplateSlug(process.id, milestone),
  )
  const templates = await prisma.messageTemplate.findMany({
    where: {
      slug: { in: templateSlugs },
      active: true,
    },
    select: { slug: true, content: true },
  })
  const templateContentBySlug = new Map(templates.map((t) => [t.slug, t.content]))

  const startDate = process.order.payment?.confirmedAt ?? analysisStep.createdAt
  const deadline = addBusinessDays(startDate, 7)
  const totalBusinessMs = getBusinessMillisecondsElapsed(startDate, deadline)
  if (totalBusinessMs <= 0) return

  const elapsedBusinessMs = Math.min(
    getBusinessMillisecondsElapsed(startDate, new Date()),
    totalBusinessMs,
  )

  for (let milestone = 1; milestone <= 3; milestone += 1) {
    const thresholdMs = (totalBusinessMs * milestone) / 3
    if (elapsedBusinessMs < thresholdMs) continue

    const eventType = `analise_caso_sla_marco_${milestone}`
    const alreadyTriggered = await prisma.leadEvent.findFirst({
      where: {
        leadId: process.order.lead.id,
        type: eventType,
        value: process.id,
      },
      select: { id: true },
    })

    if (alreadyTriggered) continue

    await prisma.leadEvent.create({
      data: {
        leadId: process.order.lead.id,
        type: eventType,
        value: process.id,
      },
    })

    void triggerN8nWebhook('painel-analise-caso-marco', {
      processId: process.id,
      stepId: analysisStep.id,
      milestone,
      action: 'send_whatsapp_message',
      channel: 'whatsapp',
      messageTemplate: `analise_caso_marco_${milestone}`,
      messageText:
        templateContentBySlug.get(getAnalysisMilestoneTemplateSlug(process.id, milestone)) ?? null,
      leadPhone: process.order.lead.phone,
      leadName: process.order.lead.name,
      onboardingToken: process.order.lead.onboardingToken,
    })
  }
}

export async function saveAnalysisMilestoneMessage(
  processId: string,
  milestone: number,
  message: string,
): Promise<{ success: boolean; message: string }> {
  if (![1, 2, 3].includes(milestone)) {
    return { success: false, message: 'Marco inválido' }
  }

  const normalized = message.trim()
  if (!normalized) {
    return { success: false, message: 'Mensagem não pode ficar vazia' }
  }

  const process = await prisma.process.findUnique({
    where: { id: processId },
    select: { id: true },
  })

  if (!process) {
    return { success: false, message: 'Processo não encontrado' }
  }

  const slug = getAnalysisMilestoneTemplateSlug(process.id, milestone)

  await prisma.messageTemplate.upsert({
    where: { slug },
    update: {
      content: normalized,
      variables: [],
      active: true,
    },
    create: {
      slug,
      flow: 'processo_analise_caso',
      step: milestone,
      content: normalized,
      variables: [],
      active: true,
    },
  })

  revalidatePath(`/admin/processos/${process.id}`)
  return { success: true, message: 'Mensagem salva' }
}

export async function getAnalysisMilestoneMessages(processId: string): Promise<Record<number, string>> {
  const slugs = [1, 2, 3].map((milestone) => getAnalysisMilestoneTemplateSlug(processId, milestone))
  const templates = await prisma.messageTemplate.findMany({
    where: {
      slug: { in: slugs },
      active: true,
    },
    select: { slug: true, content: true },
  })

  const messages: Record<number, string> = { 1: '', 2: '', 3: '' }
  for (const template of templates) {
    if (template.slug.endsWith('_1')) messages[1] = template.content
    if (template.slug.endsWith('_2')) messages[2] = template.content
    if (template.slug.endsWith('_3')) messages[3] = template.content
  }

  return messages
}

export async function createAndStartStep(processId: string, stepNumber: number): Promise<void> {
  const step = await prisma.processStep.create({
    data: {
      processId,
      step: stepNumber,
      status: 'em_andamento',
    },
  })

  const fullStep = await prisma.processStep.findUnique({
    where: { id: step.id },
    include: {
      process: {
        include: {
          order: { include: { lead: { select: { phone: true, name: true } } } },
          steps: true,
        },
      },
    },
  })

  if (fullStep) {
    void triggerN8nWebhook('painel-step-iniciado', {
      processId: fullStep.processId,
      stepId: fullStep.id,
      stepNumber: fullStep.step,
      stepTitle: STEP_TITLES[fullStep.step],
      status: 'em_andamento',
      leadPhone: fullStep.process.order.lead.phone,
      documentUrl: null,
    })
  }

  revalidatePath('/admin/processos')
  revalidatePath(`/admin/processos/${processId}`)
}

export async function updateStepDocumentUrl(stepId: string, documentUrl: string): Promise<void> {
  const currentStep = await prisma.processStep.findUnique({
    where: { id: stepId },
    select: { processId: true },
  })

  if (!currentStep) return

  await prisma.processStep.update({
    where: { id: stepId },
    data: {
      documentUrl,
    },
  })

  revalidatePath('/admin/processos')
  revalidatePath(`/admin/processos/${currentStep.processId}`)
}

export async function saveExecutionNotes(processId: string, notes: string): Promise<void> {
  await prisma.processStep.updateMany({
    where: { processId, step: 3 },
    data: { notes, updatedAt: new Date() },
  })

  revalidatePath(`/admin/processos/${processId}`)
}

export async function saveFinalizationDocument(processId: string, documentUrl: string): Promise<void> {
  await prisma.processStep.upsert({
    where: { processId_step: { processId, step: 4 } },
    create: {
      processId,
      step: 4,
      status: 'em_andamento',
      documentUrl,
    },
    update: {
      documentUrl,
      updatedAt: new Date(),
    },
  })

  revalidatePath(`/admin/processos/${processId}`)
}

export async function updateProcessStatus(processId: string, status: ProcessStatus): Promise<void> {
  await prisma.process.update({
    where: { id: processId },
    data: { status },
  })

  if (status === 'concluido') {
    const process = await prisma.process.findUnique({
      where: { id: processId },
      include: {
        order: {
          include: {
            lead: { select: { phone: true, name: true } },
          },
        },
      },
    })

    if (process) {
      void triggerN8nWebhook('painel-processo-concluido', {
        processId: process.id,
        leadPhone: process.order.lead.phone,
        leadName: process.order.lead.name,
      })
    }
  }

  revalidatePath('/admin/processos')
  revalidatePath(`/admin/processos/${processId}`)
}

export async function triggerWhatsappCobranca(processId: string): Promise<void> {
  const process = await prisma.process.findUnique({
    where: { id: processId },
    include: {
      order: {
        include: {
          lead: {
            select: {
              phone: true,
              name: true,
              onboardingToken: true,
            },
          },
        },
      },
    },
  })

  if (!process) return

  void triggerN8nWebhook('painel-cobrar-onboarding', {
    processId: process.id,
    leadPhone: process.order.lead.phone,
    leadName: process.order.lead.name,
    onboardingToken: process.order.lead.onboardingToken,
  })
}
