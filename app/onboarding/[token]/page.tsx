import { use } from 'react'
import OnboardingClient from '@/components/onboarding/OnboardingClient'

export default function OnboardingTokenPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = use(params)
  return <OnboardingClient token={token} />
}
