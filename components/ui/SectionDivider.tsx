'use client'
import { motion } from 'framer-motion'

export function SectionDivider() {
  return (
    <div className="relative py-8 md:py-12 overflow-hidden">
      {/* Large ambient glow at section boundary */}
      <motion.div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[200px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(94,106,210,0.06) 0%, transparent 70%)',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Animated center line — draws outward with glow */}
      <motion.div
        className="relative w-full h-px origin-center"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(94,106,210,0.4), var(--cyan), rgba(94,106,210,0.4), transparent)',
          }}
        />
        {/* Glow underneath the line */}
        <div
          className="absolute inset-x-[20%] -top-[2px] h-[5px] blur-[3px]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)',
          }}
        />
      </motion.div>
    </div>
  )
}
