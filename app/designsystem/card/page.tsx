import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function CardPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">
          Card
        </h1>
        <p className="text-p-lg text-neutral-400 mb-8">
          Container com bordas arredondadas e sombra para agrupar conteúdo relacionado.
          Composto por sub-componentes:{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">CardHeader</code>,{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">CardTitle</code>,{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">CardDescription</code>,{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">CardContent</code> e{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">CardFooter</code>.
          Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">
            components/ui/card.tsx
          </code>
          .
        </p>
      </div>

      {/* Card simples */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Card Simples
        </h2>
        <p className="text-p-sm text-neutral-400 mb-4">
          Estrutura básica com cabeçalho, descrição e conteúdo.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-wrap items-start gap-6 bg-neutral-50 mb-4">
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Regularização de CPF</CardTitle>
            <CardDescription>Limpe seu nome em até 30 dias úteis</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Nossa equipe jurídica cuida de todo o processo para remover restrições do Serasa e SPC.
            </p>
          </CardContent>
        </Card>
      </div>
      <CodeBlock code={`<Card className="w-80">
  <CardHeader>
    <CardTitle>Regularização de CPF</CardTitle>
    <CardDescription>Limpe seu nome em até 30 dias úteis</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">
      Nossa equipe jurídica cuida de todo o processo.
    </p>
  </CardContent>
</Card>`} />

      {/* Card com footer */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Card com Footer
        </h2>
        <p className="text-p-sm text-neutral-400 mb-4">
          Adicione ações ou informações adicionais no rodapé do card.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-wrap items-start gap-6 bg-neutral-50 mb-4">
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Plano Completo</CardTitle>
            <CardDescription>Cobertura total da regularização</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Inclui análise jurídica, negociação com credores e acompanhamento até a limpeza do nome.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <span className="text-sm text-muted-foreground">97% de sucesso</span>
            <Button size="sm">Contratar</Button>
          </CardFooter>
        </Card>
      </div>
      <CodeBlock code={`<Card className="w-80">
  <CardHeader>
    <CardTitle>Plano Completo</CardTitle>
    <CardDescription>Cobertura total da regularização</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">...</p>
  </CardContent>
  <CardFooter className="flex justify-between">
    <span className="text-sm text-muted-foreground">97% de sucesso</span>
    <Button size="sm">Contratar</Button>
  </CardFooter>
</Card>`} />

      {/* Card com badge */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Card com Badge
        </h2>
        <p className="text-p-sm text-neutral-400 mb-4">
          Combina Card com Badge para exibir status ou categorias.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-wrap items-start gap-6 bg-neutral-50 mb-4">
        <Card className="w-80">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Score de Crédito</CardTitle>
              <Badge>Alto</Badge>
            </div>
            <CardDescription>Pontuação atual no Serasa</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-brand-navy">750</p>
            <p className="text-sm text-muted-foreground mt-1">+120 pontos este mês</p>
          </CardContent>
        </Card>
      </div>
      <CodeBlock code={`<Card className="w-80">
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>Score de Crédito</CardTitle>
      <Badge>Alto</Badge>
    </div>
    <CardDescription>Pontuação atual no Serasa</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-4xl font-bold text-brand-navy">750</p>
    <p className="text-sm text-muted-foreground mt-1">+120 pontos este mês</p>
  </CardContent>
</Card>`} />

      {/* Specs */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Sub-componentes
        </h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-p-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Componente</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Descrição</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Props</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-brand-border">
              <td className="px-4 py-3 font-mono text-brand-navy">Card</td>
              <td className="px-4 py-3 text-neutral-500">Container principal</td>
              <td className="px-4 py-3 text-neutral-400">className, HTMLDivElement attrs</td>
            </tr>
            <tr className="border-b border-brand-border">
              <td className="px-4 py-3 font-mono text-brand-navy">CardHeader</td>
              <td className="px-4 py-3 text-neutral-500">Área do cabeçalho (padding p-6)</td>
              <td className="px-4 py-3 text-neutral-400">className, HTMLDivElement attrs</td>
            </tr>
            <tr className="border-b border-brand-border">
              <td className="px-4 py-3 font-mono text-brand-navy">CardTitle</td>
              <td className="px-4 py-3 text-neutral-500">Título em 2xl semibold</td>
              <td className="px-4 py-3 text-neutral-400">className, HTMLDivElement attrs</td>
            </tr>
            <tr className="border-b border-brand-border">
              <td className="px-4 py-3 font-mono text-brand-navy">CardDescription</td>
              <td className="px-4 py-3 text-neutral-500">Texto secundário em muted</td>
              <td className="px-4 py-3 text-neutral-400">className, HTMLDivElement attrs</td>
            </tr>
            <tr className="border-b border-brand-border">
              <td className="px-4 py-3 font-mono text-brand-navy">CardContent</td>
              <td className="px-4 py-3 text-neutral-500">Conteúdo principal (p-6 pt-0)</td>
              <td className="px-4 py-3 text-neutral-400">className, HTMLDivElement attrs</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-brand-navy">CardFooter</td>
              <td className="px-4 py-3 text-neutral-500">Rodapé com flex layout</td>
              <td className="px-4 py-3 text-neutral-400">className, HTMLDivElement attrs</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
