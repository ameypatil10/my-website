'use client'
import { useScroll, useTransform, motion } from 'framer-motion'

export function BackgroundGradient() {
  const { scrollYProgress } = useScroll()

  const color = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
    [
      'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(94,106,210,0.08) 0%, transparent 60%)',
      'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,212,255,0.07) 0%, transparent 60%)',
      'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(94,106,210,0.06) 0%, transparent 60%)',
      'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(129,140,248,0.07) 0%, transparent 60%)',
      'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.06) 0%, transparent 60%)',
      'radial-gradient(ellipse 60% 50% at 40% 60%, rgba(94,106,210,0.07) 0%, transparent 60%)',
      'radial-gradient(ellipse 60% 50% at 60% 50%, rgba(129,140,248,0.05) 0%, transparent 60%)',
      'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 60%)',
    ]
  )

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: color }}
    />
  )
}
