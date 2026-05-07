import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import OnboardingClient from '@/components/onboarding/OnboardingClient'

export default async function OnboardingPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('onboarding_token')?.value

  if (!token) redirect('/')

  return <OnboardingClient token={token} />
}
