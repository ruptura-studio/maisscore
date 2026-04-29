import { z } from 'zod'

const cardHolderSchema = z.object({
  name: z.string().min(2, 'Nome do titular obrigatório'),
  cpfCnpj: z
    .string()
    .regex(/^\d+$/, 'Documento deve conter apenas números')
    .refine((val) => val.length === 11 || val.length === 14, {
      message: 'CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos',
    }),
  phone: z
    .string()
    .min(10, 'Telefone inválido')
    .max(15, 'Telefone inválido')
    .regex(/^\d+$/, 'Telefone deve conter apenas números'),
})

export const checkoutSchema = z
  .object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('E-mail inválido'),
    phone: z
      .string()
      .min(10, 'Telefone inválido')
      .max(15, 'Telefone inválido')
      .regex(/^\d+$/, 'Telefone deve conter apenas números'),
    document: z
      .string()
      .regex(/^\d+$/, 'Documento deve conter apenas números')
      .refine((val) => val.length === 11 || val.length === 14, {
        message: 'CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos',
      }),
    documentType: z.enum(['CPF', 'CNPJ']),
    razaoSocial: z.string().optional(),
    birthDate: z.string().optional(),
    addressStreet: z.string().optional(),
    addressNumber: z.string().optional(),
    addressComplement: z.string().optional(),
    addressNeighborhood: z.string().optional(),
    addressCity: z.string().optional(),
    addressState: z.string().optional(),
    addressZip: z.string().optional(),
    civilStatus: z.string().optional(),
    profession: z.string().optional(),
    identityDocument: z.string().optional(),
    responsibleName: z.string().optional(),
    responsibleCpf: z.string().optional(),
    productSlug: z.enum(['limpa-nome-cpf', 'limpa-nome-cnpj']),
    paymentMethod: z.enum(['PIX', 'CREDIT_CARD']),
    installments: z.number().int().min(1).max(3).optional().default(1),
    remoteIp: z.string().optional(),
    // Endereço — apenas CEP + número para CREDIT_CARD (Asaas não exige logradouro/bairro/cidade)
    postalCode: z.string().optional(),
    complement: z.string().optional(),
    // Cartão
    creditCard: z
      .object({
        holderName: z.string().min(2, 'Nome do titular obrigatório'),
        number: z.string().regex(/^\d{16}$/, 'Número do cartão inválido'),
        expiryMonth: z.string().regex(/^\d{2}$/, 'Mês inválido'),
        expiryYear: z.string().regex(/^\d{4}$/, 'Ano inválido'),
        ccv: z.string().regex(/^\d{3}$/, 'CVV inválido'),
      })
      .optional(),
    // Titular do cartão diferente do comprador
    cardHolderDiffers: z.boolean().optional().default(false),
    cardHolderInfo: cardHolderSchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.documentType === 'CNPJ' && !data.razaoSocial?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Razão Social obrigatória para CNPJ',
        path: ['razaoSocial'],
      })
    }

    if (data.paymentMethod === 'CREDIT_CARD') {
      if (!data.postalCode || !/^\d{8}$/.test(data.postalCode)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'CEP deve ter 8 dígitos',
          path: ['postalCode'],
        })
      }
      if (!data.addressNumber?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Número obrigatório',
          path: ['addressNumber'],
        })
      }
      if (data.cardHolderDiffers && !data.cardHolderInfo) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Dados do titular do cartão obrigatórios',
          path: ['cardHolderInfo'],
        })
      }
    }
  })

export type CheckoutInput = z.infer<typeof checkoutSchema>

// Schema para upsert progressivo de Lead por step
export const checkoutProgressSchema = z.object({
  step: z.number().int().min(1).max(2),
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  document: z.string().optional(),
  documentType: z.enum(['CPF', 'CNPJ']).optional(),
  razaoSocial: z.string().optional(),
  birthDate: z.string().optional(),
  addressStreet: z.string().optional(),
  addressNumber: z.string().optional(),
  addressComplement: z.string().optional(),
  addressNeighborhood: z.string().optional(),
  addressCity: z.string().optional(),
  addressState: z.string().optional(),
  addressZip: z.string().optional(),
  civilStatus: z.string().optional(),
  profession: z.string().optional(),
  identityDocument: z.string().optional(),
  responsibleName: z.string().optional(),
  responsibleCpf: z.string().optional(),
  productSlug: z.string().optional(),
  paymentMethod: z.enum(['PIX', 'CREDIT_CARD']).optional(),
})

export type CheckoutProgressInput = z.infer<typeof checkoutProgressSchema>
