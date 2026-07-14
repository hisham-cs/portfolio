import { education, certificates } from '../data.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const gradYear = education.graduation.replace(/^\D+/, '')

export default function Education() {
  return (
    <section
      id="education"
      className="scroll-mt-20 border-b border-border py-16 sm:py-20"
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
          <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10">
            <p className="font-mono text-xs tracking-[0.14em] text-text-muted uppercase">Degree</p>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.01em] text-text-primary sm:text-3xl">
              {education.degree}
            </h3>
            <p className="mt-2 text-base text-text-secondary">
              {education.university} · {education.college}
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-6 border-t border-border pt-6">
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

        {/* Certificates — dense hairline-divided list (same row grammar as
            Skills/Projects) instead of a grid of near-identical boxes.
            Order is signal-based (see data.js), so the year stays visible
            on every row to show that's deliberate, not chronological. */}
        <Reveal delay={80}>
          <div className="mt-10">
            <p className="font-mono text-xs tracking-[0.14em] text-text-muted uppercase">Certificates</p>
            <div className="mt-4 border-t border-border">
              {certificates.map((cert, i) => (
                <div key={cert.title} className="flex items-start gap-4 border-b border-border py-5">
                  <span className="pt-0.5 font-mono text-xs text-text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-display text-base font-semibold leading-snug text-text-primary">
                      {cert.title}
                    </h4>
                    <p className="mt-1 text-sm text-text-secondary">{cert.issuer}</p>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-text-primary transition-colors hover:text-text-secondary"
                      >
                        Verify
                        <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                      </a>
                    )}
                  </div>
                  <span className="shrink-0 pt-0.5 font-mono text-xs text-text-muted">{cert.year}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
