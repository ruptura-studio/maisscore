'use client'

import { useState, useEffect, useCallback, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'

interface OrderData {
  orderId: string
  status: string
  method: string | null
  amount: number
  productName: string
  pixQrCode: string | null
  pixPayload: string | null
  pixExpiresAt: string | null
}

const PIX_POLL_INTERVAL = 5000 // 5s

function formatCurrency(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

function useCountdown(expiresAt: string | null) {
  const [remaining, setRemaining] = useState<number | null>(null)

  useEffect(() => {
    if (!expiresAt) return
    const end = new Date(expiresAt).getTime()

    const tick = () => {
      const diff = Math.max(0, end - Date.now())
      setRemaining(diff)
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [expiresAt])

  if (remaining === null) return null
  const mins = Math.floor(remaining / 60000)
  const secs = Math.floor((remaining % 60000) / 1000)
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

function PagamentoContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  const [data, setData] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const countdown = useCountdown(data?.pixExpiresAt ?? null)

  const fetchOrder = useCallback(async () => {
    if (!orderId) return
    try {
      const res = await fetch(`/api/checkout/${orderId}`)
      const json = await res.json()
      if (!json.success) {
        setError(json.error || 'Pedido não encontrado.')
        return
      }
      setData(json.data)

      if (json.data.status === 'confirmed') {
        clearInterval(pollingRef.current!)
        router.push(`/checkout/confirmado?orderId=${orderId}`)
      }
    } catch {
      setError('Erro ao carregar dados do pagamento.')
    } finally {
      setLoading(false)
    }
  }, [orderId, router])

  useEffect(() => {
    if (!orderId) {
      setError('Pedido não encontrado.')
      setLoading(false)
      return
    }
    fetchOrder()
  }, [fetchOrder, orderId])

  // Polling para PIX
  useEffect(() => {
    if (!data || data.method !== 'PIX' || data.status === 'confirmed') return

    pollingRef.current = setInterval(fetchOrder, PIX_POLL_INTERVAL)
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current)
    }
  }, [data, fetchOrder])

  async function handleCopy() {
    if (!data?.pixPayload) return
    await navigator.clipboard.writeText(data.pixPayload)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-border border-t-brand-orange" />
          <p className="text-sm text-foreground-alt">Gerando pagamento...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-destructive">{error}</p>
          <a href="/checkout" className="btn-secondary">
            Tentar novamente
          </a>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="min-h-screen bg-neutral-100 py-12">
      <div className="container-ms max-w-[600px]">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-1 text-center">
          <h1 className="font-dm text-h2 text-brand-navy">
            {data.method === 'PIX' ? 'Pague com PIX' : 'Pagamento com cartão'}
          </h1>
          <p className="text-sm text-foreground-alt">{data.productName}</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          {/* Valor */}
          <div className="mb-6 flex items-center justify-between border-b border-brand-border pb-4">
            <span className="text-sm text-foreground-alt">Total</span>
            <span className="font-dm text-h3 text-brand-navy">{formatCurrency(data.amount)}</span>
          </div>

          {data.method === 'PIX' && (
            <div className="flex flex-col items-center gap-6">
              {/* Instrução */}
              <p className="text-center text-sm text-foreground-alt">
                Abra o app do seu banco, escolha <strong className="text-brand-navy">Pix</strong> e
                escaneie o QR code ou copie o código abaixo.
              </p>

              {/* QR Code */}
              {data.pixQrCode ? (
                <div className="rounded-lg border-2 border-brand-border p-4">
                  <Image
                    src={`data:image/png;base64,${data.pixQrCode}`}
                    alt="QR Code PIX"
                    width={200}
                    height={200}
                    className="block"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="flex h-[216px] w-[216px] items-center justify-center rounded-lg border-2 border-brand-border">
                  <p className="text-center text-txt-xs text-foreground-alt">QR Code indisponível</p>
                </div>
              )}

              {/* Countdown */}
              {countdown !== null && (
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-brand-orange" />
                  <span className="text-sm text-foreground-alt">
                    Código válido por{' '}
                    <strong className="font-dm text-brand-navy">{countdown}</strong>
                  </span>
                </div>
              )}

              {/* Copia e cola */}
              {data.pixPayload && (
                <div className="w-full">
                  <p className="mb-2 text-label text-foreground-alt">Pix Copia e Cola</p>
                  <div className="flex items-stretch gap-2">
                    <input
                      readOnly
                      value={data.pixPayload}
                      className="min-w-0 flex-1 rounded-md border border-brand-border bg-neutral-100 px-3 py-2 text-xs text-foreground-alt"
                    />
                    <button
                      type="button"
                      onClick={handleCopy}
                      className={`shrink-0 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                        copied
                          ? 'bg-success text-white'
                          : 'bg-brand-navy text-white hover:bg-[#1a2c45]'
                      }`}
                    >
                      {copied ? 'Copiado!' : 'Copiar'}
                    </button>
                  </div>
                </div>
              )}

              {/* Status aguardando */}
              <div className="flex w-full items-center gap-3 rounded-lg bg-neutral-100 p-4">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-border border-t-brand-orange shrink-0" />
                <p className="text-sm text-foreground-alt">
                  Aguardando confirmação do pagamento...
                </p>
              </div>
            </div>
          )}

          {data.method === 'CREDIT_CARD' && (
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-sm text-foreground-alt">
                Você será redirecionado para a página segura de pagamento.
              </p>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="btn-primary"
              >
                Acessar página de pagamento
              </a>
            </div>
          )}
        </div>

        {/* Segurança */}
        <p className="mt-4 text-center text-txt-xs text-foreground-alt">
          Pagamento 100% seguro · processado pela Asaas
        </p>
      </div>
    </div>
  )
}

export default function PagamentoPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-border border-t-brand-orange" />
        </div>
      }
    >
      <PagamentoContent />
    </Suspense>
  )
}
