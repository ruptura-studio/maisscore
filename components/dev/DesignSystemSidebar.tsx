'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navSections = [
  {
    title: 'Fundação',
    items: [
      { href: '/designsystem/cores', label: 'Cores' },
      { href: '/designsystem/tipografia', label: 'Tipografia' },
      { href: '/designsystem/espacamento', label: 'Espaçamento & Sombras' },
      { href: '/designsystem/breakpoints', label: 'Breakpoints' },
      { href: '/designsystem/icones', label: 'Ícones' },
    ],
  },
  {
    title: 'Elementos',
    items: [
      { href: '/designsystem/botoes', label: 'Botões' },
    ],
  },
  {
    title: 'Componentes',
    items: [
      { href: '/designsystem/accordion', label: 'Accordion' },
      { href: '/designsystem/alert', label: 'Alert' },
      { href: '/designsystem/alert-dialog', label: 'Alert Dialog' },
      { href: '/designsystem/avatar', label: 'Avatar' },
      { href: '/designsystem/badge', label: 'Badge' },
      { href: '/designsystem/button-group', label: 'Button Group' },
      { href: '/designsystem/card', label: 'Card' },
      { href: '/designsystem/checkbox', label: 'Checkbox' },
      { href: '/designsystem/combobox', label: 'Combobox' },
      { href: '/designsystem/dialog', label: 'Dialog' },
      { href: '/designsystem/dropdown-menu', label: 'Dropdown Menu' },
      { href: '/designsystem/field', label: 'Field' },
      { href: '/designsystem/header-nav', label: 'Header & Nav' },
      { href: '/designsystem/hover-card', label: 'Hover Card' },
      { href: '/designsystem/input', label: 'Input' },
      { href: '/designsystem/input-group', label: 'Input Group' },
      { href: '/designsystem/input-otp', label: 'Input OTP' },
      { href: '/designsystem/item', label: 'Item' },
      { href: '/designsystem/label', label: 'Label' },
      { href: '/designsystem/navigation-menu', label: 'Navigation Menu' },
      { href: '/designsystem/next-themes', label: 'Next Themes' },
      { href: '/designsystem/popover', label: 'Popover' },
      { href: '/designsystem/progress', label: 'Progress' },
      { href: '/designsystem/radio-group', label: 'Radio Group' },
      { href: '/designsystem/scroll-area', label: 'Scroll Area' },
      { href: '/designsystem/select', label: 'Select' },
      { href: '/designsystem/separator', label: 'Separator' },
      { href: '/designsystem/sheet', label: 'Sheet' },
      { href: '/designsystem/sidebar', label: 'Sidebar' },
      { href: '/designsystem/skeleton', label: 'Skeleton' },
      { href: '/designsystem/slider', label: 'Slider' },
      { href: '/designsystem/sonner', label: 'Sonner' },
      { href: '/designsystem/spinner', label: 'Spinner' },
      { href: '/designsystem/switch', label: 'Switch' },
      { href: '/designsystem/table', label: 'Table' },
      { href: '/designsystem/tabs', label: 'Tabs' },
      { href: '/designsystem/textarea', label: 'Textarea' },
      { href: '/designsystem/tooltip', label: 'Tooltip' },
    ],
  },
  {
    title: 'Layout',
    items: [
      { href: '/designsystem/grid', label: 'Grid & Container' },
    ],
  },
]

export function DesignSystemSidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="w-[240px] shrink-0 border-r border-brand-border bg-white overflow-y-auto sticky"
      style={{ top: '74px', height: 'calc(100vh - 74px)' }}
    >
      {/* Header */}
      <div className="px-4 py-5 border-b border-brand-border flex items-center gap-2">
        <span className="text-[11px] font-medium uppercase tracking-widest text-brand-navy">
          Design System
        </span>
        <span className="text-[10px] font-medium bg-brand-orange/10 text-brand-orange px-1.5 py-0.5 rounded-full">
          v1
        </span>
      </div>

      {/* Nav */}
      <nav className="px-2 pb-6">
        <Link
          href="/designsystem"
          className={cn(
            'flex items-center text-sm px-3 py-1.5 rounded-md mt-3 transition-colors',
            pathname === '/designsystem'
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
