'use client'

import Link from 'next/link'
import { ArrowUpRight, Search, Send } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { editableTaskLabel } from '@/editable/content/task-labels'

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="border-t border-[var(--editable-border)] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto max-w-[var(--editable-container)] px-5 py-14 sm:px-8 lg:px-10">
        <div className="mb-14 grid gap-6 rounded-[16px] border border-[var(--editable-border)] bg-[radial-gradient(circle_at_50%_0%,rgba(14,84,241,0.28),transparent_45%),#0b0e19] p-7 md:grid-cols-[1fr_auto] md:items-center lg:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Share what matters</p>
            <h2 className="editable-display mt-3 text-4xl font-semibold leading-tight text-white sm:text-5xl">Add a place or submit a useful read.</h2>
          </div>
          <Link href="/create" className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:border-[var(--slot4-accent)] hover:bg-[var(--slot4-accent)]">
            Submit <Send className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_0.75fr_0.75fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-[4px] border border-white/20 bg-[var(--slot4-surface-bg)]">
                <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-9 w-9 object-contain" />
              </span>
              <span className="editable-display text-2xl font-bold">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--slot4-muted-text)]">{globalContent.footer?.description || SITE_CONFIG.description}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Discovery</h3>
            <div className="mt-5 grid gap-3">
              <Link href="/listing" className="text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-white">Directory</Link>
              <Link href="/sbm" className="text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-white">Curated links</Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Resources</h3>
            <div className="mt-5 grid gap-3">
              <Link href="/search" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-white"><Search className="h-3.5 w-3.5" /> Search</Link>
              <Link href="/about" className="text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-white">About</Link>
              <Link href="/contact" className="text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-white">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Account</h3>
            <div className="mt-5 grid gap-3">
              {session ? (
                <>
                  <Link href="/create" className="text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-white">Submit</Link>
                  <button type="button" onClick={logout} className="text-left text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-white">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-white">Sign in</Link>
                  <Link href="/signup" className="text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-white">Get started</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--editable-border)] px-5 py-5 text-center text-xs font-medium tracking-[0.12em] text-[var(--slot4-muted-text)]">
        (c) {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
