'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { experience } from '@/lib/data'
import { staggerContainer, cardReveal, fadeUp, itemPop, viewportConfig, springConfig } from '@/lib/animations'
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice'

function ShimmerBorderCard({ children, className, style, ...props }: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  [key: string]: unknown
}) {
  const [isHovered, setIsHovered] = useState(false)
  const isTouch = useIsTouchDevice()

  return (
    <motion.div
      className={`relative ${className ?? ''}`}
      style={{
        ...style,
      }}
      onMouseEnter={isTouch ? undefined : () => setIsHovered(true)}
      onMouseLeave={isTouch ? undefined : () => setIsHovered(false)}
      {...props}
    >
      {/* Shimmer border overlay — disabled on touch */}
      {!isTouch && isHovered && (
        <div
          className="absolute inset-0 rounded-[16px] pointer-events-none"
          style={{
            padding: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(94,106,210,0.3), rgba(0,212,255,0.3), transparent)',
            backgroundSize: '200% 100%',
            animation: 'shimmer-border 1.5s linear infinite',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      )}
      {children}
    </motion.div>
  )
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), springConfig)

  return (
    <section id="experience" className="px-5 md:px-12 py-[60px] md:py-[100px] max-w-[1200px] mx-auto relative">
      <SectionHeader
        label="// Experience"
        title="Career Journey"
        subtitle="From IIT Bombay to building AI systems at scale — each role building on the last."
      />

      <div ref={containerRef} className="mt-[60px] relative pl-10">
        {/* Animated timeline line */}
        <motion.div
          className="absolute left-[16px] top-0 bottom-0 w-[2px]"
          style={{
            background: 'linear-gradient(180deg, var(--accent), var(--border) 70%, transparent)',
            scaleY,
            transformOrigin: 'top',
          }}
        />

        {experience.map((group, gi) => (
          <div key={gi} className="mb-12 relative">
            {/* Group header */}
            <ScrollReveal direction="right">
              <div className="flex items-center gap-4 mb-5 relative">
                {/* Group dot with pulse ring animation */}
                <motion.div
                  className="absolute -left-8 w-4 h-4 rounded-full border-[3px]"
                  style={{
                    background: group.dotColor === 'cyan' ? 'var(--cyan)' : 'var(--accent)',
                    borderColor: 'var(--bg-deep)',
                    boxShadow: group.dotColor === 'cyan'
                      ? '0 0 12px var(--glow-cyan)'
                      : '0 0 12px var(--glow-accent)',
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', ...springConfig }}
                >
                  {/* Expanding pulse ring */}
                  <motion.span
                    className="absolute inset-[-4px] rounded-full border-2"
                    style={{
                      borderColor: group.dotColor === 'cyan' ? 'var(--cyan)' : 'var(--accent)',
                    }}
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{
                      scale: [1, 2.5],
                      opacity: [0.5, 0],
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.2,
                      delay: 0.3,
                      ease: 'easeOut',
                    }}
                  />
                  <motion.span
                    className="absolute inset-[-4px] rounded-full border-2"
                    style={{
                      borderColor: group.dotColor === 'cyan' ? 'var(--cyan)' : 'var(--accent)',
                    }}
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{
                      scale: [1, 2.5],
                      opacity: [0.4, 0],
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.2,
                      delay: 0.6,
                      ease: 'easeOut',
                    }}
                  />
                </motion.div>

                <span className="text-[22px] font-bold text-foreground tracking-[-0.5px]">
                  {group.company}
                </span>
                <span
                  className="text-[12px] font-mono text-foreground-dim px-3 py-1 rounded-full border"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                >
                  {group.duration}
                </span>
              </div>
            </ScrollReveal>

            {/* Role cards */}
            <motion.div
              variants={staggerContainer(120)}
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
            >
              {group.roles.map((role, ri) => (
                <ShimmerBorderCard
                  key={ri}
                  variants={cardReveal}
                  className="mb-4 relative rounded-[16px] border transition-all duration-400 ease-expo-out overflow-hidden"
                  style={{
                    padding: '20px 20px',
                    background: 'var(--bg-card)',
                    borderColor: 'var(--border)',
                  }}
                  whileHover={{
                    y: -2,
                    borderColor: 'rgba(94,106,210,0.2)',
                    boxShadow: '0 8px 40px rgba(94,106,210,0.06)',
                  }}
                >
                  {/* Small dot before card */}
                  <div
                    className="absolute -left-[29px] top-[28px] w-2 h-2 rounded-full border-2"
                    style={{
                      background: 'var(--foreground-dim)',
                      borderColor: 'var(--bg-deep)',
                    }}
                  />

                  {/* Header */}
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <span className="text-[16px] sm:text-[17px] font-bold text-foreground tracking-[-0.3px]">
                      {role.title}
                    </span>
                    <span className="text-[12px] text-foreground-dim font-mono">
                      {role.period}
                    </span>
                  </div>

                  {/* Description */}
                  {role.description && (
                    <p className="text-[14px] text-foreground-muted mt-[10px] leading-[1.65]">
                      {role.description}
                    </p>
                  )}

                  {/* Projects */}
                  {role.projects.length > 0 && (
                    <motion.div
                      className="mt-[14px]"
                      variants={staggerContainer(60)}
                      initial="initial"
                      whileInView="animate"
                      viewport={viewportConfig}
                    >
                      {role.projects.map((project, pi) => (
                        <motion.div
                          key={pi}
                          variants={fadeUp}
                          className="flex items-start gap-[10px] py-[10px]"
                          style={{
                            borderTop: pi > 0 ? '1px solid var(--border)' : 'none',
                          }}
                        >
                          <div
                            className="w-[5px] h-[5px] rounded-full mt-[7px] flex-shrink-0"
                            style={{
                              background: project.color === 'cyan'
                                ? 'var(--cyan)'
                                : 'var(--accent-bright)',
                            }}
                          />
                          <div>
                            <span className="text-[13px] font-semibold text-foreground">
                              {project.name}
                            </span>
                            {project.detail && (
                              <p className="text-[12px] text-foreground-muted mt-[2px] leading-[1.5]">
                                {project.detail}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Tags */}
                  {role.tags.length > 0 && (
                    <motion.div
                      className="flex flex-wrap gap-[6px] mt-[14px]"
                      variants={staggerContainer(50)}
                      initial="initial"
                      whileInView="animate"
                      viewport={viewportConfig}
                    >
                      {role.tags.map((tag, ti) => (
                        <motion.span
                          key={ti}
                          variants={itemPop}
                          className="text-[11px] font-medium font-mono px-[10px] py-1 rounded-full border"
                          style={
                            tag.color === 'cyan'
                              ? {
                                  background: 'var(--cyan-dim)',
                                  color: 'var(--cyan)',
                                  borderColor: 'rgba(0,212,255,0.15)',
                                }
                              : {
                                  background: 'rgba(94,106,210,0.08)',
                                  color: 'var(--accent-bright)',
                                  borderColor: 'rgba(94,106,210,0.12)',
                                }
                          }
                        >
                          {tag.label}
                        </motion.span>
                      ))}
                    </motion.div>
                  )}
                </ShimmerBorderCard>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}
