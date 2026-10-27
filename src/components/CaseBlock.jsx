import { STAGES } from '../data/projects.js'
import Frame from './Frame.jsx'
import RevealSlider from './RevealSlider.jsx'
import useLightbox from './Lightbox.jsx'

// A project in full, the same structure for every project: its heading,
// then one lead picture beside the details (buttons last), then a strip of
// further evidence as thumbnails that open full size. On tablets and phones
// it reads straight down, and the strip becomes a row you swipe.
export default function CaseBlock({ project, flip }) {
  const [show, dialog] = useLightbox()
  const rows = [
    ...STAGES.map((s) => [s.label, project.stages[s.id].detail]),
    ...project.extra,
    ['My part', project.myPart],
    ['Stack', project.stack],
  ]
  const { plate } = project
  const lead = project.stages[plate.stage].frame
  const evidence = plate.evidence ?? []

  return (
    <article className={`case${flip ? ' flip' : ''}`} id={`case-${project.id}`} aria-labelledby={`h-${project.id}`}>
      <header className="case-head" data-reveal>
        <h3 id={`h-${project.id}`}>{project.name}</h3>
        <p className="kind">{project.kind}</p>
        <p className="lead">{project.question}</p>
      </header>

      <figure className="lead-fig" data-reveal style={plate.reveal ? undefined : { '--w': `${lead.image.width}px` }}>
        {plate.reveal ? (
          <RevealSlider reveal={plate.reveal} />
        ) : (
          <button type="button" className="open" onClick={() => show(lead.image, lead.alt)}>
            <Frame frame={lead} sizes="(max-width: 1100px) min(calc(100vw - 2rem), 720px), 56vw" />
            <span className="sr-only">Open full size</span>
          </button>
        )}
        <figcaption className={plate.reveal ? 'credit' : undefined}>{plate.caption}</figcaption>
      </figure>

      <div className="text">
        <dl data-reveal>
          {rows.map(([dt, dd]) => (
            <div key={dt}>
              <dt>{dt}</dt>
              <dd>{dd}</dd>
            </div>
          ))}
        </dl>
        <div className="cells" data-reveal style={{ '--i': 1 }}>
          {project.links.map((l) => (
            <a key={l.href} href={l.href} rel="noopener">
              {l.label}<span className="sr-only">, {project.name}</span>
            </a>
          ))}
        </div>
      </div>

      {evidence.length > 0 && (
        <ul className="evidence" aria-label={`More from ${project.name}`} data-reveal>
          {evidence.map(({ frame, caption }) => (
            <li key={caption}>
              <figure>
                <button type="button" className="open" onClick={() => show(frame.image, frame.alt)}>
                  <span className="frame" style={{ background: frame.fill }}>
                    <img src={frame.image.src} srcSet={frame.image.srcSet} sizes="(max-width: 1100px) min(78vw, 360px), 24vw"
                      width={frame.image.width} height={frame.image.height} alt={frame.alt} loading="lazy" decoding="async" />
                  </span>
                  <span className="sr-only">Open full size</span>
                </button>
                <figcaption>{caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      )}
      {dialog}
    </article>
  )
}
