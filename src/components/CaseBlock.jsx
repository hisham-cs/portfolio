import { STAGES } from '../data/projects.js'
import Frame from './Frame.jsx'
import RevealSlider from './RevealSlider.jsx'
import useLightbox from './Lightbox.jsx'

// A project in full, in one of the three approved layouts (see
// design-exploration/round-4/case-layouts.html):
//   zigzag: heading; picture 1 beside the first details; the rest of the
//           details and the buttons beside picture 2.
//   panel:  heading, details and buttons in one column; the dark slider
//           panel beside them.
//   pair:   heading; two pictures side by side at one height; the details
//           in two columns, buttons last.
// The source order is the phone order; wide screens place the parts in
// columns. Every picture is shown whole and opens full size.

function Details({ rows }) {
  return (
    <dl className="d">
      {rows.map(([dt, dd]) => (
        <div key={dt}>
          <dt>{dt}</dt>
          <dd>{dd}</dd>
        </div>
      ))}
    </dl>
  )
}

function Pic({ frame, caption, show, sizes, ratio, className = '' }) {
  return (
    <figure className={`pic ${className}`} data-reveal>
      <button type="button" className="open" onClick={() => show(frame.image, frame.alt)}
        style={ratio ? { '--ar': ratio } : undefined}>
        <Frame frame={frame} sizes={sizes} />
        <span className="sr-only">Open full size</span>
      </button>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

export default function CaseBlock({ project }) {
  const [show, dialog] = useLightbox()
  const rows = [
    ...STAGES.map((s) => [s.label, project.stages[s.id].detail]),
    ...project.extra,
    ['My part', project.myPart],
    ['Stack', project.stack],
  ]
  const { plate } = project
  const [first, rest] = [rows.slice(0, plate.split), rows.slice(plate.split)]
  const head = (
    <header className="case-head" data-reveal>
      <h3 id={`h-${project.id}`}>{project.name}</h3>
      <p className="kind">{project.kind}</p>
      <p className="lead">{project.question}</p>
    </header>
  )
  const cells = (
    <div className="cells">
      {project.links.map((l) => (
        <a key={l.href} href={l.href} rel="noopener">
          {l.label}<span className="sr-only">, {project.name}</span>
        </a>
      ))}
    </div>
  )
  const wide = '(max-width: 82.5em) min(calc(100vw - 2rem), 45rem)'

  let body
  if (plate.layout === 'zigzag') {
    const [a, b] = plate.figures
    body = (
      <>
        {head}
        <div className="c-row r75">
          <Pic {...a} show={show} sizes={`${wide}, 56vw`} />
          <div className="col" data-reveal><Details rows={first} /></div>
        </div>
        <div className="c-row r57">
          <Pic {...b} show={show} sizes={`${wide}, 56vw`} className="right" />
          <div className="col left" data-reveal><Details rows={rest} />{cells}</div>
        </div>
      </>
    )
  } else if (plate.layout === 'panel') {
    body = (
      <div className="c-row r57 panel-row">
        {head}
        <figure className="panel-fig" data-reveal>
          <RevealSlider reveal={plate.reveal} />
          <figcaption className="credit">{plate.caption}</figcaption>
        </figure>
        <div className="col" data-reveal><Details rows={rows} />{cells}</div>
      </div>
    )
  } else {
    // pair: both frames take the taller picture's ratio, so they share a height
    const ratio = Math.min(...plate.figures.map((f) => f.frame.image.width / f.frame.image.height))
    body = (
      <>
        {head}
        <div className="c-row r66">
          {plate.figures.map((f) => <Pic key={f.caption} {...f} show={show} ratio={ratio} sizes={`${wide}, 48vw`} className="fixed" />)}
        </div>
        <div className="c-row r66">
          <div className="col" data-reveal><Details rows={first} /></div>
          <div className="col" data-reveal><Details rows={rest} />{cells}</div>
        </div>
      </>
    )
  }

  return (
    <article className={`case ${plate.layout}`} id={`case-${project.id}`} aria-labelledby={`h-${project.id}`}>
      {body}
      {dialog}
    </article>
  )
}
