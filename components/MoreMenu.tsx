'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

interface NavLink {
  href: string
  label: string
}

interface MoreMenuProps {
  links: NavLink[]
}

export default function MoreMenu({ links }: MoreMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setActiveIndex(-1)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
        setActiveIndex(-1)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
        event.preventDefault()
        setIsOpen(true)
        setActiveIndex(0)
        setTimeout(() => itemRefs.current[0]?.focus(), 0)
      }
      return
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        const nextIndex = activeIndex < links.length - 1 ? activeIndex + 1 : 0
        setActiveIndex(nextIndex)
        itemRefs.current[nextIndex]?.focus()
        break
      case 'ArrowUp':
        event.preventDefault()
        const prevIndex = activeIndex > 0 ? activeIndex - 1 : links.length - 1
        setActiveIndex(prevIndex)
        itemRefs.current[prevIndex]?.focus()
        break
      case 'Home':
        event.preventDefault()
        setActiveIndex(0)
        itemRefs.current[0]?.focus()
        break
      case 'End':
        event.preventDefault()
        setActiveIndex(links.length - 1)
        itemRefs.current[links.length - 1]?.focus()
        break
      case 'Tab':
        setIsOpen(false)
        setActiveIndex(-1)
        break
    }
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="more-menu-dropdown"
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
      >
        More
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          id="more-menu-dropdown"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="more-menu-button"
          className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-slate-900 ring-1 ring-white/10 shadow-lg focus:outline-none"
        >
          <div className="py-1">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                ref={(el) => { itemRefs.current[index] = el }}
                role="menuitem"
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => {
                  setIsOpen(false)
                  setActiveIndex(-1)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setIsOpen(false)
                    setActiveIndex(-1)
                    e.currentTarget.click()
                  } else {
                    handleKeyDown(e)
                  }
                }}
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-800 hover:text-white transition-colors duration-200 focus:bg-slate-800 focus:text-white focus:outline-none"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}