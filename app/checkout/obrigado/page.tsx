'use client'

import { useEffect, useState, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

// ── Types ──────────────────────────────────────────────────────────────────

type OrderStatus = 'pending' | 'confirmed' | 'error'

interface OrderData {
  orderId: string
  status: OrderStatus
  method: string
  amount: number
  productName: string
  phone?: string | null
  pixQrCode?: string | null
  pixPayload?: string | null
  pixExpiresAt?: string | null
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function formatCurrency(cents: number) {
  return (cents / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function formatPhone(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '')
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '')
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback — silent
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="mt-3 w-full rounded-md border border-brand-border bg-white px-4 py-2.5 text-sm font-medium text-brand-navy transition-colors hover:bg-neutral-50"
    >
      {copied ? '✓ Copiado!' : 'Copiar código PIX'}
    </button>
  )
}

// ── ObrigadoContent ──────────────────────────────────────────────────────────

function ObrigadoContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  const [order, setOrder] = useState<OrderData | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [polling, setPolling] = useState(false)

  const fetchOrder = useCallback(async () => {
    if (!orderId) return
    try {
      const res = await fetch(`/api/checkout/${orderId}`)
      const data = await res.json()
      if (data.success) {
        setOrder(data.data)
        return data.data.status
      }
    } catch {
      setLoadError(true)
    }
    return null
  }, [orderId])

  // Carga inicial
  useEffect(() => {
    if (!orderId) return
    fetchOrder()
  }, [orderId, fetchOrder])

  // Polling para PIX pendente (a cada 5s, max 10 min)
  useEffect(() => {
    if (!order || order.method !== 'PIX' || order.status === 'confirmed') return
    setPolling(true)
    let attempts = 0
    const MAX = 120 // 120 × 5s = 10 min

    const interval = setInterval(async () => {
      attempts++
      const status = await fetchOrder()
      if (status === 'confirmed' || attempts >= MAX) {
        clearInterval(interval)
        setPolling(false)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [order?.method, order?.status, fetchOrder]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Loading state ──────────────────────────────────────────────────────────
  if (!orderId || loadError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-sm text-foreground-alt">
          {loadError ? 'Erro ao carregar pedido.' : 'Pedido não encontrado.'}
        </p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-border border-t-brand-orange" />
      </div>
    )
  }

  // ── Cartão confirmado / PIX confirmado ─────────────────────────────────────
  if (order.status === 'confirmed') {
    return (
      <div className="min-h-screen bg-neutral-100 py-12">
        <div className="mx-auto w-full max-w-[480px] px-4">
          <div className="flex flex-col items-center gap-6 rounded-xl bg-white p-8 shadow-sm text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-green-600">
                <path
                  d="M4 12l5 5L20 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h1 className="font-dm text-h2 text-brand-navy">Pagamento confirmado!</h1>
              <p className="mt-2 text-sm text-foreground-alt">
                Recebemos seu pagamento de{' '}
                <strong className="text-brand-navy">R$ {formatCurrency(order.amount)}</strong> referente a{' '}
                <strong className="text-brand-navy">{order.productName}</strong>.
              </p>
            </div>
            <div className="w-full rounded-lg border border-brand-border bg-neutral-50 p-4 text-center">
              <p className="text-sm font-semibold text-brand-navy">O que acontece agora:</p>
              <p className="mt-2 text-sm text-foreground-alt">Nossa equipe já foi notificada.</p>
              <p className="mt-1 text-sm text-foreground-alt">
                Você receberá todas as informações do processo pelo WhatsApp{' '}
                {order.phone && <strong className="text-brand-navy">{formatPhone(order.phone)}</strong>}
              </p>
            </div>
            <a href="/" className="btn-secondary w-full !rounded-md text-center">
              Voltar ao site
            </a>
          </div>
        </div>
      </div>
    )
  }

  // ── PIX pendente ───────────────────────────────────────────────────────────
  if (order.method === 'PIX') {
    return (
      <div className="min-h-screen bg-neutral-100 py-12">
        <div className="mx-auto w-full max-w-[480px] px-4">
          <div className="flex flex-col gap-4">
            <div className="rounded-xl bg-white p-6 shadow-sm text-center">
              <h1 className="font-dm text-h2 text-brand-navy">Finalize seu pagamento</h1>
              <p className="mt-1 text-sm text-foreground-alt">
                Escaneie o QR Code ou use o código copia e cola para pagar via PIX
              </p>

              {/* Valor */}
              <div className="mt-4 rounded-lg border border-brand-border bg-neutral-50 p-3">
                <p className="text-txt-xs text-foreground-alt">Valor a pagar</p>
                <p className="font-dm text-h2 text-brand-navy">R$ {formatCurrency(order.amount)}</p>
                <p className="text-txt-xs text-foreground-alt">{order.productName}</p>
              </div>

              {/* QR Code */}
              {order.pixQrCode ? (
                <div className="mt-4 flex justify-center">
                  <img
                    src={`data:image/png;base64,${order.pixQrCode}`}
                    alt="QR Code PIX"
                    width={200}
                    height={200}
                    className="rounded-lg border border-brand-border"
                  />
                </div>
              ) : (
                <div className="mt-4 flex h-[200px] items-center justify-center rounded-lg border border-brand-border bg-neutral-50">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-border border-t-brand-orange" />
                </div>
              )}

              {/* Código copia e cola */}
              {order.pixPayload && (
                <div className="mt-4">
                  <p className="text-txt-xs text-foreground-alt">Código PIX copia e cola</p>
                  <div className="mt-1 rounded-md border border-brand-border bg-neutral-50 p-2">
                    <p className="break-all text-xs text-brand-navy">{order.pixPayload}</p>
                  </div>
                  <CopyButton text={order.pixPayload} />
                </div>
              )}

              {/* Expira em */}
              {order.pixExpiresAt && (
                <p className="mt-3 text-txt-xs text-foreground-alt">
                  Válido até{' '}
                  {new Date(order.pixExpiresAt).toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              )}
            </div>

            {/* Status de polling */}
            <div className="rounded-lg border border-brand-border bg-white p-4">
              <div className="flex items-center gap-3">
                {polling ? (
                  <div className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-brand-border border-t-brand-orange" />
                ) : (
                  <div className="h-4 w-4 shrink-0 rounded-full bg-brand-border" />
                )}
                <p className="text-sm text-foreground-alt">
                  {polling
                    ? 'Aguardando confirmação do pagamento...'
                    : 'Verificação pausada. Recarregue para atualizar.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Cartão pendente (processando) ──────────────────────────────────────────
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100">
      <div className="flex flex-col items-center gap-4 rounded-xl bg-white p-8 shadow-sm text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-border border-t-brand-orange" />
        <p className="text-sm text-foreground-alt">Processando seu pagamento...</p>
      </div>
    </div>
  )
}

export default function ObrigadoPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-border border-t-brand-orange" />
        </div>
      }
    >
      <ObrigadoContent />
    </Suspense>
  )
}
