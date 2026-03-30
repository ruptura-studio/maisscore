import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const sections = [
  {
    category: 'Fundação',
    items: [
      { href: '/designsystem/cores', title: 'Cores', description: 'Paleta de marca, tokens neutros e variáveis CSS.' },
      { href: '/designsystem/tipografia', title: 'Tipografia', description: 'Famílias tipográficas, escala de tamanhos e tokens de fonte.' },
      { href: '/designsystem/espacamento', title: 'Espaçamento & Sombras', description: 'Escala de espaçamento, elevações e raios de borda.' },
      { href: '/designsystem/breakpoints', title: 'Breakpoints', description: 'Pontos de quebra responsivos e estratégia de layout.' },
    ],
  },
  {
    category: 'Elementos',
    items: [
      { href: '/designsystem/botoes', title: 'Botões', description: 'Classes utilitárias btn-primary, btn-secondary e nav-link.' },
      { href: '/designsystem/grid', title: 'Grid & Container', description: 'Container padrão, grade de 12 colunas e classes de layout.' },
    ],
  },
  {
    category: 'Componentes',
    items: [
      { href: '/designsystem/accordion', title: 'Accordion', description: 'Painéis expansíveis para conteúdo colapsável.' },
      { href: '/designsystem/alert', title: 'Alert', description: 'Mensagens de feedback: info, sucesso, erro e aviso.' },
      { href: '/designsystem/alert-dialog', title: 'Alert Dialog', description: 'Modal de confirmação para ações destrutivas.' },
      { href: '/designsystem/avatar', title: 'Avatar', description: 'Imagem ou iniciais de usuário com fallback.' },
      { href: '/designsystem/badge', title: 'Badge', description: 'Rótulo compacto para status e categorias.' },
      { href: '/designsystem/button-group', title: 'Button Group', description: 'Agrupamento de botões horizontal ou vertical.' },
      { href: '/designsystem/card', title: 'Card', description: 'Container com bordas e sombra para agrupar conteúdo.' },
      { href: '/designsystem/checkbox', title: 'Checkbox', description: 'Caixa de seleção para opções binárias ou múltiplas.' },
      { href: '/designsystem/combobox', title: 'Combobox', description: 'Campo de seleção com busca (Command + Popover).' },
      { href: '/designsystem/dialog', title: 'Dialog', description: 'Modal para formulários, confirmações e conteúdo secundário.' },
      { href: '/designsystem/dropdown-menu', title: 'Dropdown Menu', description: 'Menu flutuante com itens, separadores e checkboxes.' },
      { href: '/designsystem/field', title: 'Field', description: 'Wrapper de campo com label, hint e mensagem de erro.' },
      { href: '/designsystem/header-nav', title: 'Header & Nav', description: 'Cabeçalho e navegação principal do site.' },
      { href: '/designsystem/hover-card', title: 'Hover Card', description: 'Card flutuante exibido ao passar o mouse.' },
      { href: '/designsystem/input', title: 'Input', description: 'Campo de texto para formulários.' },
      { href: '/designsystem/input-group', title: 'Input Group', description: 'Input com prefixo e/ou sufixo (ícone ou texto).' },
      { href: '/designsystem/input-otp', title: 'Input OTP', description: 'Campo de entrada para códigos de verificação.' },
      { href: '/designsystem/item', title: 'Item', description: 'Linha de lista com leading, título, descrição e trailing.' },
      { href: '/designsystem/label', title: 'Label', description: 'Rótulo acessível para campos de formulário.' },
      { href: '/designsystem/navigation-menu', title: 'Navigation Menu', description: 'Menu de navegação com dropdowns ricos.' },
      { href: '/designsystem/next-themes', title: 'Next Themes', description: 'Gerenciamento de tema claro/escuro com next-themes.' },
      { href: '/designsystem/popover', title: 'Popover', description: 'Conteúdo flutuante acionado por clique.' },
      { href: '/designsystem/progress', title: 'Progress', description: 'Barra de progresso para indicar avanço de processo.' },
      { href: '/designsystem/radio-group', title: 'Radio Group', description: 'Opções mutuamente exclusivas.' },
      { href: '/designsystem/scroll-area', title: 'Scroll Area', description: 'Área de rolagem com scrollbar customizada.' },
      { href: '/designsystem/select', title: 'Select', description: 'Campo de seleção com grupos e opções.' },
      { href: '/designsystem/separator', title: 'Separator', description: 'Divisor horizontal ou vertical entre conteúdos.' },
      { href: '/designsystem/sheet', title: 'Sheet', description: 'Painel deslizante lateral (drawer).' },
      { href: '/designsystem/sidebar', title: 'Sidebar', description: 'Navegação lateral colapsável para dashboards.' },
      { href: '/designsystem/skeleton', title: 'Skeleton', description: 'Placeholder animado para estados de carregamento.' },
      { href: '/designsystem/slider', title: 'Slider', description: 'Controle deslizante para seleção de valores em intervalo.' },
      { href: '/designsystem/sonner', title: 'Sonner', description: 'Notificações toast via biblioteca Sonner.' },
      { href: '/designsystem/spinner', title: 'Spinner', description: 'Indicador de carregamento animado.' },
      { href: '/designsystem/switch', title: 'Switch', description: 'Toggle para ativar ou desativar uma opção.' },
      { href: '/designsystem/table', title: 'Table', description: 'Tabela semântica com header, body e footer.' },
      { href: '/designsystem/tabs', title: 'Tabs', description: 'Navegação em abas para conteúdo alternado.' },
      { href: '/designsystem/textarea', title: 'Textarea', description: 'Campo de texto multilinha para entradas longas.' },
      { href: '/designsystem/tooltip', title: 'Tooltip', description: 'Dica flutuante exibida ao passar o mouse.' },
    ],
  },
]

export default function StyleguidePage() {
  const totalComponents = sections.reduce((acc, s) => acc + s.items.length, 0)

  return (
    <div>
      {/* Hero */}
      <div className="mb-10 pb-8 border-b border-brand-border">
        <h1 className="text-heading-2 font-dm font-normal text-brand-navy mb-2">
          Design System
</h1>
        <p className="text-para-md text-neutral-400 max-w-xl mb-4">
          Sistema de design da Mais Score. Referência central de tokens, componentes
          e padrões de interface usados em toda a aplicação.
        </p>
        <div className="flex items-center gap-4 text-para-sm text-neutral-400">
          <span><strong className="text-brand-navy">{totalComponents}</strong> seções documentadas</span>
          <span>·</span>
          <span>shadcn/ui + componentes customizados</span>
        </div>
      </div>

      {/* Seções por categoria */}
      {sections.map((section) => (
        <div key={section.category} className="mb-10">
          <h2 className="text-[11px] font-medium uppercase tracking-widest text-neutral-400 mb-4">
            {section.category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col gap-1.5 border border-brand-border rounded-lg p-5 hover:border-brand-orange/40 hover:shadow-sm transition-all bg-white"
              >
                <div className="flex items-center justify-between">
                  <span className="text-para-md font-medium text-brand-navy group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-neutral-300 group-hover:text-brand-orange group-hover:translate-x-0.5 transition-all"
                  />
                </div>
                <p className="text-para-sm text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
