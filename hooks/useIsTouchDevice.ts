"use client"

import { useState, useEffect } from "react"

export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)
  useEffect(() => {
    setIsTouch(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    )
  }, [])
  return isTouch
}

export function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [breakpoint])
  return isMobile
}
