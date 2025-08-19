import type { Metadata } from 'next'
import { headers } from 'next/headers'
import './globals.css'
import SiteHeader from '@/components/SiteHeader'
import Footer from '@/components/Footer'
import LiveChat from '@/components/LiveChat'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import MobileNavigation from '@/components/MobileNavigation'
import SwipeIndicator from '@/components/SwipeIndicator'
import OfflineIndicator from '@/components/OfflineIndicator'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'

export const metadata: Metadata = {
  title: 'Cleared Advisory Group - Your Gateway to Cleared IT Opportunities',
  description: 'Bridging the gap for National Guard, Reservists, Veterans, and cleared professionals seeking government contracting opportunities.',
  keywords: 'security clearance, government contracting, IT jobs, military transition, cleared jobs',
  manifest: '/manifest.json',
  themeColor: '#1e293b',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-white transition-colors duration-300">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-500 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Skip to main content
        </a>
        <ErrorBoundary>
          <ServiceWorkerRegistration />
          <OfflineIndicator />
          <SiteHeader />
          <MobileNavigation />
          <SwipeIndicator />
          <main id="main-content" className="pt-16" tabIndex={-1}>
            <ErrorBoundary showDetails={false}>
              {children}
            </ErrorBoundary>
          </main>
          <Footer />
          <LiveChat />
        </ErrorBoundary>
      </body>
    </html>
  )
}