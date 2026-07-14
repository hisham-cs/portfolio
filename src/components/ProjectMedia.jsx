import { useEffect, useRef, useState } from 'react'
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
//
// The stacked <img>s are pointer-events-none: a non-1 opacity value creates
// its own CSS stacking context, and Chromium's hit-testing can transiently
// resolve the cursor to a crossfading image instead of the dots sitting
// above it (z-10), firing a spurious mouseleave on the dots that reset the
// index mid-transition. Images have no click/hover behavior of their own —
// making them non-interactive removes the ambiguity outright rather than
// fighting stacking-context timing.
//
// handleDeactivate doesn't trust the mouseleave/blur event's relatedTarget
// synchronously — under rapid programmatic interaction (and, per testing,
// occasionally for real too) a stale/incorrect hit-test can fire a leave
// event whose relatedTarget is nowhere near the actual cursor position. It
// re-checks the container's live :hover/:focus-within state a frame later
// before committing, which is always authoritative regardless of what any
// individual event claims.
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
  const containerRef = useRef(null)

  // A self-rescheduling timeout, not setInterval: the effect depends on
  // `index`, so ANY index change — the auto-tick below or an explicit dot
  // click — cancels the pending timer and reschedules a fresh one exactly
  // CYCLE_INTERVAL_MS out. That guarantees a manual dot selection is always
  // a single, direct crossfade to the target frame; the auto-cycle can
  // never land an unrelated tick immediately before or after it.
  useEffect(() => {
    if (!isMulti || !active || prefersReducedMotion) return
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % images.length)
    }, CYCLE_INTERVAL_MS)
    return () => clearTimeout(id)
  }, [index, isMulti, active, prefersReducedMotion, images.length])

  const handleActivate = () => setActive(true)
  const handleDeactivate = () => {
    requestAnimationFrame(() => {
      const node = containerRef.current
      if (!node) return
      const stillEngaged = node.matches(':hover') || node.contains(document.activeElement)
      if (stillEngaged) return
      setActive(false)
      setIndex(0)
    })
  }

  const isPlaceholder = images.length === 0

  return (
    <div
      ref={containerRef}
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
          srcSet={img.srcSet}
          sizes="(min-width: 640px) 50vw, 100vw"
          width={img.width}
          height={img.height}
          alt={
            img.alt ||
            `${project.name} — project preview screenshot${images.length > 1 ? ` ${i + 1} of ${images.length}` : ''}`
          }
          loading="lazy"
          decoding="async"
          aria-hidden={i !== index}
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${
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
