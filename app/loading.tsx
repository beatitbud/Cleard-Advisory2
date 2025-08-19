export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-ops-charcoal">
      <div className="text-center" role="status" aria-label="Loading page content">
        <div className="w-16 h-16 border-4 border-dynamic-green border-t-transparent rounded-full animate-spin mx-auto mb-4" aria-hidden="true"></div>
        <p className="text-intel-gray">Loading...</p>
        <span className="sr-only">Please wait while the page loads</span>
      </div>
    </div>
  )
}