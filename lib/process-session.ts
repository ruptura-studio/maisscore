import 'server-only'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'

const COOKIE_NAME = 'process_session'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 ano

export type ProcessSessionData = {
  leadId: string
  processId: string
  orderId: string
  slug: string
  name: string | null
  phone: string | null
  onboardingToken: string | null
  shortCode: string | null
}

export async function resolveSlug(slug: string): Promise<ProcessSessionData | null> {
  const lead = await prisma.lead.findUnique({
    where: { processSlug: slug },
    select: {
      id: true,
      name: true,
      phone: true,
      onboardingToken: true,
      shortCode: true,
      processSlug: true,
      orders: {
        where: { status: 'pago' },
        orderBy: { createdAt: 'desc' },
        take: 1,
        select: { id: true, process: { select: { id: true } } },
      },
    },
  })

  if (!lead || !lead.processSlug) return null
  const order = lead.orders[0]
  if (!order?.process) return null

  return {
    leadId: lead.id,
    processId: order.process.id,
    orderId: order.id,
    slug: lead.processSlug,
    name: lead.name,
    phone: lead.phone,
    onboardingToken: lead.onboardingToken,
    shortCode: lead.shortCode,
  }
}

export async function getSessionFromCookie(): Promise<ProcessSessionData | null> {
  const cookieStore = await cookies()
  const slug = cookieStore.get(COOKIE_NAME)?.value
  if (!slug) return null
  return resolveSlug(slug)
}

export function buildSessionCookie(slug: string) {
  return {
    name: COOKIE_NAME,
    value: slug,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  }
}
