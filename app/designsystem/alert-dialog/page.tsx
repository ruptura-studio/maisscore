'use client'

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function AlertDialogPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">
          Alert Dialog
        </h1>
        <p className="text-lg text-neutral-400 mb-8">
          Modal de confirmação que bloqueia a interação até o usuário responder.
          Diferente do <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">Alert</code>,
          exige uma ação explícita — confirmar ou cancelar. Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">
            components/ui/alert-dialog.tsx
          </code>
          .
        </p>
      </div>

      {/* Uso básico */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Uso básico
        </h2>
        <p className="text-sm text-neutral-400 mb-4">
          Clique no botão para abrir o dialog. O fundo é bloqueado até a escolha do usuário.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex items-center justify-center bg-neutral-50 mb-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Cancelar contrato</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar cancelamento</AlertDialogTitle>
              <AlertDialogDescription>
                Ao cancelar, você perderá o acesso ao processo de regularização em andamento.
                Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Voltar</AlertDialogCancel>
              <AlertDialogAction>Confirmar cancelamento</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <CodeBlock
        code={`import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Cancelar contrato</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Confirmar cancelamento</AlertDialogTitle>
      <AlertDialogDescription>
        Ao cancelar, você perderá o acesso ao processo em andamento.
        Esta ação não pode ser desfeita.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Voltar</AlertDialogCancel>
      <AlertDialogAction>Confirmar cancelamento</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
      />

      {/* Ação destrutiva */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Ação destrutiva
        </h2>
        <p className="text-sm text-neutral-400 mb-4">
          Para ações irreversíveis, estilize o{' '}
          <code className="font-mono bg-neutral-50 px-1 rounded">AlertDialogAction</code>{' '}
          com variante destrutiva para reforçar o risco.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex items-center justify-center bg-neutral-50 mb-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Excluir cadastro</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir cadastro permanentemente?</AlertDialogTitle>
              <AlertDialogDescription>
                Todos os seus dados, histórico e documentos serão removidos de forma irreversível.
                Não será possível recuperar as informações após a exclusão.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Sim, excluir tudo
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <CodeBlock
        code={`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Excluir cadastro</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Excluir cadastro permanentemente?</AlertDialogTitle>
      <AlertDialogDescription>
        Todos os dados serão removidos de forma irreversível.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
        Sim, excluir tudo
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
      />

      {/* Specs */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Sub-componentes
        </h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Componente</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Função</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['AlertDialog', 'Raiz — controla estado aberto/fechado'],
              ['AlertDialogTrigger', 'Elemento que abre o dialog (use asChild para custom trigger)'],
              ['AlertDialogContent', 'Container do modal com overlay e animações'],
              ['AlertDialogHeader', 'Agrupa título e descrição'],
              ['AlertDialogFooter', 'Agrupa os botões de ação'],
              ['AlertDialogTitle', 'Título obrigatório (acessibilidade)'],
              ['AlertDialogDescription', 'Texto explicativo opcional'],
              ['AlertDialogAction', 'Botão de confirmação (estilo primary por padrão)'],
              ['AlertDialogCancel', 'Botão de cancelamento (estilo outline por padrão)'],
            ].map(([comp, desc], i) => (
              <tr key={comp} className={`border-b border-brand-border last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}>
                <td className="px-4 py-3 font-mono text-brand-orange text-[13px]">{comp}</td>
                <td className="px-4 py-3 text-neutral-400">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
