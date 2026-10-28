import Hero from './components/Hero.jsx'
import Range from './components/Range.jsx'
import CaseBlock from './components/CaseBlock.jsx'
import Skills from './components/Skills.jsx'
import About from './components/About.jsx'
import Credentials from './components/Credentials.jsx'
import Contact from './components/Contact.jsx'
import useReveal from './components/useReveal.js'
import { projects } from './data/projects.js'

export default function App() {
  useReveal()
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Hero />
      <main id="main">
        <Range />
        <div className="cases light">
          {projects.map((p) => <CaseBlock key={p.id} project={p} />)}
        </div>
        <Skills />
        <About />
        <Credentials />
        <Contact />
      </main>
    </>
  )
}
