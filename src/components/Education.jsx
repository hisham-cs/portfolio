import { education, certificates } from '../data.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { ExternalLinkIcon } from './Icons.jsx'

const gradYear = education.graduation.replace(/^\D+/, '')

const timeline = [
  {
    type: 'Degree',
    title: education.university,
    subtitle: `${education.degree} · ${education.college}`,
    detail: `GPA ${education.gpa} · ${education.honours}`,
    year: gradYear,
    link: null,
  },
  ...certificates.map((cert) => ({
    type: 'Certificate',
    title: cert.name,
    subtitle: null,
    detail: null,
    year: cert.year,
    link: cert.link || null,
  })),
]

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

        <div className="border-t border-slate-200 dark:border-surface-border">
          {timeline.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className="grid gap-4 border-b border-slate-200 py-8 lg:grid-cols-12 lg:gap-x-12 dark:border-surface-border">
                {/* Left: index, type/status, title, subtitle */}
                <div className="lg:col-span-8">
                  <div className="flex items-center gap-2 font-mono text-xs tracking-[0.1em] uppercase">
                    <span className="text-brand-500 dark:text-brand-400">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-slate-400 dark:text-text-dim">{item.type}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-[-0.01em] text-slate-900 dark:text-text-main">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="mt-1 text-sm text-slate-600 dark:text-text-muted">{item.subtitle}</p>
                  )}
                  {item.detail && (
                    <p className="mt-1 font-mono text-xs text-slate-500 dark:text-text-dim">{item.detail}</p>
                  )}
                </div>

                {/* Right: year + link */}
                <div className="flex items-start justify-between gap-4 lg:col-span-4 lg:flex-col lg:items-end lg:text-right">
                  <span className="font-mono text-sm text-slate-500 dark:text-text-dim">{item.year}</span>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
                    >
                      View <ExternalLinkIcon className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
