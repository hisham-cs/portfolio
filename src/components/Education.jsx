import { education, certificates } from '../data.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const gradYear = education.graduation.replace(/^\D+/, '')

export default function Education() {
  return (
    <section
      id="education"
      className="scroll-mt-20 border-b border-border py-24 sm:py-32"
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

        {/* Certificates — compact two-column grid, one card per credential */}
        <Reveal delay={80}>
          <div className="mt-12">
            <p className="font-mono text-xs tracking-[0.14em] text-text-muted uppercase">Certificates</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {certificates.map((cert, i) => (
                <div key={cert.title} className="rounded-xl border border-border p-5">
                  <span className="font-mono text-xs text-text-muted">
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
                        className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-text-primary transition-colors hover:text-text-secondary"
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
