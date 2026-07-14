import { about, aboutQuote, aboutCurrently, aboutHighlights } from '../data.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

// Quote-first composition: Hero already owns "who" (name, title, the
// specialty rotator), so About opens with "why/how" instead of
// re-introducing identity. The pull-quote is the thesis and leads; the
// paragraph supports it; Currently closes the narrative beat. A hairline
// rule marks the pivot into the categorical half — the compact Focus band
// — the same structural device used as a section/block divider everywhere
// else on the site.
export default function About() {
  return (
    <section id="about" className="scroll-mt-20 border-b border-border py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Get to know me" title="About Me" align="left" />
        </Reveal>

        {/* Approved accent spot (c): the rule only, quote text stays
            neutral so the accent doesn't multiply within one block. */}
        <Reveal>
          <blockquote className="max-w-3xl border-l-2 border-accent pl-6 sm:pl-8">
            <p className="font-display text-3xl font-medium tracking-[-0.01em] text-text-primary lg:text-4xl">
              “{aboutQuote}”
            </p>
          </blockquote>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-8 max-w-[65ch] text-lg leading-[1.7] text-text-secondary">{about}</p>
        </Reveal>

        {/* Same semantic-dot language as the status badges in Projects
            (bg-success) — an existing pattern, not a new accent spot. */}
        <Reveal delay={140}>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
            <span className="font-mono text-sm text-text-secondary">{aboutCurrently}</span>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-10 border-t border-border pt-8">
            <p className="font-mono text-xs tracking-[0.14em] text-text-muted uppercase">
              Focus
            </p>
            <div className="mt-4 grid gap-6 sm:grid-cols-3 sm:gap-8">
              {aboutHighlights.map((item) => (
                <div key={item.title}>
                  <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-text-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
