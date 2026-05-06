import { NextResponse } from 'next/server'
import { getSessionFromCookie } from '@/lib/process-session'
import { prisma } from '@/lib/db'

export async function GET() {
  const session = await getSessionFromCookie()
  if (!session) return NextResponse.json({ currentStep: null })

  const steps = await prisma.processStep.findMany({
    where: { processId: session.processId },
    select: { step: true, status: true },
    orderBy: { step: 'asc' },
  })

  const onboarding = await prisma.lead.findUnique({
    where: { id: session.leadId },
    select: { onboardingCompletedAt: true },
  })

  const onboardingDone = !!onboarding?.onboardingCompletedAt

  // Deriva o step atual da mesma lógica da página
  const stepStatuses = [
    onboardingDone ? 'concluido' : 'em_andamento',
    ...steps.filter((s) => s.step >= 2 && s.step <= 4).map((s) => s.status),
  ]

  const currentStep = stepStatuses.findLastIndex((s) => s === 'em_andamento')

  return NextResponse.json({ currentStep })
}
