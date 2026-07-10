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
  const [scrolled, setScrolled] = useState(false)

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

  // Before scrolling, the navbar sits transparent over the hero, so its
  // text follows the site theme (light text on the dark-theme hero, dark
  // text on the light-theme hero) rather than a fixed color. Past the
  // scroll threshold it picks up its own theme-reactive surface.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-slate-200/60 bg-white/80 backdrop-blur-xl dark:border-surface-border dark:bg-surface-base/85'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#home"
          className={`text-lg font-bold tracking-tight transition-colors ${
            scrolled ? 'text-slate-900 dark:text-text-main' : dark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {profile.name.split(' ')[0]}
          <span
            className={
              scrolled ? 'text-brand-600 dark:text-brand-300' : dark ? 'text-brand-300' : 'text-brand-600'
            }
          >
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
                  ? scrolled
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                    : dark
                      ? 'bg-white/10 text-white'
                      : 'bg-slate-900/5 text-slate-900'
                  : scrolled
                    ? 'text-slate-600 hover:bg-slate-100/70 hover:text-brand-700 dark:text-text-muted dark:hover:bg-surface-hover dark:hover:text-brand-300'
                    : dark
                      ? 'text-slate-300 hover:bg-white/10 hover:text-white'
                      : 'text-slate-600 hover:bg-slate-900/5 hover:text-slate-900'
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
            className={`rounded-lg p-2 transition-colors ${
              scrolled
                ? 'text-slate-600 hover:bg-slate-100/70 dark:text-text-muted dark:hover:bg-surface-hover'
                : dark
                  ? 'text-slate-300 hover:bg-white/10 hover:text-white'
                  : 'text-slate-600 hover:bg-slate-900/5 hover:text-slate-900'
            }`}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className={`rounded-lg p-2 transition-colors md:hidden ${
              scrolled
                ? 'text-slate-600 hover:bg-slate-100/70 dark:text-text-muted dark:hover:bg-surface-hover'
                : dark
                  ? 'text-slate-300 hover:bg-white/10 hover:text-white'
                  : 'text-slate-600 hover:bg-slate-900/5 hover:text-slate-900'
            }`}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M6 18 18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div
          className={`border-t px-4 py-3 backdrop-blur-xl md:hidden ${
            scrolled
              ? 'border-slate-200/60 bg-white/95 dark:border-surface-border dark:bg-surface-base/95'
              : dark
                ? 'border-white/10 bg-surface-base/95'
                : 'border-slate-200/60 bg-white/95'
          }`}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active === link.href
                  ? scrolled
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                    : dark
                      ? 'bg-white/10 text-brand-300'
                      : 'bg-slate-900/5 text-brand-700'
                  : scrolled
                    ? 'text-slate-600 hover:bg-slate-100 hover:text-brand-700 dark:text-text-muted dark:hover:bg-surface-hover dark:hover:text-brand-300'
                    : dark
                      ? 'text-slate-300 hover:bg-white/10 hover:text-white'
                      : 'text-slate-600 hover:bg-slate-900/5 hover:text-slate-900'
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
