'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'
import { triggerN8nWebhook } from '@/lib/n8n'

type StepStatus = 'pendente' | 'em_andamento' | 'concluido'
type ProcessStatus = 'aguardando_inicio' | 'em_andamento' | 'concluido' | 'cancelado'

const STEP_TITLES: Record<number, string> = {
  1: 'Coleta de documentos',
  2: 'Análise de caso',
  3: 'Início do processo',
  4: 'Restrição removida',
  5: 'Defesa (contestação)',
  6: 'Fase recursal',
  7: 'Cumprimento da sentença',
}

export async function updateStepStatus(stepId: string, status: StepStatus): Promise<void> {
  const currentStep = await prisma.processStep.findUnique({
    where: { id: stepId },
    select: { processId: true },
  })

  if (!currentStep) return

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

      const allStepsConcluded =
        fullStep.process.steps.length === 7 &&
        fullStep.process.steps.every((step) => step.status === 'concluido')

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
