"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, Mail } from "lucide-react"
import FloatingOrbs from "@/components/ui/FloatingOrbs"
import { socialLinks } from "@/lib/data"
import { useIsMobile, useIsTouchDevice } from "@/hooks/useIsTouchDevice"

// Typewriter hook
function useTypewriter(text: string, speed = 35, startDelay = 1200) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
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

// Keywords pushed to edges — center 25-75% x, 20-70% y is clear zone for hero content
const floatingKeywords = [
  { text: 'LLMs', x: 5, y: 12, size: 32, opacity: 0.15, duration: 25, color: 'var(--accent-bright)' },
  { text: 'RLHF', x: 82, y: 10, size: 24, opacity: 0.12, duration: 30, color: 'var(--cyan)' },
  { text: 'Neural Networks', x: 3, y: 75, size: 20, opacity: 0.12, duration: 35, color: 'var(--accent-bright)' },
  { text: 'GPT', x: 85, y: 72, size: 38, opacity: 0.14, duration: 22, color: 'var(--cyan)' },
  { text: 'Transformers', x: 10, y: 88, size: 22, opacity: 0.1, duration: 28, color: 'var(--accent-bright)' },
  { text: 'PyTorch', x: 80, y: 85, size: 18, opacity: 0.09, duration: 32, color: 'var(--cyan)' },
  { text: 'GRPO', x: 88, y: 45, size: 20, opacity: 0.1, duration: 26, color: 'var(--accent-bright)' },
  { text: 'Semantic Search', x: 8, y: 5, size: 16, opacity: 0.09, duration: 38, color: 'var(--accent)' },
  { text: 'ACL 2024', x: 85, y: 18, size: 18, opacity: 0.12, duration: 30, color: 'var(--cyan)' },
  { text: 'BERT', x: 2, y: 45, size: 28, opacity: 0.11, duration: 24, color: 'var(--accent-bright)' },
  { text: 'Translation', x: 78, y: 78, size: 20, opacity: 0.1, duration: 34, color: 'var(--accent)' },
  { text: 'DPO', x: 5, y: 58, size: 22, opacity: 0.09, duration: 29, color: 'var(--cyan)' },
  { text: 'Attention', x: 90, y: 55, size: 18, opacity: 0.1, duration: 36, color: 'var(--accent-bright)' },
  { text: 'Fine-tuning', x: 12, y: 22, size: 16, opacity: 0.08, duration: 33, color: 'var(--accent)' },
  { text: 'EMNLP', x: 75, y: 5, size: 20, opacity: 0.1, duration: 27, color: 'var(--cyan)' },
]

const ambientParticles = [
  { x: 12, y: 20, size: 3, delay: 0, duration: 8 },
  { x: 88, y: 30, size: 2, delay: 2, duration: 10 },
  { x: 30, y: 75, size: 2.5, delay: 4, duration: 9 },
  { x: 75, y: 70, size: 3, delay: 1, duration: 7 },
  { x: 50, y: 15, size: 2, delay: 3, duration: 11 },
  { x: 65, y: 50, size: 2, delay: 5, duration: 8 },
]

export default function Hero() {
  const isMobile = useIsMobile()
  const isTouch = useIsTouchDevice()

  // Scroll-pinned container ref
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Scroll-driven transforms — subtler zoom, most content visible immediately
  // Name starts at 1.4x and shrinks to 1x (not 2.2x which was too dramatic)
  const nameScale = useTransform(scrollYProgress, [0, 0.4], [isMobile ? 1.2 : 1.4, 1])
  const nameY = useTransform(scrollYProgress, [0, 0.4], [isMobile ? 15 : 30, 0])

  // Badge and subtitle are VISIBLE on load (opacity starts at 1)
  // They just slide up slightly as scroll progresses
  const badgeY = useTransform(scrollYProgress, [0, 0.3], [0, -10])
  const subtitleY = useTransform(scrollYProgress, [0, 0.3], [0, -5])

  // Description fades in on scroll (this is the only reveal)
  const descOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1])
  const descY = useTransform(scrollYProgress, [0.15, 0.35], [20, 0])

  // Buttons fade in after description
  const buttonsOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1])
  const buttonsY = useTransform(scrollYProgress, [0.25, 0.45], [20, 0])

  // Scroll indicator visible initially, fades on scroll
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0])

  // Keywords/particles fade out on scroll
  const keywordsOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  // Parallax for orbs
  const orbsY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -80 : -200])

  const heroDescription =
    "Transforming how people capture, share, and consume knowledge through AI-native platforms. 5+ years building foundational LLMs, conversational AI, and large-scale NLP systems."
  const { displayed: typedText, done: typingDone } = useTypewriter(heroDescription, 25, 2500)

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
    <div ref={containerRef} className="relative" style={{ height: isMobile ? '140vh' : '170vh' }}>
      <section
        id="hero"
        ref={sectionRef}
        className="sticky top-0 min-h-screen flex items-center justify-center overflow-hidden"
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

        {/* Mouse-follow glow cursor */}
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

        {/* Floating tech keywords, orbital rings, ambient particles */}
        <motion.div className="absolute inset-0 pointer-events-none z-[2]" style={{ opacity: keywordsOpacity }}>
          {/* Floating tech keywords */}
          {floatingKeywords
            .filter((_, i) => !isMobile || i % 2 === 0)
            .map((kw, i) => (
              <span
                key={kw.text}
                className="absolute font-mono font-bold pointer-events-none select-none"
                style={{
                  left: `${kw.x}%`,
                  top: `${kw.y}%`,
                  fontSize: kw.size,
                  color: kw.color,
                  opacity: kw.opacity,
                  animation: `float-keyword-${i % 3} ${kw.duration}s ease-in-out infinite`,
                  willChange: 'transform',
                }}
              >
                {kw.text}
              </span>
            ))}

          {/* Orbital rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Outer ring */}
            <div
              className="absolute rounded-full border"
              style={{
                width: isMobile ? '340px' : '650px',
                height: isMobile ? '340px' : '650px',
                borderColor: 'rgba(94,106,210,0.12)',
                animation: 'spin-slow 60s linear infinite',
                willChange: 'transform',
              }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-bright/60" style={{ boxShadow: '0 0 8px var(--accent-bright)' }} />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan/50" style={{ boxShadow: '0 0 6px var(--cyan)' }} />
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent-bright/40" style={{ boxShadow: '0 0 6px var(--accent-bright)' }} />
            </div>
            {/* Inner ring — rotates opposite direction */}
            <div
              className="absolute rounded-full border"
              style={{
                width: isMobile ? '220px' : '480px',
                height: isMobile ? '220px' : '480px',
                borderColor: 'rgba(0,212,255,0.08)',
                animation: 'spin-slow 45s linear infinite reverse',
                willChange: 'transform',
              }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan/50" style={{ boxShadow: '0 0 6px var(--cyan)' }} />
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent/40" style={{ boxShadow: '0 0 6px var(--accent)' }} />
            </div>
          </div>

          {/* Ambient particles */}
          {ambientParticles.map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: 'var(--cyan)',
                boxShadow: '0 0 6px var(--cyan)',
                animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite, particle-glow 3s ease-in-out ${p.delay}s infinite`,
              }}
            />
          ))}
        </motion.div>

        {/* Hero content — scroll-driven zoom-out */}
        <div className="relative z-10 text-center max-w-[800px] mx-auto">
          {/* Badge — visible on load, slides up slightly on scroll */}
          <motion.div className="flex justify-center" style={{ y: badgeY }}>
            <div
              className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 rounded-full relative"
              style={{
                background: "rgba(94,106,210,0.08)",
                border: "1px solid rgba(94,106,210,0.15)",
              }}
            >
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

          {/* Name — starts HUGE, zooms out to normal */}
          <motion.h1
            className="text-[36px] sm:text-[72px] font-extrabold tracking-[-1.5px] sm:tracking-[-3px] leading-none mt-6 will-change-transform"
            style={{
              scale: nameScale,
              y: nameY,
              background:
                "linear-gradient(135deg, #FFFFFF 0%, #EDEDEF 50%, #8A8F98 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Amey Patil
          </motion.h1>

          {/* Title — visible on load, slides up slightly on scroll */}
          <motion.p
            className="text-[16px] sm:text-[20px] text-foreground-muted mt-4"
            style={{ y: subtitleY }}
          >
            Co-Founder &amp; Tech Lead @{" "}
            <a href="https://beta.wizzme.ai" target="_blank" rel="noopener noreferrer" className="text-accent-bright font-medium hover:text-cyan transition-colors duration-250">WizzMe</a>{" "}
            &middot; AI &amp; LLM Expert &middot; Published Researcher
          </motion.p>

          {/* Description with typing effect */}
          <motion.p
            className="text-base text-foreground-dim mt-5 leading-relaxed max-w-[580px] mx-auto"
            style={{ opacity: descOpacity, y: descY }}
          >
            {typedText}
            {!typingDone && (
              <span
                className="inline-block w-[2px] h-[1em] bg-accent-bright ml-[2px] align-middle"
                style={{ animation: "blink-cursor 0.8s step-end infinite" }}
              />
            )}
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-9"
            style={{ opacity: buttonsOpacity, y: buttonsY }}
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
        </div>

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
    </div>
  )
}
