'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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

export default function DialogPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">Dialog</h1>
        <p className="text-lg text-neutral-400 mb-8">
          Modal para conteúdo secundário, confirmações e formulários. Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/dialog.tsx</code>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Dialog Simples</h2>
        <p className="text-sm text-neutral-400 mb-4">Modal de confirmação com título, descrição e ações.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex items-center justify-center bg-neutral-50 mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Abrir dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar regularização</DialogTitle>
              <DialogDescription>
                Ao confirmar, nossa equipe iniciará o processo de regularização do seu CPF junto ao Serasa e SPC.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline">Cancelar</Button>
              <Button>Confirmar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <CodeBlock code={`<Dialog>
  <DialogTrigger asChild>
    <Button>Abrir dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirmar regularização</DialogTitle>
      <DialogDescription>
        Nossa equipe iniciará o processo de regularização do seu CPF.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancelar</Button>
      <Button>Confirmar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`} />

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Dialog com Formulário</h2>
        <p className="text-sm text-neutral-400 mb-4">Modal contendo campos de formulário.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex items-center justify-center bg-neutral-50 mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Cadastrar lead</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Quero regularizar meu CPF</DialogTitle>
              <DialogDescription>Preencha seus dados para entrarmos em contato.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome completo</Label>
                <Input id="nome" placeholder="João da Silva" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefone">WhatsApp</Label>
                <Input id="telefone" placeholder="(11) 99999-9999" />
              </div>
            </div>
            <DialogFooter>
              <Button className="w-full">Quero ser contactado</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <CodeBlock code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Cadastrar lead</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Quero regularizar meu CPF</DialogTitle>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <Label htmlFor="nome">Nome completo</Label>
      <Input id="nome" placeholder="João da Silva" />
    </div>
    <DialogFooter>
      <Button>Quero ser contactado</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`} />

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
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">Dialog</td><td className="px-4 py-3 text-neutral-500">Raiz do componente (estado open/close)</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">DialogTrigger</td><td className="px-4 py-3 text-neutral-500">Elemento que abre o modal</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">DialogContent</td><td className="px-4 py-3 text-neutral-500">Container do modal com overlay</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">DialogHeader</td><td className="px-4 py-3 text-neutral-500">Área do título e descrição</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">DialogTitle</td><td className="px-4 py-3 text-neutral-500">Título do modal</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">DialogDescription</td><td className="px-4 py-3 text-neutral-500">Texto descritivo</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">DialogFooter</td><td className="px-4 py-3 text-neutral-500">Área de ações</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
