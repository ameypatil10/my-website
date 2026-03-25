"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, Mail } from "lucide-react"
import FloatingOrbs from "@/components/ui/FloatingOrbs"
import { socialLinks } from "@/lib/data"

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const childVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export default function Hero() {
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 500], [0, -100])
  const orbsY = useTransform(scrollY, [0, 500], [0, -250])
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 200], [1, 0])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ padding: "120px 48px 80px" }}
    >
      {/* Hero background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 20% 50%, rgba(94,106,210,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 80% 30%, rgba(0,212,255,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 80% 40% at 50% 100%, rgba(94,106,210,0.04) 0%, transparent 50%),
            linear-gradient(180deg, #020203 0%, #06060a 100%)
          `,
        }}
      />

      {/* Hero grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%)",
        }}
      />

      {/* Floating orbs */}
      <FloatingOrbs parallaxY={orbsY} />

      {/* Hero content */}
      <motion.div
        className="relative z-10 text-center max-w-[800px] mx-auto"
        style={{ y: contentY }}
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Badge */}
        <motion.div variants={childVariants} className="flex justify-center">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full"
            style={{
              background: "rgba(94,106,210,0.08)",
              border: "1px solid rgba(94,106,210,0.15)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            <span className="text-[12px] font-medium tracking-[1.5px] uppercase text-accent-bright">
              Building the future of knowledge networks
            </span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={childVariants}
          className="text-[36px] sm:text-[72px] font-extrabold tracking-[-1.5px] sm:tracking-[-3px] leading-none mt-6"
          style={{
            background:
              "linear-gradient(135deg, #FFFFFF 0%, #EDEDEF 50%, #8A8F98 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Amey Patil
        </motion.h1>

        {/* Title */}
        <motion.p
          variants={childVariants}
          className="text-[20px] text-foreground-muted mt-4"
        >
          Co-Founder @{" "}
          <span className="text-accent-bright font-medium">WizzMe</span>{" "}
          &middot; AI &amp; LLM Expert &middot; Published Researcher
        </motion.p>

        {/* Description */}
        <motion.p
          variants={childVariants}
          className="text-base text-foreground-dim mt-5 leading-relaxed max-w-[580px] mx-auto"
        >
          Transforming how people capture, share, and consume knowledge through
          AI-native platforms. 5+ years building foundational LLMs,
          conversational AI, and large-scale NLP systems.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={childVariants}
          className="flex flex-row items-center justify-center gap-3.5 mt-9"
        >
          <a
            href="#experience"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-px"
            style={{
              background: "var(--accent)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow:
                "0 0 20px rgba(94,106,210,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 30px rgba(94,106,210,0.5), inset 0 1px 0 rgba(255,255,255,0.15)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 20px rgba(94,106,210,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
            }}
          >
            Explore My Work
            <ChevronDown size={16} />
          </a>
          <a
            href={socialLinks.email}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-px"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--border-hover)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)"
            }}
          >
            <Mail size={16} />
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: scrollIndicatorOpacity }}
      >
        <div
          className="w-px h-10 animate-pulse"
          style={{
            background:
              "linear-gradient(180deg, var(--accent), transparent)",
          }}
        />
        <span className="text-[10px] tracking-[2px] uppercase text-foreground-dim">
          Scroll
        </span>
      </motion.div>

      {/* Responsive mobile padding override */}
      <style jsx>{`
        @media (max-width: 639px) {
          section {
            padding: 80px 20px 80px !important;
          }
        }
      `}</style>
    </section>
  )
}
