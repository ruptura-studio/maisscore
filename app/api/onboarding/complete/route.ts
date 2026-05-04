import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { normalizeBrazilPhone } from '@/lib/phone'
import { onboardingSchema } from '@/lib/validations/onboarding'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { token, ...rest } = body

  if (!token || typeof token !== 'string') {
    return Response.json({ success: false, error: 'Token obrigatório.' }, { status: 400 })
  }

  const lead = await prisma.lead.findUnique({
    where: { onboardingToken: token },
    select: { phone: true, leadType: true, email: true, cpf: true },
  })

  if (!lead) {
    return Response.json({ success: false, error: 'Link inválido ou expirado.' }, { status: 404 })
  }

  const parsed = onboardingSchema.safeParse(rest)
  if (!parsed.success) {
    return Response.json(
      { success: false, error: parsed.error.errors[0].message },
      { status: 400 }
    )
  }

  const data = parsed.data
  const email = typeof data.email === 'string' && data.email.trim().length > 0 ? data.email.trim() : undefined
  const phone = normalizeBrazilPhone(data.phone) ?? (typeof data.phone === 'string' ? data.phone.replace(/\D/g, '') : '')
  const cpf = typeof data.cpf === 'string' && data.cpf.trim().length > 0 ? data.cpf.replace(/\D/g, '') : undefined

  // Validação extra para CNPJ
  if (lead.leadType === 'cnpj') {
    if (!data.responsibleName?.trim()) {
      return Response.json({ success: false, error: 'Nome do responsável legal obrigatório.' }, { status: 400 })
    }
    if (!data.responsibleCpf?.trim()) {
      return Response.json({ success: false, error: 'CPF do responsável legal obrigatório.' }, { status: 400 })
    }
  }

  const updateData = {
    birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
    email,
    phone: phone || undefined,
    cpf,
    addressStreet: data.addressStreet,
    addressNumber: data.addressNumber,
    addressComplement: data.addressComplement,
    addressNeighborhood: data.addressNeighborhood,
    addressCity: data.addressCity,
    addressState: data.addressState,
    addressZip: data.addressZip,
    identityDocument: data.identityDocument,
    civilStatus: data.civilStatus,
    profession: data.profession,
    valorDivida: data.valorDivida,
    objetivo: data.objetivo,
    responsibleName: data.responsibleName,
    responsibleCpf: data.responsibleCpf,
    onboardingCompletedAt: new Date(),
  }

  await prisma.lead.upsert({
    where: { onboardingToken: token },
    update: updateData,
    create: {
      phone: phone || lead.phone,
      onboardingToken: token,
      leadType: lead.leadType,
      birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
      email: email ?? lead.email ?? undefined,
      cpf: cpf ?? lead.cpf ?? undefined,
      addressStreet: data.addressStreet,
      addressNumber: data.addressNumber,
      addressComplement: data.addressComplement,
      addressNeighborhood: data.addressNeighborhood,
      addressCity: data.addressCity,
      addressState: data.addressState,
      addressZip: data.addressZip,
      identityDocument: data.identityDocument,
      civilStatus: data.civilStatus,
      profession: data.profession,
      valorDivida: data.valorDivida,
      objetivo: data.objetivo,
      responsibleName: data.responsibleName,
      responsibleCpf: data.responsibleCpf,
      onboardingCompletedAt: new Date(),
    },
  })

  const process = await prisma.process.findFirst({
    where: {
      order: {
        lead: {
          onboardingToken: token,
        },
      },
    },
    include: {
      order: {
        include: {
          lead: { select: { phone: true } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  if (process) {
    const step2 = await prisma.processStep.findUnique({
      where: {
        processId_step: {
          processId: process.id,
          step: 2,
        },
      },
      select: { id: true, status: true },
    })

    if (!step2) {
      await prisma.processStep.create({
        data: {
          processId: process.id,
          step: 2,
          status: 'em_andamento',
        },
      })
    } else if (step2.status === 'pendente') {
      await prisma.processStep.update({
        where: { id: step2.id },
        data: { status: 'em_andamento', completedAt: null },
      })
    }

    if (process.status !== 'concluido') {
      await prisma.process.update({
        where: { id: process.id },
        data: { status: 'em_andamento' },
      })
    }
  }

  return Response.json({ success: true })
}
