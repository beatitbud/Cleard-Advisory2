'use client'

import { useEffect, useRef } from 'react'

interface LoadingAnnouncerProps {
  isLoading: boolean
  loadingMessage?: string
  completedMessage?: string
  errorMessage?: string
  status?: 'loading' | 'success' | 'error'
}

export default function LoadingAnnouncer({
  isLoading,
  loadingMessage = 'Loading, please wait',
  completedMessage = 'Loading complete',
  errorMessage = 'An error occurred',
  status = 'loading'
}: LoadingAnnouncerProps) {
  const announcerRef = useRef<HTMLDivElement>(null)
  const previousStatus = useRef<string>('')

  useEffect(() => {
    if (!announcerRef.current) return

    let message = ''
    
    if (isLoading && status === 'loading') {
      message = loadingMessage
    } else if (!isLoading && status === 'success') {
      message = completedMessage
    } else if (!isLoading && status === 'error') {
      message = errorMessage
    }

    // Only announce if status changed
    if (message && previousStatus.current !== status) {
      announcerRef.current.textContent = message
      previousStatus.current = status
      
      // Clear the message after announcement
      setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = ''
        }
      }, 1000)
    }
  }, [isLoading, status, loadingMessage, completedMessage, errorMessage])

  return (
    <>
      {/* Live region for screen readers */}
      <div
        ref={announcerRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      
      {/* Visual loading indicator */}
      {isLoading && (
        <div className="flex items-center justify-center" aria-hidden="true">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dynamic-green"></div>
        </div>
      )}
    </>
  )
}

// Hook for managing loading states with announcements
export function useLoadingAnnouncement() {
  const announcementQueue = useRef<string[]>([])
  
  const announce = (message: string) => {
    // Create a temporary live region
    const liveRegion = document.createElement('div')
    liveRegion.setAttribute('role', 'status')
    liveRegion.setAttribute('aria-live', 'polite')
    liveRegion.className = 'sr-only'
    liveRegion.textContent = message
    
    document.body.appendChild(liveRegion)
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(liveRegion)
    }, 1000)
  }
  
  return { announce }
}