'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, User, Home, Search, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isMobileNavEnabled] = useState(true) // Feature flag for new mobile nav
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    // Temporarily disabled to show logged-out view
    // const userData = localStorage.getItem('user')
    // if (userData) {
    //   setUser(JSON.parse(userData))
    // }
  }, [])

  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/jobs', label: 'Jobs' },
    { href: '/mock-interview', label: 'Mock Interview' },
    { href: '/resources', label: 'Resources' },
  ]

  return (
    <nav className="fixed top-0 w-full navbar-gradient navbar-shadow z-50" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            {/* Logo and Brand */}
            <Link href="/" className="flex items-center space-x-3 group" aria-label="Cleared Advisory Group - Home">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-blue via-cyber-cyan to-sky-blue rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Main button */}
                <div className="relative p-2.5 bg-gradient-to-br from-sky-blue via-cyber-cyan to-dynamic-blue rounded-xl group-hover:shadow-xl group-hover:shadow-cyber-cyan/60 transition-all duration-300 group-hover:scale-110 border border-cyber-cyan/30">
                  <Home className="w-5 h-5 text-white drop-shadow-lg" strokeWidth={2.5} />
                </div>
                
                {/* Pulse animation on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-sky-blue to-cyber-cyan opacity-0 group-hover:opacity-50 group-hover:animate-ping"></div>
              </div>
              
              <div>
                <span className="text-white font-montserrat font-bold text-xl whitespace-nowrap group-hover:text-sky-blue transition-colors duration-300">CAG</span>
                <p className="text-gray-300 text-xs whitespace-nowrap group-hover:text-sky-blue transition-colors duration-300">Cleared Advisory Group</p>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center relative">
              <div className={`relative transition-all duration-300 ${isSearchFocused ? 'w-80' : 'w-64'}`}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search jobs, resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-sky-blue focus:bg-gray-800 transition-all duration-300"
                  data-search-input
                />
              </div>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-sky-blue to-cyber-cyan rounded-lg blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                
                {/* Button */}
                <div className="relative text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-sky-blue/30 hover:to-cyber-cyan/30 px-3 py-2 rounded-lg transition-all duration-300 whitespace-nowrap text-sm font-medium border border-transparent hover:border-cyber-cyan/50">
                  {link.label}
                </div>
                
                {/* Pulse animation on hover */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-sky-blue to-cyber-cyan opacity-0 group-hover:opacity-30 group-hover:animate-ping"></div>
              </Link>
            ))}
            
            {/* Action Buttons */}
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center text-white hover:text-sky-blue transition-colors duration-300 whitespace-nowrap text-sm lg:text-base"
                >
                  <User size={20} className="mr-2" />
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                {/* Sign In Button - Secondary */}
                <Link
                  href="/login"
                  className="px-6 py-2 text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-black transition-all duration-200 whitespace-nowrap text-sm"
                >
                  Sign In
                </Link>
                
                {/* Create Account Button - Primary */}
                <Link href="/register/select-type" className="group">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                    <div className="relative px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg group-hover:bg-blue-600 transition-all duration-200 whitespace-nowrap text-sm">
                      Create Account
                    </div>
                  </div>
                </Link>
              </>
            )}
            
            {/* Theme Toggle */}
            <div aria-label="Theme toggle">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden overflow-hidden transition-all duration-300 ease-in-out max-h-screen opacity-100"
          aria-hidden={!isOpen}
        >
          <div className="bg-gray-900/95 backdrop-blur-xl" role="menu">
            {/* Mobile Search Bar */}
            <div className="p-4 border-b border-gray-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-sky-blue transition-all duration-300"
                />
              </div>
            </div>
            
            <div className="p-4 space-y-2">
              <Link
                href="/"
                className="relative group block"
                onClick={() => setIsOpen(false)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-sky-blue to-cyber-cyan rounded-lg blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-sky-blue/30 hover:to-cyber-cyan/30 px-3 py-2 rounded-lg transition-all duration-300 border border-transparent hover:border-cyber-cyan/50">
                  <Home size={18} />
                  <span>Home</span>
                </div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-sky-blue to-cyber-cyan opacity-0 group-hover:opacity-30 group-hover:animate-ping"></div>
              </Link>
              
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group block"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-blue to-cyber-cyan rounded-lg blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-sky-blue/30 hover:to-cyber-cyan/30 px-3 py-2 rounded-lg transition-all duration-300 border border-transparent hover:border-cyber-cyan/50">
                    {link.label}
                  </div>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-sky-blue to-cyber-cyan opacity-0 group-hover:opacity-30 group-hover:animate-ping"></div>
                </Link>
              ))}
            
              
              {/* Divider */}
              <div className="my-4 border-t border-gray-800" />
              
              {/* User Account Links in Mobile */}
              {user ? (
                <Link
                  href="/dashboard"
                  className="relative group block"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-blue to-cyber-cyan rounded-lg blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-sky-blue/30 hover:to-cyber-cyan/30 px-3 py-2 rounded-lg transition-all duration-300 border border-transparent hover:border-cyber-cyan/50">
                    <User size={18} />
                    <span>Dashboard</span>
                  </div>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-sky-blue to-cyber-cyan opacity-0 group-hover:opacity-30 group-hover:animate-ping"></div>
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="relative group block"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-blue to-cyber-cyan rounded-lg blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                    <div className="relative text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-sky-blue/30 hover:to-cyber-cyan/30 px-3 py-2 rounded-lg transition-all duration-300 border border-transparent hover:border-cyber-cyan/50">
                      Sign In
                    </div>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-sky-blue to-cyber-cyan opacity-0 group-hover:opacity-30 group-hover:animate-ping"></div>
                  </Link>
                  <Link
                    href="/register/select-type"
                    className="group block mt-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                      <div className="relative text-center px-3 py-2 bg-blue-500 text-white font-semibold rounded-lg group-hover:bg-blue-600 transition-all duration-200">
                        Create Account
                      </div>
                    </div>
                  </Link>
                </>
              )}
              
              {/* Theme Toggle in Mobile */}
              <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between">
                <span className="text-gray-400 text-sm">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </nav>
  )
}