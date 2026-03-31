'use client'

import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function SonnerPage() {
  return (
    <div>
      <Toaster />
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">Sonner (Toast)</h1>
        <p className="text-p-lg text-neutral-400 mb-8">
          Notificações toast via biblioteca Sonner. Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/sonner.tsx</code>.
          Requer <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">&lt;Toaster /&gt;</code> no layout.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Tipos de Toast</h2>
        <p className="text-p-sm text-neutral-400 mb-4">Clique nos botões para visualizar cada tipo.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-wrap items-center gap-3 bg-neutral-50 mb-4">
        <Button variant="outline" onClick={() => toast('Solicitação enviada com sucesso!')}>
          Default
        </Button>
        <Button variant="outline" onClick={() => toast.success('CPF regularizado! Score atualizado.')}>
          Success
        </Button>
        <Button variant="outline" onClick={() => toast.error('Erro ao processar. Tente novamente.')}>
          Error
        </Button>
        <Button variant="outline" onClick={() => toast.warning('Atenção: prazo expirando em 2 dias.')}>
          Warning
        </Button>
        <Button variant="outline" onClick={() => toast.info('Seu caso foi atribuído a um especialista.')}>
          Info
        </Button>
        <Button variant="outline" onClick={() => toast.loading('Consultando base Serasa...')}>
          Loading
        </Button>
      </div>
      <CodeBlock code={`import { toast } from 'sonner'

toast('Solicitação enviada!')
toast.success('CPF regularizado!')
toast.error('Erro ao processar.')
toast.warning('Prazo expirando.')
toast.info('Caso atribuído.')
toast.loading('Consultando Serasa...')`} />

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Setup</h2>
        <p className="text-p-sm text-neutral-400 mb-4">Adicionar o Toaster uma vez no layout raiz.</p>
      </div>
      <CodeBlock code={`// app/layout.tsx
import { Toaster } from '@/components/ui/sonner'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}`} />

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Especificações</h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-p-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Método</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">toast(msg)</td><td className="px-4 py-3 text-neutral-500">Toast padrão</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">toast.success(msg)</td><td className="px-4 py-3 text-neutral-500">Sucesso (verde)</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">toast.error(msg)</td><td className="px-4 py-3 text-neutral-500">Erro (vermelho)</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">toast.warning(msg)</td><td className="px-4 py-3 text-neutral-500">Alerta (amarelo)</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">toast.info(msg)</td><td className="px-4 py-3 text-neutral-500">Informação</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">toast.loading(msg)</td><td className="px-4 py-3 text-neutral-500">Carregando com spinner</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
