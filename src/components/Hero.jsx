import { profile } from '../data/site.js'
import { projects } from '../data/projects.js'
import HeroCards from './HeroCards.jsx'

const links = [
  [`#case-${projects[0].id}`, 'Work'], // the first case
  ['#skills', 'Skills'],
  ['#about', 'About'],
  ['#credentials', 'Certification'],
  ['#contact', 'Contact'],
]

// The name split to two corners; one live data card from each project fills
// the band between them.
export default function Hero() {
  return (
    <header className="hero dark">
      <h1 className="hero-name">
        <span className="mask"><span className="a">{profile.first}</span></span>{' '}
        <span className="mask b-wrap"><span className="b">{profile.last}</span></span>
      </h1>
      <nav className="hero-nav" aria-label="Sections">
        {links.map(([href, label]) => (
          <a key={href} href={href} className={label === 'Work' || label === 'Contact' ? 'keep' : undefined}>{label}</a>
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
      <HeroCards />
    </header>
  )
}
