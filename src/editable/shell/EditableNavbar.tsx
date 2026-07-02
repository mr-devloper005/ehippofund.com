'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X, PlusCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const staticLinks = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()

  const authLinks = session
    ? [{ label: 'Submit', href: '/create' }]
    : [
        { label: 'Sign in', href: '/login' },
        { label: 'Get started', href: '/signup' },
      ]

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)]/95 text-[var(--editable-nav-text)] backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[76px] w-full max-w-[var(--editable-container)] items-center gap-5 px-5 sm:px-8 lg:px-10">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-[4px] border border-white/20 bg-[var(--slot4-surface-bg)]">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
          </span>
          <span className="editable-display max-w-[220px] truncate text-2xl font-bold leading-none">{SITE_CONFIG.name}</span>
        </Link>

        <div className="mx-auto hidden items-center gap-10 lg:flex">
          {staticLinks.map((item) => {
            const active = pathname === item.href
            return (
              <Link key={item.href} href={item.href} className={`text-sm font-semibold transition ${active ? 'text-[var(--slot4-accent)]' : 'text-[var(--slot4-muted-text)] hover:text-white'}`}>
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Link href="/search" aria-label="Search" className="grid h-10 w-10 place-items-center rounded-[4px] border border-[var(--editable-border)] text-[var(--slot4-muted-text)] transition hover:border-[var(--slot4-accent)] hover:text-white">
            <Search className="h-4 w-4" />
          </Link>
          {session ? (
            <>
              <Link href="/create" className="hidden items-center gap-2 rounded-[4px] border border-white/70 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-[var(--slot4-accent)] hover:bg-[var(--slot4-accent)] sm:inline-flex">
                <PlusCircle className="h-4 w-4" /> Submit
              </Link>
              <button type="button" onClick={logout} className="hidden rounded-[4px] px-3 py-2 text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:text-white sm:inline-flex">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden items-center gap-2 rounded-[4px] px-3 py-2 text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:text-white sm:inline-flex">
                <LogIn className="h-4 w-4" /> Sign in
              </Link>
              <Link href="/signup" className="hidden items-center gap-2 rounded-[4px] border border-white/70 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-[var(--slot4-accent)] hover:bg-[var(--slot4-accent)] sm:inline-flex">
                <UserPlus className="h-4 w-4" /> Get started
              </Link>
            </>
          )}
          <button type="button" onClick={() => setOpen((value) => !value)} className="grid h-10 w-10 place-items-center rounded-[4px] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-5 py-5 lg:hidden">
          <div className="grid gap-1">
            {[{ label: 'Home', href: '/' }, ...staticLinks, { label: 'Search', href: '/search' }, ...authLinks].map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-[4px] border border-transparent px-4 py-3 text-sm font-semibold ${
                    active ? 'border-[var(--slot4-accent)] text-white' : 'text-[var(--slot4-muted-text)] hover:border-[var(--editable-border)] hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            {session ? (
              <button type="button" onClick={logout} className="rounded-[4px] border border-transparent px-4 py-3 text-left text-sm font-semibold text-[var(--slot4-muted-text)] hover:border-[var(--editable-border)] hover:text-white">
                Logout
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
