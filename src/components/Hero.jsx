import { profile, education, heroCard } from '../data.js'
import { ArrowRightIcon, DownloadIcon } from './Icons.jsx'
import Button from './ui/Button.jsx'

export default function Hero() {
  // Non-breaking hyphens stop the browser from wrapping mid-name ("Al-Malki").
  const displayName = profile.name.replace(/-/g, '‑')
  const hasCv = profile.showCv && profile.cv
  const gradYear = education.graduation.replace(/^\D+/, '')

  return (
    <section
      id="home"
      className="relative isolate border-b border-slate-200 bg-white dark:border-surface-border dark:bg-surface-base"
    >
      <div className="mx-auto max-w-6xl px-4 pt-24 sm:px-6 sm:pt-32">
        {/* Hairline rule — the one deliberate structural line, reused below
            as the vertical divider between the two columns. Clears the
            fixed h-16 navbar (64px) with room to spare before it. */}
        <div className="hero-in border-t border-slate-200 dark:border-surface-border" />

        <p className="hero-in mt-6 font-mono text-xs tracking-[0.14em] text-brand-600 uppercase dark:text-brand-300">
          Computer Science Graduate · {gradYear}
        </p>

        <div className="grid gap-12 pt-8 pb-24 sm:pb-32 lg:grid-cols-12 lg:gap-x-12">
          {/* Left: the editorial column — name, role, statement, entry points */}
          <div className="lg:col-span-8">
            <h1
              className="hero-in font-display text-6xl font-bold tracking-[-0.03em] text-slate-900 sm:text-7xl dark:text-text-main"
              style={{ animationDelay: '70ms' }}
            >
              {displayName}
            </h1>
            <p
              className="hero-in mt-6 font-display text-xl font-medium tracking-[-0.01em] text-brand-600 sm:text-2xl dark:text-brand-300"
              style={{ animationDelay: '140ms' }}
            >
              {profile.title}
            </p>
            <p
              className="hero-in mt-4 max-w-md text-lg leading-[1.7] text-slate-600 dark:text-text-muted"
              style={{ animationDelay: '210ms' }}
            >
              {profile.intro}
            </p>

            <div className="hero-in mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: '280ms' }}>
              <Button href="#projects" variant="primary" className="px-7 py-3">
                View My Work
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
              {hasCv ? (
                <Button
                  href={`${import.meta.env.BASE_URL}${profile.cv}`}
                  download
                  variant="outline"
                  className="px-7 py-3"
                >
                  <DownloadIcon className="h-4 w-4" /> Download CV
                </Button>
              ) : (
                <Button href="#contact" variant="outline" className="px-7 py-3">
                  Get in Touch
                </Button>
              )}
            </div>
          </div>

          {/* Right: mono ledger rail — structured metadata, not decoration */}
          <div
            className="hero-in lg:col-span-4 lg:border-l lg:border-slate-200 lg:pl-12 dark:lg:border-surface-border"
            style={{ animationDelay: '350ms' }}
          >
            <dl className="space-y-8">
              <div>
                <dt className="font-mono text-xs tracking-[0.14em] text-slate-400 uppercase dark:text-text-dim">
                  Available For
                </dt>
                <dd className="mt-3 space-y-2">
                  {heroCard.seeking.map((item) => (
                    <div key={item} className="flex items-baseline gap-2 text-sm text-slate-700 dark:text-text-main">
                      <span className="font-mono text-brand-500 dark:text-brand-400">—</span>
                      {item}
                    </div>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
