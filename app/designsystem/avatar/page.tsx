import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export default function AvatarPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">
          Avatar
        </h1>
        <p className="text-p-lg text-neutral-400 mb-8">
          Imagem de perfil circular com fallback automático para iniciais ou ícone.
          Usa Radix UI internamente para gerenciar o carregamento da imagem. Definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">
            components/ui/avatar.tsx
          </code>
          .
        </p>
      </div>

      {/* Com imagem */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Com imagem
        </h2>
        <p className="text-p-sm text-neutral-400 mb-4">
          Passe a URL no <code className="font-mono bg-neutral-50 px-1 rounded">AvatarImage</code>.
          O <code className="font-mono bg-neutral-50 px-1 rounded">AvatarFallback</code> é exibido
          enquanto a imagem carrega ou se falhar.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-wrap items-center gap-6 bg-neutral-50 mb-4">
        <Avatar>
          <AvatarImage src="/img/avatar-1.png" alt="Maria S." />
          <AvatarFallback>MS</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="/img/avatar-2.png" alt="João P." />
          <AvatarFallback>JP</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="/img/avatar-3.png" alt="Ana C." />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="/img/avatar-4.png" alt="Carlos M." />
          <AvatarFallback>CM</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="/img/avatar-5.png" alt="Fernanda L." />
          <AvatarFallback>FL</AvatarFallback>
        </Avatar>
      </div>
      <CodeBlock
        code={`import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

<Avatar>
  <AvatarImage src="/img/avatar-1.png" alt="Maria S." />
  <AvatarFallback>MS</AvatarFallback>
</Avatar>`}
      />

      {/* Fallback */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Fallback (sem imagem)
        </h2>
        <p className="text-p-sm text-neutral-400 mb-4">
          Quando não há imagem disponível, exibe as iniciais ou um ícone no lugar.
          Personalize cor de fundo com classes Tailwind no{' '}
          <code className="font-mono bg-neutral-50 px-1 rounded">AvatarFallback</code>.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-wrap items-center gap-6 bg-neutral-50 mb-4">
        <Avatar>
          <AvatarFallback>MS</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-brand-navy text-white">JP</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-brand-orange text-white">AC</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-green-100 text-green-700">CM</AvatarFallback>
        </Avatar>
      </div>
      <CodeBlock
        code={`{/* Fallback padrão */}
<Avatar>
  <AvatarFallback>MS</AvatarFallback>
</Avatar>

{/* Fallback com cor da marca */}
<Avatar>
  <AvatarFallback className="bg-brand-navy text-white">JP</AvatarFallback>
</Avatar>

<Avatar>
  <AvatarFallback className="bg-brand-orange text-white">AC</AvatarFallback>
</Avatar>`}
      />

      {/* Tamanhos */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Tamanhos
        </h2>
        <p className="text-p-sm text-neutral-400 mb-4">
          O tamanho padrão é <code className="font-mono bg-neutral-50 px-1 rounded">h-10 w-10</code> (40px).
          Sobrescreva com classes Tailwind no componente raiz.
        </p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex flex-wrap items-end gap-6 bg-neutral-50 mb-4">
        <Avatar className="h-6 w-6">
          <AvatarImage src="/img/avatar-1.png" alt="XS" />
          <AvatarFallback className="text-[10px]">XS</AvatarFallback>
        </Avatar>
        <Avatar className="h-8 w-8">
          <AvatarImage src="/img/avatar-2.png" alt="SM" />
          <AvatarFallback className="text-xs">SM</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="/img/avatar-3.png" alt="MD" />
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
        <Avatar className="h-14 w-14">
          <AvatarImage src="/img/avatar-4.png" alt="LG" />
          <AvatarFallback className="text-lg">LG</AvatarFallback>
        </Avatar>
        <Avatar className="h-20 w-20">
          <AvatarImage src="/img/avatar-5.png" alt="XL" />
          <AvatarFallback className="text-xl">XL</AvatarFallback>
        </Avatar>
      </div>
      <CodeBlock
        code={`<Avatar className="h-6 w-6">...</Avatar>   {/* 24px */}
<Avatar className="h-8 w-8">...</Avatar>   {/* 32px */}
<Avatar>...</Avatar>                        {/* 40px — padrão */}
<Avatar className="h-14 w-14">...</Avatar> {/* 56px */}
<Avatar className="h-20 w-20">...</Avatar> {/* 80px */}`}
      />

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
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Função</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Avatar', 'Raiz — círculo de 40×40px por padrão'],
              ['AvatarImage', 'Imagem — carrega de forma assíncrona e oculta o fallback ao carregar'],
              ['AvatarFallback', 'Exibido enquanto a imagem carrega ou em caso de erro'],
            ].map(([comp, desc], i) => (
              <tr key={comp} className={`border-b border-brand-border last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}>
                <td className="px-4 py-3 font-mono text-brand-orange">{comp}</td>
                <td className="px-4 py-3 text-neutral-400">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
