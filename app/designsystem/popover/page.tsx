import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Info } from 'lucide-react'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function PopoverPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-heading-2 font-dm font-normal text-brand-navy mb-2">Popover</h1>
        <p className="text-para-md text-neutral-400 mb-8">
          Conteúdo flutuante acionado por clique. Diferente do HoverCard, requer interação explícita. Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/popover.tsx</code>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Informação Adicional</h2>
        <p className="text-para-sm text-neutral-400 mb-4">Botão de info que abre um popover explicativo.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex items-center justify-center gap-4 bg-neutral-50 mb-4">
        <span className="text-sm text-brand-navy">Taxa de sucesso</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
              <Info className="h-3.5 w-3.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <p className="text-sm text-muted-foreground">
              A taxa de 97% é calculada sobre os casos concluídos nos últimos 12 meses, conforme registros do sistema Mais Score.
            </p>
          </PopoverContent>
        </Popover>
      </div>
      <CodeBlock code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="ghost" size="icon"><Info className="h-4 w-4" /></Button>
  </PopoverTrigger>
  <PopoverContent className="w-72">
    <p>A taxa de 97% é calculada sobre os casos concluídos...</p>
  </PopoverContent>
</Popover>`} />

      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Mini Formulário</h2>
        <p className="text-para-sm text-neutral-400 mb-4">Popover com campos de entrada.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex items-center justify-center bg-neutral-50 mb-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Consultar CPF</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <p className="text-sm font-medium">Verificar situação do CPF</p>
              <div className="grid gap-2">
                <Label htmlFor="cpf-pop">CPF</Label>
                <Input id="cpf-pop" placeholder="000.000.000-00" />
              </div>
              <Button size="sm" className="w-full">Consultar</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <CodeBlock code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Consultar CPF</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <Label>CPF</Label>
      <Input placeholder="000.000.000-00" />
      <Button>Consultar</Button>
    </div>
  </PopoverContent>
</Popover>`} />

      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Especificações</h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-para-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Prop (PopoverContent)</th>
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
