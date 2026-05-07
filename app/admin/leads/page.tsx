import { prisma } from '@/lib/db'
import { LeadFilters } from './_components/lead-filters'
import { LeadList } from './_components/lead-list'

type AdminLeadsPageProps = {
  searchParams: Promise<{
    status?: string
    temperature?: string
    isClient?: string
  }>
}

export default async function AdminLeadsPage({ searchParams }: AdminLeadsPageProps) {
  const filters = await searchParams
  const status = filters.status || undefined
  const temperature = filters.temperature || undefined
  const isClient = filters.isClient || undefined

  const leads = await prisma.lead.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(temperature ? { OR: [{ currentTemperature: temperature }, { trafficTemperature: temperature }] } : {}),
      ...(isClient === 'true' ? { isClient: true } : {}),
    },
    include: {
      orders: { select: { status: true, pricePaid: true } },
      _count: { select: { leadEvents: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-brand-navy">Leads</h1>
        <p className="mt-1 text-sm text-foreground-alt">Leads capturados no funil, com filtros rápidos.</p>
      </div>

      <LeadFilters />
      <LeadList leads={leads} />
    </div>
  )
}
