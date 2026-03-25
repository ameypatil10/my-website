"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { githubRepos } from "@/lib/data"
import { staggerContainer, cardReveal, viewportConfig } from "@/lib/animations"
import { useMagnetic } from "@/hooks/useMagnetic"
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice"

function RepoCard({ repo }: { repo: typeof githubRepos[0] }) {
  const isTouch = useIsTouchDevice()
  const { ref: magneticRef, position, handleMouseMove, handleMouseLeave } = useMagnetic(0.15)

  return (
    <div
      ref={magneticRef}
      onMouseMove={isTouch ? undefined : handleMouseMove}
      onMouseLeave={isTouch ? undefined : handleMouseLeave}
    >
      <motion.a
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        variants={cardReveal}
        className="shine-card group block relative overflow-hidden rounded-[16px] border p-6 transition-all duration-300"
        style={{
          background: "var(--bg-card)",
          borderColor: "var(--border)",
          transform: isTouch ? undefined : `translate(${position.x}px, ${position.y}px)`,
          transition: 'transform 0.2s ease-out, box-shadow 0.3s ease, border-color 0.3s ease',
        }}
        whileHover={{
          y: -2,
          borderColor: "rgba(255,255,255,0.12)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
        }}
      >
        <h3 className="text-[15px] font-bold text-foreground">
          {repo.name}
        </h3>
        <p className="text-[13px] text-foreground-muted mt-1.5 leading-relaxed">
          {repo.description}
        </p>
        <div className="flex items-center gap-2 mt-3">
          <span
            className="w-2 h-2 rounded-full shrink-0 group-hover:animate-[lang-dot-pulse_1s_ease-in-out_infinite]"
            style={{ background: repo.languageColor }}
          />
          <span className="text-[12px] text-foreground-dim">
            {repo.language}
          </span>
        </div>
      </motion.a>
    </div>
  )
}

export default function GitHubSection() {
  return (
    <section id="github" className="px-5 md:px-12 py-[60px] md:py-[100px] max-w-[1200px] mx-auto relative">
      <SectionHeader
        label="// Open Source"
        title="GitHub Projects"
        subtitle={
          <a
            href="https://github.com/ameypatil10"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-bright no-underline hover:text-cyan transition-colors duration-250"
          >
            github.com/ameypatil10
          </a>
        }
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12"
        variants={staggerContainer(80)}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
      >
        {githubRepos.map((repo, i) => (
          <RepoCard key={i} repo={repo} />
        ))}
      </motion.div>
    </section>
  )
}
