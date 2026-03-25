'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Layers, Globe, MessageSquare, Image, BarChart3, Rocket } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { skills } from '@/lib/data'
import { staggerContainer, fadeUp, viewportConfig } from '@/lib/animations'

const iconMap: Record<string, React.ElementType> = {
  Layers,
  Globe,
  MessageSquare,
  Image,
  BarChart3,
  Rocket,
}

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const Icon = iconMap[skill.iconName]
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    setTilt({ x: rotateX, y: rotateY })
  }, [])

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }, [])

  return (
    <motion.div
      variants={fadeUp}
      className="relative overflow-hidden rounded-[16px] border p-7 transition-all duration-400 ease-expo-out group"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border)',
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        y: -3,
        boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
        borderColor: 'rgba(255,255,255,0.12)',
      }}
    >
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(90deg, var(--accent), var(--cyan))',
        }}
      />

      {/* Icon with hover rotation/pulse */}
      <div
        className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-4 border transition-transform duration-300"
        style={{
          background: 'rgba(94,106,210,0.1)',
          borderColor: 'rgba(94,106,210,0.15)',
          transform: isHovered ? 'rotate(8deg) scale(1.1)' : 'rotate(0deg) scale(1)',
        }}
      >
        {Icon && <Icon size={20} className="text-accent-bright" />}
      </div>

      {/* Name */}
      <h3 className="text-[16px] font-bold text-foreground tracking-[-0.3px]">
        {skill.name}
      </h3>

      {/* Skill bar with glow trail */}
      <div className="flex items-center gap-2 mt-2">
        <div
          className="flex-1 h-[3px] rounded-[2px] overflow-hidden relative"
          style={{ background: 'var(--surface)' }}
        >
          <motion.div
            className="h-full rounded-[2px] relative"
            style={{
              background: 'linear-gradient(90deg, var(--accent), var(--cyan))',
            }}
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Glow trail at leading edge */}
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-4 rounded-full"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.6) 0%, transparent 70%)',
                filter: 'blur(3px)',
              }}
            />
          </motion.div>
        </div>
        <span className="text-[11px] text-accent-bright font-mono font-medium">
          {skill.levelLabel}
        </span>
      </div>

      {/* Items */}
      <div className="flex flex-wrap gap-[6px] mt-[14px]">
        {skill.items.map((item, ii) => (
          <span
            key={ii}
            className="text-[11px] text-foreground-muted font-medium px-[10px] py-[3px] rounded-full"
            style={{ background: 'var(--surface)' }}
          >
            {item}
          </span>
        ))}
      </div>

      {/* Highlight */}
      <div
        className="text-[12px] text-foreground-dim mt-[14px] pt-[14px] leading-[1.5]"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <strong className="text-cyan font-semibold">{skill.highlight}</strong>{' '}
        {skill.highlightAccent}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="px-6 md:px-12 py-[100px] max-w-[1200px] mx-auto relative">
      <SectionHeader
        label="// Expertise"
        title="Technical Depth"
        subtitle="Core competencies honed through years of building production AI systems at scale."
      />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12"
        variants={staggerContainer(60)}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
      >
        {skills.map((skill, i) => (
          <SkillCard key={i} skill={skill} index={i} />
        ))}
      </motion.div>
    </section>
  )
}
