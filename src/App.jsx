import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Education from './components/Education.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased dark:bg-surface-base dark:text-text-main">
      {/* Global background: light grid + soft gradient orbs */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_40%,transparent_100%)]" />
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-indigo-400/15 blur-3xl dark:bg-brand/5" />
        <div className="absolute top-1/3 -right-32 h-80 w-80 rounded-full bg-violet-400/10 blur-3xl dark:bg-secondary/5" />
        <div className="absolute bottom-0 -left-32 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl dark:bg-accent/3" />
      </div>

      <div className="relative z-10">
        <Navbar dark={dark} toggleDark={() => setDark((d) => !d)} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
