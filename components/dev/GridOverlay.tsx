'use client'

/**
 * DEV ONLY — Ferramentas visuais de alinhamento.
 * Nunca renderiza em produção (NODE_ENV guard no layout.tsx).
 * Pasta /components/dev/ está no .gitignore.
 *
 * Ativar/desativar: Alt + G
 *
 * Camadas (z-index):
 *   9998 — Grid de 12 colunas (verde, opacidade 0.1)
 *   9999 — Frame do container (borda laranja, sem preenchimento)
 */

import { useEffect, useState } from 'react'

export function GridOverlay() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'g') setVisible(v => !v)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!visible) return null

  return (
    <>
      {/* ── Camada 1: Grid de 12 colunas ── */}
      <div className="fixed inset-0 z-[9998] pointer-events-none">
        <div className="w-full h-full mx-auto px-6 md:px-16 xl:px-24 max-w-[1200px]">
          <div className="h-full grid grid-cols-12 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-full bg-green-400 opacity-10" />
            ))}
          </div>
        </div>
      </div>

      {/* ── Camada 2: Frame do container interno (1088px) ── */}
      <div className="fixed inset-0 z-[9999] pointer-events-none">
        {/* Replica .container-ms */}
        <div className="w-full h-full mx-auto px-6 md:px-16 xl:px-24 max-w-[1200px]">
          {/* Replica .content-ms — max-w-container = 1200px */}
          <div
            className="h-full mx-auto"
            style={{
              maxWidth: '1200px',
              outline: '3px dashed rgba(255, 100, 0, 0.6)',
              outlineOffset: '-1px',
            }}
          />
        </div>
      </div>

      {/* Badge indicador */}
      <div className="fixed bottom-4 right-4 z-[10000] bg-black/70 text-white text-xs font-mono px-3 py-1.5 rounded flex items-center gap-3 select-none pointer-events-none">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 bg-green-400 opacity-60 rounded-sm" />
          Grid
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 border border-dashed border-orange-400 rounded-sm" />
          Container
        </span>
        <span className="text-white/40">Alt+G</span>
      </div>
    </>
  )
}
