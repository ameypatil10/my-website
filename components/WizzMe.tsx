'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Mic, Users, TrendingUp } from 'lucide-react'
import { wizzme } from '@/lib/data'
import { staggerContainer, fadeUp, viewportConfig } from '@/lib/animations'

const iconMap: Record<string, React.ElementType> = {
  MessageCircle,
  Mic,
  Users,
  TrendingUp,
}

const gradientMap: Record<string, string> = {
  'from-accent to-accent-bright': 'linear-gradient(135deg, #5E6AD2, #818CF8)',
  'from-cyan to-accent': 'linear-gradient(135deg, #00d4ff, #5E6AD2)',
  'from-accent-bright to-cyan': 'linear-gradient(135deg, #818CF8, #00d4ff)',
  'from-cyan to-accent-bright': 'linear-gradient(135deg, #00d4ff, #818CF8)',
}

function PillarCard({ pillar, index }: { pillar: typeof wizzme.pillars[0]; index: number }) {
  const Icon = iconMap[pillar.icon]
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6
    setTilt({ x: rotateX, y: rotateY })
  }, [])

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }, [])

  const gradient = gradientMap[pillar.gradient] || gradientMap['from-accent to-accent-bright']

  return (
    <motion.div
      variants={fadeUp}
      className="relative overflow-hidden rounded-[20px] border p-8 transition-all duration-400 ease-expo-out group"
      style={{
        background: 'var(--bg-card)',
        borderColor: isHovered ? 'rgba(255,255,255,0.12)' : 'var(--border)',
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease, border-color 0.3s ease',
        boxShadow: isHovered ? '0 12px 40px rgba(0,0,0,0.3)' : 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top-left gradient accent bar */}
      <div
        className="absolute top-0 left-0 w-[60px] h-[3px] rounded-br-full transition-all duration-300"
        style={{
          background: gradient,
          opacity: isHovered ? 1 : 0.5,
          width: isHovered ? '100px' : '60px',
        }}
      />

      {/* Corner glow on hover */}
      <div
        className="absolute top-0 left-0 w-[120px] h-[120px] pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse at top left, ${pillar.gradient.includes('cyan') ? 'rgba(0,212,255,0.08)' : 'rgba(94,106,210,0.08)'}, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Icon container */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300"
        style={{
          background: gradient,
          transform: isHovered ? 'rotate(6deg) scale(1.08)' : 'rotate(0deg) scale(1)',
        }}
      >
        {Icon && <Icon size={22} className="text-white" />}
      </div>

      {/* Title */}
      <h3 className="text-[20px] font-bold text-foreground tracking-[-0.3px]">
        {pillar.title}
      </h3>

      {/* Subtitle */}
      <p className="text-[14px] font-medium text-accent-bright mt-1">
        {pillar.subtitle}
      </p>

      {/* Description */}
      <p className="text-[14px] text-foreground-muted mt-3 leading-relaxed">
        {pillar.description}
      </p>
    </motion.div>
  )
}

export default function WizzMe() {
  return (
    <section
      id="wizzme"
      className="relative px-6 md:px-12 py-[120px] overflow-hidden"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 40%, rgba(94,106,210,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 40% 50% at 50% 60%, rgba(0,212,255,0.04) 0%, transparent 60%)
          `,
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Top: Badge + Mission */}
        <motion.div
          className="text-center max-w-3xl mx-auto"
          variants={staggerContainer(100)}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
        >
          {/* Currently Building badge */}
          <motion.div variants={fadeUp} className="flex justify-center">
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full"
              style={{
                background: 'rgba(0,212,255,0.06)',
                border: '1px solid rgba(0,212,255,0.15)',
              }}
            >
              <span className="relative w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-cyan animate-pulse" />
                <span
                  className="absolute inset-[-3px] rounded-full border border-cyan/40"
                  style={{ animation: 'glow-ring 2s ease-out infinite' }}
                />
                <span
                  className="absolute inset-[-3px] rounded-full border border-cyan/30"
                  style={{ animation: 'glow-ring 2s ease-out infinite 0.6s' }}
                />
              </span>
              <span className="text-[12px] font-medium tracking-[1.5px] uppercase text-cyan">
                Currently Building
              </span>
            </div>
          </motion.div>

          {/* WizzMe title */}
          <motion.h2
            variants={fadeUp}
            className="text-[48px] md:text-[64px] font-extrabold tracking-[-2px] leading-none mt-6"
          >
            <a
              href="https://beta.wizzme.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity duration-250"
              style={{
                background: 'linear-gradient(135deg, #5E6AD2 0%, #00d4ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              WizzMe
            </a>
          </motion.h2>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="text-[18px] md:text-[20px] text-foreground-muted mt-4 font-medium"
          >
            {wizzme.tagline}
          </motion.p>

          {/* Mission */}
          <motion.p
            variants={fadeUp}
            className="text-base text-foreground-dim mt-4 leading-relaxed max-w-[580px] mx-auto"
          >
            {wizzme.mission}
          </motion.p>

          {/* Insight quote */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex justify-center"
          >
            <blockquote
              className="border-l-2 border-accent pl-6 text-left max-w-[480px]"
            >
              <p className="italic text-lg text-foreground-muted leading-relaxed">
                &ldquo;{wizzme.insight}&rdquo;
              </p>
            </blockquote>
          </motion.div>
        </motion.div>

        {/* Middle: Four Pillars */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16"
          variants={staggerContainer(100)}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
        >
          {wizzme.pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </motion.div>

        {/* Bottom: Role + Feature chips */}
        <motion.div
          className="mt-16 text-center"
          variants={staggerContainer(30)}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
        >
          {/* Role badge */}
          <motion.div variants={fadeUp} className="flex justify-center">
            <div
              className="relative inline-block rounded-full p-[1px]"
              style={{
                background: 'linear-gradient(135deg, #5E6AD2, #00d4ff)',
              }}
            >
              <span
                className="inline-block px-5 py-2 rounded-full text-[13px] font-semibold tracking-wide text-foreground"
                style={{
                  background: 'var(--bg-base, #050506)',
                }}
              >
                {wizzme.role}
              </span>
            </div>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-[14px] text-foreground-muted mt-4 max-w-[560px] mx-auto leading-relaxed"
          >
            {wizzme.roleDescription}
          </motion.p>

          {/* Feature chips */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mt-6"
            variants={staggerContainer(30)}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
          >
            {wizzme.features.map((feature, i) => (
              <motion.span
                key={i}
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] text-foreground-muted border"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: '#00d4ff' }}
                />
                {feature}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
