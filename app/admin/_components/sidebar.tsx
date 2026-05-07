'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ClipboardList, FileCheck, LayoutDashboard, Users } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Processos', href: '/admin/processos', icon: ClipboardList },
  { label: 'Leads', href: '/admin/leads', icon: Users },
  { label: 'Onboardings', href: '/admin/onboardings', icon: FileCheck },
]

function isActivePath(pathname: string, href: string) {
  if (href === '/admin') {
    return pathname === '/admin'
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="h-screen w-[220px] bg-brand-navy p-4">
      <div className="mb-6 flex items-center gap-2">
        <span className="text-sm font-semibold text-white">Mais Score</span>
        <span className="rounded bg-brand-orange px-1.5 py-0.5 text-xs text-white">Admin</span>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active = isActivePath(pathname, item.href)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                'flex items-center gap-2 rounded px-2.5 py-2 text-sm transition-colors',
                active ? 'bg-white/15 font-medium text-white' : 'text-white/70 hover:bg-white/10 hover:text-white',
              ].join(' ')}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
