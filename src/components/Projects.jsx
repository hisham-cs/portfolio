import { useState } from 'react'
import { projects } from '../data.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import ProjectMedia from './ProjectMedia.jsx'
import { GitHubIcon, ExternalLinkIcon } from './Icons.jsx'

// Every project shares one card anatomy -- no flagship tier. Priority is
// expressed by array order in data.js (Telco leads deliberately: it's the
// site's title-promised category), not by size. See "Section composition
// patterns" in DESIGN.md.
//
// `category` (single value: 'Data Analysis' | 'AI') drives the filter
// pills -- never hardcoded, a new bucket appears automatically the next
// time this runs. `categoryTag` is a separate, more specific field for the
// card's own displayed label (e.g. "Computer Vision · Medical AI") -- the
// two are deliberately not 1:1 once the filter taxonomy went coarse.
const CATEGORIES = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))

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
          {project.categoryTag && (
            <span className="font-mono text-xs tracking-[0.1em] text-text-muted uppercase">
              · {project.categoryTag}
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

  const matches = (project) => activeCategory === 'All' || project.category === activeCategory
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
            click -- no new motion touch. Left-aligned by default, matching
            the heading and grid -- this site never centers anything else.
            Centers only in the single-result state, where the grid below
            also switches to a centered flex row, so the pills matching it
            reads as "this state is different on purpose," not a permanent
            deviation from the site's left-anchored language. */}
        <Reveal delay={40}>
          <div
            role="group"
            aria-label="Filter projects by category"
            className={`mt-6 flex gap-2 overflow-x-auto pb-1 ${visibleCount === 1 ? 'justify-center' : ''}`}
          >
            {['All', ...CATEGORIES].map((category) => {
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

        {/* 2-up grid, restored -- the normal path below carries no extra
            constraints beyond what it had before the strip experiment.
            A single visible result switches the container to a centered
            flex row instead of leaving the lone card stranded in the
            grid's first cell; only in that state does the card gain a
            `sm:max-w-xl` cap so it has a sane width to center at instead
            of stretching edge-to-edge (a named scale step, not an exact
            pixel match to a 2-up column -- close enough that it reads as
            deliberate, not an attempt at pixel parity). */}
        <div className={`mt-6 ${visibleCount === 1 ? 'flex justify-center' : 'grid gap-6 sm:grid-cols-2'}`}>
          {projects.map((project, i) => (
            <div
              key={project.slug}
              id={project.slug}
              className={`h-full w-full scroll-mt-24 ${visibleCount === 1 ? 'sm:max-w-xl' : ''} ${matches(project) ? '' : 'hidden'}`}
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
