'use client'

import { motion } from 'framer-motion'

export function SectionDivider() {
  return (
    <div className="relative py-2">
      {/* Radial glow at section boundary */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[80px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 40% 50% at 50% 50%, rgba(94,106,210,0.04) 0%, transparent 70%)',
        }}
      />
      {/* Animated line that draws from center outward */}
      <motion.div
        className="w-full h-px origin-center"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--border-hover), transparent)',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}
