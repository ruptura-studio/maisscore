import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const { token } = body

  if (!token || typeof token !== 'string') {
    return Response.json({ success: false }, { status: 400 })
  }

  const lead = await prisma.lead.findUnique({
    where: { onboardingToken: token },
    select: { id: true },
  })

  if (!lead) {
    return Response.json({ success: false }, { status: 404 })
  }

  await prisma.lead.update({
    where: { onboardingToken: token },
    data: { onboardingLastSeenAt: new Date() },
  })

  return Response.json({ success: true })
}
