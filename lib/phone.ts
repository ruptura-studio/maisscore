export function normalizeBrazilPhone(value: string | null | undefined): string | null {
  if (!value) return null

  const digits = value.replace(/\D/g, '')
  if (!digits) return null

  // Remove country code only when it is clearly present.
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith('55')) {
    return digits.slice(2)
  }

  return digits
}
