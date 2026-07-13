import { useEffect, useState } from 'react'
import useMediaQuery from '../hooks/useMediaQuery.js'

// The actual specialties behind this portfolio's projects, cycled as a
// whole-word crossfade — never a typing effect. An invisible copy of the
// longest label reserves the box's width and height in normal document
// flow, so the visible, absolutely positioned words can crossfade in and
// out without ever shifting the surrounding hero layout.
const SPECIALTIES = ['Computer Vision', 'RAG & LLM Systems', 'Data Analytics', 'Academic AI Tools']
const ROTATE_INTERVAL_MS = 4000

export default function SpecialtyRotator({ className = '' }) {
  const [index, setIndex] = useState(0)
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    if (prefersReducedMotion) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SPECIALTIES.length)
    }, ROTATE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [prefersReducedMotion])

  const longest = SPECIALTIES.reduce((a, b) => (a.length >= b.length ? a : b))

  return (
    <span className={`relative inline-block align-bottom ${className}`}>
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        {longest}
      </span>
      {SPECIALTIES.map((label, i) => (
        <span
          key={label}
          aria-hidden="true"
          className={`absolute inset-y-0 left-0 whitespace-nowrap ${
            prefersReducedMotion ? '' : 'transition-opacity duration-500 ease-out'
          } ${i === index ? 'opacity-100' : 'opacity-0'}`}
        >
          {label}
        </span>
      ))}
      <span className="sr-only">{SPECIALTIES.join(', ')}</span>
    </span>
  )
}
