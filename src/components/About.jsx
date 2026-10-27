import { about } from '../data/site.js'

function Record({ item, i }) {
  return (
    <div className="rec" data-reveal style={{ '--i': i }}>
      <h3>{item.title}</h3>
      <p className="when">{item.when}</p>
      <ul>{item.points.map((p) => <li key={p}>{p}</li>)}</ul>
    </div>
  )
}

export default function About() {
  return (
    <section className="about light" id="about" aria-labelledby="about-h">
      <h2 id="about-h" data-reveal>About</h2>
      <dl className="facts" data-reveal>
        {about.facts.map(([dt, dd]) => (
          <div key={dt}><dt>{dt}</dt><dd>{dd}</dd></div>
        ))}
      </dl>
      <div className="para" data-reveal style={{ '--i': 1 }}>
        {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
      </div>
      <h3 className="rec-word">Experience and education</h3>
      <Record item={about.experience} i={0} />
      <Record item={about.education} i={1} />
    </section>
  )
}
