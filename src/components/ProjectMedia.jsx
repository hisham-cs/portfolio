import { useEffect, useState } from 'react'
import { getProjectImages } from '../data.js'
import useMediaQuery from '../hooks/useMediaQuery.js'

const CYCLE_INTERVAL_MS = 2500

// Preview slot for a compact project card. Renders the given image(s)/GIF
// inside a fixed-aspect box (no layout shift while it loads); falls back to
// a terminal-style typographic mockup when no media is provided yet. The
// first image is always visible with zero interaction.
//
// A project with multiple images gets small tap targets (dots) that jump
// straight to a frame — these are the reachability guarantee for touch and
// keyboard, since there's no hover on a touchscreen. Hovering/focusing the
// card is a bonus on top: it auto-cycles through the rest and settles back
// on the first frame on mouse-leave/blur.
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[—–].*$/, '')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function ProjectMedia({ project }) {
  const slug = slugify(project.name)
  const images = getProjectImages(project)
  const isMulti = images.length > 1
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  const [index, setIndex] = useState(0)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!isMulti || !active || prefersReducedMotion) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, CYCLE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [isMulti, active, prefersReducedMotion, images.length])

  const handleActivate = () => setActive(true)
  const handleDeactivate = () => {
    setActive(false)
    setIndex(0)
  }

  const isPlaceholder = images.length === 0

  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-xl border transition-colors duration-300 ${
        isPlaceholder
          ? 'border-transparent bg-ink'
          : 'border-border bg-surface group-hover:border-text-muted'
      }`}
      onMouseEnter={isMulti ? handleActivate : undefined}
      onMouseLeave={isMulti ? handleDeactivate : undefined}
      onFocus={isMulti ? handleActivate : undefined}
      onBlur={isMulti ? handleDeactivate : undefined}
    >
      {isPlaceholder && (
        // Ink terminal — a fixed dark island (see index.css): it keeps this
        // exact background/foreground set in both light and dark site
        // modes, rather than following the page theme like everything else.
        <div className="absolute inset-0 flex flex-col justify-center gap-2 px-6 font-mono text-sm sm:px-8">
          <p className="truncate text-ink-text">
            <span className="text-ink-accent">$</span> cat README.md
          </p>
          <p className="truncate pl-4 font-semibold text-ink-heading"># {project.name}</p>
          {project.subtitle && (
            <p className="truncate pl-4 text-ink-text">{project.subtitle}</p>
          )}
          {project.status && (
            <p className="truncate pl-4 text-ink-success">✓ {project.status}</p>
          )}
          <p className="mt-2 truncate text-ink-text">
            <span className="text-ink-accent">$</span> open ./{slug}
            <span className="terminal-cursor text-ink-accent" aria-hidden="true" />
          </p>
        </div>
      )}

      {images.map((img, i) => (
        <img
          key={`${img.src}-${i}`}
          src={img.src}
          alt={
            img.alt ||
            `${project.name} — project preview screenshot${images.length > 1 ? ` ${i + 1} of ${images.length}` : ''}`
          }
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          aria-hidden={i !== index}
          className={`absolute inset-0 h-full w-full object-cover ${
            prefersReducedMotion ? '' : 'transition-opacity duration-500 ease-out'
          } ${i === index ? 'opacity-100' : 'opacity-0'} ${
            isMulti ? '' : 'transition-transform duration-300 ease-out group-hover:scale-[1.03]'
          }`}
        />
      ))}

      {isMulti && (
        <div className="absolute inset-x-0 bottom-2 z-10 flex justify-center">
          <div className="flex items-center gap-1 rounded-full bg-black/40 px-1">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setIndex(i)
                }}
                aria-label={`Show screenshot ${i + 1} of ${images.length}`}
                aria-current={i === index}
                className="flex h-9 w-7 items-center justify-center"
              >
                <span
                  className={`block h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
                    i === index ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
