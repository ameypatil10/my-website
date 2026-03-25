export const expoOut = [0.16, 1, 0.3, 1] as const

export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: expoOut } },
}

export const fadeDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: expoOut } },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: expoOut } },
}

export const slideLeft = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: expoOut } },
}

export const slideRight = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: expoOut } },
}

export const staggerContainer = (staggerMs = 50) => ({
  animate: { transition: { staggerChildren: staggerMs / 1000 } },
})

export const viewportConfig = { once: true, amount: 0.2 } as const

export const springConfig = { stiffness: 200, damping: 15 }
