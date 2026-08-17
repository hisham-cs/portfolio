import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from './Icons.jsx'
import useMediaQuery from '../hooks/useMediaQuery.js'

// The one new motion touch this component introduces (see DESIGN.md motion
// budget): open/close is opacity + scale only, capped at 200ms, and skips
// the transition entirely under prefers-reduced-motion — it snaps straight
// to the end state instead.
function CredentialLightbox({ credential, image, onClose }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [visible, setVisible] = useState(prefersReducedMotion)

  useEffect(() => {
    if (prefersReducedMotion) return
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [prefersReducedMotion])

  useEffect(() => {
    const previouslyFocused = document.activeElement
    closeButtonRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [onClose])

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:p-8 ${
        prefersReducedMotion ? '' : 'transition-opacity duration-200 ease-out'
      } ${visible ? 'opacity-100' : 'opacity-0'}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${credential.title} — ${credential.issuer}`}
        className={`relative flex max-h-[90vh] max-w-[90vw] flex-col items-center ${
          prefersReducedMotion ? '' : 'transition-transform duration-200 ease-out'
        } ${visible ? 'scale-100' : 'scale-95'}`}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-surface-elevated text-text-primary shadow-md transition-colors hover:text-text-secondary"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
        <img
          src={image.full.url}
          width={image.full.width}
          height={image.full.height}
          alt={`${credential.title} — ${credential.issuer}, ${credential.year}`}
          className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain"
        />
        <p className="mt-3 text-center font-mono text-xs tracking-[0.1em] text-white/80 uppercase">
          {credential.title} · {credential.issuer} · {credential.year}
        </p>
      </div>
    </div>,
    document.body,
  )
}

// Horizontal scroll-snap strip, native scroll only (no JS-driven motion —
// doesn't count against the motion budget). The right-edge mask is a
// static gradient, not an animation: the "more exists" affordance the
// brief asked for, without adding a fourth motion touch. Each thumbnail is
// a button that opens the one bespoke interaction here, the lightbox.
export default function CredentialsGallery({ items }) {
  const [openSlug, setOpenSlug] = useState(null)
  const openItem = items.find(({ credential }) => credential.slug === openSlug)

  if (items.length === 0) return null

  return (
    <>
      <div className="relative mt-4">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2">
          {items.map(({ credential, image }) => (
            <button
              key={credential.slug}
              type="button"
              onClick={() => setOpenSlug(credential.slug)}
              aria-label={`View ${credential.title} — ${credential.issuer}`}
              className="group/thumb shrink-0 snap-start rounded-xl bg-surface p-2 transition-colors duration-200 hover:bg-surface-elevated"
            >
              <img
                src={image.thumb.url}
                width={image.thumb.width}
                height={image.thumb.height}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-36 w-auto rounded-lg object-contain transition-transform duration-200 ease-out group-hover/thumb:scale-[1.02] sm:h-44"
              />
            </button>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-background to-transparent"
        />
      </div>

      {openItem && (
        <CredentialLightbox
          credential={openItem.credential}
          image={openItem.image}
          onClose={() => setOpenSlug(null)}
        />
      )}
    </>
  )
}
