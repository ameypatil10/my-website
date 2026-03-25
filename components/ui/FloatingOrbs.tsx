"use client"

import { motion, MotionValue } from "framer-motion"

interface FloatingOrbsProps {
  parallaxY?: MotionValue<number>
  isMobile?: boolean
}

const orbs = [
  {
    size: 400,
    top: "10%",
    left: "5%",
    color: "rgba(94,106,210,0.07)",
    delay: 0,
  },
  {
    size: 300,
    top: "60%",
    right: "10%",
    color: "rgba(0,212,255,0.05)",
    delay: -7,
  },
  {
    size: 200,
    bottom: "20%",
    left: "40%",
    color: "rgba(94,106,210,0.04)",
    delay: -14,
  },
]

export default function FloatingOrbs({ parallaxY, isMobile }: FloatingOrbsProps) {
  return (
    <motion.div
      className="absolute inset-0"
      style={{ zIndex: 1, y: parallaxY }}
    >
      {orbs.map((orb, i) => {
        const size = isMobile ? orb.size * 0.5 : orb.size
        return (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width: size,
              height: size,
              top: orb.top,
              left: orb.left,
              right: orb.right,
              bottom: orb.bottom,
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              filter: "blur(60px)",
              willChange: "transform",
              pointerEvents: "none",
            }}
            animate={{
              x: isMobile ? [0, 15, -10, 0] : [0, 30, -20, 0],
              y: isMobile ? [0, -10, 8, 0] : [0, -20, 15, 0],
              scale: [1, 1.05, 0.95, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: orb.delay,
            }}
          />
        )
      })}
    </motion.div>
  )
}
