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
            className="spotlight-card relative overflow-hidden rounded-[16px] border p-6 transition-all duration-300 group"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
            whileHover={{
              y: -2,
              borderColor: "rgba(255,255,255,0.12)",
            }}
          >
            {/* Top glow line - animates from center outward */}
            <div
              className="absolute top-[-1px] left-1/2 h-px transition-all duration-500 ease-out group-hover:opacity-100 opacity-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(94,106,210,0.4), transparent)",
                width: "0%",
                transform: "translateX(-50%)",
              }}
            />
            {/* Use a CSS approach for center-outward animation */}
            <div
              className="absolute top-[-1px] left-0 right-0 h-px overflow-hidden"
            >
              <div
                className="w-full h-full transition-all duration-500 ease-out origin-center scale-x-0 group-hover:scale-x-100"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 10%, rgba(94,106,210,0.5) 40%, rgba(0,212,255,0.4) 60%, transparent 90%)",
                }}
              />
            </div>

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
