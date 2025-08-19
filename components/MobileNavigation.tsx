'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { 
  Menu, 
  X, 
  Home, 
  Info, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  User,
  ChevronRight,
  LogIn,
  UserPlus,
  Settings,
  LogOut,
  ChevronDown,
  Award,
  Target,
  Book
} from 'lucide-react'

interface NavItem {
  href: string
  label: string
  icon: React.ElementType
  children?: NavItem[]
}

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const focusTrapRef = useFocusTrap(isOpen)

  useEffect(() => {
    const userData = localStorage.getItem('currentUser')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isRightSwipe && !isOpen) {
      setIsOpen(true)
    }
    if (isLeftSwipe && isOpen) {
      setIsOpen(false)
    }
  }

  // Swipe to close on the menu panel
  const handleMenuSwipe = (_event: any, info: PanInfo) => {
    if (info.offset.x < -100) {
      setIsOpen(false)
    }
  }

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    )
  }

  const navItems: NavItem[] = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About', icon: Info },
    { 
      href: '/services', 
      label: 'Services', 
      icon: Briefcase,
      children: [
        { href: '/services#resume', label: 'Resume Services', icon: FileText },
        { href: '/services#interview', label: 'Interview Prep', icon: MessageSquare },
        { href: '/services#career', label: 'Career Coaching', icon: Target }
      ]
    },
    { href: '/jobs', label: 'Jobs', icon: Briefcase },
    { href: '/mock-interview', label: 'Mock Interview', icon: MessageSquare },
    { 
      href: '/resources', 
      label: 'Resources', 
      icon: Book,
      children: [
        { href: '/resources#guides', label: 'Career Guides', icon: Book },
        { href: '/resources#templates', label: 'Templates', icon: FileText },
        { href: '/resources#certifications', label: 'Certifications', icon: Award }
      ]
    }
  ]

  const userMenuItems = user ? [
    { href: '/dashboard', label: 'Dashboard', icon: User },
    { href: '/profile', label: 'Profile', icon: Settings },
  ] : [
    { href: '/login', label: 'Sign In', icon: LogIn },
    { href: '/register/select-type', label: 'Create Account', icon: UserPlus }
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-6 right-4 z-50 p-2 bg-white/10 backdrop-blur-sm rounded-lg"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Swipe Detection Area (left edge) */}
      <div
        className="md:hidden fixed left-0 top-0 w-4 h-full z-40"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              ref={focusTrapRef}
              id="mobile-nav-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleMenuSwipe}
              className="md:hidden fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-gray-900 to-black z-50 overflow-y-auto"
            >
              {/* Swipe Indicator */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2" aria-hidden="true">
                <div className="w-1 h-20 bg-white/20 rounded-full" />
              </div>

              <div className="p-6">
                {/* Logo/Header */}
                <div className="mb-8">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Close navigation menu"
                    data-close-modal
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <h2 className="text-2xl font-bold text-white" id="mobile-nav-title">CAG Menu</h2>
                  <p className="text-sm text-gray-400 mt-1">Swipe left to close</p>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-2" aria-labelledby="mobile-nav-title">
                  {navItems.map((item) => (
                    <div key={item.href}>
                      {item.children ? (
                        <>
                          <button
                            onClick={() => toggleExpanded(item.label)}
                            className="w-full flex items-center justify-between p-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                            aria-expanded={expandedItems.includes(item.label)}
                            aria-controls={`submenu-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <div className="flex items-center">
                              <item.icon className="w-5 h-5 mr-3" />
                              <span>{item.label}</span>
                            </div>
                            <motion.div
                              animate={{ rotate: expandedItems.includes(item.label) ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </motion.div>
                          </button>
                          
                          <AnimatePresence>
                            {expandedItems.includes(item.label) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div 
                                  className="ml-8 space-y-1 mt-1"
                                  id={`submenu-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                                  role="group"
                                  aria-label={`${item.label} submenu`}
                                >
                                  {item.children.map((child) => (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={() => setIsOpen(false)}
                                      className="flex items-center p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors"
                                    >
                                      <child.icon className="w-4 h-4 mr-2" />
                                      <span className="text-sm">{child.label}</span>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center p-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <item.icon className="w-5 h-5 mr-3" />
                          <span>{item.label}</span>
                          <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Divider */}
                <div className="my-6 border-t border-white/20" />

                {/* User Menu */}
                <div className="space-y-2">
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center p-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  
                  {user && (
                    <button
                      onClick={() => {
                        localStorage.removeItem('currentUser')
                        setUser(null)
                        setIsOpen(false)
                      }}
                      className="w-full flex items-center p-3 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      <span>Sign Out</span>
                    </button>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="mt-8 p-4 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-400 mb-3">Quick Actions</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/mock-interview"
                      onClick={() => setIsOpen(false)}
                      className="p-3 bg-blue-600/20 hover:bg-blue-600/30 rounded text-center text-sm text-blue-400 transition-colors"
                    >
                      Practice Interview
                    </Link>
                    <Link
                      href="/jobs"
                      onClick={() => setIsOpen(false)}
                      className="p-3 bg-green-600/20 hover:bg-green-600/30 rounded text-center text-sm text-green-400 transition-colors"
                    >
                      Browse Jobs
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Swipe Hint (shows once) */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="md:hidden fixed left-0 top-32 bg-blue-600 text-white px-3 py-2 rounded-r-lg text-xs"
          onAnimationComplete={() => {
            setTimeout(() => {
              const hint = document.getElementById('swipe-hint')
              if (hint) hint.style.display = 'none'
            }, 3000)
          }}
          id="swipe-hint"
        >
          Swipe right for menu →
        </motion.div>
      )}
    </>
  )
}