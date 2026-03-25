'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  end: number
  suffix: string
}

export function AnimatedCounter({ end, suffix }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 1500
    let start: number | null = null
    let rafId: number

    function step(timestamp: number) {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * end))

      if (progress < 1) {
        rafId = requestAnimationFrame(step)
      }
    }

    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [isInView, end])

  return (
    <span
      ref={ref}
      className="text-[36px] font-[800] tracking-[-2px]"
      style={{
        background: 'linear-gradient(135deg, var(--foreground), var(--accent-bright))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {count}{suffix}
    </span>
  )
}
