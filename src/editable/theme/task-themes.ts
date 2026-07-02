import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

export type TaskTheme = {
  kicker: string
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const REFERENCE_FONT = "'Inter', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"

const base = {
  dark: true,
  fontDisplay: REFERENCE_FONT,
  fontBody: REFERENCE_FONT,
  bg: '#0a0a0a',
  surface: '#101421',
  raised: '#0b0e19',
  text: '#eae8e8',
  muted: '#a7a7ad',
  line: 'rgba(255,255,255,0.12)',
  accent: '#0e54f1',
  accentSoft: 'rgba(14,84,241,0.16)',
  onAccent: '#ffffff',
  glow: 'rgba(14,84,241,0.28)',
  radius: '16px',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Articles', note: 'In-depth reads, guides, and stories worth your time.' },
  listing: { ...base, kicker: 'Places', note: 'Compare trusted local records, details, and direct contact paths.' },
  classified: { ...base, kicker: 'Marketplace', note: 'Fresh offers and notices, ready to act on.' },
  image: { ...base, kicker: 'Photos', note: 'A visual feed of standout images and galleries.' },
  sbm: { ...base, kicker: 'Reads', note: 'Curated links, sources, and references worth opening.' },
  pdf: { ...base, kicker: 'Documents', note: 'Downloadable guides, reports, and references.' },
  profile: { ...base, kicker: 'People', note: 'Discover creators, teams, and profiles.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
