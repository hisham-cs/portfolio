import { useEffect, useState } from 'react'
import { profile } from '../data.js'
import { SunIcon, MoonIcon } from './Icons.jsx'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
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
  // hover wash is a low-opacity tint of --text-primary (which itself
  // already flips light/dark via the `.dark` cascade). Once scrolled, it
  // picks up its own opaque surface instead — that's the only thing
  // `scrolled` still governs below.
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
          ? 'border-b border-border bg-surface-elevated/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className="text-lg font-bold tracking-tight text-text-primary transition-colors">
          {profile.name.split(' ')[0]}
          <span className="text-text-secondary">.dev</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`inline-flex min-h-11 items-center rounded-lg border-b-2 px-3 text-sm font-medium transition-colors ${
                active === link.href
                  ? 'border-accent text-text-primary'
                  : scrolled
                    ? 'border-transparent text-text-secondary hover:text-text-primary'
                    : 'border-transparent text-text-secondary hover:bg-text-primary/5 hover:text-text-primary dark:hover:bg-text-primary/10'
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
            className={`flex h-11 w-11 items-center justify-center rounded-lg transition-colors ${
              scrolled
                ? 'text-text-secondary hover:bg-surface'
                : 'text-text-secondary hover:bg-text-primary/5 hover:text-text-primary dark:hover:bg-text-primary/10'
            }`}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className={`flex h-11 w-11 items-center justify-center rounded-lg transition-colors md:hidden ${
              scrolled
                ? 'text-text-secondary hover:bg-surface'
                : 'text-text-secondary hover:bg-text-primary/5 hover:text-text-primary dark:hover:bg-text-primary/10'
            }`}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M6 18 18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-surface-elevated/95 px-4 py-3 backdrop-blur-xl md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`flex min-h-11 items-center rounded-lg border-b-2 px-3 text-sm font-medium transition-colors ${
                active === link.href
                  ? 'border-accent text-text-primary'
                  : 'border-transparent text-text-secondary hover:bg-surface hover:text-text-primary'
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
