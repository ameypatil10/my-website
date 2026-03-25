"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { awards } from "@/lib/data"
import { staggerContainer, cardReveal, viewportConfig } from "@/lib/animations"
import { useMagnetic } from "@/hooks/useMagnetic"
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice"

function Sparkles({ active }: { active: boolean }) {
  if (!active) return null
  const particles = Array.from({ length: 6 }, (_, i) => ({
    left: `${20 + Math.random() * 60}%`,
    delay: i * 0.1,
    color: i % 2 === 0 ? 'var(--cyan)' : 'var(--accent-bright)',
    size: 3 + Math.random() * 3,
    yOffset: -40 - Math.random() * 30,
    xOffset: (Math.random() - 0.5) * 40,
  }))

  return (
    <>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.left,
            top: 0,
            width: p.size,
            height: p.size,
            background: p.color,
          }}
          initial={{ y: 0, opacity: 0, scale: 0 }}
          animate={{
            y: p.yOffset,
            x: p.xOffset,
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{ duration: 0.8, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </>
  )
}

function AwardCard({ award, index }: { award: typeof awards[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.5 })
  const isTouch = useIsTouchDevice()
  const { ref: magneticRef, position, handleMouseMove, handleMouseLeave } = useMagnetic(0.15)

  return (
    <div
      ref={magneticRef}
      onMouseMove={isTouch ? undefined : handleMouseMove}
      onMouseLeave={isTouch ? undefined : handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        variants={cardReveal}
        className="spotlight-card relative overflow-hidden rounded-[16px] border p-6 transition-all duration-300 group"
        style={{
          background: "var(--bg-card)",
          borderColor: "var(--border)",
          transform: isTouch ? undefined : `translate(${position.x}px, ${position.y}px)`,
          transition: 'transform 0.2s ease-out, box-shadow 0.3s ease, border-color 0.3s ease',
        }}
        whileHover={{
          y: -2,
          borderColor: "rgba(255,255,255,0.12)",
        }}
      >
        <Sparkles active={isInView} />

        {/* Top glow line - animates from center outward */}
        <div
          className="absolute top-[-1px] left-1/2 h-px transition-all duration-500 ease-out group-hover:opacity-100 opacity-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(94,106,210,0.4), transparent)",
            width: "0%",
            transform: "translateX(-50%)",
          }}
        />
        <div
          className="absolute top-[-1px] left-0 right-0 h-px overflow-hidden"
        >
          <div
            className="w-full h-full transition-all duration-500 ease-out origin-center scale-x-0 group-hover:scale-x-100"
            style={{
              background:
                "linear-gradient(90deg, transparent 10%, rgba(94,106,210,0.5) 40%, rgba(0,212,255,0.4) 60%, transparent 90%)",
            }}
          />
        </div>

        <span className="font-mono text-[12px] text-accent-bright">
          {award.year}
        </span>
        <h3 className="text-[15px] font-bold text-foreground mt-2">
          {award.name}
        </h3>
        <p className="text-[13px] text-foreground-muted mt-1.5 leading-relaxed">
          {award.description}
        </p>
      </motion.div>
    </div>
  )
}

export default function Awards() {
  return (
    <section id="awards" className="px-5 md:px-12 py-[60px] md:py-[100px] max-w-[1200px] mx-auto relative">
      <SectionHeader label="// Recognition" title="Awards" />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12"
        variants={staggerContainer(100)}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
      >
        {awards.map((award, i) => (
          <AwardCard key={i} award={award} index={i} />
        ))}
      </motion.div>
    </section>
  )
}
