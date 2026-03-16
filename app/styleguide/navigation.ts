export interface NavItem {
  name: string
  href: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    title: 'Foundation',
    items: [
      { name: 'Design Tokens', href: '/styleguide' },
      { name: 'Logomarcas', href: '/styleguide#logomarcas' },
    ],
  },
  {
    title: 'Components',
    items: [
      // Components will be added here by Prompt 2
    ],
  },
]
