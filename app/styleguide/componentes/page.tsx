import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function ComponentesPage() {
  return (
    <div>
      <h1 className="text-heading-2 font-dm font-normal text-brand-navy mb-2">
        Cards & Badges
      </h1>
      <p className="text-para-md text-neutral-400 mb-8">
        Componentes shadcn/ui disponíveis em{' '}
        <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">
          components/ui/
        </code>
        .
      </p>

      {/* Button variants */}
      <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
        Button — variantes
      </h2>
      <p className="text-para-sm text-neutral-400 mb-4">
        Componente{' '}
        <code className="font-mono bg-neutral-50 px-1 rounded">&lt;Button&gt;</code>{' '}
        do shadcn/ui com suporte a variantes via CVA.
      </p>
      <div className="border border-brand-border rounded-lg p-8 flex flex-wrap items-center gap-4 bg-neutral-50 mb-4">
        <Button variant="default">Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
      <CodeBlock
        code={`import { Button } from '@/components/ui/button'

<Button variant="default">Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`}
      />

      {/* Button sizes */}
      <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
        Button — tamanhos
      </h2>
      <div className="border border-brand-border rounded-lg p-8 flex flex-wrap items-center gap-4 bg-neutral-50 mb-4">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="icon button">
          +
        </Button>
      </div>
      <CodeBlock
        code={`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">+</Button>`}
      />

      {/* Badge variants */}
      <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
        Badge — variantes
      </h2>
      <p className="text-para-sm text-neutral-400 mb-4">
        Componente{' '}
        <code className="font-mono bg-neutral-50 px-1 rounded">&lt;Badge&gt;</code>{' '}
        para etiquetas e status.
      </p>
      <div className="border border-brand-border rounded-lg p-8 flex flex-wrap items-center gap-4 bg-neutral-50 mb-4">
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
      <CodeBlock
        code={`import { Badge } from '@/components/ui/badge'

<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`}
      />

      {/* Card */}
      <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
        Card
      </h2>
      <p className="text-para-sm text-neutral-400 mb-4">
        Componente{' '}
        <code className="font-mono bg-neutral-50 px-1 rounded">&lt;Card&gt;</code>{' '}
        com sub-componentes Header, Title, Description, Content e Footer.
      </p>
      <div className="border border-brand-border rounded-lg p-8 flex justify-center bg-neutral-50 mb-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Regularize seu CPF</CardTitle>
            <CardDescription>
              Processo jurídico próprio com 97% de taxa de sucesso.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-para-sm text-neutral-400">
              Já atendemos mais de 1.142 famílias em todo o Brasil.
              Resultados em até 30 dias úteis.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Começar agora</Button>
          </CardFooter>
        </Card>
      </div>
      <CodeBlock
        code={`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Regularize seu CPF</CardTitle>
    <CardDescription>
      Processo jurídico próprio com 97% de taxa de sucesso.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>Já atendemos mais de 1.142 famílias...</p>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Começar agora</Button>
  </CardFooter>
</Card>`}
      />
    </div>
  )
}
