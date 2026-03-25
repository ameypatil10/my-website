'use client'

import { useEffect, useRef, useCallback } from 'react'

export function SectionSnap() {
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const isNavClick = useRef(false)
  const isSnapping = useRef(false)
  const lastScrollY = useRef(0)
  const lastScrollTime = useRef(0)

  const snapToSection = useCallback(() => {
    if (isNavClick.current || isSnapping.current) return

    // Check scroll velocity — only snap if scroll has truly stopped
    const now = Date.now()
    const timeSinceLastScroll = now - lastScrollTime.current
    const scrollDelta = Math.abs(window.scrollY - lastScrollY.current)

    // If still moving fast, don't snap
    if (timeSinceLastScroll < 100 || scrollDelta > 5) return

    const sections = document.querySelectorAll<HTMLElement>('section[id]')
    if (!sections.length) return

    const viewportHeight = window.innerHeight
    const scrollY = window.scrollY

    // Don't snap at very top or very bottom of page
    const maxScroll = document.documentElement.scrollHeight - viewportHeight
    if (scrollY < 50 || scrollY > maxScroll - 50) return

    let bestSection: HTMLElement | null = null
    let bestDistance = Infinity

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      const sectionTop = scrollY + rect.top
      const sectionHeight = rect.height

      // Skip sections taller than 1.2x viewport
      if (sectionHeight > viewportHeight * 1.2) return

      // Skip very small sections (less than 30% viewport) — they shouldn't be snap targets
      if (sectionHeight < viewportHeight * 0.3) return

      // Only snap if section top is within 20% of viewport from current scroll
      // This is much tighter than before — prevents long-distance snaps
      const distance = Math.abs(sectionTop - scrollY - 60) // 60px nav offset
      const threshold = viewportHeight * 0.2

      if (distance < bestDistance && distance < threshold && distance > 15) {
        bestDistance = distance
        bestSection = section
      }
    })

    if (bestSection) {
      const rect = (bestSection as HTMLElement).getBoundingClientRect()
      const targetY = Math.max(0, window.scrollY + rect.top - 60)

      // Prevent re-triggering during the snap animation
      isSnapping.current = true

      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      })

      // Cooldown — don't snap again for 1.2s after a snap
      setTimeout(() => {
        isSnapping.current = false
      }, 1200)
    }
  }, [])

  useEffect(() => {
    // Check for reduced motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    // Disable on mobile — touch scrolling + snap = bad UX
    const isMobile = window.innerWidth < 768
    if (isMobile) return

    const handleNavClick = () => {
      isNavClick.current = true
      isSnapping.current = true
      setTimeout(() => {
        isNavClick.current = false
        isSnapping.current = false
      }, 2000)
    }

    const handleScroll = () => {
      lastScrollY.current = window.scrollY
      lastScrollTime.current = Date.now()

      if (isNavClick.current || isSnapping.current) return

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      // 400ms debounce — much more patient than before
      scrollTimeout.current = setTimeout(() => {
        snapToSection()
      }, 400)
    }

    const navLinks = document.querySelectorAll('a[href^="#"]')
    navLinks.forEach((link) => link.addEventListener('click', handleNavClick))
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      navLinks.forEach((link) => link.removeEventListener('click', handleNavClick))
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    }
  }, [snapToSection])

  return null
}
