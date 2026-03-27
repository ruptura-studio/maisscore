import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const sections = [
  {
    href: '/styleguide/cores',
    title: 'Cores',
    description: 'Paleta de marca, tokens neutros e variáveis CSS do shadcn/ui.',
  },
  {
    href: '/styleguide/tipografia',
    title: 'Tipografia',
    description: 'Famílias tipográficas, escala de tamanhos e tokens de fonte.',
  },
  {
    href: '/styleguide/espacamento',
    title: 'Espaçamento & Sombras',
    description: 'Escala de espaçamento, elevações e raios de borda.',
  },
  {
    href: '/styleguide/breakpoints',
    title: 'Breakpoints',
    description: 'Pontos de quebra responsivos e estratégia de layout.',
  },
  {
    href: '/styleguide/botoes',
    title: 'Botões',
    description: 'Classes utilitárias btn-primary, btn-secondary e nav-link.',
  },
  {
    href: '/styleguide/componentes',
    title: 'Cards & Badges',
    description: 'Componentes shadcn/ui: Button, Badge e Card com suas variantes.',
  },
  {
    href: '/styleguide/grid',
    title: 'Grid & Container',
    description: 'Container padrão, grade de 12 colunas e classes de layout.',
  },
]

export default function StyleguidePage() {
  return (
    <div>
      {/* Hero */}
      <div className="mb-12 pb-8 border-b border-brand-border">
        <h1 className="text-heading-2 font-dm font-normal text-brand-navy mb-2">
          Style Guide
        </h1>
        <p className="text-para-md text-neutral-400 max-w-xl">
          Sistema de design da Mais Score. Referência central de tokens, componentes
          e padrões de interface usados em toda a aplicação.
        </p>
      </div>

      {/* Grid de seções */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group flex flex-col gap-2 border border-brand-border rounded-lg p-6 hover:border-brand-orange/40 hover:shadow-md transition-all bg-white"
          >
            <div className="flex items-center justify-between">
              <span className="text-heading-4 font-medium text-brand-navy group-hover:text-brand-orange transition-colors">
                {section.title}
              </span>
              <ArrowRight
                size={16}
                className="text-neutral-400 group-hover:text-brand-orange group-hover:translate-x-1 transition-all"
              />
            </div>
            <p className="text-para-sm text-neutral-400 leading-relaxed">
              {section.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
