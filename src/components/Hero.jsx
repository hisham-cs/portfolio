import { profile } from '../data/site.js'
import { projects } from '../data/projects.js'
import Frame from './Frame.jsx'

const links = [
  ['#work', 'Work'],
  ['#skills', 'Skills'],
  ['#about', 'About'],
  ['#credentials', 'Certification'],
  ['#contact', 'Contact'],
]

// The name split to two corners; the proof (one product from each project)
// fills the band between them.
export default function Hero() {
  return (
    <header className="hero dark">
      <h1 className="hero-name">
        <span className="mask"><span className="a">{profile.first}</span></span>{' '}
        <span className="mask b-wrap"><span className="b">{profile.last}</span></span>
      </h1>
      <nav className="hero-nav" aria-label="Sections">
        {links.map(([href, label]) => (
          <a key={href} href={href} className={href === '#work' || href === '#contact' ? 'keep' : undefined}>{label}</a>
        ))}
      </nav>
      <div className="intro">
        <p>{profile.intro}</p>
        <div className="acts">
          <a className="btn on-dark" href={`${import.meta.env.BASE_URL}${profile.cv}`}>Download CV</a>
          <a href={`mailto:${profile.email}`}>Email me</a>
        </div>
      </div>
      <p className="fact">{profile.fact}</p>
      <ul className="proof" aria-label="One product from each project">
        {projects.map((p, i) => (
          <li key={p.id} style={{ '--i': i }}>
            <a href={`#case-${p.id}`} className="proof-link">
              <Frame frame={p.stages.product.frame} sizes="(max-width: 760px) calc(100vw - 2rem), 31vw" eager={i === 0} />
              <span className="cap"><b>{p.stages.product.frame.caption || p.map.product}</b>, {p.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </header>
  )
}
