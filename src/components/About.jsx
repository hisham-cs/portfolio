import { about, aboutQuote, aboutCurrently, aboutHighlights } from '../data.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 border-b border-border py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Get to know me" title="About Me" align="left" />
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-12">
          {/* Left: the editorial column — the tightened paragraph, then the
              Currently status chip. The pull-quote no longer lives here: it
              breaks out full-width below both columns as the section's
              actual closing statement. */}
          <Reveal className="lg:col-span-8">
            <div className="max-w-[65ch]">
              <p className="text-lg leading-[1.7] text-text-secondary">{about}</p>

              {/* Same semantic-dot language as the status badges in Projects
                  (bg-success) — an existing pattern, not a new accent spot. */}
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
                <span className="font-mono text-sm text-text-secondary">{aboutCurrently}</span>
              </div>
            </div>
          </Reveal>

          {/* Right: mono ledger rail — same grammar as the Hero's rail.
              lg:pt-1 optically aligns "Focus" with the paragraph's first
              line; tightened item spacing keeps this column's depth close
              to the shorter paragraph+chip column beside it. */}
          <Reveal delay={150} className="lg:col-span-4">
            <div className="lg:border-l lg:border-border lg:pt-1 lg:pl-12">
              <p className="font-mono text-xs tracking-[0.14em] text-text-muted uppercase">
                Focus
              </p>
              <div className="mt-4 space-y-4">
                {aboutHighlights.map((item) => (
                  <div key={item.title}>
                    <div className="flex items-baseline gap-2 text-sm font-semibold text-text-primary">
                      <span className="font-mono text-text-muted">—</span>
                      {item.title}
                    </div>
                    <p className="mt-1 pl-4 text-sm leading-relaxed text-text-muted">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Pull-quote, broken out to full width beneath both columns — the
            typographic centerpiece of the section, given real size and
            room instead of being sandwiched between two paragraphs.
            Approved accent spot (c): the rule only, quote text stays
            neutral so the accent doesn't multiply within one block. */}
        <Reveal delay={100}>
          <blockquote className="mt-10 border-l-2 border-accent pl-6 sm:mt-14 sm:pl-8">
            <p className="max-w-4xl font-display text-2xl font-medium tracking-[-0.01em] text-text-primary sm:text-3xl">
              “{aboutQuote}”
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}
