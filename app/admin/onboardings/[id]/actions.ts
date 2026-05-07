'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'
import { triggerN8nWebhook } from '@/lib/n8n'

export async function resendOnboardingLink(handoffId: string): Promise<{ success: boolean; message: string }> {
  const handoff = await prisma.onboardingHandoff.findUnique({
    where: { id: handoffId },
    include: {
      lead: {
        select: {
          phone: true,
          name: true,
          onboardingToken: true,
        },
      },
    },
  })

  if (!handoff) {
    return { success: false, message: 'Onboarding não encontrado' }
  }

  if (!handoff.lead.onboardingToken) {
    return { success: false, message: 'Token de onboarding não disponível' }
  }

  await triggerN8nWebhook('painel-reenviar-onboarding', {
    phone: handoff.lead.phone,
    name: handoff.lead.name,
    onboardingToken: handoff.lead.onboardingToken,
  })

  revalidatePath('/admin/onboardings')
  return { success: true, message: 'Link reenviado com sucesso' }
}
