type IntegrationErrorInput = {
  source: string
  code: string
  message: string
  details?: unknown
  leadId?: string | null
  orderId?: string | null
  phone?: string | null
  path?: string | null
  method?: string | null
  httpStatus?: number | null
}

function toDetails(details: unknown) {
  if (details === undefined) return undefined
  if (details === null) return null
  if (typeof details === 'string') return details
  if (details instanceof Error) {
    return {
      name: details.name,
      message: details.message,
      stack: details.stack ?? null,
    }
  }
  return details
}

export async function logIntegrationError(
  prisma: any,
  input: IntegrationErrorInput,
) {
  try {
    await prisma.integrationError.create({
      data: {
        source: input.source,
        code: input.code,
        message: input.message,
        details: toDetails(input.details),
        leadId: input.leadId ?? null,
        orderId: input.orderId ?? null,
        phone: input.phone ?? null,
        path: input.path ?? null,
        method: input.method ?? null,
        httpStatus: input.httpStatus ?? null,
      },
    })
  } catch (error) {
    console.error('[integration-error] failed to persist log', error)
  }
}
