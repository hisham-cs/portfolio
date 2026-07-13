import { projects } from '../data.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import ProjectMedia from './ProjectMedia.jsx'
import { GitHubIcon, ExternalLinkIcon } from './Icons.jsx'

export default function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-20 border-b border-border py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="What I've built" title="Projects" align="left" />
        </Reveal>

        <div className="border-t border-border">
          {projects.map((project, i) => (
            <Reveal key={project.name} delay={i * 80}>
              <article id={project.slug} className="group scroll-mt-24 border-b border-border py-12">
                <ProjectMedia project={project} />

                <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-x-12">
                  {/* Left: index, name, subtitle, status */}
                  <div className="lg:col-span-4">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-text-muted">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {project.status && (
                        <span className="flex items-center gap-1.5 font-mono text-xs tracking-[0.1em] text-text-muted uppercase">
                          <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
                          {project.status}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.01em] text-text-primary sm:text-3xl">
                      {project.name}
                    </h3>
                    {project.subtitle && (
                      <p className="mt-2 font-mono text-xs text-text-secondary">{project.subtitle}</p>
                    )}
                  </div>

                  {/* Right: description, tags, links */}
                  <div className="lg:col-span-8">
                    <p className="max-w-[65ch] text-lg leading-[1.7] text-text-secondary">
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
                      {project.tags.map((tag, j) => (
                        <span key={tag} className="flex items-center gap-3">
                          {j > 0 && (
                            <span className="text-border" aria-hidden="true">
                              /
                            </span>
                          )}
                          <span className="font-mono text-sm text-text-secondary">{tag}</span>
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-6">
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-text-primary transition-colors hover:text-text-secondary"
                        >
                          <ExternalLinkIcon className="h-4 w-4" />
                          Live Demo
                          <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">→</span>
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-text-primary transition-colors hover:text-text-secondary"
                        >
                          <GitHubIcon className="h-4 w-4" />
                          GitHub
                          <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">→</span>
                        </a>
                      )}
                    </div>
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
