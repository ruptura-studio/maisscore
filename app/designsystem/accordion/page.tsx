import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function AccordionPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">
          Accordion
        </h1>
        <p className="text-lg text-neutral-400 mb-8">
          Seções expansíveis verticalmente. Ideal para FAQs e conteúdo progressivo.
          Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">
            components/ui/accordion.tsx
          </code>
          .
        </p>
      </div>

      {/* Single */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          type=&quot;single&quot;
        </h2>
        <p className="text-sm text-neutral-400 mb-4">
          Apenas um item aberto por vez. Com{' '}
          <code className="font-mono bg-neutral-50 px-1 rounded">collapsible</code>{' '}
          o item aberto pode ser fechado novamente.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 bg-neutral-50 mb-4">
        <Accordion type="single" collapsible className="w-full bg-white rounded-lg border border-brand-border divide-y divide-brand-border">
          <AccordionItem value="item-1" className="border-0">
            <AccordionTrigger className="px-5 py-4 text-brand-navy hover:no-underline hover:text-brand-orange">
              Como funciona o processo de regularização?
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4 text-neutral-400">
              Após a contratação, nossa equipe jurídica inicia o processo de remoção das restrições junto ao Serasa e SPC. O prazo médio é de até 30 dias úteis.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-0">
            <AccordionTrigger className="px-5 py-4 text-brand-navy hover:no-underline hover:text-brand-orange">
              Qual a taxa de sucesso do serviço?
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4 text-neutral-400">
              Nosso índice de sucesso é de 97% — já atendemos mais de 1.142 famílias em todo o Brasil.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-0">
            <AccordionTrigger className="px-5 py-4 text-brand-navy hover:no-underline hover:text-brand-orange">
              Quais restrições vocês removem?
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4 text-neutral-400">
              Atuamos na remoção de dívidas no Serasa, SPC e demais bureaus de crédito, utilizando processo jurídico próprio.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <CodeBlock
        code={`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Como funciona?</AccordionTrigger>
    <AccordionContent>
      Descrição do processo...
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
      />

      {/* Multiple */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          type=&quot;multiple&quot;
        </h2>
        <p className="text-sm text-neutral-400 mb-4">
          Vários itens podem ficar abertos simultaneamente.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 bg-neutral-50 mb-4">
        <Accordion type="multiple" className="w-full bg-white rounded-lg border border-brand-border divide-y divide-brand-border">
          <AccordionItem value="item-1" className="border-0">
            <AccordionTrigger className="px-5 py-4 text-brand-navy hover:no-underline hover:text-brand-orange">
              Serasa
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4 text-neutral-400">
              Removemos restrições de protestos, cheques sem fundo e dívidas ativas no Serasa.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-0">
            <AccordionTrigger className="px-5 py-4 text-brand-navy hover:no-underline hover:text-brand-orange">
              SPC Brasil
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4 text-neutral-400">
              Atuamos junto ao SPC para remoção de negativações de comércio e serviços.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-0">
            <AccordionTrigger className="px-5 py-4 text-brand-navy hover:no-underline hover:text-brand-orange">
              Boa Vista (SCPC)
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4 text-neutral-400">
              Também cobrimos restrições no bureau Boa Vista, antigo SCPC.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <CodeBlock
        code={`<Accordion type="multiple">
  <AccordionItem value="item-1">
    <AccordionTrigger>Serasa</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>SPC Brasil</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
</Accordion>`}
      />

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
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Descrição</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['type', '"single" | "multiple"', 'Controla quantos itens ficam abertos'],
              ['collapsible', 'boolean', 'Permite fechar o item aberto (só em single)'],
              ['defaultValue', 'string | string[]', 'Item(ns) aberto(s) por padrão'],
              ['value', 'string | string[]', 'Controle externo do estado'],
            ].map(([prop, type, desc], i) => (
              <tr key={prop} className={`border-b border-brand-border last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}>
                <td className="px-4 py-3 font-mono text-brand-orange">{prop}</td>
                <td className="px-4 py-3 font-mono text-neutral-400 text-[13px]">{type}</td>
                <td className="px-4 py-3 text-neutral-400">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
