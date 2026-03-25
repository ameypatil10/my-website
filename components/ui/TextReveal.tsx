'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface TextRevealProps {
  text: string
  className?: string
  as?: 'h2' | 'h3' | 'p'
}

export function TextReveal({ text, className = '', as: Tag = 'h2' }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.5'],
  })

  const words = text.split(' ')

  return (
    <div ref={ref} className={className}>
      <Tag className={className} style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.3em' }}>
        {words.map((word, i) => {
          const start = i / words.length
          const end = start + 1 / words.length
          return <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />
        })}
      </Tag>
    </div>
  )
}

function Word({ word, progress, range }: { word: string; progress: any; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  const blur = useTransform(progress, range, [4, 0])
  const y = useTransform(progress, range, [8, 0])
  const filterBlur = useTransform(blur, (v) => `blur(${v}px)`)

  return (
    <motion.span
      className="inline-block"
      style={{
        opacity,
        y,
        filter: filterBlur,
      }}
    >
      {word}
    </motion.span>
  )
}
