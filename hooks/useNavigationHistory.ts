import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const STORAGE_KEY = 'lastVisitedPage'
const PROTECTED_ROUTES = ['/login', '/register', '/logout']

export function useNavigationHistory() {
  const pathname = usePathname()

  useEffect(() => {
    // Don't save protected routes
    if (!PROTECTED_ROUTES.includes(pathname)) {
      localStorage.setItem(STORAGE_KEY, pathname)
    }
  }, [pathname])
}

export function getLastVisitedPage(): string {
  if (typeof window === 'undefined') return '/dashboard'
  return localStorage.getItem(STORAGE_KEY) || '/dashboard'
}

export function clearNavigationHistory() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY)
  }
}