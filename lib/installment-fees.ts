// Taxas Asaas para cartão de crédito parcelado
// Verificar/atualizar em: Painel Asaas → Configurações → Tarifas
export const ASAAS_INSTALLMENT_FEES: Record<number, number> = {
  1: 0,       // à vista — sem encargo de parcelamento
  2: 0.0349,  // 3,49%
  3: 0.0499,  // 4,99%
}

/**
 * Retorna o valor total em centavos com encargos de parcelamento incluídos.
 */
export function totalWithInstallmentFee(baseAmountCents: number, installments: number): number {
  const rate = ASAAS_INSTALLMENT_FEES[installments] ?? 0
  return Math.round(baseAmountCents * (1 + rate))
}

/**
 * Retorna o valor de cada parcela em centavos (arredondado para cima).
 */
export function installmentValueCents(baseAmountCents: number, installments: number): number {
  const total = totalWithInstallmentFee(baseAmountCents, installments)
  return Math.ceil(total / installments)
}
