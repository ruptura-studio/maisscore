import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'process_session'
const PROTECTED_PATHS = ['/meuprocesso']
const ADMIN_COOKIE_NAME = 'admin_session'
const ADMIN_COOKIE_VALUE = 'authenticated'
const ADMIN_LOGIN_PATH = '/admin/login'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/')

  if (isAdminRoute) {
    const adminSession = req.cookies.get(ADMIN_COOKIE_NAME)?.value
    const isAuthenticatedAdmin = adminSession === ADMIN_COOKIE_VALUE

    if (pathname === ADMIN_LOGIN_PATH) {
      if (isAuthenticatedAdmin) {
        const url = req.nextUrl.clone()
        url.pathname = '/admin'
        return NextResponse.redirect(url)
      }

      return NextResponse.next()
    }

    if (isAuthenticatedAdmin) {
      return NextResponse.next()
    }

    const url = req.nextUrl.clone()
    url.pathname = ADMIN_LOGIN_PATH
    return NextResponse.redirect(url)
  }

  const isProtected = PROTECTED_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))
  if (!isProtected) return NextResponse.next()

  const sessionCookie = req.cookies.get(COOKIE_NAME)?.value
  if (sessionCookie) return NextResponse.next()

  // Sem cookie — redireciona para página de acesso negado
  const url = req.nextUrl.clone()
  url.pathname = '/acesso'
  url.searchParams.set('redirect', pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/meuprocesso', '/meuprocesso/:path*', '/admin', '/admin/:path*'],
}
