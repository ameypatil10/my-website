'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { publications } from '@/lib/data'
import { staggerContainer, fadeUp, viewportConfig } from '@/lib/animations'

const venueTypeLabel: Record<string, string> = {
  main: 'Main Conference',
  industry: 'Industry Track',
  findings: 'Findings',
}

function highlightAuthor(authors: string, highlight: string) {
  const parts = authors.split(highlight)
  if (parts.length === 1) return <>{authors}</>
  return (
    <>
      {parts[0]}
      <strong className="text-foreground font-semibold">{highlight}</strong>
      {parts[1]}
    </>
  )
}

export default function Publications() {
  return (
    <section id="research" className="px-6 md:px-12 py-[100px] max-w-[1200px] mx-auto relative">
      <SectionHeader
        label="// Research"
        title="Publications"
        subtitle="Peer-reviewed research at top-tier NLP venues."
      />

      <motion.div
        className="flex flex-col gap-4 mt-12"
        variants={staggerContainer(100)}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
      >
        {publications.map((pub, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="group relative grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 md:gap-6 items-start rounded-[16px] p-6 md:p-7 transition-all duration-400 ease-expo-out"
            style={{
              background: 'var(--bg-card)',
            }}
            whileHover={{
              y: -2,
              boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            }}
          >
            {/* Gradient border animation on hover */}
            <div
              className="absolute inset-0 rounded-[16px] pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              style={{
                padding: '1px',
                background: 'linear-gradient(90deg, var(--accent), var(--cyan), var(--accent), var(--cyan))',
                backgroundSize: '300% 100%',
                animation: 'gradient-border-rotate 3s linear infinite',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />
            {/* Static border for non-hover */}
            <div
              className="absolute inset-0 rounded-[16px] pointer-events-none group-hover:opacity-0 transition-opacity duration-300"
              style={{
                border: '1px solid var(--border)',
              }}
            />

            {/* Venue badge with float animation */}
            <div
              className="font-mono text-[11px] font-bold uppercase tracking-[1px] rounded-[6px] border md:[writing-mode:vertical-lr] md:rotate-180"
              style={{
                padding: '10px 8px',
                animation: 'gentle-float 3s ease-in-out infinite',
                ...(pub.venueType === 'main'
                  ? {
                      background: 'rgba(0,212,255,0.08)',
                      color: 'var(--cyan)',
                      borderColor: 'rgba(0,212,255,0.15)',
                    }
                  : {
                      background: 'rgba(94,106,210,0.1)',
                      color: 'var(--accent-bright)',
                      borderColor: 'rgba(94,106,210,0.12)',
                    }),
              }}
            >
              {pub.venue}
            </div>

            {/* Center content */}
            <div>
              <h3 className="text-[17px] font-bold text-foreground leading-[1.4] tracking-[-0.3px]">
                {pub.title}
              </h3>
              <p className="text-[13px] text-foreground-muted mt-[6px]">
                {highlightAuthor(pub.authors, pub.authorHighlight)}
              </p>
              {pub.abstract && (
                <p className="text-[13px] text-foreground-dim mt-[10px] leading-[1.6]">
                  {pub.abstract}
                </p>
              )}
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[6px] mt-3 text-[12px] font-semibold text-accent-bright hover:text-cyan transition-colors duration-250"
              >
                Read Paper <ExternalLink size={14} />
              </a>
            </div>

            {/* Type badge with float */}
            <span
              className="text-[10px] font-semibold px-[10px] py-1 rounded-full border whitespace-nowrap"
              style={{
                background: 'rgba(0,212,255,0.08)',
                color: 'var(--cyan)',
                borderColor: 'rgba(0,212,255,0.15)',
                animation: 'gentle-float 3.5s ease-in-out infinite 0.5s',
              }}
            >
              {venueTypeLabel[pub.venueType] ?? pub.venueType}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
