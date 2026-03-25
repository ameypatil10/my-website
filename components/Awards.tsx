"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { awards } from "@/lib/data"
import { staggerContainer, fadeUp, viewportConfig } from "@/lib/animations"

export default function Awards() {
  return (
    <section id="awards" className="px-6 md:px-12 py-[100px] max-w-[1200px] mx-auto relative">
      <SectionHeader label="// Recognition" title="Awards" />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12"
        variants={staggerContainer(80)}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
      >
        {awards.map((award, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="relative overflow-hidden rounded-[16px] border p-6 transition-all duration-300 group"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
            whileHover={{
              y: -2,
              borderColor: "rgba(255,255,255,0.12)",
            }}
          >
            {/* Top glow line */}
            <div
              className="absolute top-[-1px] left-[20%] right-[20%] h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(94,106,210,0.4), transparent)",
              }}
            />

            <span className="font-mono text-[12px] text-accent-bright">
              {award.year}
            </span>
            <h3 className="text-[15px] font-bold text-foreground mt-2">
              {award.name}
            </h3>
            <p className="text-[13px] text-foreground-muted mt-1.5 leading-relaxed">
              {award.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
