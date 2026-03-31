import Image from 'next/image'
import { icons, type IconName } from '@/components/ui/icon'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

const iconGroups: { title: string; description: string; names: IconName[] }[] = [
  {
    title: 'Marca',
    description: 'Símbolo e identidade visual da Mais Score.',
    names: ['symbol'],
  },
  {
    title: 'Navegação',
    description: 'Ícones de direcionamento e movimento.',
    names: ['arrow-right', 'arrow-up', 'chevron-right'],
  },
  {
    title: 'Status',
    description: 'Ícones de feedback e confirmação.',
    names: ['check-circle', 'check-circle-orange'],
  },
  {
    title: 'Contato',
    description: 'Canais de comunicação e localização.',
    names: ['email', 'location', 'whatsapp'],
  },
  {
    title: 'Negócio',
    description: 'Ícones usados nas seções de produto e benefícios.',
    names: ['banco', 'calendar', 'card-slash', 'carro', 'casa', 'justice', 'negativados'],
  },
  {
    title: 'UI',
    description: 'Ícones de suporte a elementos de interface.',
    names: ['aspas', 'ast', 'dialogo', 'visibilidade'],
  },
]

function IconCard({ name }: { name: IconName }) {
  return (
    <div className="border border-brand-border rounded-lg p-4 flex flex-col items-center gap-3 bg-white hover:border-brand-orange/40 transition-colors">
      <div className="w-12 h-12 flex items-center justify-center bg-neutral-50 rounded-md">
        <Image
          src={icons[name]}
          alt={name}
          width={28}
          height={28}
          className="object-contain"
        />
      </div>
      <p className="text-[11px] font-mono text-neutral-400 text-center leading-tight break-all">
        {name}
      </p>
    </div>
  )
}

export default function IconesPage() {
  const allNames = Object.keys(icons) as IconName[]

  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-h2 font-dm font-normal text-brand-navy mb-2">
          Ícones
        </h1>
        <p className="text-p-lg text-neutral-400 mb-8">
          Biblioteca de ícones do projeto. Todos os arquivos ficam em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">
            public/icons/
          </code>{' '}
          e são acessados via o componente{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">
            {'<Icon>'}
          </code>{' '}
          definido em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">
            components/ui/icon.tsx
          </code>
          .
        </p>
      </div>

      {/* Como usar */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Como usar
        </h2>
        <p className="text-p-sm text-neutral-400 mb-4">
          Importe o componente e passe o nome do ícone via prop <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">name</code>. O tipo <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">IconName</code> garante autocompletar com os nomes válidos.
        </p>
      </div>
      <CodeBlock
        code={`import { Icon } from '@/components/ui/icon'

// Uso básico
<Icon name="arrow-right" />

// Com tamanho customizado
<Icon name="check-circle" size={32} />

// Com classe utilitária
<Icon name="whatsapp" size={20} className="opacity-80" />`}
      />

      {/* Grupos de ícones */}
      {iconGroups.map((group) => (
        <div key={group.title}>
          <div className="sg-prose">
            <h2 className="text-subtitle font-medium text-brand-navy mb-1 mt-10 pb-2 border-b border-brand-border">
              {group.title}
            </h2>
            <p className="text-p-sm text-neutral-400 mb-4">{group.description}</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {group.names.map((name) => (
              <IconCard key={name} name={name} />
            ))}
          </div>
        </div>
      ))}

      {/* Tabela de tokens */}
      <div className="sg-prose">
        <h2 className="text-subtitle font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">
          Referência completa
        </h2>
        <p className="text-p-sm text-neutral-400 mb-4">
          Todos os {allNames.length} tokens disponíveis e seus caminhos em{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">public/</code>.
        </p>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-p-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium w-10">Preview</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Token (name)</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Arquivo</th>
            </tr>
          </thead>
          <tbody>
            {allNames.map((name, index) => (
              <tr key={name} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                <td className="px-4 py-3">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <Image
                      src={icons[name]}
                      alt={name}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-brand-orange">{name}</td>
                <td className="px-4 py-3 font-mono text-neutral-400 text-[12px]">
                  {icons[name]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
