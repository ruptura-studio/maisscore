'use client'

import { useState } from 'react'
import { Combobox } from '@/components/ui/combobox'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

const estadosBrasil = [
  { value: 'sp', label: 'São Paulo' },
  { value: 'rj', label: 'Rio de Janeiro' },
  { value: 'mg', label: 'Minas Gerais' },
  { value: 'ba', label: 'Bahia' },
  { value: 'rs', label: 'Rio Grande do Sul' },
  { value: 'pr', label: 'Paraná' },
  { value: 'pe', label: 'Pernambuco' },
  { value: 'ce', label: 'Ceará' },
]

const origens = [
  { value: 'google', label: 'Google' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'indicacao', label: 'Indicação de amigo' },
  { value: 'tv', label: 'TV' },
  { value: 'outro', label: 'Outro' },
]

function EstadoDemo() {
  const [value, setValue] = useState('')
  return <Combobox options={estadosBrasil} value={value} onValueChange={setValue} placeholder="Selecionar estado..." searchPlaceholder="Buscar estado..." />
}

function OrigemDemo() {
  const [value, setValue] = useState('')
  return <Combobox options={origens} value={value} onValueChange={setValue} placeholder="Como nos conheceu?" searchPlaceholder="Buscar..." />
}

export default function ComboboxPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">Combobox</h1>
        <p className="text-lg text-neutral-400 mb-8">
          Campo de seleção com busca. Combina{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">Command</code> +{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">Popover</code>.
          Componente customizado em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/combobox.tsx</code>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Seleção de Estado</h2>
        <p className="text-sm text-neutral-400 mb-4">Busca filtrando entre estados brasileiros.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-wrap items-center gap-4 bg-neutral-50 mb-4">
        <EstadoDemo />
      </div>
      <CodeBlock code={`const estados = [
  { value: 'sp', label: 'São Paulo' },
  { value: 'rj', label: 'Rio de Janeiro' },
  // ...
]

const [value, setValue] = useState('')

<Combobox
  options={estados}
  value={value}
  onValueChange={setValue}
  placeholder="Selecionar estado..."
/>`} />

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Como nos conheceu?</h2>
        <p className="text-sm text-neutral-400 mb-4">Exemplo de uso em formulário de lead.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-wrap items-center gap-4 bg-neutral-50 mb-4">
        <OrigemDemo />
      </div>
      <CodeBlock code={`<Combobox
  options={origens}
  value={value}
  onValueChange={setValue}
  placeholder="Como nos conheceu?"
/>`} />

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Especificações</h2>
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
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">options</td><td className="px-4 py-3 text-neutral-500">ComboboxOption[]</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">value</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">onValueChange</td><td className="px-4 py-3 text-neutral-500">(value: string) =&gt; void</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">placeholder</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">"Selecionar..."</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">searchPlaceholder</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">"Buscar..."</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">emptyMessage</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">"Nenhum resultado."</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
