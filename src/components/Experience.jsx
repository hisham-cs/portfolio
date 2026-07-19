import { experience } from '../data.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-b border-border py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Where I've worked" title="Experience" align="left" />
        </Reveal>

        <div className="space-y-6">
          {experience.map((entry, i) => (
            <Reveal key={entry.role + entry.organization} delay={i * 80}>
              <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10">
                <p className="font-mono text-xs tracking-[0.14em] text-text-muted uppercase">Role</p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.01em] text-text-primary sm:text-3xl">
                  {entry.role}
                </h3>
                <p className="mt-2 text-base text-text-secondary">{entry.organization}</p>
                <p className="mt-1 font-mono text-xs tracking-[0.1em] text-text-muted uppercase">
                  {entry.period} · {entry.location}
                </p>

                <div className="mt-8 border-t border-border pt-6">
                  <p className="font-mono text-xs tracking-[0.14em] text-text-muted uppercase">
                    Achievements
                  </p>
                  <ul className="mt-4 space-y-3">
                    {entry.achievements.map((item) => (
                      <li
                        key={item}
                        className="flex items-baseline gap-2 text-sm leading-relaxed text-text-secondary"
                      >
                        <span className="font-mono text-text-muted" aria-hidden="true">
                          –
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
