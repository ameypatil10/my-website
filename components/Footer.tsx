"use client"

import { motion } from "framer-motion"
import { viewportConfig } from "@/lib/animations"

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewportConfig}
      transition={{ duration: 0.6 }}
      className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 md:py-16 border-t flex justify-between items-center"
      style={{ borderColor: "var(--border)" }}
    >
      <span className="text-[13px] text-foreground-dim">
        &copy; 2026 Amey Patil
      </span>
      <span className="font-mono text-[11px] text-foreground-dim">
        Built with Next.js + Framer Motion
      </span>
    </motion.footer>
  )
}
