import { about, aboutQuote, aboutHighlights } from '../data.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 border-b border-slate-200 py-24 dark:border-surface-border sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Get to know me" title="About Me" align="left" />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-12">
          {/* Left: the editorial column — bio copy with a pulled-quote highlight */}
          <Reveal className="lg:col-span-8">
            <div className="max-w-[65ch]">
              <p className="text-lg leading-[1.7] text-slate-600 dark:text-text-muted">{about[0]}</p>

              <blockquote className="my-8 border-l-2 border-brand-500 pl-6 dark:border-brand-400">
                <p className="font-display text-2xl font-medium tracking-[-0.01em] text-brand-700 sm:text-3xl dark:text-brand-300">
                  “{aboutQuote}”
                </p>
              </blockquote>

              <p className="text-lg leading-[1.7] text-slate-600 dark:text-text-muted">{about[1]}</p>
            </div>
          </Reveal>

          {/* Right: mono ledger rail — same grammar as the Hero's rail */}
          <Reveal delay={150} className="lg:col-span-4">
            <div className="lg:border-l lg:border-slate-200 lg:pl-12 dark:lg:border-surface-border">
              <p className="font-mono text-xs tracking-[0.14em] text-slate-400 uppercase dark:text-text-dim">
                Focus
              </p>
              <div className="mt-4 space-y-6">
                {aboutHighlights.map((item) => (
                  <div key={item.title}>
                    <div className="flex items-baseline gap-2 text-sm font-semibold text-slate-800 dark:text-text-main">
                      <span className="font-mono text-brand-500 dark:text-brand-400">—</span>
                      {item.title}
                    </div>
                    <p className="mt-1 pl-4 text-sm leading-relaxed text-slate-500 dark:text-text-dim">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
