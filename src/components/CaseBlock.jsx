import { STAGES } from '../data/projects.js'
import Frame from './Frame.jsx'
import RevealSlider from './RevealSlider.jsx'

// A project in full, always in reading order: its heading first, then its
// pictures, then the details. 'split' sets the pictures beside the details;
// 'wide' gives the picture the whole width once, to break the rhythm.
export default function CaseBlock({ project, flip }) {
  const rows = [
    ...STAGES.map((s) => [s.label, project.stages[s.id].detail]),
    ...project.extra,
    ['My part', project.myPart],
    ['Stack', project.stack],
  ]
  const wide = project.layout === 'wide'
  const sizes = wide ? '(max-width: 1280px) 100vw, 1280px' : '(max-width: 900px) 92vw, 56vw'
  const figures = project.plate.figures ?? [{ frame: project.stages[project.plate.stage].frame, caption: project.plate.caption }]

  return (
    <article className={`case ${wide ? 'wide' : 'split'}${flip ? ' flip' : ''}`} id={`case-${project.id}`} aria-labelledby={`h-${project.id}`}>
      <header className="case-head" data-reveal>
        <h3 id={`h-${project.id}`}>{project.name}</h3>
        <p className="kind">{project.kind}</p>
        <p className="lead">{project.question}</p>
      </header>
      <div className="plate">
        {project.plate.reveal ? (
          <figure data-reveal>
            <RevealSlider reveal={project.plate.reveal} />
            <figcaption className="credit">{project.plate.caption}</figcaption>
          </figure>
        ) : (
          figures.map(({ frame, caption, full }) => (
            <figure key={caption} data-reveal>
              {full ? (
                <a href={frame.image.src} className="full">
                  <Frame frame={frame} sizes={sizes} />
                  <span className="sr-only">Open full size</span>
                </a>
              ) : (
                <Frame frame={frame} sizes={sizes} />
              )}
              <figcaption>{caption}</figcaption>
            </figure>
          ))
        )}
      </div>
      <div className="text">
        <dl data-reveal>
          {rows.map(([dt, dd]) => (
            <div key={dt}>
              <dt>{dt}</dt>
              <dd>{dd}</dd>
            </div>
          ))}
        </dl>
        <div className={`cells${project.links.length === 1 ? ' one' : ''}`} data-reveal style={{ '--i': 1 }}>
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
