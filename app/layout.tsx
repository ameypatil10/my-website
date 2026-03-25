import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Amey Patil — AI & LLM Expert | Co-Founder @ WizzMe',
  description:
    'Portfolio of Amey Patil — 5+ years building foundational LLMs, conversational AI, and NLP systems at Flipkart. Published researcher (ACL, EMNLP, NAACL). IIT Bombay CS.',
  openGraph: {
    title: 'Amey Patil — AI & LLM Expert | Co-Founder @ WizzMe',
    description:
      'Portfolio of Amey Patil — 5+ years building foundational LLMs, conversational AI, and NLP systems at Flipkart. Published researcher (ACL, EMNLP, NAACL). IIT Bombay CS.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amey Patil — AI & LLM Expert | Co-Founder @ WizzMe',
    description:
      'Portfolio of Amey Patil — 5+ years building foundational LLMs, conversational AI, and NLP systems at Flipkart. Published researcher (ACL, EMNLP, NAACL). IIT Bombay CS.',
  },
  icons: { icon: '/favicon.svg' },
}

// Static JSON-LD structured data for SEO (Person schema)
// This is a hardcoded constant, not user input, so it is safe to serialize.
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Amey Patil',
  jobTitle: 'AI & LLM Expert, Co-Founder @ WizzMe',
  url: 'https://ameypatil.com',
  sameAs: [],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'IIT Bombay',
  },
  knowsAbout: [
    'Large Language Models',
    'Conversational AI',
    'Natural Language Processing',
    'Machine Learning',
  ],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
