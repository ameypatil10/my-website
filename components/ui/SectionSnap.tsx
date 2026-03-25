'use client'

import { useEffect, useRef, useCallback } from 'react'

export function SectionSnap() {
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const isNavClick = useRef(false)

  const snapToSection = useCallback(() => {
    if (isNavClick.current) return

    const sections = document.querySelectorAll<HTMLElement>('section[id], .hero-section')
    if (!sections.length) return

    const viewportHeight = window.innerHeight
    const scrollY = window.scrollY

    let bestSection: HTMLElement | null = null
    let bestDistance = Infinity

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      const sectionTop = scrollY + rect.top
      const sectionHeight = rect.height

      // Skip sections taller than 1.3x viewport — they scroll naturally
      if (sectionHeight > viewportHeight * 1.3) return

      // Find the section whose top is closest to current scroll position
      const distance = Math.abs(sectionTop - scrollY)

      if (distance < bestDistance && distance < viewportHeight * 0.4) {
        bestDistance = distance
        bestSection = section
      }
    })

    if (bestSection && bestDistance > 10) {
      const rect = (bestSection as HTMLElement).getBoundingClientRect()
      const targetY = window.scrollY + rect.top - 60 // 60px offset for nav

      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth',
      })
    }
  }, [])

  useEffect(() => {
    // Listen for nav clicks to temporarily disable snap
    const handleNavClick = () => {
      isNavClick.current = true
      setTimeout(() => { isNavClick.current = false }, 1500)
    }

    // Detect scroll end and snap
    const handleScroll = () => {
      if (isNavClick.current) return

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      scrollTimeout.current = setTimeout(() => {
        snapToSection()
      }, 150) // Wait 150ms after scroll stops to snap
    }

    // Listen for nav link clicks
    const navLinks = document.querySelectorAll('a[href^="#"]')
    navLinks.forEach((link) => link.addEventListener('click', handleNavClick))

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      navLinks.forEach((link) => link.removeEventListener('click', handleNavClick))
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    }
  }, [snapToSection])

  // Respect reduced motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      // Disable snap entirely for reduced motion users
      return
    }
  }, [])

  return null // This is a behavior-only component
}
