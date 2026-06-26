import { about, aboutHighlights } from '../data.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { BrainIcon, EyeIcon, ChartIcon } from './Icons.jsx'

const icons = {
  ai: BrainIcon,
  vision: EyeIcon,
  data: ChartIcon,
}

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 py-12 sm:py-18">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Get to know me" title="About Me" />
        </Reveal>
        <Reveal delay={100}>
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200/50 bg-white/50 p-6 pl-7 text-left backdrop-blur-sm sm:p-7 sm:pl-8 dark:border-surface-border/40 dark:bg-white/[0.03]">
            {/* Purple accent line on the left edge */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-violet-500 dark:from-brand dark:to-brand-light"
            />
            <div className="space-y-4">
              {about.map((paragraph, i) => (
                <p key={i} className="text-base leading-relaxed text-pretty text-slate-600 sm:text-lg dark:text-text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Highlight cards */}
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
          {aboutHighlights.map((item, i) => {
            const Icon = icons[item.icon] ?? BrainIcon
            return (
              <Reveal key={item.title} delay={150 + i * 75}>
                <div className="group h-full rounded-2xl border border-slate-200/70 bg-white/70 p-5 text-center shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 dark:border-surface-border dark:bg-surface-card/60 dark:hover:border-surface-border-hover dark:hover:shadow-black/20">
                  <div className="mx-auto mb-3 w-fit rounded-xl bg-indigo-50 p-2.5 text-indigo-600 transition-colors group-hover:bg-indigo-100 dark:bg-secondary/10 dark:text-secondary dark:group-hover:bg-secondary/15">
                    <Icon />
                  </div>
                  <h3 className="font-semibold tracking-tight text-slate-900 dark:text-text-main">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-text-muted">{item.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
