'use client'

import type { ReactNode } from 'react'
import { ScrollReveal } from './ScrollReveal'
import { TextReveal } from './TextReveal'

interface SectionHeaderProps {
  label: string
  title: ReactNode
  subtitle?: ReactNode
  className?: string
  reveal?: boolean
}

export function SectionHeader({
  label,
  title,
  subtitle,
  className,
  reveal = true,
}: SectionHeaderProps) {
  const isStringTitle = typeof title === 'string'

  return (
    <ScrollReveal>
      <div className={className}>
        <span className="font-mono text-[11px] font-semibold tracking-[2px] uppercase text-accent-bright mb-3 block">
          {label}
        </span>
        {isStringTitle && reveal ? (
          <TextReveal
            text={title}
            className="text-[28px] md:text-[40px] font-bold tracking-tight leading-[1.15] text-foreground mb-4"
          />
        ) : (
          <h2 className="text-[28px] md:text-[40px] font-bold tracking-tight leading-[1.15] text-foreground mb-4">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-base text-foreground-muted max-w-[560px] leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </ScrollReveal>
  )
}
