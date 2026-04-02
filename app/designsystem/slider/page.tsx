import { Slider } from '@/components/ui/slider'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function SliderPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">Slider</h1>
        <p className="text-lg text-neutral-400 mb-8">
          Controle deslizante para seleção de valores em um intervalo. Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">components/ui/slider.tsx</code>.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Valor de Dívida</h2>
        <p className="text-sm text-neutral-400 mb-4">Slider para estimar o valor total de dívidas.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-col gap-6 bg-neutral-50 mb-4">
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <div className="flex justify-between text-sm text-brand-navy">
            <span>Valor da dívida</span>
            <span className="font-medium">R$ 5.000</span>
          </div>
          <Slider defaultValue={[50]} max={100} step={1} />
          <div className="flex justify-between text-xs text-neutral-400">
            <span>R$ 1.000</span>
            <span>R$ 50.000+</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-sm">
          <div className="flex justify-between text-sm text-brand-navy">
            <span>Score atual</span>
            <span className="font-medium">350 pts</span>
          </div>
          <Slider defaultValue={[35]} max={100} step={5} />
          <div className="flex justify-between text-xs text-neutral-400">
            <span>0</span>
            <span>1000</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-sm">
          <p className="text-sm text-brand-navy">Disabled</p>
          <Slider defaultValue={[60]} max={100} disabled />
        </div>
      </div>
      <CodeBlock code={`<Slider defaultValue={[50]} max={100} step={1} />

// Com range (dois handles)
<Slider defaultValue={[20, 80]} max={100} step={5} />`} />

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
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">defaultValue</td><td className="px-4 py-3 text-neutral-500">number[]</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">value</td><td className="px-4 py-3 text-neutral-500">number[]</td><td className="px-4 py-3 text-neutral-400">—</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">min</td><td className="px-4 py-3 text-neutral-500">number</td><td className="px-4 py-3 text-neutral-400">0</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">max</td><td className="px-4 py-3 text-neutral-500">number</td><td className="px-4 py-3 text-neutral-400">100</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">step</td><td className="px-4 py-3 text-neutral-500">number</td><td className="px-4 py-3 text-neutral-400">1</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">disabled</td><td className="px-4 py-3 text-neutral-500">boolean</td><td className="px-4 py-3 text-neutral-400">false</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
