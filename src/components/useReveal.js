import { useEffect } from 'react'

// Section entrances: each [data-reveal] rises into place once, as it enters.
// Content is only held back when script runs and motion is allowed (the
// `motion` class on <html>), so nothing stays hidden if this never runs.
export default function useReveal() {
  useEffect(() => {
    const root = document.documentElement
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (calm.matches || !('IntersectionObserver' in window)) return
    root.classList.add('motion')

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    const watch = () => document.querySelectorAll('[data-reveal]:not(.in)').forEach((el) => io.observe(el))
    watch()
    // React re-renders (e.g. a new "Hand me a problem" chain) add nodes later.
    const mo = new MutationObserver(watch)
    mo.observe(document.getElementById('root'), { childList: true, subtree: true })
    const stop = () => { root.classList.remove('motion'); document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('in')) }
    calm.addEventListener('change', stop)
    return () => { io.disconnect(); mo.disconnect(); calm.removeEventListener('change', stop) }
  }, [])
}
