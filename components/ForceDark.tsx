'use client'

import { useEffect, useRef } from 'react'

export default function ForceDark() {
  const wasOriginallyDark = useRef<boolean>(false)

  useEffect(() => {
    wasOriginallyDark.current = document.documentElement.classList.contains('dark')
    document.documentElement.classList.add('dark')
    document.documentElement.style.colorScheme = 'dark'

    return () => {
      if (!wasOriginallyDark.current) {
        document.documentElement.classList.remove('dark')
        document.documentElement.style.removeProperty('color-scheme')
      }
    }
  }, [])

  return null
}