'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const STATUS_OPTIONS = ['novo', 'em_atendimento', 'convertido', 'perdido'] as const
const TEMPERATURE_OPTIONS = ['cold', 'warm', 'hot'] as const

export function LeadFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const status = searchParams.get('status') ?? ''
  const temperature = searchParams.get('temperature') ?? ''
  const isClient = searchParams.get('isClient') === 'true'

  function pushFilters(next: { status?: string; temperature?: string; isClient?: boolean }) {
    const params = new URLSearchParams(searchParams.toString())

    if (next.status === undefined) {
      params.delete('status')
    } else if (next.status) {
      params.set('status', next.status)
    } else {
      params.delete('status')
    }

    if (next.temperature === undefined) {
      params.delete('temperature')
    } else if (next.temperature) {
      params.set('temperature', next.temperature)
    } else {
      params.delete('temperature')
    }

    if (next.isClient === undefined) {
      params.delete('isClient')
    } else if (next.isClient) {
      params.set('isClient', 'true')
    } else {
      params.delete('isClient')
    }

    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  function clearFilters() {
    router.push(pathname)
  }

  return (
    <div className="rounded-xl border border-brand-border bg-white p-4">
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-brand-navy">Status</span>
          <select
            value={status}
            onChange={(event) => pushFilters({ status: event.target.value, temperature, isClient })}
            className="h-9 min-w-[180px] rounded border border-brand-border px-2 text-sm text-brand-navy"
          >
            <option value="">Todos</option>
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-brand-navy">Temperatura</span>
          <select
            value={temperature}
            onChange={(event) => pushFilters({ status, temperature: event.target.value, isClient })}
            className="h-9 min-w-[140px] rounded border border-brand-border px-2 text-sm text-brand-navy"
          >
            <option value="">Todas</option>
            {TEMPERATURE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="mb-2 flex items-center gap-2 text-sm text-brand-navy">
          <input
            type="checkbox"
            checked={isClient}
            onChange={(event) => pushFilters({ status, temperature, isClient: event.target.checked })}
            className="h-4 w-4 rounded border-brand-border text-brand-navy"
          />
          Apenas clientes
        </label>

        <button type="button" onClick={clearFilters} className="btn-secondary h-9 text-xs">
          Limpar filtros
        </button>
      </div>
    </div>
  )
}
