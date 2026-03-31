import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function TabsPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">Tabs</h1>
        <p className="text-p-lg text-neutral-400 mb-8">
          Navegação em abas para exibir conteúdo alternado. Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/tabs.tsx</code>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Serviços</h2>
        <p className="text-p-sm text-neutral-400 mb-4">Tabs para categorias de serviço da Mais Score.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex items-center justify-center bg-neutral-50 mb-4">
        <Tabs defaultValue="serasa" className="w-full max-w-lg">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="serasa">Serasa</TabsTrigger>
            <TabsTrigger value="spc">SPC Brasil</TabsTrigger>
            <TabsTrigger value="boa-vista">Boa Vista</TabsTrigger>
          </TabsList>
          <TabsContent value="serasa">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">Regularização Serasa <Badge>Mais popular</Badge></CardTitle>
                <CardDescription>Remoção de restrições no Serasa Experian.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Processo jurídico especializado para limpar restrições no Serasa em até 30 dias úteis.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="spc">
            <Card>
              <CardHeader>
                <CardTitle>Regularização SPC Brasil</CardTitle>
                <CardDescription>Remoção de restrições no SPC.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Negociação direta com credores e regularização junto ao SPC Brasil.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="boa-vista">
            <Card>
              <CardHeader>
                <CardTitle>Regularização Boa Vista</CardTitle>
                <CardDescription>Remoção de restrições no SCPC.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Processo completo de regularização junto ao Boa Vista SCPC.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <CodeBlock code={`<Tabs defaultValue="serasa">
  <TabsList>
    <TabsTrigger value="serasa">Serasa</TabsTrigger>
    <TabsTrigger value="spc">SPC Brasil</TabsTrigger>
  </TabsList>
  <TabsContent value="serasa">
    Conteúdo da aba Serasa
  </TabsContent>
  <TabsContent value="spc">
    Conteúdo da aba SPC
  </TabsContent>
</Tabs>`} />

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Sub-componentes</h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-p-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Componente</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">Tabs</td><td className="px-4 py-3 text-neutral-500">Raiz com defaultValue ou value</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">TabsList</td><td className="px-4 py-3 text-neutral-500">Container das abas</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">TabsTrigger</td><td className="px-4 py-3 text-neutral-500">Botão de cada aba (value obrigatório)</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">TabsContent</td><td className="px-4 py-3 text-neutral-500">Conteúdo visível quando aba está ativa</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
