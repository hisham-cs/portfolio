import { projects, getProjectImages } from '../data.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import ProjectMedia from './ProjectMedia.jsx'
import { GitHubIcon, ExternalLinkIcon } from './Icons.jsx'

// The strongest differentiator gets a full-width feature treatment at the
// top of the section — every screenshot visible at once, nothing gated
// behind a click. Everything else is scannable in a compact 2-up grid below.
const FLAGSHIP_SLUG = 'faten'

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

function ProjectTags({ tags }) {
  return (
    <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
      {tags.map((tag, j) => (
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

function FlagshipProject({ project, index }) {
  const images = getProjectImages(project)

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-10">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-xs text-text-muted">{String(index + 1).padStart(2, '0')}</span>
        <StatusDot status={project.status} />
        <span className="font-mono text-xs tracking-[0.1em] text-text-muted uppercase">
          · Flagship project
        </span>
      </div>

      <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.01em] text-text-primary sm:text-4xl">
        {project.name}
      </h3>
      {project.subtitle && (
        <p className="mt-2 font-mono text-xs text-text-secondary">{project.subtitle}</p>
      )}

      {images.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-3">
          {images.map((img, i) => (
            <div
              key={img.src}
              className="group/tile relative aspect-video overflow-hidden rounded-lg border border-border bg-surface-elevated"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover/tile:scale-[1.03]"
              />
            </div>
          ))}
        </div>
      )}

      <p className="mt-8 max-w-[65ch] text-lg leading-[1.7] text-text-secondary">
        {project.description}
      </p>

      <ProjectTags tags={project.tags} />
      <ProjectLinks project={project} />
    </div>
  )
}

function CompactProject({ project, index }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-text-muted hover:shadow-md">
      <ProjectMedia project={project} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-text-muted">{String(index + 1).padStart(2, '0')}</span>
          <StatusDot status={project.status} />
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
  const flagship = projects.find((p) => p.slug === FLAGSHIP_SLUG)
  const rest = projects.filter((p) => p.slug !== FLAGSHIP_SLUG)

  return (
    <section id="projects" className="scroll-mt-20 border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="What I've built" title="Projects" align="left" />
        </Reveal>

        {flagship && (
          <Reveal>
            <div id={flagship.slug} className="scroll-mt-24">
              <FlagshipProject project={flagship} index={projects.indexOf(flagship)} />
            </div>
          </Reveal>
        )}

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal key={project.name} delay={(i + 1) * 80}>
              <div id={project.slug} className="h-full scroll-mt-24">
                <CompactProject project={project} index={projects.indexOf(project)} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
