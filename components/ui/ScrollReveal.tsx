'use client'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  className?: string
  width?: 'full' | 'auto'
  direction?: 'up' | 'down' | 'left' | 'right'
  blur?: boolean
}

export function ScrollReveal({
  children,
  delay = 0,
  className,
  width = 'auto',
  direction = 'up',
  blur = false,
}: ScrollRevealProps) {
  const directionMap = {
    up: { y: 50 },
    down: { y: -40 },
    left: { x: 60 },
    right: { x: -60 },
  }

  const initial = {
    opacity: 0,
    ...directionMap[direction],
    ...(blur ? { filter: 'blur(4px)' } : {}),
  }

  const animate = {
    opacity: 1,
    x: 0,
    y: 0,
    ...(blur ? { filter: 'blur(0px)' } : {}),
  }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={{ width: width === 'full' ? '100%' : 'auto' }}
    >
      {children}
    </motion.div>
  )
}
