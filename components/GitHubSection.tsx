"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { githubRepos } from "@/lib/data"
import { staggerContainer, fadeUp, viewportConfig } from "@/lib/animations"

export default function GitHubSection() {
  return (
    <section id="github" className="px-6 md:px-12 py-[100px] max-w-[1200px] mx-auto relative">
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
        variants={staggerContainer(60)}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
      >
        {githubRepos.map((repo, i) => (
          <motion.a
            key={i}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
            className="block relative overflow-hidden rounded-[16px] border p-6 transition-all duration-300"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
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
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: repo.languageColor }}
              />
              <span className="text-[12px] text-foreground-dim">
                {repo.language}
              </span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  )
}
