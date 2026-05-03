import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params

  const lead = await prisma.lead.findUnique({
    where: { onboardingToken: token },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      cpf: true,
      leadType: true,
      acquisition: true,
      convertedAt: true,
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
    },
  })

  if (!lead) {
    return Response.json({ success: false, error: 'Link inválido ou expirado.' }, { status: 404 })
  }

  const order = await prisma.order.findFirst({
    where: { leadId: lead.id },
    orderBy: { createdAt: 'desc' },
    include: { payment: true },
  })

  return Response.json({
    success: true,
    data: {
      ...lead,
      paymentConfirmedAt: order?.payment?.confirmedAt?.toISOString?.() ?? null,
    },
  })
}
