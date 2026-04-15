'use client'

import { useEffect, useState, useRef } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { WHATSAPP_GERAL } from '@/lib/config'

export function WhatsappFloat() {
  const [faded, setFaded] = useState(false)
  const [shaking, setShaking] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    function onScroll() {
      if (!faded) setFaded(true)

      if (timerRef.current) clearTimeout(timerRef.current)

      timerRef.current = setTimeout(() => {
        setFaded(false)
        setShaking(true)
        setTimeout(() => setShaking(false), 600)
      }, 6000)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [faded])

  return (
    <>
      <style>{`
        @keyframes wpp-shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-4px) rotate(-4deg); }
          40%       { transform: translateX(4px) rotate(4deg); }
          60%       { transform: translateX(-3px) rotate(-2deg); }
          80%       { transform: translateX(3px) rotate(2deg); }
        }
      `}</style>
      <a
        href={WHATSAPP_GERAL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        style={{
          animation: shaking ? 'wpp-shake 0.6s ease-in-out' : 'none',
          opacity: faded ? 0.3 : 1,
          transition: 'opacity 0.4s ease, width 0.2s ease',
        }}
        className="fixed right-0 bottom-24 z-50 flex items-center justify-center w-14 h-14 bg-[#1a5c38] rounded-l-full shadow-lg hover:w-16 hover:opacity-100"
      >
        <FaWhatsapp size={28} color="white" />
      </a>
    </>
  )
}
