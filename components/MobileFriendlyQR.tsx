'use client'

import { QRCodeSVG } from 'qrcode.react'
import { motion } from 'framer-motion'

interface MobileFriendlyQRProps {
  value: string
  size?: number
  className?: string
}

export default function MobileFriendlyQR({ 
  value, 
  size = 160, 
  className = '' 
}: MobileFriendlyQRProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className={`inline-block p-4 bg-white rounded-xl shadow-lg ${className}`}
    >
      <QRCodeSVG
        value={value}
        size={size}
        bgColor="transparent"
        fgColor="#000000"
        level="M"
        includeMargin={false}
        className="rounded-lg"
      />
    </motion.div>
  )
}