import { profile, stats, focusAreas, heroCard, education } from '../data.js'
import { GitHubIcon, LinkedInIcon, MailIcon, DownloadIcon } from './Icons.jsx'

export default function Hero() {
  // Non-breaking hyphens stop the browser from wrapping mid-name ("Al-Malki").
  const displayName = profile.name.replace(/-/g, '\u2011')

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-12 sm:pt-34 sm:pb-16">
      {/* Soft drifting orbs behind the hero */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="animate-hero-drift absolute -top-40 left-1/3 h-130 w-130 rounded-full bg-indigo-400/20 blur-3xl dark:bg-brand/8" />
        <div className="animate-hero-drift-alt absolute top-24 -right-32 h-96 w-96 rounded-full bg-violet-400/15 blur-3xl dark:bg-secondary/5" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Left: introduction */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl xl:text-6xl dark:text-text-main">
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-brand dark:to-brand-light">
              {displayName}
            </span>
          </h1>
          <p className="mt-3 text-lg font-medium text-balance text-slate-700 sm:text-xl dark:text-text-muted">
            {profile.title}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-pretty text-slate-600 lg:mx-0 dark:text-text-muted">
            {profile.intro}
          </p>

          {/* Primary CTA buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/25 transition-all hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-600/30 dark:bg-brand dark:shadow-brand/20 dark:hover:bg-brand-light dark:hover:shadow-brand/25"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-6 py-2.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md dark:border-surface-border dark:bg-surface-card/70 dark:text-text-muted dark:hover:border-surface-border-hover dark:hover:text-secondary"
            >
              Contact Me
            </a>
            {profile.showCv && profile.cv && (
              <a
                href={`${import.meta.env.BASE_URL}${profile.cv}`}
                download
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-300 bg-indigo-50 px-5 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-indigo-100 hover:shadow-md dark:border-surface-border dark:bg-brand/10 dark:text-brand-light dark:hover:bg-brand/15"
              >
                <DownloadIcon className="h-4 w-4" /> Download CV
              </a>
            )}
          </div>

          {/* Secondary social links */}
          <div className="mt-5 flex items-center justify-center gap-3 lg:justify-start">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white/60 p-2.5 text-slate-600 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900 hover:shadow-md dark:border-surface-border dark:bg-surface-card/50 dark:text-text-muted dark:hover:border-surface-border-hover dark:hover:text-text-main"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white/60 p-2.5 text-slate-600 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md dark:border-surface-border dark:bg-surface-card/50 dark:text-text-muted dark:hover:border-surface-border-hover dark:hover:text-secondary"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white/60 p-2.5 text-slate-600 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900 hover:shadow-md dark:border-surface-border dark:bg-surface-card/50 dark:text-text-muted dark:hover:border-surface-border-hover dark:hover:text-text-main"
            >
              <MailIcon className="h-4 w-4" />
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-8 flex items-stretch justify-center divide-x divide-slate-200 lg:justify-start dark:divide-surface-border">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center px-5 text-center first:pl-0 sm:px-7 sm:first:pl-0"
              >
                <p className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-xl font-extrabold text-transparent sm:text-2xl dark:from-brand dark:to-brand-light">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-xs font-medium text-slate-500 sm:text-sm dark:text-text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: glassmorphism profile card */}
        <div className="relative mx-auto w-full max-w-md lg:mx-0">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-transparent blur-2xl dark:from-brand/8 dark:via-secondary/4 dark:to-transparent"
          />
          <div className="relative rounded-3xl border border-white/50 bg-white/60 p-6 shadow-xl shadow-indigo-500/5 backdrop-blur-xl sm:p-7 dark:border-surface-border dark:bg-surface-card/60 dark:shadow-black/30">
            {/* Card header */}
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-md shadow-indigo-600/30 dark:from-brand dark:to-brand-dim dark:shadow-brand/20">
                <img
                  src={`${import.meta.env.BASE_URL}img.png`}
                  alt="Hisham AI robot avatar"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-slate-900 dark:text-text-main">{profile.name}</p>
                <p className="text-sm text-slate-600 dark:text-text-muted">Computer Science Graduate</p>
                <p className="text-xs text-slate-500 dark:text-text-dim">
                  {education.university}
                </p>
              </div>
            </div>

            <div className="my-5 h-px bg-gradient-to-r from-transparent via-slate-300/70 to-transparent dark:via-surface-border" />

            <div className="space-y-4 text-sm">
              {/* Open to */}
              <div>
                <p className="mb-1.5 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-text-dim">
                  Open to
                </p>
                <div className="flex flex-wrap gap-2">
                  {heroCard.seeking.map((role, idx) => (
                    <span
                      key={role}
                      className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-brand/20 dark:bg-brand/10 dark:text-brand-light"
                    >
                      {idx === 0 && (
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                        </span>
                      )}
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Focus areas */}
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-text-dim">
                  Interests
                </p>
                <div className="flex flex-wrap gap-2">
                  {focusAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-brand/10 dark:text-brand-light"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Selected work */}
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-text-dim">
                  Selected work
                </p>
                <ul className="space-y-1.5">
                  {heroCard.bestWork.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-indigo-500 dark:bg-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
