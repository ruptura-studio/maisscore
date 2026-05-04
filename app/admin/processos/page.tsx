import { prisma } from '@/lib/db'
import { ProcessList } from './_components/process-list'

export default async function AdminProcessosPage() {
  const processes = await prisma.process.findMany({
    include: {
      order: {
        include: {
          lead: { select: { id: true, name: true, phone: true, cpf: true } },
          product: { select: { name: true } },
        },
      },
      steps: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-brand-navy">Processos</h1>
        <p className="mt-1 text-sm text-foreground-alt">Clientes com processos ativos.</p>
      </div>

      <ProcessList processes={processes} />
    </div>
  )
}
