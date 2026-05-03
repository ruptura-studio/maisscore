import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { checkoutSchema } from '@/lib/validations/checkout'
import { findOrCreateCustomer, createPayment, getPixQrCode } from '@/lib/asaas'
import { totalWithInstallmentFee } from '@/lib/installment-fees'
import { logIntegrationError } from '@/lib/integration-error'
import { normalizeBrazilPhone } from '@/lib/phone'

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    '127.0.0.1'
  )
}

function formatError(error: unknown) {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  try {
    return JSON.stringify(error)
  } catch {
    return String(error)
  }
}

function fail(message: string, code: string, status = 500, details?: string) {
  return Response.json(
    {
      success: false,
      error: message,
      code,
      details,
    },
    { status },
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // 1. Validar com Zod
    const parsed = checkoutSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json(
        { success: false, error: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

    const {
      name,
      email,
      phone,
      document,
      documentType,
      razaoSocial,
      birthDate,
      addressStreet,
      addressNeighborhood,
      addressCity,
      addressState,
      addressZip,
      addressComplement,
      productSlug,
      paymentMethod,
      installments,
      creditCard,
      cardHolderDiffers,
      cardHolderInfo,
      postalCode,
      addressNumber,
      complement,
    } = parsed.data
    const normalizedPhone = normalizeBrazilPhone(phone) ?? phone.replace(/\D/g, '')

    // 2. Buscar produto
    const product = await prisma.product.findUnique({ where: { slug: productSlug } })
    if (!product || !product.active) {
      return Response.json({ success: false, error: 'Produto não encontrado.' }, { status: 404 })
    }

    const remoteIp = getClientIp(req)

    // 3. Upsert lead
    const leadType = documentType === 'CNPJ' ? 'cnpj' : 'cpf'
    const fallbackAcquisition = documentType === 'CNPJ' ? 'CNPJ' : 'CPF'
    const existingLead = await prisma.lead.findUnique({
      where: { phone: normalizedPhone },
      select: { acquisition: true },
    })
    const acquisition = existingLead?.acquisition?.trim() || fallbackAcquisition
    const lead = await prisma.lead.upsert({
      where: { phone: normalizedPhone },
      create: {
        name,
        phone: normalizedPhone,
        email,
        acquisition,
        channel: 'checkout',
        status: 'em_atendimento',
        stage: 'quente',
        lastInteractionAt: new Date(),
        companyName: razaoSocial,
        leadType,
        checkoutStep: paymentMethod === 'PIX' ? 2 : 3,
        birthDate: birthDate ? new Date(birthDate) : undefined,
        addressStreet,
        addressNumber,
        addressComplement,
        addressNeighborhood,
        addressCity,
        addressState,
        addressZip,
      },
      update: {
        name,
        email,
        acquisition,
        status: 'em_atendimento',
        stage: 'quente',
        lastInteractionAt: new Date(),
        companyName: razaoSocial,
        leadType,
        checkoutStep: paymentMethod === 'PIX' ? 2 : 3,
        birthDate: birthDate ? new Date(birthDate) : undefined,
        addressStreet,
        addressNumber,
        addressComplement,
        addressNeighborhood,
        addressCity,
        addressState,
        addressZip,
      },
    })

    const cutoff = new Date(Date.now() - 10 * 60 * 1000)
    const existingOrder = await prisma.order.findFirst({
      where: {
        leadId: lead.id,
        productId: product.id,
        status: { in: ['pendente', 'pago'] },
        createdAt: { gte: cutoff },
      },
      include: {
        payment: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (existingOrder) {
      const existingPayment = existingOrder.payment
      const hasActiveCharge =
        existingPayment && ['pending', 'confirmed'].includes(existingPayment.status)

      let pixQrCode: string | null = null
      let pixPayload: string | null = existingPayment?.pixKey ?? null
      let pixExpiresAt: Date | null = existingPayment?.pixExpiresAt ?? null

      if (
        hasActiveCharge &&
        existingPayment.method === 'PIX' &&
        existingPayment.asaasId &&
        (!pixPayload || !pixExpiresAt)
      ) {
        try {
          const qr = await getPixQrCode(existingPayment.asaasId)
          pixQrCode = qr.encodedImage
          pixPayload = qr.payload
          pixExpiresAt = new Date(qr.expirationDate)
        } catch {
          // Mantem retorno sem QR caso o Asaas falhe nesta leitura.
        }
      }

      return Response.json({
        success: true,
        data: {
          orderId: existingOrder.id,
          method: (existingPayment?.method ?? paymentMethod) as 'PIX' | 'CREDIT_CARD',
          pixQrCode,
          pixPayload,
          pixExpiresAt,
          invoiceUrl: null,
        },
      })
    }

    // 4. Criar order
    let order
    try {
      order = await prisma.order.create({
        data: {
          leadId: lead.id,
          productId: product.id,
          document,
          documentType,
          status: 'pendente',
          pricePaid: product.price,
        },
      })
    } catch (error) {
      console.error('[POST /api/checkout] order_create_failed', error)
      await logIntegrationError(prisma, {
        source: 'checkout',
        code: 'checkout_order_create_failed',
        message: 'Não foi possível criar o pedido.',
        details: error,
        leadId: lead.id,
        phone: normalizedPhone,
        path: '/api/checkout',
        method: 'POST',
        httpStatus: 500,
      })
      return fail(
        'Não foi possível criar o pedido.',
        'checkout_order_create_failed',
        500,
        formatError(error),
      )
    }

    // 5. Criar cliente + cobrança no Asaas
    let customer
    try {
      customer = await findOrCreateCustomer({
        name,
        email,
        phone: normalizedPhone,
        cpfCnpj: document,
        companyName: razaoSocial,
      })
    } catch (error) {
      console.error('[POST /api/checkout] asaas_customer_failed', error)
      await logIntegrationError(prisma, {
        source: 'checkout',
        code: 'asaas_customer_failed',
        message: 'Falha ao criar ou localizar o cliente no Asaas.',
        details: error,
        leadId: lead.id,
        orderId: order.id,
        phone: normalizedPhone,
        path: '/api/checkout',
        method: 'POST',
        httpStatus: 502,
      })
      return fail(
        'Falha ao criar ou localizar o cliente no Asaas.',
        'asaas_customer_failed',
        502,
        formatError(error),
      )
    }

    const effectivePriceCents =
      paymentMethod === 'CREDIT_CARD' && installments > 1
        ? totalWithInstallmentFee(product.price, installments)
        : product.price
    const valueInReais = effectivePriceCents / 100

    // Resolve titular do cartão
    const holderName = cardHolderDiffers && cardHolderInfo ? cardHolderInfo.name : name
    const holderCpfCnpj = cardHolderDiffers && cardHolderInfo ? cardHolderInfo.cpfCnpj : document
    const holderPhone = cardHolderDiffers && cardHolderInfo
      ? (normalizeBrazilPhone(cardHolderInfo.phone) ?? cardHolderInfo.phone.replace(/\D/g, ''))
      : normalizedPhone

    let payment
    try {
      payment = await createPayment({
        customerId: customer.id,
        billingType: paymentMethod,
        value: valueInReais,
        description: product.name,
        externalReference: `maisscore:${order.id}`,
        installmentCount: installments,
        remoteIp,
        ...(paymentMethod === 'CREDIT_CARD' && creditCard
          ? {
              creditCard,
              creditCardHolderInfo: {
                name: holderName,
                email,
                cpfCnpj: holderCpfCnpj,
                phone: holderPhone,
                postalCode: postalCode ?? addressZip ?? '',
                addressNumber: addressNumber ?? '',
                complement: complement ?? addressComplement,
              },
            }
          : {}),
        })
    } catch (error) {
      console.error('[POST /api/checkout] asaas_payment_failed', error)
      await logIntegrationError(prisma, {
        source: 'checkout',
        code: 'asaas_payment_failed',
        message: 'Falha ao criar a cobrança no Asaas.',
        details: error,
        leadId: lead.id,
        orderId: order.id,
        phone: normalizedPhone,
        path: '/api/checkout',
        method: 'POST',
        httpStatus: 502,
      })
      return fail(
        'Falha ao criar a cobrança no Asaas.',
        'asaas_payment_failed',
        502,
        formatError(error),
      )
    }

    // 6. Para PIX, buscar QR code
    let pixQrCode: string | null = null
    let pixPayload: string | null = null
    let pixExpiresAt: Date | null = null

    if (paymentMethod === 'PIX') {
      try {
        const qr = await getPixQrCode(payment.id)
        pixQrCode = qr.encodedImage
        pixPayload = qr.payload
        pixExpiresAt = new Date(qr.expirationDate)
      } catch (error) {
        console.error('[POST /api/checkout] asaas_pix_qr_failed', error)
        await logIntegrationError(prisma, {
          source: 'checkout',
          code: 'asaas_pix_qr_failed',
          message: 'Cobrança criada, mas não foi possível gerar o QR Code PIX.',
          details: error,
          leadId: lead.id,
          orderId: order.id,
          phone: normalizedPhone,
          path: '/api/checkout',
          method: 'POST',
          httpStatus: 502,
        })
        return fail(
          'Cobrança criada, mas não foi possível gerar o QR Code PIX.',
          'asaas_pix_qr_failed',
          502,
          formatError(error),
        )
      }
    }

    // 7. Criar registro de payment no banco
    try {
      await prisma.payment.create({
        data: {
          orderId: order.id,
          asaasId: payment.id,
          method: paymentMethod,
          status: 'pending',
          amount: effectivePriceCents,
          pixKey: pixPayload,
          pixExpiresAt,
          remoteIp,
        },
      })
    } catch (error) {
      console.error('[POST /api/checkout] payment_save_failed', error)
      await logIntegrationError(prisma, {
        source: 'checkout',
        code: 'checkout_payment_save_failed',
        message: 'Cobrança criada, mas não foi possível salvar o pagamento no banco.',
        details: error,
        leadId: lead.id,
        orderId: order.id,
        phone: normalizedPhone,
        path: '/api/checkout',
        method: 'POST',
        httpStatus: 500,
      })
      return fail(
        'Cobrança criada, mas não foi possível salvar o pagamento no banco.',
        'checkout_payment_save_failed',
        500,
        formatError(error),
      )
    }

    // 8. Dispara webhook hot-lead após PIX (fire-and-forget)
    if (paymentMethod === 'PIX' && process.env.WEBHOOK_HOT_LEAD_URL) {
      fetch(process.env.WEBHOOK_HOT_LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          orderId: order.id,
          name,
          phone: normalizedPhone,
          email,
          leadType,
          companyName: razaoSocial,
          productSlug,
          method: paymentMethod,
          amount: valueInReais,
        }),
      }).catch(() => {})
    }

    return Response.json({
      success: true,
      data: {
        orderId: order.id,
        method: paymentMethod,
        pixQrCode,
        pixPayload,
        pixExpiresAt,
        invoiceUrl: payment.invoiceUrl ?? null,
      },
    })
  } catch (error) {
    console.error('[POST /api/checkout]', String(error))
    await logIntegrationError(prisma, {
      source: 'checkout',
      code: 'checkout_unknown_error',
      message: 'Erro ao processar pagamento. Tente novamente.',
      details: error,
      path: '/api/checkout',
      method: 'POST',
      httpStatus: 500,
    })
    return fail(
      'Erro ao processar pagamento. Tente novamente.',
      'checkout_unknown_error',
      500,
      formatError(error),
    )
  }
}
