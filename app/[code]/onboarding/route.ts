import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { buildSessionCookie } from '@/lib/process-session'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params

  const lead = await prisma.lead.findUnique({
    where: { shortCode: code },
    select: {
      processSlug: true,
      onboardingToken: true,
    },
  })

  if (!lead?.processSlug || !lead?.onboardingToken) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  const response = NextResponse.redirect(new URL('/onboarding', req.url))
  response.cookies.set(buildSessionCookie(lead.processSlug))
  response.cookies.set({
    name: 'onboarding_token',
    value: lead.onboardingToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  })

  return response
}
