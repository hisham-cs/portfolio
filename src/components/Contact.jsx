import { profile } from '../data.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { GitHubIcon, LinkedInIcon, DownloadIcon } from './Icons.jsx'

export default function Contact() {
  const hasCv = profile.showCv && profile.cv

  return (
    <section id="contact" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Get in touch" title="Contact" align="left" />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-12">
          {/* Left: closing statement + the primary channel, given real visual weight */}
          <Reveal className="lg:col-span-8">
            <p className="max-w-[65ch] text-lg leading-[1.7] text-text-secondary">
              I'm open to Data Analytics & AI roles, internships, collaborations, and technology-related
              opportunities. Feel free to reach out if you're interested in my work or want to
              connect.
            </p>

            <div className="mt-8">
              <p className="font-mono text-xs tracking-[0.14em] text-text-muted uppercase">
                Email
              </p>
              {/* Approved accent spot (d) */}
              <a
                href={`mailto:${profile.email}`}
                className="group mt-2 inline-flex min-h-11 items-center gap-3 font-display text-2xl font-semibold tracking-[-0.01em] text-accent transition-colors hover:text-accent-hover sm:text-3xl"
              >
                {profile.email}
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          </Reveal>

          {/* Right: mono ledger of other channels */}
          <Reveal
            delay={100}
            className="lg:col-span-4 lg:border-l lg:border-border lg:pl-12"
          >
            <p className="font-mono text-xs tracking-[0.14em] text-text-muted uppercase">
              Elsewhere
            </p>
            <div className="mt-4 flex flex-col items-start gap-3">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-text-primary transition-colors hover:text-text-secondary"
              >
                <LinkedInIcon className="h-4 w-4" />
                LinkedIn
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-text-primary transition-colors hover:text-text-secondary"
              >
                <GitHubIcon className="h-4 w-4" />
                GitHub
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </a>
              {hasCv && (
                <a
                  href={`${import.meta.env.BASE_URL}${profile.cv}`}
                  download
                  className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-text-primary transition-colors hover:text-text-secondary"
                >
                  <DownloadIcon className="h-4 w-4" />
                  Download CV
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
