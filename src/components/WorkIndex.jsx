import { useState } from 'react'
import { projects } from '../data/projects.js'
import Frame from './Frame.jsx'

// Big names, each with its description beside it; a fixed preview follows
// hover and focus on wide screens.
export default function WorkIndex() {
  const [active, setActive] = useState(0)
  return (
    <section className="work light" id="work" aria-labelledby="work-h">
      <h2 id="work-h" data-reveal>Selected work</h2>
      <ul className="names">
        {projects.map((p, i) => (
          <li key={p.id} data-reveal style={{ '--i': i }}>
            <a
              href={`#case-${p.id}`}
              className={i === active ? 'on' : undefined}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className="n">{p.name}</span>
              <span className="k">{p.kind}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="pv" aria-hidden="true">
        {projects.map((p, i) => (
          <div key={p.id} className={i === active ? 'on' : undefined}>
            <Frame frame={p.stages.product.frame} sizes="30vw" />
          </div>
        ))}
      </div>
    </section>
  )
}
