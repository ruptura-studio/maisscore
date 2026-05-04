import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromCookie } from '@/lib/process-session'
import { prisma } from '@/lib/db'

export async function GET(_req: NextRequest) {
  const session = await getSessionFromCookie()

  if (!session) {
    return NextResponse.json({ success: false, error: 'Sessão não encontrada.' }, { status: 401 })
  }

  const process = await prisma.process.findUnique({
    where: { id: session.processId },
    include: {
      steps: { orderBy: { step: 'asc' } },
      order: {
        select: {
          lead: {
            select: { name: true, phone: true, onboardingToken: true },
          },
        },
      },
    },
  })

  if (!process) {
    return NextResponse.json({ success: false, error: 'Processo não encontrado.' }, { status: 404 })
  }

  return NextResponse.json({
    success: true,
    data: {
      leadId: session.leadId,
      name: process.order.lead.name,
      phone: process.order.lead.phone,
      onboardingToken: process.order.lead.onboardingToken,
      processSlug: session.slug,
      process: {
        id: process.id,
        status: process.status,
        stage: process.stage,
        startedAt: process.startedAt?.toISOString() ?? null,
        cleanedAt: process.cleanedAt?.toISOString() ?? null,
        proofUrl: process.proofUrl ?? null,
      },
      steps: process.steps.map((s) => ({
        step: s.step,
        status: s.status,
        documentUrl: s.documentUrl ?? null,
        completedAt: s.completedAt?.toISOString() ?? null,
      })),
    },
  })
}
