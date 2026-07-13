import { skills } from '../data.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-b border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="What I work with" title="Skills" align="left" />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {skills.map((group, i) => {
            return (
              <Reveal key={group.category} delay={i * 60}>
                <div className="group/card flex h-full flex-col rounded-2xl border border-transparent bg-surface p-6 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-border hover:bg-surface-elevated hover:shadow-md sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-text-muted">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-lg font-semibold tracking-[-0.01em] text-text-primary">
                      {group.category}
                    </h3>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.primary.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg bg-surface-elevated px-3 py-1.5 text-sm font-semibold text-text-primary transition-colors duration-200 group-hover/card:bg-background"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {group.secondary.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
                      {group.secondary.map((skill, j) => (
                        <span key={skill} className="flex items-center gap-3">
                          {j > 0 && (
                            <span className="text-border" aria-hidden="true">
                              /
                            </span>
                          )}
                          <span className="font-mono text-xs text-text-secondary">{skill}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {group.proof && (
                    <div className="mt-auto border-t border-border pt-4">
                      {group.proof.slug ? (
                        <a
                          href={`#${group.proof.slug}`}
                          className="group/link inline-flex min-h-11 items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
                        >
                          Proven in {group.proof.label}
                          <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">
                            →
                          </span>
                        </a>
                      ) : (
                        <p className="text-sm text-text-muted">{group.proof.label}</p>
                      )}
                    </div>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
