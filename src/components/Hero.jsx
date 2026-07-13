import { profile, education, heroCard } from '../data.js'
import { ArrowRightIcon, ExternalLinkIcon } from './Icons.jsx'
import Button from './ui/Button.jsx'
import HeroVisual from './HeroVisual.jsx'

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
            as the vertical divider between the two columns. Clears the
            fixed h-16 navbar (64px) with room to spare before it. */}
        <div className="hero-in border-t border-border" />

        <p className="hero-in mt-6 font-mono text-xs tracking-[0.14em] text-text-secondary uppercase">
          Computer Science Graduate · {gradYear}
        </p>

        <div className="grid gap-12 pt-8 pb-16 sm:pb-20 lg:grid-cols-12 lg:gap-x-12">
          {/* Left: the editorial column — name, role, statement, entry points */}
          <div className="lg:col-span-8">
            <h1
              className="hero-in font-display text-6xl font-bold tracking-[-0.03em] text-text-primary sm:text-7xl"
              style={{ animationDelay: '70ms' }}
            >
              {displayName}
            </h1>
            <p
              className="hero-in mt-6 font-display text-xl font-medium tracking-[-0.01em] text-text-primary sm:text-2xl"
              style={{ animationDelay: '140ms' }}
            >
              {profile.title}
            </p>
            <p
              className="hero-in mt-4 max-w-md text-lg leading-[1.7] text-text-secondary"
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
          </div>

          {/* Right: compact status line + a decorative data/AI visual that
              fills the space the bio column's extra height leaves behind */}
          <div
            className="hero-in flex flex-col lg:col-span-4 lg:h-full lg:border-l lg:border-border lg:pl-12"
            style={{ animationDelay: '350ms' }}
          >
            <dl>
              <div>
                <dt className="font-mono text-xs tracking-[0.14em] text-text-muted uppercase">
                  Available For
                </dt>
                <dd className="mt-3 space-y-2">
                  {heroCard.seeking.map((item) => (
                    <div key={item} className="flex items-baseline gap-2 text-sm text-text-primary">
                      <span className="font-mono text-text-muted">—</span>
                      {item}
                    </div>
                  ))}
                </dd>
              </div>
            </dl>

            <div className="mt-8 hidden min-h-40 flex-1 lg:block">
              <HeroVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
