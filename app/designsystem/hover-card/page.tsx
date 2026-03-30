import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, Star } from 'lucide-react'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function HoverCardPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-heading-2 font-dm font-normal text-brand-navy mb-2">Hover Card</h1>
        <p className="text-para-md text-neutral-400 mb-8">
          Card flutuante exibido ao passar o mouse sobre um elemento. Ideal para previews e tooltips ricos. Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/hover-card.tsx</code>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Preview de Serviço</h2>
        <p className="text-para-sm text-neutral-400 mb-4">Passe o mouse sobre o link para ver o card.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex items-center justify-center bg-neutral-50 mb-4">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="text-brand-navy">Regularização de CPF</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex gap-3">
              <div className="flex-1">
                <h4 className="text-sm font-semibold">Mais Score</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Removemos restrições do Serasa e SPC via processo jurídico. 97% de taxa de sucesso.
                </p>
                <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" /> Até 30 dias úteis</span>
                  <span className="flex items-center gap-1"><Star className="h-3 w-3" /> 1.142+ famílias</span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      <CodeBlock code={`<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">Regularização de CPF</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <p>Removemos restrições do Serasa e SPC. 97% de taxa de sucesso.</p>
  </HoverCardContent>
</HoverCard>`} />

      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Especificações</h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-para-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Prop (HoverCardContent)</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Tipo</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Default</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">side</td><td className="px-4 py-3 text-neutral-500">"top" | "bottom" | "left" | "right"</td><td className="px-4 py-3 text-neutral-400">"bottom"</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">align</td><td className="px-4 py-3 text-neutral-500">"start" | "center" | "end"</td><td className="px-4 py-3 text-neutral-400">"center"</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">className</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
