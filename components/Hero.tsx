'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import MobileFriendlyQR from './MobileFriendlyQR'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-16">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
          >
            Your Security Clearance is Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mt-2">
              Gateway to Success
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            We help cleared professionals transition into lucrative IT contracting careers 
            with personalized guidance and proven strategies.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            {/* Create Account Button - Primary */}
            <Link href="/register/select-type" className="group">
              <div className="relative wiggle-attention">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                {/* Main button */}
                <button className="relative px-8 py-4 bg-sky-500 text-white font-semibold rounded-lg shadow-lg group-hover:bg-sky-600 group-hover:shadow-xl transform group-hover:-translate-y-1 transition-all duration-200">
                  Create Account
                </button>
              </div>
            </Link>
            
            {/* Log In Button - Secondary */}
            <Link href="/login">
              <button className="px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-black transition-all duration-200">
                Log In
              </button>
            </Link>
          </motion.div>

          {/* QR Code */}
          <div className="flex justify-center">
            <MobileFriendlyQR 
              value="https://caglive.vercel.app" 
              size={160}
              className="mt-4"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}