export const expoOut = [0.16, 1, 0.3, 1] as const

// Dramatic entrance — items rise from further below with longer duration
export const fadeUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: expoOut } },
}

export const fadeDown = {
  initial: { opacity: 0, y: -40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: expoOut } },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.85 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: expoOut } },
}

export const slideLeft = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: expoOut } },
}

export const slideRight = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: expoOut } },
}

// Scale + fade for cards — more dramatic entrance
export const cardReveal = {
  initial: { opacity: 0, y: 40, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: expoOut } },
}

// For individual items within cards (tags, chips, list items)
export const itemPop = {
  initial: { opacity: 0, scale: 0.8, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: expoOut } },
}

// For text lines that slide in
export const textSlideUp = {
  initial: { opacity: 0, y: 30, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: expoOut } },
}

// Stagger container — MUST have initial state for children to work
export const staggerContainer = (staggerMs = 80) => ({
  initial: {},
  animate: { transition: { staggerChildren: staggerMs / 1000 } },
})

export const viewportConfig = { once: true, amount: 0.15 } as const
export const viewportConfigEager = { once: true, amount: 0.05 } as const

export const springConfig = { stiffness: 200, damping: 15 }
export const bouncySpring = { type: 'spring' as const, stiffness: 300, damping: 20 }
