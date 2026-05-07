import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { LogOut } from 'lucide-react'

const ADMIN_COOKIE_NAME = 'admin_session'

export function Topbar() {
  async function logout() {
    'use server'

    const cookieStore = await cookies()
    cookieStore.delete({
      name: ADMIN_COOKIE_NAME,
      path: '/admin',
    })

    redirect('/admin/login')
  }

  return (
    <header className="flex h-14 items-center justify-between border-b border-brand-border bg-white px-6">
      <h1 className="font-dm text-sm font-semibold text-brand-navy">Painel</h1>

      <form action={logout}>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded px-2 py-1 text-sm font-medium text-brand-navy transition-colors hover:bg-neutral-100"
        >
          <LogOut className="h-4 w-4" />
          <span>Sair</span>
        </button>
      </form>
    </header>
  )
}
