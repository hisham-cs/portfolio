import { STAGES } from '../data/projects.js'
import Frame from './Frame.jsx'
import RevealSlider from './RevealSlider.jsx'

// A project in full. 'split' sets a square plate beside the text; 'wide'
// gives the plate the whole width once, to break the rhythm of the series.
export default function CaseBlock({ project, flip }) {
  const plateFrame = project.stages[project.plate.stage].frame
  const rows = [
    ...STAGES.map((s) => [s.label, project.stages[s.id].detail]),
    ...project.extra,
    ['My part', project.myPart],
    ['Stack', project.stack],
  ]
  const wide = project.layout === 'wide'

  return (
    <article className={`case ${wide ? 'wide' : 'split'}${flip ? ' flip' : ''}`} id={`case-${project.id}`} aria-labelledby={`h-${project.id}`}>
      <figure className="plate" data-reveal>
        {project.plate.reveal
          ? <RevealSlider reveal={project.plate.reveal} />
          : <Frame frame={plateFrame} sizes={wide ? '100vw' : '(max-width: 760px) 92vw, 46vw'} />}
        <figcaption className={project.plate.reveal ? 'credit' : undefined}>{project.plate.caption}</figcaption>
      </figure>
      <div className="text">
        <div className="head" data-reveal>
          <h3 id={`h-${project.id}`}>{project.name}</h3>
          <p className="kind">{project.kind}</p>
          <p className="lead">{project.question}</p>
        </div>
        <dl data-reveal style={{ '--i': 1 }}>
          {rows.map(([dt, dd, frame]) => (
            <div key={dt}>
              <dt>{dt}</dt>
              <dd>
                {dd}
                {frame && (
                  <figure className="row-fig">
                    <a href={frame.image.src}>
                      <Frame frame={frame} sizes="(max-width: 760px) 92vw, 40vw" />
                      <span className="sr-only">Open full size</span>
                    </a>
                    <figcaption>{frame.caption}</figcaption>
                  </figure>
                )}
              </dd>
            </div>
          ))}
        </dl>
        <div className={`cells${project.links.length === 1 ? ' one' : ''}`} data-reveal style={{ '--i': 2 }}>
          {project.links.map((l) => (
            <a key={l.href} href={l.href} rel="noopener">
              {l.label}<span className="sr-only">, {project.name}</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}
