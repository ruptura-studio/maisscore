import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function SheetPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">Sheet</h1>
        <p className="text-lg text-neutral-400 mb-8">
          Painel deslizante lateral (drawer). Variante do Dialog que entra pela borda da tela. Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/sheet.tsx</code>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Posições</h2>
        <p className="text-sm text-neutral-400 mb-4">Sheet pode abrir por qualquer lado da tela.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-wrap items-center justify-center gap-4 bg-neutral-50 mb-4">
        {(['right', 'left', 'top', 'bottom'] as const).map((side) => (
          <Sheet key={side}>
            <SheetTrigger asChild>
              <Button variant="outline" className="capitalize">{side}</Button>
            </SheetTrigger>
            <SheetContent side={side}>
              <SheetHeader>
                <SheetTitle>Solicitar regularização</SheetTitle>
                <SheetDescription>Preencha seus dados para iniciar o processo.</SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Nome completo</Label>
                  <Input placeholder="João da Silva" />
                </div>
                <div className="grid gap-2">
                  <Label>WhatsApp</Label>
                  <Input placeholder="(11) 99999-9999" />
                </div>
              </div>
              <SheetFooter>
                <Button className="w-full">Enviar solicitação</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ))}
      </div>
      <CodeBlock code={`<Sheet>
  <SheetTrigger asChild>
    <Button>Abrir</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Solicitar regularização</SheetTitle>
    </SheetHeader>
    {/* conteúdo */}
    <SheetFooter>
      <Button>Enviar</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`} />

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
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">Sheet</td><td className="px-4 py-3 text-neutral-500">Raiz</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">SheetTrigger</td><td className="px-4 py-3 text-neutral-500">Elemento que abre</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">SheetContent</td><td className="px-4 py-3 text-neutral-500">Painel (side: right | left | top | bottom)</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">SheetHeader</td><td className="px-4 py-3 text-neutral-500">Área do título</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">SheetTitle</td><td className="px-4 py-3 text-neutral-500">Título</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">SheetFooter</td><td className="px-4 py-3 text-neutral-500">Ações</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
