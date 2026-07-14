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
          {/* Left: the editorial column — one tightened paragraph, the
              pull-quote as the actual centerpiece (not sandwiched between
              two paragraphs of equal weight), then a closing status line */}
          <Reveal className="lg:col-span-8">
            <div className="max-w-[65ch]">
              <p className="text-lg leading-[1.7] text-text-secondary">{about}</p>

              {/* Approved accent spot (c): the rule only — the quote text itself
                  stays neutral so the accent doesn't multiply within one block. */}
              <blockquote className="my-8 border-l-2 border-accent pl-6">
                <p className="font-display text-2xl font-medium tracking-[-0.01em] text-text-primary sm:text-3xl">
                  “{aboutQuote}”
                </p>
              </blockquote>

              <p className="font-mono text-sm text-text-secondary">{aboutCurrently}</p>
            </div>
          </Reveal>

          {/* Right: mono ledger rail — same grammar as the Hero's rail */}
          <Reveal delay={150} className="lg:col-span-4">
            <div className="lg:border-l lg:border-border lg:pl-12">
              <p className="font-mono text-xs tracking-[0.14em] text-text-muted uppercase">
                Focus
              </p>
              <div className="mt-4 space-y-6">
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
      </div>
    </section>
  )
}
