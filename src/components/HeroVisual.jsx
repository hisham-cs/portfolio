import { useEffect, useRef } from 'react'
import useMediaQuery from '../hooks/useMediaQuery.js'

// Decorative canvas visual for the hero's right rail: a slowly drifting node
// network standing in for the "data/AI" identity without depicting anything
// false (no fake metrics, no stock-chart numbers). Pure canvas + rAF, no
// charting or animation library. Only mounted at the `lg` breakpoint, which
// is exactly where the hero was left with empty space next to the bio
// column — it isn't shown on mobile, where the hero has no room to spare.
const NODE_COUNT = 18
const LINK_DISTANCE = 120
const DRIFT_SPEED = 0.15
const FALLBACK_RGB = [115, 108, 99] // text-muted (light), used only if currentColor can't be read

function makeNodes(width, height) {
  return Array.from({ length: NODE_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * DRIFT_SPEED,
    vy: (Math.random() - 0.5) * DRIFT_SPEED,
  }))
}

export default function HeroVisual() {
  const canvasRef = useRef(null)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    if (!isDesktop) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let nodes = []
    let rafId = null
    let [r, g, b] = FALLBACK_RGB

    const readAccentColor = () => {
      const parsed = getComputedStyle(canvas)
        .color.match(/\d+(\.\d+)?/g)
        ?.slice(0, 3)
        .map(Number)
      if (parsed) [r, g, b] = parsed
    }
    readAccentColor()

    // Sizes the canvas's drawing buffer to whatever the parent box actually
    // renders at (dpr-aware) and reseeds nodes across that exact area. Driven
    // entirely by ResizeObserver rather than a one-off measurement on mount:
    // the parent's box can still change size after this effect first runs
    // (grid-stretch resolving against the bio column, webfonts swapping in
    // and reflowing line-heights, etc.), and a stale measurement is what
    // makes the drawing area smaller than the visible box — which is what
    // produced the left-clustered nodes with dead space on the right.
    const applySize = (w, h) => {
      const dpr = window.devicePixelRatio || 1
      width = w
      height = h
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      nodes = makeNodes(w, h)
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      if (!reduceMotion) {
        for (const node of nodes) {
          node.x += node.vx
          node.y += node.vy
          if (node.x < 0 || node.x > width) node.vx *= -1
          if (node.y < 0 || node.y > height) node.vy *= -1
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.22 * (1 - dist / LINK_DISTANCE)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.75)`
      for (const node of nodes) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!reduceMotion) rafId = requestAnimationFrame(draw)
    }

    const sizeObserver = new ResizeObserver((entries) => {
      const { width: w, height: h } = entries[0].contentRect
      if (w <= 0 || h <= 0) return
      applySize(w, h)
      if (rafId) cancelAnimationFrame(rafId)
      draw()
    })
    sizeObserver.observe(canvas.parentElement)

    const colorObserver = new MutationObserver(readAccentColor)
    colorObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      sizeObserver.disconnect()
      colorObserver.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isDesktop])

  if (!isDesktop) return null

  return (
    <div className="h-full w-full text-text-muted" aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
