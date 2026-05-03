import { z } from 'zod'

export const onboardingSchema = z.object({
  birthDate: z.string().min(1, 'Data de nascimento obrigatória'),
  email: z.union([z.string().email('E-mail inválido'), z.literal('')]).optional(),
  phone: z.string().optional(),
  cpf: z.string().optional(),
  addressZip: z.string().regex(/^\d{8}$/, 'CEP deve ter 8 dígitos'),
  addressStreet: z.string().min(1, 'Logradouro obrigatório'),
  addressNumber: z.string().min(1, 'Número obrigatório'),
  addressComplement: z.string().optional(),
  addressNeighborhood: z.string().min(1, 'Bairro obrigatório'),
  addressCity: z.string().min(1, 'Cidade obrigatória'),
  addressState: z.string().min(2, 'Estado obrigatório'),
  identityDocument: z.string().min(1, 'RG/CNH obrigatório'),
  civilStatus: z.string().min(1, 'Estado civil obrigatório'),
  profession: z.string().min(1, 'Profissão obrigatória'),
  valorDivida: z.string().optional(),
  objetivo: z.string().min(1, 'Objetivo obrigatório'),
  // CNPJ only
  responsibleName: z.string().optional(),
  responsibleCpf: z.string().optional(),
}).superRefine((data, ctx) => {
  // responsibleName e responsibleCpf são validados no handler com base no leadType
})

export type OnboardingInput = z.infer<typeof onboardingSchema>
