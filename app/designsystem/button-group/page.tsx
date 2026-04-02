import { ButtonGroup } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function ButtonGroupPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">
          Button Group
        </h1>
        <p className="text-lg text-neutral-400 mb-8">
          Agrupa botões horizontal ou verticalmente com espaçamento ou borda compartilhada.
          Componente customizado definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">
            components/ui/button-group.tsx
          </code>
          .
        </p>
      </div>

      {/* Spaced horizontal */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Spaced — Horizontal (padrão)
        </h2>
        <p className="text-sm text-neutral-400 mb-4">
          Botões com espaçamento entre eles. Ideal para CTAs principais lado a lado.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex items-center justify-center bg-neutral-50 mb-4">
        <ButtonGroup>
          <button className="btn-primary">Quero regularizar</button>
          <button className="btn-secondary">Saiba mais</button>
        </ButtonGroup>
      </div>
      <CodeBlock code={`<ButtonGroup>
  <button className="btn-primary">Quero regularizar</button>
  <button className="btn-secondary">Saiba mais</button>
</ButtonGroup>`} />

      {/* Spaced vertical */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Spaced — Vertical
        </h2>
        <p className="text-sm text-neutral-400 mb-4">
          Orientação vertical, útil em layouts mobile ou em banners estreitos.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex items-center justify-center bg-neutral-50 mb-4">
        <ButtonGroup orientation="vertical">
          <button className="btn-primary">Regularizar meu CPF</button>
          <button className="btn-secondary">Ver depoimentos</button>
        </ButtonGroup>
      </div>
      <CodeBlock code={`<ButtonGroup orientation="vertical">
  <button className="btn-primary">Regularizar meu CPF</button>
  <button className="btn-secondary">Ver depoimentos</button>
</ButtonGroup>`} />

      {/* Connected horizontal */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Connected — Horizontal
        </h2>
        <p className="text-sm text-neutral-400 mb-4">
          Botões unidos sem gap, compartilhando a borda. Ideal para seletores de opções ou filtros.
          Use com a variante <code className="font-mono bg-neutral-50 px-1 rounded">Button</code> do shadcn.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex items-center justify-center bg-neutral-50 mb-4">
        <ButtonGroup variant="connected">
          <Button variant="outline">Mensal</Button>
          <Button variant="outline">Trimestral</Button>
          <Button variant="default">Anual</Button>
        </ButtonGroup>
      </div>
      <CodeBlock code={`<ButtonGroup variant="connected">
  <Button variant="outline">Mensal</Button>
  <Button variant="outline">Trimestral</Button>
  <Button variant="default">Anual</Button>
</ButtonGroup>`} />

      {/* Connected vertical */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Connected — Vertical
        </h2>
        <p className="text-sm text-neutral-400 mb-4">
          Versão vertical do grupo conectado. Útil para menus de ação ou listas de opções.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex items-center justify-center bg-neutral-50 mb-4">
        <ButtonGroup variant="connected" orientation="vertical" className="w-48">
          <Button variant="outline" className="w-full justify-start">Cartão de crédito</Button>
          <Button variant="outline" className="w-full justify-start">Financiamento</Button>
          <Button variant="default" className="w-full justify-start">Empréstimo</Button>
        </ButtonGroup>
      </div>
      <CodeBlock code={`<ButtonGroup variant="connected" orientation="vertical" className="w-48">
  <Button variant="outline" className="w-full justify-start">Cartão de crédito</Button>
  <Button variant="outline" className="w-full justify-start">Financiamento</Button>
  <Button variant="default" className="w-full justify-start">Empréstimo</Button>
</ButtonGroup>`} />

      {/* Specs */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Especificações
        </h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Prop</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Tipo</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Default</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-brand-border">
              <td className="px-4 py-3 font-mono text-brand-navy">orientation</td>
              <td className="px-4 py-3 text-neutral-500">"horizontal" | "vertical"</td>
              <td className="px-4 py-3 text-neutral-400">"horizontal"</td>
            </tr>
            <tr className="border-b border-brand-border">
              <td className="px-4 py-3 font-mono text-brand-navy">variant</td>
              <td className="px-4 py-3 text-neutral-500">"spaced" | "connected"</td>
              <td className="px-4 py-3 text-neutral-400">"spaced"</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-brand-navy">className</td>
              <td className="px-4 py-3 text-neutral-500">string</td>
              <td className="px-4 py-3 text-neutral-400">—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
