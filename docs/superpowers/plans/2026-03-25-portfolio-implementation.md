# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready cinematic dark portfolio website for Amey Patil with rich scroll animations, deployed on Vercel.

**Architecture:** Single-page Next.js 14 App Router site. All content in a typed data file (trusted, developer-authored — no user input, no sanitization needed). Each section is an independent React component with Framer Motion scroll-triggered animations. Tailwind CSS for styling with CSS custom properties for rgba/glow values. Static site generation for performance.

**Tech Stack:** Next.js 14, Tailwind CSS 3.4, Framer Motion 11, Lucide React, TypeScript, pnpm

**Important Notes:**
- All section components using Framer Motion hooks or React state **must** have `"use client"` at the top of the file (Next.js App Router requirement). This applies to: Navigation, Hero, About, Experience, Skills, Publications, Awards, Education, GitHubSection, Contact, and all `ui/` components using motion.
- Card hover styling is inlined per component (no shared `Card.tsx` base component — keeps things simple, avoids premature abstraction).
- The spec's `GitHub.tsx` is renamed to `GitHubSection.tsx` to avoid confusion with the platform name.

**Spec:** `docs/superpowers/specs/2026-03-25-portfolio-design.md`
**Approved mockup:** `.superpowers/brainstorm/26753-1774397317/full-portfolio-v2.html`

---

## File Map

```
my-website/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, JSON-LD, body wrapper
│   ├── page.tsx                # Composes all section components in order
│   └── globals.css             # Tailwind directives + CSS custom properties
├── components/
│   ├── Navigation.tsx          # Frosted glass sticky nav + mobile hamburger
│   ├── Hero.tsx                # Full-viewport hero with orbs, grid, badge, CTA
│   ├── About.tsx               # Split layout: text + stat counter cards
│   ├── Experience.tsx          # Vertical timeline with company groups + role cards
│   ├── Skills.tsx              # 3-col grid of expertise cards with animated bars
│   ├── Publications.tsx        # Stacked publication cards with venue badges
│   ├── Awards.tsx              # 3-col grid of award cards with glow hover
│   ├── Education.tsx           # Side-by-side education cards
│   ├── GitHubSection.tsx       # 3-col grid of repo cards
│   ├── Contact.tsx             # Centered CTA with social links
│   ├── Footer.tsx              # Minimal footer
│   └── ui/
│       ├── SectionHeader.tsx   # Reusable: label + title + optional subtitle
│       ├── SectionDivider.tsx  # Gradient horizontal line between sections
│       ├── AnimatedCounter.tsx # Count-up number animation on scroll
│       ├── ScrollReveal.tsx    # Framer Motion whileInView wrapper with stagger
│       └── FloatingOrbs.tsx    # 3 ambient animated background orbs
├── lib/
│   ├── types.ts                # All TypeScript interfaces
│   ├── data.ts                 # All portfolio content as typed constants
│   └── animations.ts           # Shared Framer Motion variants and config
├── public/
│   └── favicon.svg             # Simple SVG favicon (AP monogram)
├── tailwind.config.ts
├── next.config.ts
├── package.json
├── tsconfig.json
└── .gitignore
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `.gitignore`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`

- [ ] **Step 1: Initialize Next.js project with pnpm**

```bash
cd /Users/amey/Downloads/projects/my-website
pnpm create next-app@14 . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-pnpm
```

If the directory already has files, answer yes to proceed. This scaffolds the project with Next.js 14, TypeScript, Tailwind, ESLint, App Router.

- [ ] **Step 2: Install additional dependencies**

```bash
pnpm add framer-motion lucide-react
```

- [ ] **Step 3: Configure tailwind.config.ts**

Replace the generated `tailwind.config.ts` with the full theme config from the spec — extend colors (bg, foreground, accent, cyan), fontFamily (Inter, JetBrains Mono), borderRadius (card, sm, xs), transitionTimingFunction (expo-out), animation (float, pulse-slow), and keyframes for float.

- [ ] **Step 4: Write globals.css with CSS custom properties**

Replace generated `app/globals.css` with:
- Tailwind directives (`@tailwind base/components/utilities`)
- `:root` block with all CSS custom properties from spec (colors, glows, borders, radii)
- Base styles: `body` background, color, font-smoothing
- Utility classes for gradient text, section dividers, scrollbar hiding
- `@media (prefers-reduced-motion: reduce)` block that disables all animations

- [ ] **Step 5: Configure app/layout.tsx**

Set up root layout with:
- Google Fonts: Inter (wght 300-800) and JetBrains Mono (wght 400-600) via `next/font/google` with `display: 'swap'`
- Metadata object with title, description, OG image, Twitter card per spec
- JSON-LD script tag (Person schema) in `<head>`
- Skip-to-content link (sr-only, visible on focus)
- `<body>` with font class names and `bg-bg-deep text-foreground`

- [ ] **Step 6: Create minimal app/page.tsx placeholder**

```tsx
export default function Home() {
  return <main id="main-content">Portfolio coming soon</main>
}
```

- [ ] **Step 7: Create next.config.ts**

Minimal config per spec:
```ts
import type { NextConfig } from 'next'
const nextConfig: NextConfig = {}
export default nextConfig
```

- [ ] **Step 8: Update .gitignore**

Ensure `.gitignore` includes: `node_modules`, `.next`, `.env*`, `.superpowers/`, `.DS_Store`

- [ ] **Step 9: Verify dev server starts**

```bash
pnpm dev
```

Open `http://localhost:3000` — should show the placeholder text on dark background with correct fonts.

- [ ] **Step 10: Initialize git and commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js 14 project with Tailwind + Framer Motion"
```

---

## Task 2: Data Layer & Shared Utilities

**Files:**
- Create: `lib/types.ts`, `lib/data.ts`, `lib/animations.ts`, `components/ui/SectionHeader.tsx`, `components/ui/SectionDivider.tsx`, `components/ui/ScrollReveal.tsx`

- [ ] **Step 1: Create lib/types.ts**

Define all TypeScript interfaces from the spec: `Project`, `Role`, `ExperienceGroup`, `Skill`, `Publication`, `Award`, `Education`, `GitHubRepo`, `StatCard`, `NavLink`.

- [ ] **Step 2: Create lib/data.ts**

Populate all content from the approved mockup HTML as typed constants:
- `navLinks`: array of section anchors
- `stats`: 4 StatCard objects (5+, 11, 3, 8x)
- `experience`: array of ExperienceGroup (WizzMe, Flipkart with 4 roles, Samsung, LTTS-IIT Bombay)
- `skills`: 6 Skill objects with levels, items, highlights
- `publications`: 3 Publication objects with real ACL/EMNLP/NAACL links
- `awards`: 6 Award objects
- `education`: 2 Education objects
- `githubRepos`: 6 GitHubRepo objects with github.com/ameypatil10 links
- `socialLinks`: email, LinkedIn, GitHub with URLs

Reference the mockup HTML for exact content. Exclude sensitive info per spec.

- [ ] **Step 3: Create lib/animations.ts**

Define shared Framer Motion variants:
- `fadeUp`: initial `{ opacity: 0, y: 20 }`, animate `{ opacity: 1, y: 0 }` with expo-out
- `fadeDown`: similar with negative y
- `scaleIn`: initial `{ opacity: 0, scale: 0.9 }`, animate `{ opacity: 1, scale: 1 }`
- `slideLeft` / `slideRight`: for education cards
- `staggerContainer`: with `staggerChildren` prop (configurable)
- `viewportConfig`: `{ once: true, amount: 0.2 }` as reusable constant
- `springConfig`: `{ stiffness: 200, damping: 15 }` for dots
- `expoOut` easing array: `[0.16, 1, 0.3, 1]`

- [ ] **Step 4: Create components/ui/SectionDivider.tsx**

Simple component: a `<div>` with gradient line styles per spec. No animation needed.

- [ ] **Step 5: Create components/ui/SectionHeader.tsx**

Reusable component accepting `label`, `title`, `subtitle` props. Renders:
- `<span>` with mono font, uppercase, accent-bright color for label
- `<h2>` with section-title styles. Title content is a React node (pass JSX with `<br />` directly, not HTML strings).
- Optional `<p>` for subtitle

Wrap in ScrollReveal for animation.

- [ ] **Step 6: Create components/ui/ScrollReveal.tsx**

Framer Motion wrapper component. Props: `children`, `delay`, `className`, `variant` (defaults to fadeUp). Uses `motion.div` with `whileInView`, `viewport={{ once: true, amount: 0.2 }}`, `initial`/`animate` from passed variant. Respects `prefers-reduced-motion` via Framer Motion's built-in support.

- [ ] **Step 7: Commit**

```bash
git add lib/ components/ui/
git commit -m "feat: add data layer, types, animation variants, and shared UI components"
```

---

## Task 3: Navigation

**Files:**
- Create: `components/Navigation.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Build Navigation component**

Desktop nav:
- Fixed position, z-100, full-width
- Background with `backdrop-filter: blur(20px)`, border-bottom
- Logo text left, nav links right, CTA button rightmost
- Smooth scroll on click (use `scrollIntoView({ behavior: 'smooth' })`)
- Hover underline animation on links (CSS transition on pseudo-element)

- [ ] **Step 2: Add scroll-based background opacity**

Use Framer Motion `useScroll` + `useTransform` to map `scrollY` [0, 500] to nav background opacity [0, 0.7]. Apply via `motion.nav` with `style={{ backgroundColor }}`.

- [ ] **Step 3: Build mobile hamburger menu**

At `sm:hidden` breakpoint:
- Hamburger button (3 lines to X animation via Framer Motion)
- Full-screen overlay (`z-90`, dark bg + blur)
- Menu items centered, stagger fade in
- Close on link tap, X tap, or overlay tap
- Lock body scroll when open

- [ ] **Step 4: Add Navigation to page.tsx**

Import and render `<Navigation />` at top of page.

- [ ] **Step 5: Verify in browser**

Check: sticky behavior, blur effect, mobile hamburger toggle, smooth scroll to sections, hover states.

- [ ] **Step 6: Commit**

```bash
git add components/Navigation.tsx app/page.tsx
git commit -m "feat: add frosted glass navigation with mobile hamburger menu"
```

---

## Task 4: Hero Section

**Files:**
- Create: `components/Hero.tsx`, `components/ui/FloatingOrbs.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create FloatingOrbs component**

3 absolutely positioned `motion.div` elements:
- Each has blur filter (60px), radial gradient background, `will-change: transform`
- Infinite animation: `animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0], scale: [1, 1.05, 0.95, 1] }}` with 20s duration, different `transition.delay` per orb
- z-index: 1

- [ ] **Step 2: Build Hero component structure**

- Full viewport height section with relative positioning
- Background: multi-layer radial gradients (CSS)
- Grid overlay: CSS `background-image` with linear gradients + `mask-image` radial gradient
- FloatingOrbs component
- Hero content (z-10, centered): badge, name, title, description, buttons, scroll indicator

- [ ] **Step 3: Add hero entrance animations**

Staggered sequence using Framer Motion:
1. Badge: `fadeUp` + `scaleIn`, 600ms, delay 0.2s. Pulsing dot via CSS animation.
2. Name: `fadeUp` from y:30, 700ms, delay 0.4s. Gradient text via CSS.
3. Title: `fadeUp`, delay 0.6s
4. Description: `fadeUp`, delay 0.7s
5. Buttons: `fadeUp`, delay 0.8s

Use `motion.div` parent with `staggerChildren: 0.1`.

- [ ] **Step 4: Add scroll indicator with fade-out**

At bottom of hero:
- Pulsing line animation (CSS keyframes for height + opacity)
- "Scroll" text below
- Wrap in `motion.div` with opacity mapped from `useTransform(scrollY, [0, 200], [1, 0])`

- [ ] **Step 5: Add parallax effect**

Use `useScroll` + `useTransform`:
- Hero content: `y` mapped from scrollY `[0, 500]` to `[0, -100]` (0.8x speed)
- Orbs: `y` mapped from scrollY `[0, 500]` to `[0, -250]` (0.5x speed)

- [ ] **Step 6: Add Hero to page.tsx with SectionDivider**

```tsx
<Navigation />
<Hero />
<SectionDivider />
```

- [ ] **Step 7: Verify in browser**

Check: orb animations, entrance sequence, parallax on scroll, scroll indicator fade, responsive at 375px.

- [ ] **Step 8: Commit**

```bash
git add components/Hero.tsx components/ui/FloatingOrbs.tsx app/page.tsx
git commit -m "feat: add hero section with floating orbs, parallax, and staggered entrance"
```

---

## Task 5: About Section

**Files:**
- Create: `components/About.tsx`, `components/ui/AnimatedCounter.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create AnimatedCounter component**

Props: `end: number`, `suffix: string`, `duration: number`.
- Uses Framer Motion `useInView` + `useSpring` or `animate` to count from 0 to `end`
- Displays current value + suffix
- Triggers once when element enters viewport
- Duration: 1.5s with expo-out easing

- [ ] **Step 2: Build About component**

- SectionHeader with label "// About", title with line break (pass as JSX)
- 2-column grid (stacks on mobile): left = narrative text, right = 2x2 stat grid
- Text with `<strong>` tags for emphasis (hardcoded JSX, not HTML strings — all content is trusted developer-authored)
- 4 stat cards each containing AnimatedCounter + label
- Stat cards: glass card styling, hover translateY(-2px)

- [ ] **Step 3: Add scroll-triggered animations**

- Section header: ScrollReveal wrapper
- Text paragraphs: fadeUp staggered
- Stat cards: staggerContainer with 60ms stagger, fadeUp children

- [ ] **Step 4: Add to page.tsx**

```tsx
<About />
<SectionDivider />
```

- [ ] **Step 5: Verify**

Check: counter animation triggers on scroll, stagger timing, responsive layout, stat card hovers.

- [ ] **Step 6: Commit**

```bash
git add components/About.tsx components/ui/AnimatedCounter.tsx app/page.tsx
git commit -m "feat: add about section with animated stat counters"
```

---

## Task 6: Experience Timeline

**Files:**
- Create: `components/Experience.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Build Experience component structure**

- SectionHeader with label "// Experience"
- Timeline container with left border line (2px, gradient)
- Map over `experience` data: for each group, render company header + role cards
- Company header: dot (colored per data), company name, duration badge
- Role cards: title, period, description, projects list, tags

- [ ] **Step 2: Add scroll-drawing timeline line**

Use Framer Motion `useScroll` on the timeline container ref:
- `scaleY` mapped from `scrollYProgress` [0, 1] to [0, 1]
- `transform-origin: top` on the line element
- Line is `position: absolute`, gradient from accent to transparent

- [ ] **Step 3: Add entrance animations**

- Company group headers: fadeUp + slideLeft when in view
- Dot markers: scale spring (0 to 1) with `springConfig`
- Role cards within each group: stagger fadeUp (80ms between cards)
- Project items: stagger fadeIn (50ms) after parent
- Tags: stagger scaleIn (0.8 to 1)

- [ ] **Step 4: Add hover effects**

Role cards: translateY(-2px), border glow (indigo 0.2 opacity), enhanced shadow. All via Tailwind `hover:` + `transition-all duration-400 ease-expo-out`.

- [ ] **Step 5: Ensure responsive**

Mobile: single column, no alternating. Timeline line stays left. Cards full-width. Smaller padding.

- [ ] **Step 6: Add to page.tsx**

```tsx
<Experience />
<SectionDivider />
```

- [ ] **Step 7: Verify**

Check: timeline draws on scroll, stagger animations, hover effects, correct dates per LinkedIn, responsive.

- [ ] **Step 8: Commit**

```bash
git add components/Experience.tsx app/page.tsx
git commit -m "feat: add experience timeline with scroll-drawing line and role cards"
```

---

## Task 7: Skills Grid

**Files:**
- Create: `components/Skills.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Build Skills component**

- SectionHeader with label "// Expertise"
- 3-column responsive grid (1-col mobile, 2-col tablet, 3-col desktop)
- Map over `skills` data: for each skill render a card with:
  - Icon (Lucide React component — create an icon lookup map in `lib/data.ts` mapping skill names to imported Lucide components, e.g., `{ 'Large Language Models': Layers, 'NLP': Globe, ... }`)
  - Skill name
  - Skill bar (gradient fill, width animated)
  - Skill level label ("Expert" / "Advanced")
  - Skill items as pills/chips
  - Highlight text with emphasis on key achievements

- [ ] **Step 2: Add animated skill bars**

Use Framer Motion `motion.div` for the bar fill:
- `initial={{ width: 0 }}`, `whileInView={{ width: '${level}%' }}`
- `transition: { duration: 1, delay: 0.2, ease: expoOut }`
- `viewport: { once: true }`

- [ ] **Step 3: Add entrance animations**

- Cards: stagger fadeUp (60ms stagger across 6 cards)
- Top gradient line: hidden by default, opacity 1 on hover via CSS
- Card hover: translateY(-3px) + shadow + border brighten

- [ ] **Step 4: Add to page.tsx, verify, commit**

```bash
git add components/Skills.tsx app/page.tsx
git commit -m "feat: add skills grid with animated bars and hover effects"
```

---

## Task 8: Publications

**Files:**
- Create: `components/Publications.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Build Publications component**

- SectionHeader with label "// Research"
- Stacked cards, each with: vertical venue badge (left), content (center), type badge (right)
- Venue badge: vertical text via CSS `writing-mode: vertical-lr` + rotate, colored by type (main = cyan, others = accent)
- Content: title, authors (Amey bold), abstract, "Read Paper" link with external icon
- Real links to ACL/EMNLP/NAACL papers from data

- [ ] **Step 2: Add animations**

- Cards: stagger fadeUp (100ms)
- Venue badge: slideLeft synchronized with card
- Type badge: scaleIn (0.9 to 1) after card
- Card hover: translateY(-2px) + border + shadow
- Link hover: color indigo to cyan (250ms)

- [ ] **Step 3: Responsive**

Mobile: grid collapses — venue badge sits above content instead of left side, or hide writing-mode and show horizontal.

- [ ] **Step 4: Add to page.tsx, verify, commit**

```bash
git add components/Publications.tsx app/page.tsx
git commit -m "feat: add publications section with venue badges and paper links"
```

---

## Task 9: Awards

**Files:**
- Create: `components/Awards.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Build Awards component**

- SectionHeader with label "// Recognition"
- 3-column responsive grid (1-col mobile, 2-col tablet, 3-col desktop)
- Map over `awards` data: year (mono, accent), name (bold), description
- Top glow line: absolute positioned, gradient, hidden by default

- [ ] **Step 2: Add animations**

- Cards: stagger fadeUp (80ms across 6)
- Top glow line: opacity 0 to 1 on hover (300ms)
- Card hover: translateY(-2px) + border brighten

- [ ] **Step 3: Add to page.tsx, verify, commit**

```bash
git add components/Awards.tsx app/page.tsx
git commit -m "feat: add awards section with glow hover effect"
```

---

## Task 10: Education

**Files:**
- Create: `components/Education.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Build Education component**

- SectionHeader with label "// Education"
- 2-column grid (stacks on mobile)
- Each card: degree, school (accent color), year (mono), highlights list with dot markers
- Bottom gradient accent line (always visible)

- [ ] **Step 2: Add animations**

- Left card: slideRight (from -30px), right card: slideLeft (from +30px), 500ms
- Highlights: stagger fadeIn (50ms) after card enters
- Card hover: translateY(-2px) + border brighten

- [ ] **Step 3: Add to page.tsx, verify, commit**

```bash
git add components/Education.tsx app/page.tsx
git commit -m "feat: add education section with slide-in cards"
```

---

## Task 11: GitHub Section

**Files:**
- Create: `components/GitHubSection.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Build GitHubSection component**

- SectionHeader with label "// Open Source", subtitle with GitHub profile link
- 3-column responsive grid
- Map over `githubRepos` data: each card is an `<a>` tag linking to repo
- Card: name, description, language with colored dot
- Language dot colors from data

- [ ] **Step 2: Add animations**

- Cards: stagger fadeUp (60ms)
- Card hover: translateY(-2px) + shadow + border brighten
- Language dot: subtle scale pulse on card hover (CSS)

- [ ] **Step 3: Add to page.tsx, verify, commit**

```bash
git add components/GitHubSection.tsx app/page.tsx
git commit -m "feat: add GitHub open source section"
```

---

## Task 12: Contact & Footer

**Files:**
- Create: `components/Contact.tsx`, `components/Footer.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Build Contact component**

- Centered layout with radial gradient glow background (CSS)
- SectionHeader: label "// Connect", title, subtitle
- 3 link buttons: Email (mailto), LinkedIn, GitHub — each with SVG icon
- Buttons: glass card style, hover translateY(-2px)

- [ ] **Step 2: Build Footer component**

- Max-width container, border-top
- Left: copyright with current year
- Right: "Built with Next.js + Framer Motion" in mono

- [ ] **Step 3: Add animations**

Contact:
- Title + subtitle: fadeUp when in view
- Link buttons: stagger fadeUp (80ms, 3 buttons)

Footer:
- Simple opacity fadeIn when in view

- [ ] **Step 4: Build brand icon SVGs inline**

For LinkedIn and GitHub contact buttons, use inline SVG paths (same as mockup). Email uses Lucide `Mail` icon.

- [ ] **Step 5: Add to page.tsx — complete page assembly**

Final page.tsx should compose ALL sections in order:
```tsx
<Navigation />
<Hero />
<SectionDivider />
<About />
<SectionDivider />
<Experience />
<SectionDivider />
<Skills />
<SectionDivider />
<Publications />
<SectionDivider />
<Awards />
<SectionDivider />
<Education />
<SectionDivider />
<GitHubSection />
<SectionDivider />
<Contact />
<Footer />
```

- [ ] **Step 6: Verify full page**

Scroll through entire page, check all animations trigger, all links work, responsive at 375px/768px/1440px.

- [ ] **Step 7: Commit**

```bash
git add components/Contact.tsx components/Footer.tsx app/page.tsx
git commit -m "feat: add contact section, footer, and complete page assembly"
```

---

## Task 13: Polish, Accessibility & Performance

**Files:**
- Modify: multiple components, `app/layout.tsx`, `app/globals.css`

- [ ] **Step 1: Add prefers-reduced-motion support**

In `globals.css`, add:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Verify Framer Motion animations also respect this (Framer Motion 11 does this automatically).

- [ ] **Step 2: Add skip-to-content link**

In `app/layout.tsx`, add before Navigation:
```tsx
<a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg">
  Skip to content
</a>
```

- [ ] **Step 3: Add aria-labels**

Review all icon-only links (social links in Contact, "Read Paper" links). Add descriptive `aria-label` attributes: "Email Amey Patil", "LinkedIn Profile", "GitHub Profile", "Read paper: [title]".

- [ ] **Step 4: Verify heading hierarchy**

Ensure: h1 (hero name) then h2 (section titles) then h3 (card titles). No skipped levels.

- [ ] **Step 5: Add favicon and OG image**

Create a simple SVG favicon (`public/favicon.svg`): "AP" monogram in accent color on transparent bg. Reference in layout.tsx metadata.

Create `public/og-image.png` (1200x630px): dark background (#020203) with "Amey Patil" in white, subtitle "AI & LLM Expert | Co-Founder @ WizzMe" in muted gray, accent gradient accent stripe. Can be a simple static image — generate via a quick HTML-to-PNG screenshot or create a minimal SVG converted to PNG.

- [ ] **Step 6: Add robots.txt and sitemap**

Create `app/robots.ts`:
```ts
import type { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' } }
}
```

Create `app/sitemap.ts`:
```ts
import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: 'https://ameypatil.dev', lastModified: new Date() }]
}
```

(URL can be updated once domain is known.)

- [ ] **Step 7: Test responsive breakpoints**

Open dev tools, test at:
- 375px (iPhone SE)
- 768px (iPad)
- 1024px (laptop)
- 1440px (desktop)

Fix any overflow, text clipping, or broken layouts.

- [ ] **Step 8: Run build and check for errors**

```bash
pnpm build
```

Fix any TypeScript errors, ESLint warnings, or build failures.

- [ ] **Step 9: Commit**

```bash
git add app/layout.tsx app/globals.css app/robots.ts app/sitemap.ts public/favicon.svg public/og-image.png components/
git commit -m "chore: add accessibility, reduced motion, favicon, OG image, SEO, and polish"
```

---

## Task 14: Git Push & Deploy Setup

**Files:**
- No new files

- [ ] **Step 1: Create GitHub repository**

```bash
gh repo create ameypatil10/my-website --public --source=. --remote=origin --push
```

If `gh` CLI not available, create manually on GitHub and add remote:
```bash
git remote add origin https://github.com/ameypatil10/my-website.git
git branch -M main
git push -u origin main
```

- [ ] **Step 2: Verify push**

```bash
git log --oneline
git remote -v
```

Confirm all commits are pushed to GitHub.

- [ ] **Step 3: Deploy guidance**

Print instructions for Vercel deployment:
1. Go to vercel.com and click "Add New Project"
2. Import the GitHub repo
3. Framework preset: Next.js (auto-detected)
4. Click "Deploy"
5. Site live at `<project>.vercel.app`
6. Optional: add custom domain in Vercel dashboard under Settings then Domains

---

## Execution Notes

- **Each task is independent** — the page builds up section by section. After Task 1, you can see changes in the dev server after each task.
- **Mockup is the visual reference** — when in doubt about spacing, colors, or layout, open `.superpowers/brainstorm/26753-1774397317/full-portfolio-v2.html` in a browser and match it.
- **Content is in the data file** — components should read from `lib/data.ts`, never hardcode content.
- **All content is developer-authored** — no user input flows into the site, so no sanitization is needed for inline JSX content.
- **Sensitive info exclusion** — no funding amounts, equity, investor names, phone number. WizzMe described high-level only.
