import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { resendOnboardingLink } from './actions'

type OnboardingDetailPageProps = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ resend?: string; message?: string }>
}

const CHECKLIST_STATUS_CLASS: Record<string, string> = {
  complete: 'bg-green-100 text-green-700',
  incomplete: 'bg-yellow-100 text-yellow-700',
}

const DOCUMENT_STATUS_CLASS: Record<string, string> = {
  pending: 'bg-neutral-100 text-neutral-600',
  received: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
}

function formatDate(date: Date | null): string {
  if (!date) return 'Pendente'
  return new Intl.DateTimeFormat('pt-BR').format(date)
}

export default async function AdminOnboardingDetailPage({ params, searchParams }: OnboardingDetailPageProps) {
  const { id } = await params
  const feedback = await searchParams

  const handoff = await prisma.onboardingHandoff.findUnique({
    where: { id },
    include: {
      lead: true,
      order: {
        include: {
          onboardingDocuments: { orderBy: { createdAt: 'asc' } },
          product: true,
        },
      },
    },
  })

  if (!handoff) {
    notFound()
  }

  const checklistClass = CHECKLIST_STATUS_CLASS[handoff.checklistStatus] ?? 'bg-neutral-100 text-neutral-600'
  const canResend = Boolean(handoff.lead.onboardingToken) && !handoff.lead.onboardingCompletedAt

  async function handleResend() {
    'use server'

    const result = await resendOnboardingLink(id)
    const query = new URLSearchParams({
      resend: result.success ? 'success' : 'error',
      message: result.message,
    })

    redirect(`/admin/onboardings/${id}?${query.toString()}`)
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-brand-border bg-white p-5">
        <h1 className="text-xl font-semibold text-brand-navy">{handoff.lead.name || handoff.lead.phone}</h1>
        <div className="mt-3 grid gap-2 text-sm text-foreground-alt md:grid-cols-2">
          <p>
            <span className="font-medium text-brand-navy">Telefone:</span> {handoff.lead.phone}
          </p>
          <p>
            <span className="font-medium text-brand-navy">Produto:</span> {handoff.order.product.name}
          </p>
          <p>
            <span className="font-medium text-brand-navy">Onboarding concluído em:</span>{' '}
            {formatDate(handoff.lead.onboardingCompletedAt)}
          </p>
        </div>
        <div className="mt-3">
          <span className={`rounded-full px-2 py-1 text-xs font-medium ${checklistClass}`}>{handoff.checklistStatus}</span>
        </div>
      </section>

      {handoff.missingItems && handoff.missingItems.trim().length > 0 ? (
        <section className="rounded-xl border border-brand-border bg-white p-5">
          <h2 className="text-sm font-semibold text-brand-navy">Itens faltantes</h2>
          <p className="mt-3 whitespace-pre-line text-sm text-foreground-alt">{handoff.missingItems}</p>
        </section>
      ) : null}

      <section className="rounded-xl border border-brand-border bg-white p-5">
        <h2 className="text-sm font-semibold text-brand-navy">Documentos</h2>
        {handoff.order.onboardingDocuments.length > 0 ? (
          <ul className="mt-3 space-y-3">
            {handoff.order.onboardingDocuments.map((document) => {
              const documentStatusClass = DOCUMENT_STATUS_CLASS[document.status] ?? 'bg-neutral-100 text-neutral-600'
              return (
                <li key={document.id} className="rounded-lg border border-brand-border p-3 text-sm text-foreground-alt">
                  <p className="font-medium text-brand-navy">{document.label}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${documentStatusClass}`}>
                      {document.status}
                    </span>
                    {document.fileUrl ? (
                      <Link href={document.fileUrl} target="_blank" rel="noreferrer" className="text-xs text-brand-navy underline">
                        Ver arquivo
                      </Link>
                    ) : null}
                  </div>
                  {document.receivedAt ? (
                    <p className="mt-1 text-xs text-foreground-alt">Recebido em: {formatDate(document.receivedAt)}</p>
                  ) : null}
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-foreground-alt">Nenhum documento cadastrado para este pedido.</p>
        )}
      </section>

      {canResend ? (
        <section className="rounded-xl border border-brand-border bg-white p-5">
          <h2 className="text-sm font-semibold text-brand-navy">Reenviar link de onboarding</h2>
          <form action={handleResend} className="mt-3">
            <button type="submit" className="btn-primary text-xs">
              Reenviar link
            </button>
          </form>

          {feedback.message ? (
            <p className={`mt-3 text-sm ${feedback.resend === 'success' ? 'text-green-700' : 'text-red-700'}`}>
              {feedback.message}
            </p>
          ) : null}
        </section>
      ) : null}
    </div>
  )
}
