import { headers } from 'next/headers'
import Link from 'next/link'
import { Home, User } from 'lucide-react'
import { getUser } from '@/lib/auth'
import MoreMenu from './MoreMenu'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/mock-interview', label: 'Mock Interview' },
  { href: '/resources', label: 'Resources' },
]

export default async function SiteHeader() {
  const headersList = headers()
  const pathname = headersList.get('x-pathname') || '/'
  const { user } = await getUser()
  const isHomepage = pathname === '/'

  if (isHomepage) {
    return (
      <header className="fixed top-0 w-full bg-slate-950 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-cyan-500 to-sky-500 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-2.5 bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-600 rounded-xl group-hover:shadow-xl group-hover:shadow-cyan-500/60 transition-all duration-300 group-hover:scale-110 border border-cyan-500/30">
                  <Home className="w-5 h-5 text-white drop-shadow-lg" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <span className="text-white font-bold text-xl whitespace-nowrap group-hover:text-sky-400 transition-colors duration-300">CAG</span>
                <p className="text-gray-400 text-xs whitespace-nowrap group-hover:text-sky-400 transition-colors duration-300">Cleared Advisory Group</p>
              </div>
            </Link>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              <MoreMenu links={navLinks} />
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                Log In
              </Link>
              <Link href="/register" className="group">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                  <div className="relative px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-lg group-hover:bg-sky-600 transition-colors duration-200">
                    Create Account
                  </div>
                </div>
              </Link>
              {/* Theme Toggle */}
              <div className="ml-2 pl-2 border-l border-slate-700">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="fixed top-0 w-full bg-slate-950 border-b border-slate-800 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-cyan-500 to-sky-500 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-2.5 bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-600 rounded-xl group-hover:shadow-xl group-hover:shadow-cyan-500/60 transition-all duration-300 group-hover:scale-110 border border-cyan-500/30">
                <Home className="w-5 h-5 text-white drop-shadow-lg" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <span className="text-white font-bold text-xl whitespace-nowrap group-hover:text-sky-400 transition-colors duration-300">CAG</span>
              <p className="text-gray-400 text-xs whitespace-nowrap group-hover:text-sky-400 transition-colors duration-300">Cleared Advisory Group</p>
            </div>
          </Link>

          {/* Center Navigation - Desktop Only */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <MoreMenu links={navLinks} />
          </div>

          {/* Right Section - Auth Aware */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white text-sm font-medium">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Log In
                </Link>
                <Link href="/register" className="group">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                    <div className="relative px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-lg group-hover:bg-sky-600 transition-colors duration-200">
                      Create Account
                    </div>
                  </div>
                </Link>
              </>
            )}
            {/* Theme Toggle - More Visible */}
            <div className="ml-2 pl-2 border-l border-slate-700">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}