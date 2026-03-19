import { z } from 'zod'

export const createLeadSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  phone: z
    .string()
    .min(10, 'Telefone inválido')
    .max(15, 'Telefone inválido')
    .regex(/^\d+$/, 'Telefone deve conter apenas números'),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  channel: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
})

export type CreateLeadInput = z.infer<typeof createLeadSchema>
