import { NextRequest, NextResponse } from 'next/server'
import { resolveSlug, buildSessionCookie } from '@/lib/process-session'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const session = await resolveSlug(slug)

  if (!session) {
    return NextResponse.json({ success: false, error: 'Processo não encontrado.' }, { status: 404 })
  }

  const response = NextResponse.redirect(
    new URL('/meuprocesso', _req.url)
  )

  const cookie = buildSessionCookie(session.slug)
  response.cookies.set(cookie)

  return response
}
