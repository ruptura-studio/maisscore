import { prisma } from '@/lib/db'
import { OnboardingList } from './_components/onboarding-list'

export default async function AdminOnboardingsPage() {
  const handoffs = await prisma.onboardingHandoff.findMany({
    include: {
      lead: {
        select: { id: true, name: true, phone: true, onboardingToken: true, onboardingCompletedAt: true },
      },
      order: {
        include: {
          onboardingDocuments: true,
          product: { select: { name: true } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-brand-navy">Onboardings</h1>
        <p className="mt-1 text-sm text-foreground-alt">Acompanhamento de handoff e recebimento de documentos.</p>
      </div>

      <OnboardingList handoffs={handoffs} />
    </div>
  )
}
