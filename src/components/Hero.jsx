import { useRef } from 'react'
import { profile } from '../data/site.js'
import HeroCards from './HeroCards.jsx'

// In page order; "Work" starts at "Hand me a problem"
const links = [
  ['#range', 'Work'],
  ['#about', 'About'],
  ['#skills', 'Skills'],
  ['#credentials', 'Certificates'],
  ['#contact', 'Contact'],
]

// The name split to two corners; one live data card from each project fills
// the band between them.
export default function Hero() {
  // Phones: a "Menu" text button opens the links in a full-screen native
  // dialog. Escape and Close shut it and focus returns to Menu; following a
  // link shuts it and the page moves to the section.
  const menu = useRef(null)
  const open = () => {
    menu.current.showModal()
    // the dialog itself takes focus, so the Enter that opened it cannot also follow a link
    menu.current.focus()
  }
  return (
    <header className="hero dark">
      <h1 className="hero-name">
        <span className="mask"><span className="a">{profile.first}</span></span>{' '}
        <span className="mask b-wrap"><span className="b">{profile.last}</span></span>
      </h1>
      <nav className="hero-nav" aria-label="Sections">
        {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        <button type="button" className="menu-btn" aria-haspopup="dialog" onClick={open}>Menu</button>
      </nav>
      <dialog ref={menu} className="menu-sheet" tabIndex={-1} aria-label="Sections">
        <form method="dialog" className="menu-top"><button className="menu-btn">Close</button></form>
        <ul>
          {links.map(([href, label]) => (
            <li key={href}><a href={href} onClick={() => menu.current.close()}>{label}</a></li>
          ))}
        </ul>
      </dialog>
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
