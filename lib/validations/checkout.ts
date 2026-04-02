import { z } from 'zod'

export const checkoutSchema = z.object({
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
  productSlug: z.enum(['limpa-nome-cpf', 'limpa-nome-cnpj']),
  paymentMethod: z.enum(['PIX', 'CREDIT_CARD']),
  installments: z.number().int().min(1).max(3).optional().default(1),
})

export type CheckoutInput = z.infer<typeof checkoutSchema>
