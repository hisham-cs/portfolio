import { useState } from 'react'
import { projects, STAGES } from '../data/projects.js'
import Frame from './Frame.jsx'
import useLightbox from './Lightbox.jsx'

// "Hand me a problem": pick the kind of raw material and see it go from data
// to a model to a product. Tablets and phones show one stage at a time.
// Every frame opens full size in the same dialog as the case pictures.
export default function Range() {
  const [show, dialog] = useLightbox()
  const [id, setId] = useState(projects[0].id)
  const [stage, setStage] = useState(STAGES[0].id) // tablets and phones show one stage at a time
  const project = projects.find((p) => p.id === id)
  const label = (f) => (f.kind === 'image' ? f.alt : f.label || f.title)
  const open = (f) => (f.kind === 'image' ? show(f.image, f.alt) : show(null, label(f), <Frame frame={f} />))

  return (
    <section className="range accent" id="range" aria-labelledby="range-h">
      <h2 id="range-h" data-reveal>Hand me a problem</h2>
      <p className="range-sub" data-reveal>
        Pick the kind of raw material. Each of these went the whole way: from data, to a model, to something running.
      </p>
      <fieldset className="pick" data-reveal>
        <legend className="sr-only">Kind of raw material</legend>
        {projects.map((p) => (
          <label key={p.id} className={p.id === id ? 'on' : undefined}>
            <input type="radio" name="range" value={p.id} checked={p.id === id} onChange={() => setId(p.id)} />
            {p.input}
          </label>
        ))}
      </fieldset>
      <div className="stage-tabs" role="group" aria-label="Stage to show">
        {STAGES.map((s) => (
          <button key={s.id} type="button" aria-pressed={s.id === stage} onClick={() => setStage(s.id)}>{s.label}</button>
        ))}
      </div>
      <ol className="chain" key={id} aria-label={`${project.name}: data, model and product`}>
        {STAGES.map((s, i) => (
          <li key={s.id} style={{ '--i': i }} className={s.id === stage ? 'on' : undefined}>
            <div className="chain-frame">
              <Frame frame={project.stages[s.id].frame} sizes="(max-width: 68.75em) min(calc(100vw - 2rem), 45rem), 31vw" />
              <button type="button" className="open-over" onClick={() => open(project.stages[s.id].frame)}
                aria-label={`Open full size: ${label(project.stages[s.id].frame)}`} />
            </div>
            <p className="chain-cap">
              <b>{project.stages[s.id].verb}</b>
              {project.stages[s.id].line}
            </p>
          </li>
        ))}
      </ol>
      {dialog}
    </section>
  )
}
