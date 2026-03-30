import { Badge } from '@/components/ui/badge'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function BadgePage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-heading-2 font-dm font-normal text-brand-navy mb-2">
          Badge
        </h1>
        <p className="text-para-md text-neutral-400 mb-8">
          Rótulo compacto para exibir status, categorias ou contagens. Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">
            components/ui/badge.tsx
          </code>
          .
        </p>
      </div>

      {/* Default */}
      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Default
        </h2>
        <p className="text-para-sm text-neutral-400 mb-4">
          Variante padrão com cor primária do projeto.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-wrap items-center gap-4 bg-neutral-50 mb-4">
        <Badge>Aprovado</Badge>
        <Badge>Score Alto</Badge>
        <Badge>Novo</Badge>
      </div>
      <CodeBlock code={`<Badge>Aprovado</Badge>`} />

      {/* Secondary */}
      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Secondary
        </h2>
        <p className="text-para-sm text-neutral-400 mb-4">
          Variante secundária para informações de menor destaque.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-wrap items-center gap-4 bg-neutral-50 mb-4">
        <Badge variant="secondary">Em análise</Badge>
        <Badge variant="secondary">Pendente</Badge>
        <Badge variant="secondary">Serasa</Badge>
      </div>
      <CodeBlock code={`<Badge variant="secondary">Em análise</Badge>`} />

      {/* Destructive */}
      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Destructive
        </h2>
        <p className="text-para-sm text-neutral-400 mb-4">
          Variante de alerta para situações críticas ou negativas.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-wrap items-center gap-4 bg-neutral-50 mb-4">
        <Badge variant="destructive">CPF Restrito</Badge>
        <Badge variant="destructive">Inadimplente</Badge>
        <Badge variant="destructive">Score Baixo</Badge>
      </div>
      <CodeBlock code={`<Badge variant="destructive">CPF Restrito</Badge>`} />

      {/* Outline */}
      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Outline
        </h2>
        <p className="text-para-sm text-neutral-400 mb-4">
          Variante com apenas borda, sem fundo colorido.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-wrap items-center gap-4 bg-neutral-50 mb-4">
        <Badge variant="outline">Gratuito</Badge>
        <Badge variant="outline">Sem juros</Badge>
        <Badge variant="outline">30 dias úteis</Badge>
      </div>
      <CodeBlock code={`<Badge variant="outline">Gratuito</Badge>`} />

      {/* Specs */}
      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Especificações
        </h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-para-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Prop</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Tipo</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Default</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-brand-border">
              <td className="px-4 py-3 font-mono text-brand-navy">variant</td>
              <td className="px-4 py-3 text-neutral-500">"default" | "secondary" | "destructive" | "outline"</td>
              <td className="px-4 py-3 text-neutral-400">"default"</td>
            </tr>
            <tr className="border-b border-brand-border">
              <td className="px-4 py-3 font-mono text-brand-navy">className</td>
              <td className="px-4 py-3 text-neutral-500">string</td>
              <td className="px-4 py-3 text-neutral-400">—</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-brand-navy">children</td>
              <td className="px-4 py-3 text-neutral-500">ReactNode</td>
              <td className="px-4 py-3 text-neutral-400">—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
