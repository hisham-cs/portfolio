import { projects } from '../data.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { GitHubIcon, ExternalLinkIcon, ChatIcon, ActivityIcon, CarIcon, ChartIcon, CodeIcon, StarIcon } from './Icons.jsx'

const projectIcons = {
  chat: ChatIcon,
  medical: ActivityIcon,
  car: CarIcon,
  dashboard: ChartIcon,
}

// Subtle per-project gradient hues — calmer and darker for dark mode.
const previewGradients = {
  chat: 'from-indigo-100 via-violet-50 to-white dark:from-brand/10 dark:via-surface-card dark:to-surface-card',
  medical: 'from-violet-100 via-indigo-50 to-white dark:from-secondary/8 dark:via-surface-card dark:to-surface-card',
  car: 'from-blue-100 via-indigo-50 to-white dark:from-accent/8 dark:via-surface-card dark:to-surface-card',
  dashboard: 'from-sky-100 via-indigo-50 to-white dark:from-secondary/6 dark:via-surface-card dark:to-surface-card',
}

const statusStyles = {
  Completed:
    'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-success/10 dark:text-success dark:ring-success/20',
  'In Progress':
    'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-warning/10 dark:text-warning dark:ring-warning/20',
  Prototype:
    'bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-accent/10 dark:text-accent dark:ring-accent/20',
}

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 py-12 sm:py-18">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="What I've built" title="Projects" />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => {
            const Icon = projectIcons[project.icon] ?? CodeIcon
            const gradient = previewGradients[project.icon] ?? previewGradients.chat
            const isFeatured = project.featured === true
            return (
              <Reveal key={project.name} delay={i * 75}>
                <article
                  className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-white/70 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:hover:shadow-xl ${
                    isFeatured
                      ? 'featured-card dark:border-brand/25 dark:bg-surface-card/70'
                      : 'border-slate-200/70 hover:border-indigo-300 hover:shadow-indigo-500/5 dark:border-surface-border dark:bg-surface-card/60 dark:hover:border-surface-border-hover dark:hover:shadow-black/25'
                  }`}
                >
                  {/* Preview: screenshot when provided, otherwise a gradient panel */}
                  {project.image ? (
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={`${import.meta.env.BASE_URL}${project.image}`}
                        alt={`${project.name} screenshot`}
                        className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        {isFeatured && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-600/90 px-2.5 py-1 text-xs font-semibold text-white ring-1 ring-inset ring-white/20 dark:bg-brand/90">
                            <StarIcon className="h-3 w-3" /> Featured
                          </span>
                        )}
                        {project.status && (
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
                              statusStyles[project.status] ?? statusStyles.Completed
                            }`}
                          >
                            {project.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className={`relative flex h-32 items-center justify-center overflow-hidden bg-gradient-to-br ${gradient}`}>
                      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
                      <div
                        aria-hidden="true"
                        className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/40 blur-2xl dark:bg-secondary/5"
                      />
                      <div className="relative flex items-center gap-3">
                        <div className="rounded-xl bg-white/80 p-3 text-indigo-600 shadow-sm ring-1 ring-indigo-100 transition-transform duration-300 group-hover:scale-110 dark:bg-surface-section/80 dark:text-secondary dark:ring-surface-border">
                          <Icon className="h-8 w-8" />
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        {isFeatured && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-600/90 px-2.5 py-1 text-xs font-semibold text-white ring-1 ring-inset ring-white/20 dark:bg-brand/90">
                            <StarIcon className="h-3 w-3" /> Featured
                          </span>
                        )}
                        {project.status && (
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
                              statusStyles[project.status] ?? statusStyles.Completed
                            }`}
                          >
                            {project.status}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex grow flex-col p-5 sm:p-6">
                    <h3 className="text-lg font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-indigo-600 sm:text-xl dark:text-text-main dark:group-hover:text-secondary">
                      {project.name}
                    </h3>
                    {project.subtitle && (
                      <p className="mt-1 text-xs font-medium text-indigo-600/80 dark:text-text-muted">
                        {project.subtitle}
                      </p>
                    )}
                    <p className="mt-2.5 grow text-sm leading-relaxed text-slate-600 dark:text-text-muted">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200 dark:bg-surface-section dark:text-text-muted dark:hover:bg-surface-border/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      {project.demo ? (
                        <>
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-600/25 transition-all hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-md dark:bg-brand dark:shadow-brand/15 dark:hover:bg-brand-light"
                          >
                            <ExternalLinkIcon /> Live Demo
                          </a>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 dark:border-surface-border dark:text-text-muted dark:hover:border-surface-border-hover dark:hover:bg-surface-section"
                          >
                            <GitHubIcon className="h-4 w-4" /> GitHub
                          </a>
                        </>
                      ) : (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-600/25 transition-all hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-md dark:bg-brand dark:shadow-brand/15 dark:hover:bg-brand-light"
                        >
                          <GitHubIcon className="h-4 w-4" /> GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
