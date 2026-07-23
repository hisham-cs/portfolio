import { profile, education, heroCard } from '../data.js'
import { ArrowRightIcon, ExternalLinkIcon } from './Icons.jsx'
import Button from './ui/Button.jsx'
import SpecialtyRotator from './SpecialtyRotator.jsx'

// Statement + Status Band: a single editorial column (no sidebar, no filler
// visual) that closes on a status band below a hairline pivot — the same
// structural device as About's paragraph -> hairline -> Focus band, so Hero
// and About share proven DNA instead of Hero inventing something unproven
// for the highest-stakes section on the page. Sized for the full-width
// column it now owns (not the old half-column): the name runs up to
// text-8xl, headings run at their natural width, only the intro paragraph
// keeps a readable measure.
//
// The band stays a genuinely different device from About's (status, not
// domains): status lives in the eyebrow line itself (the same static
// bg-success dot as About's Currently chip, inline before the label — no
// new motion), so the chip row underneath is purely the three roles, no
// "Available" chip mixed in with them. A mono meta line (location) forms
// the row's right pole, baseline-aligned with the chips.
export default function Hero() {
  // Non-breaking hyphens stop the browser from wrapping mid-name ("Al-Malki").
  const displayName = profile.name.replace(/-/g, '‑')
  const hasCv = profile.showCv && profile.cv
  const gradYear = education.graduation.replace(/^\D+/, '')

  return (
    <section
      id="home"
      className="relative isolate border-b border-border bg-background"
    >
      <div className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-24">
        {/* Hairline rule — the one deliberate structural line, reused below
            as the pivot into the status band. Clears the fixed h-16 navbar
            (64px) with room to spare before it. */}
        <div className="hero-in border-t border-border" />

        <p className="hero-in mt-6 font-mono text-xs tracking-[0.14em] text-text-secondary uppercase">
          Computer Science Graduate · {gradYear}
        </p>

        <div className="pt-8 pb-20 sm:pb-24">
          <h1
            className="hero-in font-display text-6xl font-bold tracking-[-0.03em] text-text-primary sm:text-7xl lg:text-8xl"
            style={{ animationDelay: '70ms' }}
          >
            {displayName}
          </h1>
          <p
            className="hero-in mt-6 font-display text-2xl font-medium tracking-[-0.01em] text-text-primary sm:text-3xl"
            style={{ animationDelay: '140ms' }}
          >
            {profile.title}
          </p>
          <p
            className="hero-in mt-3 text-xl text-text-secondary sm:text-2xl"
            style={{ animationDelay: '175ms' }}
          >
            Specializing in{' '}
            <SpecialtyRotator className="font-semibold text-text-primary" />
          </p>
          <p
            className="hero-in mt-4 max-w-2xl text-lg leading-[1.7] text-text-secondary"
            style={{ animationDelay: '210ms' }}
          >
            {profile.intro}
          </p>

          <div className="hero-in mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: '280ms' }}>
            <Button href="#projects" variant="primary" className="px-7 py-3">
              View My Work
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
            <Button href="#contact" variant="outline" className="px-7 py-3">
              Get in Touch
            </Button>
            {hasCv && (
              <Button
                href={`${import.meta.env.BASE_URL}${profile.cv}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                className="px-7 py-3"
              >
                <ExternalLinkIcon className="h-4 w-4" /> View CV
              </Button>
            )}
          </div>

          {/* Status band — same mt-10/pt-8 pivot spacing as About's Focus
              band for consistency with that documented value. */}
          <div
            className="hero-in mt-10 border-t border-border pt-8"
            style={{ animationDelay: '320ms' }}
          >
            <p className="flex items-center gap-2 font-mono text-xs tracking-[0.14em] text-text-muted uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
              Available for
            </p>

            <div className="mt-4 flex flex-wrap items-baseline justify-start gap-x-6 gap-y-3 sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {heroCard.seeking.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-surface px-5 py-2.5 text-sm text-text-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <span className="font-mono text-xs tracking-[0.1em] text-text-muted uppercase">
                {profile.location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
