import { useMemo, useState } from 'react'
import { projects } from '../data.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import ProjectMedia from './ProjectMedia.jsx'
import { GitHubIcon, ExternalLinkIcon } from './Icons.jsx'

// Every project shares one card anatomy now -- no flagship tier. Priority
// is expressed by array order in data.js (Telco leads deliberately, same
// reasoning as before: it's the site's title-promised category), not by a
// bigger card. See "Section composition patterns" in DESIGN.md.
//
// `category` is a single string like "Data Analysis · Machine Learning" --
// split on the separator to get the atomic tokens the filter pills use.
// Never hardcoded: a project with a new category token gets a pill for
// free the next time this runs.
function splitCategory(category) {
  if (!category) return []
  return category
    .split('·')
    .map((token) => token.trim())
    .filter(Boolean)
}

function ProjectLinks({ project }) {
  return (
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
  )
}

function StatusDot({ status }) {
  if (!status) return null
  return (
    <span className="flex items-center gap-1.5 font-mono text-xs tracking-[0.1em] text-text-muted uppercase">
      <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
      {status}
    </span>
  )
}

function ProjectCard({ project, index }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-text-muted hover:shadow-md">
      <ProjectMedia project={project} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-text-muted">{String(index + 1).padStart(2, '0')}</span>
          <StatusDot status={project.status} />
          {project.category && (
            <span className="font-mono text-xs tracking-[0.1em] text-text-muted uppercase">
              · {project.category}
            </span>
          )}
        </div>

        <h3 className="mt-3 font-display text-xl font-semibold tracking-[-0.01em] text-text-primary">
          {project.name}
        </h3>
        {project.subtitle && (
          <p className="mt-1 font-mono text-xs text-text-secondary">{project.subtitle}</p>
        )}

        <p className="mt-3 text-sm leading-relaxed text-text-secondary">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
          {project.tags.map((tag, j) => (
            <span key={tag} className="flex items-center gap-3">
              {j > 0 && (
                <span className="text-border" aria-hidden="true">
                  /
                </span>
              )}
              <span className="font-mono text-xs text-text-secondary">{tag}</span>
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <ProjectLinks project={project} />
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = useMemo(() => {
    const seen = new Set()
    for (const project of projects) {
      for (const token of splitCategory(project.category)) seen.add(token)
    }
    return Array.from(seen)
  }, [])

  const matches = (project) =>
    activeCategory === 'All' || splitCategory(project.category).includes(activeCategory)

  const visibleCount = projects.filter(matches).length

  return (
    <section id="projects" className="scroll-mt-20 border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="What I've built" title="Projects" align="left" />
        </Reveal>

        {/* Filter pills -- real buttons in a labelled group, aria-pressed
            for state, no accent (weight/background contrast only, per
            accent discipline). Instant filtering: cards are always
            mounted and toggled via `hidden`, never unmounted/remounted,
            so the shared Reveal entrance never replays on a filter
            click -- no new motion touch. */}
        <Reveal delay={40}>
          <div
            role="group"
            aria-label="Filter projects by category"
            className="mt-6 flex gap-2 overflow-x-auto pb-1"
          >
            {['All', ...categories].map((category) => {
              const isActive = activeCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-text-primary text-background'
                      : 'bg-surface text-text-secondary hover:bg-surface-elevated'
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </Reveal>

        <p aria-live="polite" className="sr-only">
          Showing {visibleCount} of {projects.length} projects
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <div
              key={project.slug}
              id={project.slug}
              className={`h-full scroll-mt-24 ${matches(project) ? '' : 'hidden'}`}
            >
              <Reveal className="h-full" delay={i * 80}>
                <ProjectCard project={project} index={i} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
