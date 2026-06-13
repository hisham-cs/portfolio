import { profile } from '../data.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons.jsx'

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-12 sm:py-18">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Get in touch" title="Contact" />
        </Reveal>
        <Reveal delay={100}>
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/50 bg-white/60 p-8 text-center shadow-xl shadow-indigo-500/5 backdrop-blur-xl transition-shadow duration-300 hover:shadow-2xl hover:shadow-indigo-500/8 sm:p-12 dark:border-surface-border dark:bg-surface-card/60 dark:shadow-black/20 dark:hover:shadow-black/30">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-400/15 via-violet-400/15 to-blue-400/15 blur-3xl dark:from-brand/8 dark:via-secondary/5 dark:to-accent/5"
            />
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-text-main">
              Let's work together
            </h3>
            <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-slate-600 dark:text-text-muted">
              I'm open to internships, collaborations, and AI/data-related opportunities. Feel free
              to reach out if you're interested in my work or want to connect.
            </p>

            {/* Visible copyable email */}
            <p className="mt-4 text-sm text-slate-500 dark:text-text-dim">
              <a
                href={`mailto:${profile.email}`}
                className="font-medium text-indigo-600 transition-colors hover:text-indigo-500 dark:text-brand-light dark:hover:text-brand"
              >
                {profile.email}
              </a>
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/25 transition-all hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-600/30 dark:bg-brand dark:shadow-brand/15 dark:hover:bg-brand-light dark:hover:shadow-brand/20"
              >
                <MailIcon /> Email Me
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md dark:border-surface-border dark:bg-surface-section/70 dark:text-text-muted dark:hover:border-surface-border-hover dark:hover:text-secondary"
              >
                <LinkedInIcon /> LinkedIn
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md dark:border-surface-border dark:bg-surface-section/70 dark:text-text-muted dark:hover:border-surface-border-hover dark:hover:text-secondary"
              >
                <GitHubIcon /> GitHub
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
