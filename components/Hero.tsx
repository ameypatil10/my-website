"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, Mail } from "lucide-react"
import FloatingOrbs from "@/components/ui/FloatingOrbs"
import { socialLinks } from "@/lib/data"
import { useIsMobile, useIsTouchDevice } from "@/hooks/useIsTouchDevice"

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const childVariants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
}

// Typewriter hook
function useTypewriter(text: string, speed = 35, startDelay = 1200) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Respect reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) {
      setDisplayed(text)
      setDone(true)
      return
    }

    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)

    return () => clearTimeout(timeout)
  }, [text, speed, startDelay])

  return { displayed, done }
}

export default function Hero() {
  const { scrollY } = useScroll()
  const isMobile = useIsMobile()
  const isTouch = useIsTouchDevice()

  // Reduce parallax on mobile
  const contentY = useTransform(scrollY, [0, 500], [0, isMobile ? -40 : -100])
  const orbsY = useTransform(scrollY, [0, 500], [0, isMobile ? -80 : -250])
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 200], [1, 0])

  const heroDescription =
    "Transforming how people capture, share, and consume knowledge through AI-native platforms. 5+ years building foundational LLMs, conversational AI, and large-scale NLP systems."
  const { displayed: typedText, done: typingDone } = useTypewriter(heroDescription, 25, 1400)

  // Mouse-follow glow
  const sectionRef = useRef<HTMLElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [mouseInSection, setMouseInSection] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect()
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      setMouseInSection(true)
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMouseInSection(false)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ padding: isMobile ? "80px 20px 60px" : "120px 48px 80px" }}
      onMouseMove={isTouch ? undefined : handleMouseMove}
      onMouseLeave={isTouch ? undefined : handleMouseLeave}
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

      {/* Mouse-follow glow cursor — disabled on mobile/touch */}
      {!isTouch && mouseInSection && (
        <div
          className="absolute pointer-events-none z-[5] transition-opacity duration-300"
          style={{
            left: mousePos.x - 200,
            top: mousePos.y - 200,
            width: 400,
            height: 400,
            background:
              "radial-gradient(circle, rgba(94,106,210,0.08) 0%, rgba(0,212,255,0.04) 30%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(20px)",
          }}
        />
      )}

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
      <FloatingOrbs parallaxY={orbsY} isMobile={isMobile} />

      {/* Hero content */}
      <motion.div
        className="relative z-10 text-center max-w-[800px] mx-auto"
        style={{ y: contentY }}
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Badge with glow pulse halo */}
        <motion.div variants={childVariants} className="flex justify-center">
          <div
            className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 rounded-full relative"
            style={{
              background: "rgba(94,106,210,0.08)",
              border: "1px solid rgba(94,106,210,0.15)",
            }}
          >
            {/* Glow halo rings around the dot */}
            <span className="relative w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-cyan animate-pulse" />
              <span
                className="absolute inset-[-3px] rounded-full border border-cyan/40"
                style={{ animation: "glow-ring 2s ease-out infinite" }}
              />
              <span
                className="absolute inset-[-3px] rounded-full border border-cyan/30"
                style={{ animation: "glow-ring 2s ease-out infinite 0.6s" }}
              />
              <span
                className="absolute inset-[-3px] rounded-full border border-cyan/20"
                style={{ animation: "glow-ring 2s ease-out infinite 1.2s" }}
              />
            </span>
            <span className="text-[10px] sm:text-[12px] font-medium tracking-[1px] sm:tracking-[1.5px] uppercase text-accent-bright">
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
          className="text-[16px] sm:text-[20px] text-foreground-muted mt-4"
        >
          Co-Founder &amp; Tech Lead @{" "}
          <a href="https://beta.wizzme.ai" target="_blank" rel="noopener noreferrer" className="text-accent-bright font-medium hover:text-cyan transition-colors duration-250">WizzMe</a>{" "}
          &middot; AI &amp; LLM Expert &middot; Published Researcher
        </motion.p>

        {/* Description with typing effect */}
        <motion.p
          variants={childVariants}
          className="text-base text-foreground-dim mt-5 leading-relaxed max-w-[580px] mx-auto"
        >
          {typedText}
          {!typingDone && (
            <span
              className="inline-block w-[2px] h-[1em] bg-accent-bright ml-[2px] align-middle"
              style={{ animation: "blink-cursor 0.8s step-end infinite" }}
            />
          )}
        </motion.p>

        {/* Buttons — stack vertically on mobile */}
        <motion.div
          variants={childVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-9"
        >
          <a
            href="#experience"
            className="shimmer-btn inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-px w-full sm:w-auto"
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
            className="shimmer-btn inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-px w-full sm:w-auto"
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
    </section>
  )
}
