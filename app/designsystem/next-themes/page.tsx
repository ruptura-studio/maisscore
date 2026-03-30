'use client'

import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Monitor } from 'lucide-react'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="preview-full bg-[#0f172a] text-[#e2e8f0] font-mono text-sm px-4 py-3 rounded-lg overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

function ThemeDemo() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="flex gap-2">
      <Button variant={theme === 'light' ? 'default' : 'outline'} size="sm" onClick={() => setTheme('light')}>
        <Sun className="h-4 w-4 mr-1" /> Light
      </Button>
      <Button variant={theme === 'dark' ? 'default' : 'outline'} size="sm" onClick={() => setTheme('dark')}>
        <Moon className="h-4 w-4 mr-1" /> Dark
      </Button>
      <Button variant={theme === 'system' ? 'default' : 'outline'} size="sm" onClick={() => setTheme('system')}>
        <Monitor className="h-4 w-4 mr-1" /> System
      </Button>
    </div>
  )
}

export default function NextThemesPage() {
  return (
    <div>
      <div className="sg-prose">
        <h1 className="text-heading-2 font-dm font-normal text-brand-navy mb-2">next-themes</h1>
        <p className="text-para-md text-neutral-400 mb-8">
          Biblioteca para gerenciar temas (claro/escuro/sistema) em Next.js.
          Instalado via{' '}
          <code className="font-mono text-brand-navy bg-neutral-50 px-1 rounded">npm install next-themes</code>.
          Não é um componente shadcn.
        </p>
      </div>

      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Toggle de Tema</h2>
        <p className="text-para-sm text-neutral-400 mb-4">Tema ativo: use <code className="font-mono bg-neutral-50 px-1 rounded">useTheme()</code> para ler e alterar.</p>
      </div>
      <div className="preview-full border border-brand-border rounded-lg p-8 flex items-center justify-center bg-neutral-50 mb-4">
        <ThemeDemo />
      </div>
      <CodeBlock code={`'use client'
import { useTheme } from 'next-themes'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Alternar tema
    </button>
  )
}`} />

      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">Setup</h2>
        <p className="text-para-sm text-neutral-400 mb-4">Envolver o app com <code className="font-mono bg-neutral-50 px-1 rounded">ThemeProvider</code>.</p>
      </div>
      <CodeBlock code={`// app/layout.tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}`} />

      <div className="sg-prose">
        <h2 className="text-heading-4 font-medium text-brand-navy mb-4 mt-10 pb-2 border-b border-brand-border">API — useTheme()</h2>
      </div>
      <div className="border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-para-sm">
          <thead className="bg-neutral-50 border-b border-brand-border">
            <tr>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Retorno</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Tipo</th>
              <th className="text-left px-4 py-3 text-brand-navy font-medium">Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">theme</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">Tema atual ("light" | "dark" | "system")</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">setTheme</td><td className="px-4 py-3 text-neutral-500">(theme: string) =&gt; void</td><td className="px-4 py-3 text-neutral-400">Altera o tema</td></tr>
            <tr className="border-b border-brand-border"><td className="px-4 py-3 font-mono text-brand-navy">resolvedTheme</td><td className="px-4 py-3 text-neutral-500">string</td><td className="px-4 py-3 text-neutral-400">Tema resolvido (sem "system")</td></tr>
            <tr><td className="px-4 py-3 font-mono text-brand-navy">themes</td><td className="px-4 py-3 text-neutral-500">string[]</td><td className="px-4 py-3 text-neutral-400">Lista de temas disponíveis</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
