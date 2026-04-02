function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function SidebarPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">Sidebar</h1>
        <p className="text-lg text-neutral-400 mb-8">
          Componente de sidebar completo com suporte a collapso, grupos, tooltips e mobile.
          Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/sidebar.tsx</code>.
          Requer <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">SidebarProvider</code> envolvendo o layout.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Nota de uso</h2>
        <p className="text-sm text-neutral-400 mb-4">
          O Sidebar shadcn é um componente de layout — requer estrutura de página dedicada para funcionar corretamente.
          O preview interativo está disponível na <a href="https://ui.shadcn.com/docs/components/sidebar" target="_blank" rel="noopener noreferrer" className="text-brand-navy underline">documentação oficial</a>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Setup Básico</h2>
      </div>
      <CodeBlock code={`// app/dashboard/layout.tsx
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Home, Users, Settings } from 'lucide-react'

const items = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Clientes', url: '/clientes', icon: Users },
  { title: 'Configurações', url: '/config', icon: Settings },
]

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Mais Score</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}`} />

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Sub-componentes principais</h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Componente</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">SidebarProvider</td><td className="px-4 py-3 text-neutral-500">Contexto — envolve o layout inteiro</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">Sidebar</td><td className="px-4 py-3 text-neutral-500">Container da sidebar (side: left | right)</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">SidebarContent</td><td className="px-4 py-3 text-neutral-500">Área rolável do conteúdo</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">SidebarGroup</td><td className="px-4 py-3 text-neutral-500">Agrupamento de itens</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">SidebarMenu</td><td className="px-4 py-3 text-neutral-500">Lista de itens do menu</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">SidebarMenuButton</td><td className="px-4 py-3 text-neutral-500">Botão/link de cada item</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">SidebarTrigger</td><td className="px-4 py-3 text-neutral-500">Botão para expandir/recolher</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
