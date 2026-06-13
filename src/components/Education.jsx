import { education, certificates } from '../data.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { GraduationCapIcon, AwardIcon, ExternalLinkIcon } from './Icons.jsx'

const statusStyles = {
  Completed:
    'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-success/10 dark:text-success dark:ring-success/20',
  'In Progress':
    'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-warning/10 dark:text-warning dark:ring-warning/20',
}

function TimelineDot() {
  return (
    <div
      aria-hidden="true"
      className="absolute top-5 -left-8 flex h-5 w-5 items-center justify-center rounded-full border-2 border-indigo-500 bg-white sm:-left-10 sm:h-6 sm:w-6 dark:border-brand dark:bg-surface-base"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-brand" />
    </div>
  )
}

export default function Education() {
  return (
    <section id="education" className="scroll-mt-20 py-12 sm:py-18">
      {/* Anchor kept for old #certificates links */}
      <span id="certificates" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Background & credentials" title="Education & Certificates" />
        </Reveal>

        <div className="relative mx-auto max-w-2xl pl-8 sm:pl-10">
          {/* Timeline rail */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-6 left-2.5 w-px bg-gradient-to-b from-indigo-400/60 via-slate-300 to-transparent sm:left-3 dark:from-brand/40 dark:via-surface-border"
          />

          <div className="space-y-4">
            {/* Education entry */}
            <Reveal>
              <div className="relative">
                <TimelineDot />
                <div className="group rounded-2xl border border-indigo-200/80 bg-gradient-to-b from-indigo-50/70 to-white/70 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/5 sm:p-6 dark:border-brand/20 dark:from-brand/5 dark:to-surface-card/80 dark:hover:border-brand/35 dark:hover:shadow-black/20">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="shrink-0 rounded-xl bg-indigo-100 p-2.5 text-indigo-600 transition-colors group-hover:bg-indigo-200/70 dark:bg-brand/15 dark:text-brand-light dark:group-hover:bg-brand/20">
                        <GraduationCapIcon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold tracking-tight text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-text-main dark:group-hover:text-brand-light">
                          {education.university}
                        </h3>
                        <p className="mt-0.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                          {education.degree}
                        </p>
                        <p className="mt-0.5 text-sm text-slate-600 dark:text-text-muted">{education.college}</p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-brand/10 dark:text-brand-light">
                      {education.graduation}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Certificates */}
            {certificates.map((cert, i) => (
              <Reveal key={cert.name} delay={75 + i * 75}>
                <div className="relative">
                  <TimelineDot />
                  <div className="group rounded-2xl border border-slate-200/70 bg-white/70 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 dark:border-surface-border dark:bg-surface-card/60 dark:hover:border-surface-border-hover dark:hover:shadow-black/20">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="shrink-0 rounded-xl bg-indigo-50 p-2.5 text-indigo-600 transition-colors group-hover:bg-indigo-100 dark:bg-secondary/10 dark:text-secondary dark:group-hover:bg-secondary/15">
                          <AwardIcon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-text-main dark:group-hover:text-secondary">
                            {cert.name}
                          </h3>
                          <p className="mt-0.5 text-sm text-slate-600 dark:text-text-muted">
                            {cert.issuer}{cert.status === 'In Progress' ? ' · Ongoing' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        {cert.status && (
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
                              statusStyles[cert.status] ?? statusStyles.Completed
                            }`}
                          >
                            {cert.status}
                          </span>
                        )}
                        {cert.link && (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 dark:border-surface-border dark:text-text-muted dark:hover:border-surface-border-hover dark:hover:text-secondary"
                          >
                            View <ExternalLinkIcon className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
