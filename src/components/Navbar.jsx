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

  // Highlight the nav link of the section containing the viewport's
  // vertical midpoint. The IntersectionObserver here is only a trigger —
  // its rootMargin ("-45% 0px -45% 0px", a thin band at viewport center)
  // just tells us *when* to recheck, not *what's* active. Recomputing from
  // actual layout on every trigger removes any ordering dependency on the
  // raw entries. Two more guards layer on top of that:
  //
  // - Tie-break by closest center, not first match: if two adjacent
  //   sections both momentarily span the midpoint (plausible for two
  //   sections each shorter than half the viewport, right as their shared
  //   border crosses it), picking the first in DOM order is arbitrary.
  //   Picking whichever section's center is nearest the midpoint is not.
  // - A final recompute once scrolling actually stops: the observer only
  //   fires on band-edge crossings, so a single long smooth-scroll
  //   animation whose last crossing happens to tie between two sections
  //   can leave that arbitrary-ish pick stale with nothing left to correct
  //   it — seen concretely when a click-to-anchor jump lands on Contact,
  //   the last section, and the page clamps at its max scroll before
  //   Contact's rect ever gets a fresh trigger of its own. `scrollend`
  //   guarantees one more recompute after settling; Safari doesn't support
  //   it yet, so it falls back to a debounced scroll listener there.
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1))
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)

    const recomputeActive = () => {
      const viewportMid = window.innerHeight / 2
      let bestId = null
      let bestDistance = Infinity
      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        if (rect.top <= viewportMid && rect.bottom >= viewportMid) {
          const distance = Math.abs((rect.top + rect.bottom) / 2 - viewportMid)
          if (distance < bestDistance) {
            bestDistance = distance
            bestId = section.id
          }
        }
      }
      if (bestId) setActive(`#${bestId}`)
    }

    const observer = new IntersectionObserver(recomputeActive, { rootMargin: '-45% 0px -45% 0px' })
    sections.forEach((s) => observer.observe(s))

    const supportsScrollEnd = 'onscrollend' in window
    let scrollTimeout
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(recomputeActive, 150)
    }
    if (supportsScrollEnd) {
      window.addEventListener('scrollend', recomputeActive)
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    recomputeActive() // correct on mount too (e.g. a reload deep in the page)

    return () => {
      observer.disconnect()
      clearTimeout(scrollTimeout)
      if (supportsScrollEnd) {
        window.removeEventListener('scrollend', recomputeActive)
      } else {
        window.removeEventListener('scroll', handleScroll)
      }
    }
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
