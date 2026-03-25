"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { staggerContainer, fadeUp, viewportConfig } from "@/lib/animations"

const links = [
  {
    label: "Email",
    href: "mailto:ameypatil.10699.ap@gmail.com",
    ariaLabel: "Email Amey Patil",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    hoverClass: "group-hover:animate-bounce",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/ameypatil10",
    ariaLabel: "LinkedIn Profile",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    hoverClass: "group-hover:scale-110",
  },
  {
    label: "GitHub",
    href: "https://github.com/ameypatil10",
    ariaLabel: "GitHub Profile",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    hoverClass: "group-hover:scale-110",
  },
]

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 md:px-12 py-[100px] text-center">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 70% at 50% 100%, rgba(94,106,210,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-[600px] mx-auto">
        <SectionHeader
          label="// Connect"
          title="Let's Build Something Together"
          subtitle="Whether you want to discuss AI, explore collaboration, or just say hello."
          className="text-center [&_p]:mx-auto"
        />

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          variants={staggerContainer(80)}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
        >
          {links.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              aria-label={link.ariaLabel}
              variants={fadeUp}
              className="group flex items-center gap-2.5 px-6 py-3.5 rounded-xl border text-[14px] font-medium text-foreground transition-all duration-300"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border)",
              }}
              whileHover={{
                y: -2,
                borderColor: "rgba(129,140,248,0.3)",
                boxShadow: "0 0 15px rgba(94,106,210,0.2), 0 0 30px rgba(94,106,210,0.08), 0 8px 30px rgba(0,0,0,0.3)",
              }}
            >
              <span className={`transition-transform duration-300 ${link.hoverClass}`}>
                {link.icon}
              </span>
              {link.label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
