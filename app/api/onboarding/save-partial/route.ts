import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { normalizeBrazilPhone } from '@/lib/phone'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { token, ...fields } = body

  if (!token || typeof token !== 'string') {
    return Response.json({ success: false, error: 'Token obrigatório.' }, { status: 400 })
  }

  const lead = await prisma.lead.findUnique({
    where: { onboardingToken: token },
    select: { id: true },
  })

  if (!lead) {
    return Response.json({ success: false, error: 'Link inválido ou expirado.' }, { status: 404 })
  }

  const updateData: Record<string, unknown> = {}

  if (fields.birthDate) updateData.birthDate = new Date(fields.birthDate)
  if (fields.email?.trim()) updateData.email = fields.email.trim()
  if (fields.phone) {
    const normalized = normalizeBrazilPhone(fields.phone)
    if (normalized) updateData.phone = normalized
  }
  if (fields.cpf) updateData.cpf = fields.cpf
  if (fields.addressZip) updateData.addressZip = fields.addressZip
  if (fields.addressStreet) updateData.addressStreet = fields.addressStreet
  if (fields.addressNumber) updateData.addressNumber = fields.addressNumber
  if (fields.addressComplement) updateData.addressComplement = fields.addressComplement
  if (fields.addressNeighborhood) updateData.addressNeighborhood = fields.addressNeighborhood
  if (fields.addressCity) updateData.addressCity = fields.addressCity
  if (fields.addressState) updateData.addressState = fields.addressState
  if (fields.identityDocument) updateData.identityDocument = fields.identityDocument
  if (fields.civilStatus) updateData.civilStatus = fields.civilStatus
  if (fields.profession) updateData.profession = fields.profession
  if (fields.valorDivida) updateData.valorDivida = fields.valorDivida
  if (fields.objetivo) updateData.objetivo = fields.objetivo
  if (fields.responsibleName) updateData.responsibleName = fields.responsibleName
  if (fields.responsibleCpf) updateData.responsibleCpf = fields.responsibleCpf

  updateData.onboardingLastSeenAt = new Date()

  await prisma.lead.update({
    where: { onboardingToken: token },
    data: updateData,
  })

  return Response.json({ success: true })
}
