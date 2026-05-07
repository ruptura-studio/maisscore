'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export function ProcessPoller({ initialStep }: { initialStep: number }) {
  const router = useRouter()
  const lastStep = useRef(initialStep)

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/meuprocesso/status', { cache: 'no-store' })
        if (!res.ok) return
        const data = await res.json()
        if (data.currentStep !== null && data.currentStep !== lastStep.current) {
          lastStep.current = data.currentStep
          router.refresh()
        }
      } catch {
        // silencioso
      }
    }, 10_000) // a cada 10 segundos

    return () => clearInterval(interval)
  }, [router])

  return null
}
