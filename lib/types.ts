export interface Project {
  name: string
  detail: string
  color: 'cyan' | 'indigo'
}

export interface Role {
  title: string
  period: string
  description: string
  projects: Project[]
  tags: { label: string; color?: 'cyan' }[]
}

export interface ExperienceGroup {
  company: string
  duration: string
  dotColor: 'accent' | 'cyan'
  roles: Role[]
}

export interface Skill {
  iconName: string
  name: string
  level: number
  levelLabel: string
  items: string[]
  highlight: string
  highlightAccent: string
}

export interface Publication {
  venue: string
  venueType: 'main' | 'industry' | 'findings'
  year: number
  title: string
  authors: string
  authorHighlight: string
  abstract: string
  link: string
}

export interface Award {
  year: string
  name: string
  description: string
}

export interface Education {
  degree: string
  school: string
  period: string
  highlights: string[]
}

export interface GitHubRepo {
  name: string
  description: string
  language: string
  languageColor: string
  url: string
}

export interface StatCard {
  numericEnd: number
  suffix: string
  label: string
}

export interface NavLink {
  label: string
  href: string
}
