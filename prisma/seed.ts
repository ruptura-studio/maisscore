import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { config } from 'dotenv'

config({ path: '.env.local' })

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.product.upsert({
    where: { slug: 'limpa-nome-cpf' },
    update: { name: 'Limpa Nome CPF', price: 49500 },
    create: { slug: 'limpa-nome-cpf', name: 'Limpa Nome CPF', price: 49500, active: true },
  })

  await prisma.product.upsert({
    where: { slug: 'limpa-nome-cnpj' },
    update: { name: 'Limpa Nome CNPJ', price: 69500 },
    create: { slug: 'limpa-nome-cnpj', name: 'Limpa Nome CNPJ', price: 69500, active: true },
  })

  await prisma.product.upsert({
    where: { slug: 'consulta-basica' },
    update: { name: 'Consulta Básica', price: 1500 },
    create: { slug: 'consulta-basica', name: 'Consulta Básica', price: 1500, active: true },
  })

  await prisma.product.upsert({
    where: { slug: 'consulta-completa' },
    update: { name: 'Consulta Completa', price: 2000 },
    create: { slug: 'consulta-completa', name: 'Consulta Completa', price: 2000, active: true },
  })

  console.log('✅ Seed concluído — 4 produtos inseridos/atualizados')
}

main().catch(console.error).finally(() => prisma.$disconnect())
