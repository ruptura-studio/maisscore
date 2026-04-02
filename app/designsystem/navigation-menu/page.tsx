import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

const ListItem = ({ title, href, children, className }: { title: string; href: string; children: React.ReactNode; className?: string }) => (
  <li>
    <NavigationMenuLink asChild>
      <a href={href} className={cn('block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground', className)}>
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
      </a>
    </NavigationMenuLink>
  </li>
)

export default function NavigationMenuPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">Navigation Menu</h1>
        <p className="text-lg text-neutral-400 mb-8">
          Menu de navegação com dropdowns ricos. Ideal para headers. Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/navigation-menu.tsx</code>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Menu com Dropdown</h2>
        <p className="text-sm text-neutral-400 mb-4">Passe o mouse sobre os itens para ver o submenu.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex items-center justify-center bg-neutral-50 mb-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Serviços</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  <ListItem title="Regularização Serasa" href="#">
                    Remova restrições no Serasa em até 30 dias úteis.
                  </ListItem>
                  <ListItem title="Regularização SPC" href="#">
                    Limpe seu nome no SPC Brasil com processo jurídico.
                  </ListItem>
                  <ListItem title="Melhoria de Score" href="#">
                    Estratégias para aumentar sua pontuação de crédito.
                  </ListItem>
                  <ListItem title="Consultoria" href="#">
                    Análise completa da sua situação financeira.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Como funciona</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[300px]">
                  <ListItem title="Análise do caso" href="#">
                    Avaliamos sua situação sem custo inicial.
                  </ListItem>
                  <ListItem title="Processo jurídico" href="#">
                    Nossa equipe cuida de todo o processo.
                  </ListItem>
                  <ListItem title="Acompanhamento" href="#">
                    Monitoramos o resultado até a conclusão.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
                Depoimentos
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <CodeBlock code={`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Serviços</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
          <ListItem title="Regularização Serasa" href="#">
            Remova restrições em até 30 dias úteis.
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
        Depoimentos
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`} />

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Sub-componentes</h2>
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
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">NavigationMenu</td><td className="px-4 py-3 text-neutral-500">Container raiz</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">NavigationMenuList</td><td className="px-4 py-3 text-neutral-500">Lista de itens</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">NavigationMenuItem</td><td className="px-4 py-3 text-neutral-500">Item individual</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">NavigationMenuTrigger</td><td className="px-4 py-3 text-neutral-500">Botão que abre o dropdown</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">NavigationMenuContent</td><td className="px-4 py-3 text-neutral-500">Conteúdo do dropdown</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">NavigationMenuLink</td><td className="px-4 py-3 text-neutral-500">Link de navegação</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
