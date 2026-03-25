'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  className?: string
  width?: 'full' | 'auto'
}

export function ScrollReveal({
  children,
  delay = 0,
  className,
  width = 'auto',
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={{ width: width === 'full' ? '100%' : 'auto' }}
    >
      {children}
    </motion.div>
  )
}
