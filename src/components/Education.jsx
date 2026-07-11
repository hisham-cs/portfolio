import { education, certificates } from '../data.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const gradYear = education.graduation.replace(/^\D+/, '')

export default function Education() {
  return (
    <section
      id="education"
      className="scroll-mt-20 border-b border-slate-200 py-24 dark:border-surface-border sm:py-32"
    >
      {/* Anchor kept for old #certificates links */}
      <span id="certificates" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Background & credentials" title="Education & Certificates" align="left" />
        </Reveal>

        {/* Degree — one larger, richer card; the one degree earns more
            visual weight than any single certificate */}
        <Reveal>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-surface-border dark:bg-surface-card sm:p-10">
            <p className="font-mono text-xs tracking-[0.14em] text-text-muted uppercase">Degree</p>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.01em] text-text-primary sm:text-3xl">
              {education.degree}
            </h3>
            <p className="mt-2 text-base text-text-secondary">
              {education.university} · {education.college}
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-6 border-t border-slate-200 pt-6 dark:border-surface-border">
              <div>
                <dt className="font-mono text-xs tracking-[0.14em] text-text-muted uppercase">GPA</dt>
                <dd className="mt-1 font-display text-lg font-semibold text-text-primary">{education.gpa}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs tracking-[0.14em] text-text-muted uppercase">Honours</dt>
                <dd className="mt-1 text-sm font-semibold text-text-primary">{education.honours}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs tracking-[0.14em] text-text-muted uppercase">Graduated</dt>
                <dd className="mt-1 text-sm font-semibold text-text-primary">{gradYear}</dd>
              </div>
            </dl>
          </div>
        </Reveal>

        {/* Certificates — compact two-column grid, one card per credential */}
        <Reveal delay={80}>
          <div className="mt-12">
            <p className="font-mono text-xs tracking-[0.14em] text-text-muted uppercase">Certificates</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {certificates.map((cert, i) => (
                <div key={cert.title} className="rounded-xl border border-slate-200 p-5 dark:border-surface-border">
                  <span className="font-mono text-xs text-brand-500 dark:text-brand-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="mt-2 font-display text-base font-semibold leading-snug text-text-primary">
                    {cert.title}
                  </h4>
                  <p className="mt-1 text-sm text-text-secondary">{cert.issuer}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-mono text-xs text-text-muted">{cert.year}</span>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
                      >
                        Verify
                        <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
