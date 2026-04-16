'use client'

import { useEffect } from 'react'

export function HeaderHeightSync() {
  useEffect(() => {
    function sync() {
      const header = document.querySelector('header')
      if (header) {
        document.documentElement.style.setProperty(
          '--header-height',
          `${header.offsetHeight}px`
        )
      }
    }

    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  return null
}
