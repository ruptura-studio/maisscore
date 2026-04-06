import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { checkoutSchema } from '@/lib/validations/checkout'
import { findOrCreateCustomer, createPayment, getPixQrCode } from '@/lib/asaas'
import { totalWithInstallmentFee } from '@/lib/installment-fees'

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
      productSlug,
      paymentMethod,
      installments,
      remoteIp,
      creditCard,
      cardHolderDiffers,
      cardHolderInfo,
      postalCode,
      addressNumber,
      complement,
    } = parsed.data

    // 2. Buscar produto
    const product = await prisma.product.findUnique({ where: { slug: productSlug } })
    if (!product || !product.active) {
      return Response.json({ success: false, error: 'Produto não encontrado.' }, { status: 404 })
    }

    // 3. Upsert lead
    const leadType = documentType === 'CNPJ' ? 'cnpj' : 'cpf'
    const lead = await prisma.lead.upsert({
      where: { phone },
      create: {
        name,
        phone,
        email,
        channel: 'checkout',
        status: 'em_atendimento',
        stage: 'quente',
        lastInteractionAt: new Date(),
        companyName: razaoSocial,
        leadType,
        checkoutStep: paymentMethod === 'PIX' ? 2 : 3,
      },
      update: {
        name,
        email,
        status: 'em_atendimento',
        stage: 'quente',
        lastInteractionAt: new Date(),
        companyName: razaoSocial,
        leadType,
        checkoutStep: paymentMethod === 'PIX' ? 2 : 3,
      },
    })

    // 4. Criar order
    const order = await prisma.order.create({
      data: {
        leadId: lead.id,
        productId: product.id,
        document,
        documentType,
        status: 'pendente',
        pricePaid: product.price,
      },
    })

    // 5. Criar cliente + cobrança no Asaas
    const customer = await findOrCreateCustomer({
      name,
      email,
      phone,
      cpfCnpj: document,
      companyName: razaoSocial,
    })

    const effectivePriceCents =
      paymentMethod === 'CREDIT_CARD' && installments > 1
        ? totalWithInstallmentFee(product.price, installments)
        : product.price
    const valueInReais = effectivePriceCents / 100

    // Resolve titular do cartão
    const holderName = cardHolderDiffers && cardHolderInfo ? cardHolderInfo.name : name
    const holderCpfCnpj = cardHolderDiffers && cardHolderInfo ? cardHolderInfo.cpfCnpj : document
    const holderPhone = cardHolderDiffers && cardHolderInfo ? cardHolderInfo.phone : phone

    const payment = await createPayment({
      customerId: customer.id,
      billingType: paymentMethod,
      value: valueInReais,
      description: product.name,
      externalReference: order.id,
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
              postalCode: postalCode ?? '',
              addressNumber: addressNumber ?? '',
              complement,
            },
          }
        : {}),
    })

    // 6. Para PIX, buscar QR code
    let pixQrCode: string | null = null
    let pixPayload: string | null = null
    let pixExpiresAt: Date | null = null

    if (paymentMethod === 'PIX') {
      const qr = await getPixQrCode(payment.id)
      pixQrCode = qr.encodedImage
      pixPayload = qr.payload
      pixExpiresAt = new Date(qr.expirationDate)
    }

    // 7. Criar registro de payment no banco
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

    // 8. Dispara webhook hot-lead após PIX (fire-and-forget)
    if (paymentMethod === 'PIX' && process.env.WEBHOOK_HOT_LEAD_URL) {
      fetch(process.env.WEBHOOK_HOT_LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          orderId: order.id,
          name,
          phone,
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
    return Response.json(
      { success: false, error: 'Erro ao processar pagamento. Tente novamente.' },
      { status: 500 }
    )
  }
}
