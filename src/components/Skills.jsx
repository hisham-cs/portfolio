import { skills } from '../data.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { CodeIcon, BrainIcon, EyeIcon, ChartIcon, WrenchIcon, StarIcon, ApiIcon } from './Icons.jsx'

const icons = {
  core: StarIcon,
  ai: BrainIcon,
  vision: EyeIcon,
  data: ChartIcon,
  tools: WrenchIcon,
  backend: ApiIcon,
}

export default function Skills() {
  // First category is "Core Skills" — rendered with a highlighted style.
  const [coreGroup, ...restGroups] = skills

  const CoreIcon = icons[coreGroup.icon] ?? StarIcon

  return (
    <section id="skills" className="scroll-mt-20 py-12 sm:py-18">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="What I work with" title="Skills" />
        </Reveal>

        {/* Core Skills — full-width highlighted card */}
        <Reveal>
          <div className="mx-auto mb-6 max-w-3xl rounded-2xl border border-indigo-200/80 bg-gradient-to-b from-indigo-50/70 to-white/70 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-brand/20 dark:from-brand/5 dark:to-surface-card/80 dark:hover:shadow-black/20">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-indigo-100 p-2.5 text-indigo-600 dark:bg-brand/15 dark:text-brand-light">
                <CoreIcon />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-text-main">
                {coreGroup.category}
              </h3>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              {coreGroup.items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-100 dark:bg-brand/10 dark:text-brand-light dark:hover:bg-brand/16"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Remaining skill groups in a 2×2 grid */}
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
          {restGroups.map((group, i) => {
            const Icon = icons[group.icon] ?? CodeIcon
            return (
              <Reveal key={group.category} delay={i * 60}>
                <div className="group h-full rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg dark:border-surface-border dark:bg-surface-card/60 dark:hover:border-surface-border-hover dark:hover:shadow-black/20">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-xl bg-slate-100 p-2.5 text-slate-600 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:bg-surface-card dark:text-text-muted dark:group-hover:bg-secondary/10 dark:group-hover:text-secondary">
                      <Icon />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-text-main">
                      {group.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200 dark:bg-surface-section dark:text-text-muted dark:hover:bg-surface-border/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
