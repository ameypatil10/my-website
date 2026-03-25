'use client'
import { useRef, useState, useCallback } from 'react'
import { useIsTouchDevice } from './useIsTouchDevice'

export function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLDivElement>(null)
  const isTouch = useIsTouchDevice()
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current || isTouch) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength
    setPosition({ x: deltaX, y: deltaY })
  }, [isTouch, strength])

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 })
  }, [])

  return { ref, position, handleMouseMove, handleMouseLeave }
}
