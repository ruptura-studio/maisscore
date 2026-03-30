import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Info, HelpCircle, Star } from 'lucide-react'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function TooltipPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-heading-2 font-dm font-normal text-brand-navy mb-2">Tooltip</h1>
        <p className="text-para-md text-neutral-400 mb-8">
          Dica flutuante exibida ao passar o mouse. Requer{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">TooltipProvider</code> no layout.
          Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/tooltip.tsx</code>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Posições</h2>
        <p className="text-para-sm text-neutral-400 mb-4">Tooltip pode aparecer em 4 direções.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-wrap items-center justify-center gap-4 bg-neutral-50 mb-4">
        <TooltipProvider>
          {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
            <Tooltip key={side}>
              <TooltipTrigger asChild>
                <Button variant="outline" className="capitalize">{side}</Button>
              </TooltipTrigger>
              <TooltipContent side={side}>
                <p>Tooltip {side}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
      <CodeBlock code={`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Texto do tooltip</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`} />

      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Em Ícones</h2>
        <p className="text-para-sm text-neutral-400 mb-4">Uso comum: ícones de ajuda e informação.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-wrap items-center justify-center gap-6 bg-neutral-50 mb-4">
        <TooltipProvider>
          <div className="flex items-center gap-2 text-sm text-brand-navy">
            <span>Taxa de sucesso</span>
            <Tooltip>
              <TooltipTrigger><Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
              <TooltipContent><p>Calculada sobre os últimos 12 meses</p></TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center gap-2 text-sm text-brand-navy">
            <span>Score Serasa</span>
            <Tooltip>
              <TooltipTrigger><HelpCircle className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
              <TooltipContent><p>Pontuação de 0 a 1000</p></TooltipContent>
            </Tooltip>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon"><Star className="h-4 w-4" /></Button>
            </TooltipTrigger>
            <TooltipContent><p>Favoritar cliente</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <CodeBlock code={`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <Info className="h-4 w-4" />
    </TooltipTrigger>
    <TooltipContent>
      <p>Calculada sobre os últimos 12 meses</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`} />

      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Setup</h2>
        <p className="text-para-sm text-neutral-400 mb-4">Adicionar <code className="font-mono bg-neutral-50 px-1 rounded">TooltipProvider</code> no layout raiz.</p>
      </div>
      <CodeBlock code={`// app/layout.tsx
import { TooltipProvider } from '@/components/ui/tooltip'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}`} />

      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Especificações</h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-para-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Prop (TooltipContent)</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Tipo</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Default</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">side</td><td className="px-4 py-3 text-neutral-500">"top" | "bottom" | "left" | "right"</td><td className="px-4 py-3 text-neutral-400">"top"</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">align</td><td className="px-4 py-3 text-neutral-500">"start" | "center" | "end"</td><td className="px-4 py-3 text-neutral-400">"center"</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">delayDuration</td><td className="px-4 py-3 text-neutral-500">number (ms)</td><td className="px-4 py-3 text-neutral-400">700</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
