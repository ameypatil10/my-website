'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { stats } from '@/lib/data'
import { staggerContainer, fadeUp, viewportConfig } from '@/lib/animations'

export default function About() {
  return (
    <section id="about" className="px-5 md:px-12 py-[60px] md:py-[100px] max-w-[1200px] mx-auto relative">
      <SectionHeader
        label="// About"
        title={
          <>
            A technologist obsessed with
            <br />
            solving hard AI problems
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] mt-12 items-start">
        {/* Left: text */}
        <ScrollReveal>
          <p className="text-[17px] text-foreground-muted leading-[1.8]">
            Over <strong className="text-foreground font-semibold">5+ years at Flipkart</strong>,
            I built AI systems that serve hundreds of millions of users — from a machine translation
            platform spanning <strong className="text-foreground font-semibold">11 Indian languages</strong>{' '}
            to FK-GPT, where the 8B model outperformed GPT-4o-mini and the 70B achieved parity with GPT-4o
            on e-commerce tasks at 3x lower cost. Now, as Co-Founder &amp; CTO of{' '}
            <a href="https://beta.wizzme.ai" target="_blank" rel="noopener noreferrer" className="text-foreground font-semibold hover:text-accent-bright transition-colors duration-250">WizzMe</a>, I&apos;m applying{' '}
            <strong className="text-foreground font-semibold">first-principles thinking</strong> to
            reinvent how people access trusted knowledge from their networks.
            <br /><br />
            My research has been published at{' '}
            <strong className="text-foreground font-semibold">ACL, EMNLP, and NAACL</strong> — the
            top venues in natural language processing. Before all this, I earned{' '}
            <strong className="text-foreground font-semibold">JEE Advanced AIR 65</strong> and
            studied Computer Science at IIT Bombay.
          </p>
        </ScrollReveal>

        {/* Right: stat grid */}
        <motion.div
          className="grid grid-cols-2 gap-5"
          variants={staggerContainer(60)}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="p-6 rounded-[16px] border transition-all duration-400 ease-expo-out hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border)',
              }}
              whileHover={{ borderColor: 'rgba(255,255,255,0.12)' }}
            >
              <AnimatedCounter end={stat.numericEnd} suffix={stat.suffix} />
              <p className="text-[13px] text-foreground-muted mt-1 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
