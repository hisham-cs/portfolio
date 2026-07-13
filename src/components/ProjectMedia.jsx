import { useRef, useState } from 'react'
import { getProjectImages } from '../data.js'
import { ChevronLeftIcon, ChevronRightIcon } from './Icons.jsx'
import useMediaQuery from '../hooks/useMediaQuery.js'

const SWIPE_THRESHOLD = 40

// Preview slot for a project card. Renders the given image(s)/GIF inside a
// fixed-aspect box (no layout shift while it loads); falls back to a
// terminal-style typographic mockup when no media is provided yet. Two or
// more images become a carousel — a single image stays exactly as plain as
// it's always been, no chrome.
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
  const isCarousel = images.length > 1
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  const [index, setIndex] = useState(0)
  const touchStartX = useRef(null)

  const goTo = (nextIndex) => {
    const len = images.length
    setIndex(((nextIndex % len) + len) % len)
  }
  const showPrev = () => goTo(index - 1)
  const showNext = () => goTo(index + 1)

  const handleKeyDown = (e) => {
    if (!isCarousel) return
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      showPrev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      showNext()
    }
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (delta > SWIPE_THRESHOLD) showPrev()
    else if (delta < -SWIPE_THRESHOLD) showNext()
    touchStartX.current = null
  }

  const isPlaceholder = images.length === 0

  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-xl border transition-colors duration-300 ${
        isPlaceholder
          ? 'border-transparent bg-ink'
          : 'border-border bg-surface group-hover:border-text-muted'
      }`}
      onKeyDown={handleKeyDown}
      onTouchStart={isCarousel ? handleTouchStart : undefined}
      onTouchEnd={isCarousel ? handleTouchEnd : undefined}
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
            prefersReducedMotion ? '' : 'transition-opacity duration-300 ease-out'
          } ${i === index ? 'opacity-100' : 'opacity-0'} ${
            isCarousel ? '' : 'transition-transform duration-300 ease-out group-hover:scale-[1.03]'
          }`}
        />
      ))}

      {isCarousel && (
        <>
          <button
            type="button"
            onClick={showPrev}
            aria-label="Previous image"
            className="carousel-arrow absolute top-1/2 left-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg bg-black/25 text-white transition-colors duration-200 hover:bg-black/45 focus-visible:bg-black/45"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Next image"
            className="carousel-arrow absolute top-1/2 right-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg bg-black/25 text-white transition-colors duration-200 hover:bg-black/45 focus-visible:bg-black/45"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>

          <div
            className="pointer-events-none absolute right-2 bottom-2 z-10 rounded-md bg-black/60 px-2 py-1 font-mono text-[11px] tracking-[0.08em] text-white"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </div>

          <span className="sr-only" aria-live="polite">
            {`Image ${index + 1} of ${images.length}`}
          </span>
        </>
      )}
    </div>
  )
}
