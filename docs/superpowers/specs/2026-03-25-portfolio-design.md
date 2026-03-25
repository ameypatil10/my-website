# Amey Patil — Portfolio Website Design Spec

## Overview

A cinematic dark portfolio website showcasing Amey's AI/ML career, research, and entrepreneurial work. Built with Next.js 14 (App Router) + Tailwind CSS + Framer Motion, deployed on Vercel (free tier).

**Approved mockup:** `.superpowers/brainstorm/26753-1774397317/full-portfolio-v2.html`

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 14 (App Router) | SSG for performance, Vercel-native, React ecosystem |
| Styling | Tailwind CSS 3.4 | Utility-first, rapid iteration, dark mode native |
| Animation | Framer Motion 11 | Declarative scroll animations, spring physics, layout animations |
| Icons | Lucide React + custom SVGs | Lucide for UI icons; custom SVGs for brand icons (LinkedIn, GitHub) since Lucide doesn't include brand marks |
| Fonts | Inter (Google Fonts, `display=swap`) + JetBrains Mono | Premium sans + mono for code/labels. `font-display: swap` prevents FOIT. |
| Deployment | Vercel (free tier) | Zero-config Next.js hosting, global CDN |
| Package Manager | pnpm | Fast, disk-efficient |

### Next.js Configuration

Standard SSG with Vercel — no `output: 'export'` needed. Vercel auto-detects Next.js and handles SSG/ISR natively. `next.config.js` stays minimal:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {}
module.exports = nextConfig
```

---

## Design System

### Color Tokens

```
--bg-deep:         #020203     (page background)
--bg-base:         #050506     (section backgrounds)
--bg-elevated:     #0a0a0c     (raised surfaces)
--bg-card:         rgba(255,255,255,0.03)  (card fills)
--surface:         rgba(255,255,255,0.05)  (chips, tags)
--foreground:      #EDEDEF     (primary text)
--foreground-muted:#8A8F98     (secondary text)
--foreground-dim:  #555860     (tertiary text)
--accent:          #5E6AD2     (primary accent — indigo)
--accent-bright:   #818CF8     (lighter accent for labels)
--cyan:            #00d4ff     (secondary accent)
--cyan-dim:        rgba(0,212,255,0.15)   (cyan tag backgrounds)
--border:          rgba(255,255,255,0.06)
--border-hover:    rgba(255,255,255,0.12)
--glow-accent:     rgba(94,106,210,0.15)  (indigo glow for dots/shadows)
--glow-cyan:       rgba(0,212,255,0.1)    (cyan glow for dots/shadows)
```

### Typography Scale

```
Hero name:         72px / 800 / -3px tracking (mobile: 36px)
Section title:     40px / 700 / -1.5px tracking (mobile: 28px)
Company name:      22px / 700 / -0.5px tracking
Role/pub title:    17px / 700 / -0.3px tracking
Skill card title:  16px / 700 / -0.3px tracking
Body:              16px / 400 / 1.6 line-height
About text:        17px / 400 / 1.8 line-height
Small text:        13-14px / 500
Labels:            11-12px / 500-600 / mono for technical labels
Section label:     11px / 600 / 2px tracking / uppercase / JetBrains Mono
```

### Spacing

```
Section padding:  100px vertical, 48px horizontal
Card padding:     24-32px
Card gap:         16px (grid), 24px (large cards)
Max content:      1200px centered
```

### Radius

```
Cards:    16px
Small:    10px
XSmall:   6px  (venue badges, small elements)
Tags:     100px (pill)
Buttons:  12px
Nav CTA:  8px
```

### Z-Index Scale

```text
Orbs/background:   1
Hero content:      10
Section content:   auto (default)
Navigation:        100
Mobile menu overlay: 90
```

---

## Sections (Content Structure — Approved)

1. **Navigation** — Frosted glass sticky nav with section anchors
2. **Hero** — Full viewport, animated orbs, grid overlay, badge, name, CTA buttons
3. **Section Divider** — Horizontal gradient line (`transparent → border → transparent`) between every section
4. **About** — Split: narrative text + 4 stat counter cards
5. **Experience** — Vertical timeline, company groups, nested role cards with projects
6. **Skills** — 3-column grid, 6 expertise cards with bars and highlights
7. **Publications** — Stacked cards with vertical venue badges, real paper links
8. **Awards** — 3-column grid, 6 award cards with glow hover
9. **Education** — 2 cards side by side
10. **GitHub** — 3-column grid, 6 repo cards with language dots
11. **Contact** — Centered CTA with email/LinkedIn/GitHub links
12. **Footer** — Minimal with copyright

**Section divider** is a reusable `<SectionDivider />` component: `width: 100%; height: 1px; background: linear-gradient(90deg, transparent, var(--border), transparent);` placed between every content section.

---

## Motion & Animation Spec

### Global Principles

- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (Expo.out) for entrances; `ease-out` for hovers
- **Duration:** 150-300ms micro-interactions; 400-600ms scroll reveals; 20s ambient loops
- **Reduced motion:** All animations respect `prefers-reduced-motion` — instant transitions, no parallax
- **Stagger:** List/grid items stagger by 50ms per item on scroll reveal
- **Scroll trigger:** Elements animate when 20% visible in viewport (Framer Motion `whileInView`)

### Section-by-Section Animation Plan

#### Navigation
- **On load:** Fade down from -20px, opacity 0→1, 400ms delay after hero
- **On scroll:** Background opacity transitions from 0 to 0.7 as user scrolls past hero
- **Active link:** Underline slides in from left on hover (width animation)

#### Hero
- **Floating orbs:** 3 absolutely positioned blurred circles with infinite `translateX/Y + scale` loops (20s, alternating). Different phases per orb.
- **Grid overlay:** Static, masked with radial gradient (no animation needed)
- **Badge:** Fade up + scale from 0.9→1, 600ms, Expo.out. Pulsing cyan dot (2s infinite opacity cycle)
- **Name:** Fade up from +30px, 700ms, stagger 100ms after badge. Gradient text (CSS only).
- **Title & description:** Fade up staggered 100ms after name
- **Buttons:** Fade up staggered 100ms after description. Hover: translateY(-1px) + enhanced box-shadow
- **Scroll indicator:** Infinite pulse animation on the line (height + opacity). Fades out over first 200px of scroll via `useTransform(scrollY, [0, 200], [1, 0])` mapped to opacity.
- **Parallax:** Hero content moves at 0.8x scroll speed; orbs at 0.5x (subtle depth)

#### About Section
- **Section label + title:** Fade up from +20px when 20% in view, stagger 80ms
- **Text paragraphs:** Fade up staggered
- **Stat cards:** Stagger in from bottom (4 cards, 60ms stagger). On entrance, numbers count up from 0 to final value over 1.5s with Expo.out easing. "5+" → counts "0...1...5+". "11" → "0...11". "3" → "0...3". "8x" → "0x...8x".
- **Stat card hover:** translateY(-2px) + enhanced shadow (300ms spring)

#### Experience Timeline
- **Timeline line:** Draws down progressively as user scrolls (scaleY from 0→1 tied to scroll progress, `transform-origin: top` to draw top-down)
- **Company group headers:** Fade in + slide from left when in view
- **Dot markers:** Scale from 0→1 with spring (stiffness: 200, damping: 15) when group enters view
- **Role cards:** Stagger fade up from +30px, 80ms between cards within a group
- **Project items within cards:** Stagger fade in 50ms after parent card finishes
- **Tags:** Stagger in with slight scale (0.8→1) after card content
- **Card hover:** translateY(-2px) + border glow (indigo at 0.2 opacity) + enhanced shadow

#### Skills Grid
- **Cards:** Stagger in from bottom, 60ms stagger across 6 cards (left-to-right, top-to-bottom)
- **Skill bars:** Width animates from 0% to final value over 1s after card enters view (delayed 200ms)
- **Top gradient line:** opacity 0→1 on hover (300ms)
- **Card hover:** translateY(-3px) + enhanced shadow + top glow line appears
- **Skill items (chips):** Subtle fade in stagger within each card

#### Publications
- **Cards:** Stagger fade up from +20px, 100ms stagger
- **Venue badge:** Slides in from left (translateX: -10px → 0) synchronized with card
- **Pub badge (right):** Slight scale pop (0.9→1) after card enters
- **Card hover:** translateY(-2px) + border brighten + shadow
- **Link hover:** Color transition indigo → cyan (250ms)

#### Awards
- **Cards:** Stagger in from bottom, 80ms stagger across 6 cards
- **Top glow line:** Fades in on hover (0→1 opacity, 300ms)
- **Card hover:** translateY(-2px) + glow + border brighten

#### Education
- **Cards:** Slide in — left card from left, right card from right (translateX ±30px → 0, 500ms)
- **Bottom gradient line:** Static (always visible — serves as accent)
- **Highlights list:** Stagger fade in 50ms after card enters
- **Card hover:** translateY(-2px) + border brighten

#### GitHub
- **Cards:** Stagger in from bottom, 60ms stagger
- **Language dot:** Subtle pulse on card hover
- **Card hover:** translateY(-2px) + shadow + border brighten

#### Contact
- **Background glow:** Ambient radial gradient (static, no animation needed)
- **Title + subtitle:** Fade up from +20px when in view
- **Link buttons:** Stagger in from bottom (3 buttons, 80ms stagger)
- **Button hover:** translateY(-2px) + shadow + border brighten

#### Footer
- **Fade in** when in view (simple opacity transition)

### Shared Hover Patterns (consistency)

All card-like elements share:
```
transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1)
hover: translateY(-2px to -3px) + border-color brighten + box-shadow enhance
```

All links share:
```
transition: color 0.25s ease-out
hover: color shifts toward cyan or brighter accent
```

### Performance Guardrails

- Use `transform` and `opacity` only (GPU-composited, no layout thrash)
- Framer Motion `whileInView` with `viewport={{ once: true, amount: 0.2 }}` — animate once, don't re-trigger
- Parallax via `useScroll` + `useTransform` (Framer Motion) — no scroll event listeners
- Limit concurrent animations: stagger ensures max 2-3 elements animating simultaneously
- Orbs use `will-change: transform` for GPU promotion
- Lazy load below-fold sections with Next.js dynamic imports if bundle gets large

---

## Responsive Breakpoints

| Breakpoint | Layout Changes |
|------------|---------------|
| < 640px (mobile) | Single column everything. Nav → hamburger menu. Hero name 36px. Timeline left-aligned single column. Skills 1-col. Publications full-width stacked. Awards 1-col (2-col on 480px+). Education stacked. GitHub 1-col. Contact links stack vertically. About grid stacks (stats below text). Section padding 60px vertical, 20px horizontal. |
| 640-1024px (tablet) | Skills 2-col. Awards 2-col. GitHub 2-col. Education side-by-side. About grid 1fr/1fr. Section padding 80px vertical, 32px horizontal. |
| > 1024px (desktop) | Full layout as mockup. 3-col grids. Max-width 1200px centered. |

### Mobile Navigation

At < 640px, the nav collapses to a hamburger icon (top-right). Behavior:

- **Hamburger icon:** 3-line icon, animates to X on open (Framer Motion `animate` with rotate/translate)
- **Menu overlay:** Full-screen overlay, `z-index: 90`, background `rgba(2,2,3,0.95)` with `backdrop-filter: blur(20px)`
- **Menu items:** Centered vertically, stagger fade in from bottom (50ms per item, 300ms total)
- **Close:** Tap X, tap outside, or tap a nav link (smooth scroll still works)
- **Transition:** Overlay fades in 250ms; menu items stagger after 100ms delay
- **Body scroll:** Locked when menu is open (`overflow: hidden` on body)

---

## Accessibility

- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<footer>`, proper heading hierarchy
- All interactive elements keyboard-focusable with visible focus rings
- `aria-label` on icon-only links (social links)
- Color contrast: all text meets WCAG AA 4.5:1
- `prefers-reduced-motion`: disable all transform/opacity animations, show final state immediately
- Skip-to-content link (hidden, visible on focus)
- External links: `target="_blank" rel="noopener noreferrer"`

---

## SEO

- Next.js metadata API for title, description, Open Graph, Twitter cards
- JSON-LD structured data (Person schema)
- Semantic HTML
- Fast load times via SSG
- `robots.txt` + `sitemap.xml` (auto-generated by Next.js)

### Canonical Metadata

```text
Title:       "Amey Patil — AI & LLM Expert | Co-Founder @ WizzMe"
Description: "Portfolio of Amey Patil — 5+ years building foundational LLMs, conversational AI, and NLP systems at Flipkart. Published researcher (ACL, EMNLP, NAACL). IIT Bombay CS."
OG Image:    1200x630px, dark background with name + title text (generated or static PNG)
Twitter:     summary_large_image card
```

---

## Tailwind Config Outline

Key theme extensions needed in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      bg: { deep: '#020203', base: '#050506', elevated: '#0a0a0c' },
      foreground: { DEFAULT: '#EDEDEF', muted: '#8A8F98', dim: '#555860' },
      accent: { DEFAULT: '#5E6AD2', bright: '#818CF8' },
      cyan: { DEFAULT: '#00d4ff' },
    },
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
      mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
    },
    borderRadius: {
      card: '16px',
      sm: '10px',
      xs: '6px',
    },
    transitionTimingFunction: {
      'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
    },
    animation: {
      'float': 'float 20s ease-in-out infinite',
      'pulse-slow': 'pulse 2s ease-in-out infinite',
    },
  },
}
```

CSS custom properties (in `globals.css`) handle rgba/glow values that Tailwind can't natively express. Components use a mix of Tailwind utilities + CSS vars via `style` props or custom classes.

---

## File Structure

```
my-website/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Home page (composes all sections)
│   └── globals.css         # Tailwind + custom CSS vars
├── components/
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Skills.tsx
│   ├── Publications.tsx
│   ├── Awards.tsx
│   ├── Education.tsx
│   ├── GitHub.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── ui/
│   │   ├── SectionHeader.tsx    # Reusable label + title + subtitle
│   │   ├── Card.tsx             # Base card with hover animation
│   │   ├── AnimatedCounter.tsx  # Number count-up animation
│   │   ├── ScrollReveal.tsx     # Framer Motion whileInView wrapper
│   │   └── FloatingOrbs.tsx     # Ambient background orbs
│   └── icons/               # Any custom SVG icons
├── lib/
│   ├── data.ts              # All portfolio content as typed constants
│   └── animations.ts        # Shared Framer Motion variants
├── public/
│   ├── favicon.ico
│   └── og-image.png         # Open Graph preview image
├── tailwind.config.ts
├── next.config.js
├── package.json
├── tsconfig.json
└── .gitignore
```

---

## Data Architecture

All content lives in `lib/data.ts` as typed constants — no CMS, no API calls. This keeps the site fully static (SSG) and makes content updates a single-file edit.

### Key TypeScript Interfaces

```typescript
interface Project {
  name: string;
  detail: string;
  color: 'cyan' | 'indigo';
}

interface Role {
  title: string;
  period: string;
  description: string;
  projects: Project[];
  tags: { label: string; color?: 'cyan' }[];
}

interface ExperienceGroup {
  company: string;
  duration: string;
  dotColor: 'accent' | 'cyan';
  roles: Role[];
}

interface Skill {
  icon: string;        // Lucide icon name
  name: string;
  level: number;       // 0-100 for bar width
  levelLabel: string;  // "Expert" | "Advanced"
  items: string[];
  highlight: string;   // HTML string for <strong> markup
}

interface Publication {
  venue: string;
  venueType: 'main' | 'industry' | 'findings';
  year: number;
  title: string;
  authors: string;     // HTML string, bold for Amey
  abstract: string;
  link: string;
}

interface Award {
  year: string;
  name: string;
  description: string;
}

interface Education {
  degree: string;
  school: string;
  period: string;
  highlights: string[];
}

interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  url: string;
}

interface StatCard {
  value: string;       // "5+", "11", "3", "8x"
  numericEnd: number;  // 5, 11, 3, 8 — for counter animation
  suffix: string;      // "+", "", "", "x"
  label: string;
}
```

---

## Sensitive Info Exclusions

The following are explicitly excluded from the website:
- Funding amounts, equity percentages, investor names
- Phone number
- Internal product strategy / pivot details
- WizzMe described at high level only (Co-Founder, AI-native social network)

---

## Deployment

1. Git repo initialized, pushed to GitHub (user's account)
2. Connect repo to Vercel (free tier)
3. Auto-deploy on push to `main`
4. Custom domain can be added later via Vercel dashboard

---

## Out of Scope (for now)

- Contact form with backend (can add Formspree/Web3Forms later)
- Blog section
- Dark/light mode toggle (dark-only by design)
- CMS integration
- Analytics (can add Vercel Analytics later, also free)
