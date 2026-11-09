import { useEffect, useRef } from 'react'
import { projects } from '../data/projects.js'

// The hero's three live data cards, one per project, each a link to its case.
// Every value is in the markup at rest; with motion allowed the charts draw in
// once from that final state (CSS, under .motion) and the gauge counts up.
// Source order puts the lead (Edema, the centre card) first, so the stacked
// tablet and phone order is the reading and tab order; wide screens place
// the cards left, centre, right.

const pct = (s) => parseFloat(s)

// Churn by tenure: points on 20…280, the 0–50% scale over 70 units above the
// baseline at 84 (the mockup's chart, flattened to fit the card's height).
function Line({ chart }) {
  const { points, unit } = chart
  const max = Math.ceil(Math.max(...points.map(([, v]) => v)) / 10) * 10
  const xy = points.map(([, v], i) => [20 + (i * 260) / (points.length - 1), +(84 - (v / max) * 70).toFixed(1)])
  const d = xy.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ')
  const [first, last] = [xy[0], xy[xy.length - 1]]
  const mid = Math.floor((points.length - 1) / 2)
  const fmt = (v) => `${v.toFixed(1)}%`
  const label = `Churn rate by tenure in ${unit}: ${points.map(([k, v]) => `${k} ${fmt(v)}`).join(', ')}`
  return (
    <svg className="hc-line" viewBox="0 0 300 100" role="img" aria-label={label}>
      <line className="gl" x1="10" y1="84" x2="290" y2="84" />
      <path className="ar" d={`${d} L${last[0]} 84 L${first[0]} 84 Z`} />
      <path className="ln" pathLength="100" d={d} />
      <circle cx={first[0]} cy={first[1]} r="4" />
      <circle cx={last[0]} cy={last[1]} r="4" />
      <text className="v" x={first[0] + 10} y={first[1] - 3.5}>{fmt(points[0][1])}</text>
      <text className="v" x={last[0]} y={last[1] - 10} textAnchor="end">{fmt(points[points.length - 1][1])}</text>
      <text x={first[0]} y="98" textAnchor="middle">{points[0][0]}</text>
      <text x={xy[mid][0]} y="98" textAnchor="middle">{points[mid][0]}</text>
      <text x={last[0]} y="98" textAnchor="middle">{points[points.length - 1][0]} mo</text>
    </svg>
  )
}

const SHORT = { densenet121: 'DenseNet', 'efficientnet-b0': 'EffNet', resnet50: 'ResNet', 'convnext-tiny': 'ConvNeXt' }

function Gauge({ chart, sub }) {
  const [ensemble, ...models] = chart.models
  const value = Math.round(pct(ensemble.probability))
  const num = useRef(null)
  const arc = useRef(null)

  // The number reads the arc as it fills (a CSS animation under .motion), so
  // the two move as one; the final number is already in the markup.
  useEffect(() => {
    const [el, path] = [num.current, arc.current]
    if (!el || !path || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf
    const t0 = performance.now()
    const tick = (t) => {
      el.textContent = String(Math.round(100 - parseFloat(getComputedStyle(path).strokeDashoffset)))
      // .motion arrives a moment after mount; stop once the fill has run
      if (t - t0 < 200 || (path.getAnimations().length && t - t0 < 3000)) raf = requestAnimationFrame(tick)
      else el.textContent = String(value)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); el.textContent = String(value) }
  }, [value])

  const label = `Gauge at ${value}%: ensemble edema probability ${ensemble.probability} on the example X-ray. Per model: ${models.map((m) => `${m.label} ${m.probability}`).join(', ')}`
  return (
    <>
      <div className="hc-gauge">
        <div className="g">
          <svg viewBox="0 0 200 112" role="img" aria-label={label}>
            <path className="tr" d="M16 100 A84 84 0 0 1 184 100" />
            <path ref={arc} className="arc" d="M16 100 A84 84 0 0 1 184 100" pathLength="100" strokeDashoffset={100 - value} />
          </svg>
          <p className="val" aria-hidden="true"><span ref={num}>{value}</span><small>%</small></p>
        </div>
      </div>
      <p className="hc-sub">{sub}</p>
      <ul className="hc-votes" aria-hidden="true">
        {models.map((m) => <li key={m.id}>{SHORT[m.id]}<b>{+pct(m.probability).toFixed(1)}</b></li>)}
      </ul>
    </>
  )
}

// The agent and its tools as a ring of dots; the named tools sit at 60°,
// 180° and 300° and their spokes draw in one after another. A tight ring in a
// wide frame, so the tool names stay readable at the card's fixed height.
const SLOTS = [4, 12, 20]
const DELAYS = [850, 500, 1200] // bottom, then right, then left, as in the mockup
function Hub({ chart }) {
  const { tools, named } = chart
  const at = (i) => {
    const a = (i / tools) * 2 * Math.PI
    return [+(165 + 40 * Math.sin(a)).toFixed(1), +(48 - 40 * Math.cos(a)).toFixed(1), Math.sin(a)]
  }
  const label = `Diagram, not a map of the real system: the Faten agent connected to ${tools} function-calling tools, three of them named: ${named.join(', ')}`
  return (
    <svg className="hc-hub" viewBox="0 0 330 110" role="img" aria-label={label}>
      {Array.from({ length: tools }, (_, i) => {
        const [x, y] = at(i)
        return SLOTS.includes(i) ? null : <circle key={i} className="nd" cx={x} cy={y} r="3" />
      })}
      {SLOTS.map((s, k) => {
        const [x, y] = at(s)
        return (
          <g key={s}>
            <line className="sp" pathLength="100" x1="165" y1="48" x2={x} y2={y} style={{ '--d': `${DELAYS[k]}ms` }} />
            <circle className="nk" cx={x} cy={y} r="5" />
          </g>
        )
      })}
      <circle className="hc-c" cx="165" cy="48" r="19" />
      <text className="ht" x="165" y="52" textAnchor="middle">agent</text>
      {SLOTS.map((s, k) => {
        const [x, y, sin] = at(s)
        const side = sin > 0.3 ? 'start' : sin < -0.3 ? 'end' : 'middle'
        const [tx, ty] = side === 'middle' ? [x, y + 18] : [x + (side === 'start' ? 9 : -9), y + 3.5]
        return <text key={s} className="tl" x={tx} y={ty} textAnchor={side}>{named[k]}</text>
      })}
    </svg>
  )
}

// The link is named by its content, as seen (WCAG 2.5.3): the title, the
// number with its note, the chart's label with every value, the footer.
function Card({ p }) {
  const { card } = p
  const { kind } = card.chart
  return (
    <li className={`hc-${p.id}`} style={{ '--i': projects.indexOf(p) }}>
      <a className={`hc-card${kind === 'gauge' ? ' hl' : ''}`} href={`#case-${p.id}`}>
        <span className="hc-h"><b>{p.name}</b><span>{card.tag}</span></span>
        {card.big && (
          <span className="hc-big"><b>{card.big}</b><span>{card.note[0]}<br />{card.note[1]}</span></span>
        )}
        {kind === 'line' && <Line chart={card.chart} />}
        {kind === 'gauge' && <Gauge chart={card.chart} sub={card.sub} />}
        {kind === 'hub' && <Hub chart={card.chart} />}
        <span className="hc-f"><span>{card.foot}</span><i>Case <span aria-hidden="true">→</span></i></span>
      </a>
    </li>
  )
}

export default function HeroCards() {
  const lead = projects.find((p) => p.card?.chart.kind === 'gauge')
  const order = [lead, ...projects.filter((p) => p !== lead && p.card)]
  return (
    <ul className="hc" aria-label="One result from each project">
      {order.map((p) => <Card key={p.id} p={p} />)}
    </ul>
  )
}
