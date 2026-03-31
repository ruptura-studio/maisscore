import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function AlertPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">
          Alert
        </h1>
        <p className="text-p-lg text-neutral-400 mb-8">
          Mensagens de feedback contextual. Suporta ícone, título e descrição.
          Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">
            components/ui/alert.tsx
          </code>
          .
        </p>
      </div>

      {/* Variantes */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Variantes
        </h2>
        <p className="text-p-sm text-neutral-400 mb-4">
          Duas variantes nativas:{' '}
          <code className="font-mono bg-neutral-50 px-1 rounded">default</code> e{' '}
          <code className="font-mono bg-neutral-50 px-1 rounded">destructive</code>.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-col gap-4 bg-neutral-50 mb-4">
        <Alert>
          <AlertTitle>CPF em análise</AlertTitle>
          <AlertDescription>
            Seu processo foi iniciado. Acompanhe o andamento em até 30 dias úteis.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertTitle>Restrição encontrada</AlertTitle>
          <AlertDescription>
            Identificamos pendências no Serasa. Entre em contato para iniciar a regularização.
          </AlertDescription>
        </Alert>
      </div>
      <CodeBlock
        code={`import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

<Alert>
  <AlertTitle>CPF em análise</AlertTitle>
  <AlertDescription>
    Seu processo foi iniciado. Acompanhe em até 30 dias úteis.
  </AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTitle>Restrição encontrada</AlertTitle>
  <AlertDescription>
    Identificamos pendências no Serasa.
  </AlertDescription>
</Alert>`}
      />

      {/* Com ícones */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Com ícones
        </h2>
        <p className="text-p-sm text-neutral-400 mb-4">
          Adicione um ícone Lucide como primeiro filho — o componente posiciona automaticamente via seletor CSS{' '}
          <code className="font-mono bg-neutral-50 px-1 rounded">[&gt;svg]</code>.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-col gap-4 bg-neutral-50 mb-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Processo iniciado</AlertTitle>
          <AlertDescription>
            Nossa equipe jurídica já recebeu seu caso e iniciou a análise.
          </AlertDescription>
        </Alert>
        <Alert className="border-green-200 bg-green-50 text-green-800">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle>CPF regularizado!</AlertTitle>
          <AlertDescription className="text-green-700">
            Sua restrição foi removida com sucesso. Seu score já pode ser consultado.
          </AlertDescription>
        </Alert>
        <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertTitle>Pendência identificada</AlertTitle>
          <AlertDescription className="text-yellow-700">
            Encontramos uma dívida que precisa de atenção antes de prosseguir.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Erro no processamento</AlertTitle>
          <AlertDescription>
            Não foi possível concluir a análise. Tente novamente ou fale com nosso suporte.
          </AlertDescription>
        </Alert>
      </div>
      <CodeBlock
        code={`import { Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'

{/* Informativo */}
<Alert>
  <Info className="h-4 w-4" />
  <AlertTitle>Processo iniciado</AlertTitle>
  <AlertDescription>Nossa equipe já recebeu seu caso.</AlertDescription>
</Alert>

{/* Sucesso — classes manuais */}
<Alert className="border-green-200 bg-green-50 text-green-800">
  <CheckCircle className="h-4 w-4 text-green-600" />
  <AlertTitle>CPF regularizado!</AlertTitle>
  <AlertDescription className="text-green-700">
    Sua restrição foi removida com sucesso.
  </AlertDescription>
</Alert>

{/* Destrutivo */}
<Alert variant="destructive">
  <XCircle className="h-4 w-4" />
  <AlertTitle>Erro no processamento</AlertTitle>
  <AlertDescription>Tente novamente ou fale com o suporte.</AlertDescription>
</Alert>`}
      />

      {/* Specs */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Especificações
        </h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-p-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Prop</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Tipo</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Default</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['variant', '"default" | "destructive"', '"default"'],
              ['className', 'string', '—'],
            ].map(([prop, type, def], i) => (
              <tr key={prop} className={`border-b border-brand-border last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}>
                <td className="px-4 py-3 font-mono text-brand-orange">{prop}</td>
                <td className="px-4 py-3 font-mono text-neutral-400">{type}</td>
                <td className="px-4 py-3 font-mono text-brand-navy">{def}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
