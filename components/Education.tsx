"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { education } from "@/lib/data"
import { slideRight, slideLeft, viewportConfig, expoOut } from "@/lib/animations"

const cardVariants = [slideRight, slideLeft]

const highlightFadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.4, delay, ease: expoOut },
  },
})

export default function Education() {
  return (
    <section id="education" className="px-5 md:px-12 py-[60px] md:py-[100px] max-w-[1200px] mx-auto relative">
      <SectionHeader label="// Education" title="Academic Foundation" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {education.map((edu, i) => (
          <motion.div
            key={i}
            variants={cardVariants[i] ?? slideRight}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="relative overflow-hidden rounded-[16px] border p-8 transition-all duration-300 group"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
            whileHover={{
              y: -2,
              borderColor: "rgba(255,255,255,0.12)",
            }}
          >
            {/* Bottom accent line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{
                background: "linear-gradient(90deg, var(--accent), var(--cyan))",
              }}
            />

            <h3 className="text-[18px] font-bold text-foreground">
              {edu.degree}
            </h3>
            <p className="text-[14px] font-semibold text-accent-bright mt-1">
              {edu.school}
            </p>
            <p className="font-mono text-[12px] text-foreground-dim mt-2">
              {edu.period}
            </p>

            {edu.highlights.length > 0 && (
              <ul className="mt-4 flex flex-col gap-2">
                {edu.highlights.map((item, j) => (
                  <motion.li
                    key={j}
                    variants={highlightFadeIn(j * 0.05)}
                    initial="initial"
                    whileInView="animate"
                    viewport={viewportConfig}
                    className="flex items-start gap-2.5 text-[13px] text-foreground-muted"
                  >
                    <span
                      className="mt-[7px] w-1 h-1 rounded-full shrink-0"
                      style={{ background: "var(--accent)" }}
                    />
                    {item}
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
