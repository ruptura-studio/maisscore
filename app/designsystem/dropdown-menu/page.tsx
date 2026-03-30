import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown, User, Settings, LogOut } from 'lucide-react'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function DropdownMenuPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-heading-2 font-dm font-normal text-brand-navy mb-2">Dropdown Menu</h1>
        <p className="text-para-md text-neutral-400 mb-8">
          Menu flutuante acionado por um trigger. Suporta itens, separadores, checkboxes e sub-menus. Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/dropdown-menu.tsx</code>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Menu Básico</h2>
        <p className="text-para-sm text-neutral-400 mb-4">Itens de ação com label e separador.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex items-center justify-center bg-neutral-50 mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Minha conta <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>João da Silva</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><User className="mr-2 h-4 w-4" />Perfil</DropdownMenuItem>
            <DropdownMenuItem><Settings className="mr-2 h-4 w-4" />Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive"><LogOut className="mr-2 h-4 w-4" />Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CodeBlock code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Minha conta</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>João da Silva</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Perfil</DropdownMenuItem>
    <DropdownMenuItem>Configurações</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive">Sair</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`} />

      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Com Checkbox</h2>
        <p className="text-para-sm text-neutral-400 mb-4">Itens com estado marcado/desmarcado.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex items-center justify-center bg-neutral-50 mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Notificações <ChevronDown className="ml-1 h-4 w-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Preferências</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>E-mail</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>WhatsApp</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>SMS</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CodeBlock code={`<DropdownMenuCheckboxItem checked>E-mail</DropdownMenuCheckboxItem>
<DropdownMenuCheckboxItem>SMS</DropdownMenuCheckboxItem>`} />

      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Sub-componentes</h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-para-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Componente</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">DropdownMenu</td><td className="px-4 py-3 text-neutral-500">Raiz com estado open/close</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">DropdownMenuTrigger</td><td className="px-4 py-3 text-neutral-500">Elemento que abre o menu</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">DropdownMenuContent</td><td className="px-4 py-3 text-neutral-500">Container do menu flutuante</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">DropdownMenuItem</td><td className="px-4 py-3 text-neutral-500">Item clicável</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">DropdownMenuLabel</td><td className="px-4 py-3 text-neutral-500">Rótulo não clicável</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">DropdownMenuSeparator</td><td className="px-4 py-3 text-neutral-500">Divisor horizontal</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">DropdownMenuCheckboxItem</td><td className="px-4 py-3 text-neutral-500">Item com checkbox</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
