import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { StepTimeline } from '../_components/step-timeline'
import { autoConcludeAnalysisStepIfDue, processAnalysisStepMilestones } from './actions'

type ProcessDetailPageProps = {
  params: Promise<{ id: string }>
}

function formatDate(date: Date | null): string {
  if (!date) return '-'
  return new Intl.DateTimeFormat('pt-BR').format(date)
}

function formatCurrency(amountInCents: number | null): string {
  if (amountInCents === null) return '-'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amountInCents / 100)
}

function formatDocument(value: string, type: 'cpf' | 'cnpj'): string {
  const digits = value.replace(/\D/g, '')

  if (type === 'cpf' && digits.length === 11) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
  }

  if (type === 'cnpj' && digits.length === 14) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`
  }

  return value
}

export default async function AdminProcessDetailPage({ params }: ProcessDetailPageProps) {
  const { id } = await params

  await processAnalysisStepMilestones(id)
  await autoConcludeAnalysisStepIfDue(id)

  const process = await prisma.process.findUnique({
    where: { id },
    include: {
      steps: { orderBy: { step: 'asc' } },
      order: {
        include: {
          lead: {
            select: {
              name: true,
              phone: true,
              cpf: true,
              cnpj: true,
              email: true,
              birthDate: true,
              addressStreet: true,
              addressNumber: true,
              addressComplement: true,
              addressNeighborhood: true,
              addressCity: true,
              addressState: true,
              addressZip: true,
              identityDocument: true,
              civilStatus: true,
              profession: true,
              valorDivida: true,
              objetivo: true,
              responsibleName: true,
              responsibleCpf: true,
              leadType: true,
              onboardingToken: true,
              onboardingCompletedAt: true,
              onboardingLastSeenAt: true,
            },
          },
          product: true,
          payment: { select: { confirmedAt: true, amount: true, method: true } },
        },
      },
    },
  })

  if (!process) {
    notFound()
  }

  const clientName = process.order.lead.name || process.order.lead.phone
  const orderDocumentType = process.order.documentType?.toLowerCase()
  const leadType = process.order.lead.leadType?.toLowerCase()
  const productName = process.order.product.name.toLowerCase()
  const documentType: 'cpf' | 'cnpj' =
    orderDocumentType === 'cnpj' || leadType === 'cnpj' || productName.includes('cnpj') ? 'cnpj' : 'cpf'
  const rawClientDocument =
    documentType === 'cnpj'
      ? (process.order.lead.cnpj || process.order.document || process.order.lead.cpf || '-')
      : (process.order.lead.cpf || process.order.document || '-')
  const clientDocument = rawClientDocument === '-' ? '-' : formatDocument(rawClientDocument, documentType)
  const clientDocumentLabel = documentType === 'cnpj' ? 'CNPJ' : 'CPF'
  const paidAmount = formatCurrency(process.order.payment?.amount ?? null)
  const confirmedAt = formatDate(process.order.payment?.confirmedAt ?? null)
  const analysisTemplateSlugs = [1, 2, 3].map((milestone) => `processo_${process.id}_analise_marco_${milestone}`)
  const analysisTemplates = await prisma.messageTemplate.findMany({
    where: {
      slug: { in: analysisTemplateSlugs },
      active: true,
    },
    select: { slug: true, content: true },
  })
  const analysisMilestoneMessages = analysisTemplates.reduce<Record<number, string>>((acc, template) => {
    if (template.slug.endsWith('_1')) acc[1] = template.content
    if (template.slug.endsWith('_2')) acc[2] = template.content
    if (template.slug.endsWith('_3')) acc[3] = template.content
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/processos"
          className="inline-flex items-center gap-1 text-sm text-foreground-alt hover:text-brand-navy"
        >
          ← Processos
        </Link>
      </div>
      <section className="rounded-xl border border-brand-border bg-white p-5">
        <h1 className="text-xl font-semibold text-brand-navy">{clientName}</h1>
        <div className="mt-3 grid gap-2 text-sm text-foreground-alt md:grid-cols-2">
          <p>
            <span className="font-medium text-brand-navy">{clientDocumentLabel}:</span> {clientDocument}
          </p>
          <p>
            <span className="font-medium text-brand-navy">Produto:</span> {process.order.product.name}
          </p>
          <p>
            <span className="font-medium text-brand-navy">Valor pago:</span> {paidAmount}
          </p>
          <p>
            <span className="font-medium text-brand-navy">Pagamento confirmado em:</span> {confirmedAt}
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-brand-navy">Timeline de Steps</h2>
        <StepTimeline
          processId={process.id}
          paymentConfirmedAt={process.order.payment?.confirmedAt ?? null}
          analysisMilestoneMessages={analysisMilestoneMessages}
          lead={{
            name: process.order.lead.name,
            phone: process.order.lead.phone,
            cpf: process.order.lead.cpf,
            email: process.order.lead.email,
            birthDate: process.order.lead.birthDate,
            addressStreet: process.order.lead.addressStreet,
            addressNumber: process.order.lead.addressNumber,
            addressComplement: process.order.lead.addressComplement,
            addressNeighborhood: process.order.lead.addressNeighborhood,
            addressCity: process.order.lead.addressCity,
            addressState: process.order.lead.addressState,
            addressZip: process.order.lead.addressZip,
            identityDocument: process.order.lead.identityDocument,
            civilStatus: process.order.lead.civilStatus,
            profession: process.order.lead.profession,
            valorDivida: process.order.lead.valorDivida,
            objetivo: process.order.lead.objetivo,
            responsibleName: process.order.lead.responsibleName,
            responsibleCpf: process.order.lead.responsibleCpf,
            leadType: process.order.lead.leadType,
            onboardingToken: process.order.lead.onboardingToken,
            onboardingCompletedAt: process.order.lead.onboardingCompletedAt,
            onboardingLastSeenAt: process.order.lead.onboardingLastSeenAt,
          }}
          steps={process.steps.map((step) => ({
            id: step.id,
            step: step.step,
            status: step.status,
            documentUrl: step.documentUrl,
            notes: step.notes,
            completedAt: step.completedAt,
            createdAt: step.createdAt,
          }))}
        />
      </section>
    </div>
  )
}
