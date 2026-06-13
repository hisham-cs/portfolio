import { useEffect, useState } from 'react'
import { profile } from '../data.js'
import { SunIcon, MoonIcon } from './Icons.jsx'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar({ dark, toggleDark }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  // Highlight the nav link of the section currently in view.
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1))
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/50 bg-white/70 shadow-sm shadow-slate-900/5 backdrop-blur-xl dark:border-surface-border/60 dark:bg-surface-base/80 dark:shadow-black/20">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className="text-lg font-bold tracking-tight text-slate-900 dark:text-text-main">
          {profile.name.split(' ')[0]}
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-brand dark:to-brand-light">
            .dev
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active === link.href
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-brand/10 dark:text-brand-light'
                  : 'text-slate-600 hover:bg-slate-100/70 hover:text-indigo-600 dark:text-text-muted dark:hover:bg-surface-card/70 dark:hover:text-secondary'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100/70 dark:text-text-muted dark:hover:bg-surface-card/70"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100/70 md:hidden dark:text-text-muted dark:hover:bg-surface-card/70"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M6 18 18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-200/60 bg-white/90 px-4 py-3 backdrop-blur-xl md:hidden dark:border-surface-border/60 dark:bg-surface-base/95">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active === link.href
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-brand/10 dark:text-brand-light'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600 dark:text-text-muted dark:hover:bg-surface-card dark:hover:text-secondary'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
