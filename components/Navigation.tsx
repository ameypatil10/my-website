"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { navLinks, socialLinks } from "@/lib/data"

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { scrollY, scrollYProgress } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 500], [0, 0.7])
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  // Active section detection via Intersection Observer
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sectionIds = navLinks.map((l) => l.href.slice(1))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          })
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [mobileOpen])

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      setMobileOpen(false)
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" })
    },
    []
  )

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 sm:px-12 py-4"
        style={{
          backgroundColor: useTransform(bgOpacity, (v) => `rgba(2,2,3,${v})`),
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className="gradient-text select-none"
          style={{ fontSize: 15, fontWeight: 700 }}
        >
          Amey Patil
        </a>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`nav-glow-link relative ${activeSection === link.href.slice(1) ? "active" : ""}`}
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: activeSection === link.href.slice(1) ? "var(--foreground)" : "var(--foreground-muted)",
                transition: "color 0.25s",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={socialLinks.email}
            style={{
              fontSize: 12,
              fontWeight: 600,
              background: "var(--foreground)",
              color: "var(--bg-deep)",
              borderRadius: 8,
              padding: "6px 14px",
              transition: "opacity 0.25s",
            }}
            className="hover:opacity-85"
          >
            Get in Touch
          </a>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
          style={{
            scaleX,
            background: 'linear-gradient(90deg, var(--accent), var(--cyan))',
          }}
        />

        {/* Mobile hamburger */}
        <button
          className="sm:hidden relative w-6 h-5 flex flex-col justify-between"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <motion.span
            className="block w-full h-[2px] bg-[var(--foreground)] origin-left"
            animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="block w-full h-[2px] bg-[var(--foreground)]"
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className="block w-full h-[2px] bg-[var(--foreground)] origin-left"
            animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
        </button>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center"
            style={{
              background: "rgba(2,2,3,0.95)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileOpen(false)}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[var(--foreground)] text-xl font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={socialLinks.email}
                className="mt-4"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  background: "var(--foreground)",
                  color: "var(--bg-deep)",
                  borderRadius: 8,
                  padding: "10px 24px",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
              >
                Get in Touch
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
