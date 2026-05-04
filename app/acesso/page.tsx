import type { Metadata } from 'next'
import { ShieldAlert } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Acesso ao processo | Mais Score',
}

export default function AcessoPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
      <div className="w-full max-w-[400px] rounded-xl bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
          <ShieldAlert className="h-7 w-7 text-neutral-400" />
        </div>
        <h1 className="font-dm text-h2 text-brand-navy">Link de acesso necessário</h1>
        <p className="mt-3 text-sm text-foreground-alt">
          Para acessar seu processo, use o link enviado pelo WhatsApp após a confirmação do pagamento.
        </p>
        <p className="mt-4 text-sm text-foreground-alt">
          Não encontrou o link? Entre em contato com nossa equipe pelo WhatsApp.
        </p>
        <a
          href="https://wa.me/5515992377755"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-6 block w-full text-center"
        >
          Falar com a equipe
        </a>
      </div>
    </div>
  )
}
