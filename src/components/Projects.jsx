import { projects } from '../data.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { GitHubIcon, ExternalLinkIcon } from './Icons.jsx'

export default function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-20 border-b border-slate-200 py-24 dark:border-surface-border sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="What I've built" title="Projects" align="left" />
        </Reveal>

        <div className="border-t border-slate-200 dark:border-surface-border">
          {projects.map((project, i) => (
            <Reveal key={project.name} delay={i * 80}>
              <article className="grid gap-6 border-b border-slate-200 py-12 lg:grid-cols-12 lg:gap-x-12 dark:border-surface-border">
                {/* Left: index, name, subtitle, status */}
                <div className="lg:col-span-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-brand-500 dark:text-brand-400">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {project.status && (
                      <span className="flex items-center gap-1.5 font-mono text-xs tracking-[0.1em] text-slate-400 uppercase dark:text-text-dim">
                        <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
                        {project.status}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.01em] text-slate-900 sm:text-3xl dark:text-text-main">
                    {project.name}
                  </h3>
                  {project.subtitle && (
                    <p className="mt-2 font-mono text-xs text-slate-500 dark:text-text-dim">{project.subtitle}</p>
                  )}
                </div>

                {/* Right: description, tags, links */}
                <div className="lg:col-span-8">
                  <p className="max-w-[65ch] text-lg leading-[1.7] text-slate-600 dark:text-text-muted">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
                    {project.tags.map((tag, j) => (
                      <span key={tag} className="flex items-center gap-3">
                        {j > 0 && (
                          <span className="text-slate-300 dark:text-surface-border-hover" aria-hidden="true">
                            /
                          </span>
                        )}
                        <span className="font-mono text-sm text-slate-600 dark:text-text-muted">{tag}</span>
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-6">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
                      >
                        <ExternalLinkIcon className="h-4 w-4" />
                        Live Demo
                        <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 transition-colors hover:text-brand-700 dark:text-text-main dark:hover:text-brand-300"
                      >
                        <GitHubIcon className="h-4 w-4" />
                        GitHub
                        <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
