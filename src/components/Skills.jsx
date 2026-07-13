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

        <div className="border-t border-border">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={i * 60}>
              <div className="grid gap-3 border-b border-border py-8 lg:grid-cols-12 lg:gap-x-12">
                <div className="flex items-baseline gap-3 lg:col-span-3">
                  <span className="font-mono text-xs text-text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-lg font-semibold tracking-[-0.01em] text-text-primary">
                    {group.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-x-3 gap-y-2 lg:col-span-9">
                  {group.items.map((skill, j) => (
                    <span key={skill} className="flex items-center gap-3">
                      {j > 0 && <span className="text-border" aria-hidden="true">/</span>}
                      <span className="font-mono text-sm text-text-secondary">{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
