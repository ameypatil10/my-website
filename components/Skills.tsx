'use client'

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
        {skills.map((skill, i) => {
          const Icon = iconMap[skill.iconName]
          return (
            <motion.div
              key={i}
              variants={fadeUp}
              className="relative overflow-hidden rounded-[16px] border p-7 transition-all duration-400 ease-expo-out group"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border)',
              }}
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

              {/* Icon */}
              <div
                className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-4 border"
                style={{
                  background: 'rgba(94,106,210,0.1)',
                  borderColor: 'rgba(94,106,210,0.15)',
                }}
              >
                {Icon && <Icon size={20} className="text-accent-bright" />}
              </div>

              {/* Name */}
              <h3 className="text-[16px] font-bold text-foreground tracking-[-0.3px]">
                {skill.name}
              </h3>

              {/* Skill bar */}
              <div className="flex items-center gap-2 mt-2">
                <div
                  className="flex-1 h-[3px] rounded-[2px] overflow-hidden"
                  style={{ background: 'var(--surface)' }}
                >
                  <motion.div
                    className="h-full rounded-[2px]"
                    style={{
                      background: 'linear-gradient(90deg, var(--accent), var(--cyan))',
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  />
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
        })}
      </motion.div>
    </section>
  )
}
