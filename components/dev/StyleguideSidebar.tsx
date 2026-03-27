'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navSections = [
  {
    title: 'Fundação',
    items: [
      { href: '/styleguide/cores', label: 'Cores' },
      { href: '/styleguide/tipografia', label: 'Tipografia' },
      { href: '/styleguide/espacamento', label: 'Espaçamento & Sombras' },
      { href: '/styleguide/breakpoints', label: 'Breakpoints' },
    ],
  },
  {
    title: 'Elementos',
    items: [
      { href: '/styleguide/botoes', label: 'Botões' },
    ],
  },
  {
    title: 'Componentes',
    items: [
      { href: '/styleguide/componentes', label: 'Cards & Badges' },
    ],
  },
  {
    title: 'Layout',
    items: [
      { href: '/styleguide/grid', label: 'Grid & Container' },
    ],
  },
]

export function StyleguideSidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="w-[240px] shrink-0 border-r border-brand-border bg-white overflow-y-auto sticky"
      style={{ top: '74px', height: 'calc(100vh - 74px)' }}
    >
      {/* Header */}
      <div className="px-4 py-5 border-b border-brand-border flex items-center gap-2">
        <span className="text-[11px] font-medium uppercase tracking-widest text-brand-navy">
          Style Guide
        </span>
        <span className="text-[10px] font-medium bg-brand-orange/10 text-brand-orange px-1.5 py-0.5 rounded-full">
          v1
        </span>
      </div>

      {/* Nav */}
      <nav className="px-2 pb-6">
        <Link
          href="/styleguide"
          className={cn(
            'flex items-center text-sm px-3 py-1.5 rounded-md mt-3 transition-colors',
            pathname === '/styleguide'
              ? 'bg-neutral-50 text-brand-orange font-medium'
              : 'text-brand-navy hover:bg-neutral-50',
          )}
        >
          Visão Geral
        </Link>

        {navSections.map((section) => (
          <div key={section.title}>
            <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-400 px-3 py-2 mt-4">
              {section.title}
            </p>
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center text-sm px-3 py-1.5 rounded-md transition-colors',
                  pathname === item.href
                    ? 'bg-neutral-50 text-brand-orange font-medium'
                    : 'text-brand-navy hover:bg-neutral-50',
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}
