import { profile, credits } from '../data/site.js'

// Contact in display rows, then the name fitted to the full width.
export default function Contact() {
  const rows = [
    { href: `mailto:${profile.email}`, label: <>hasalmalki@<wbr />outlook.com</> },
    { href: profile.linkedin, label: 'LinkedIn', note: 'linkedin.com/in/hisham-a-almalki' },
    { href: profile.github, label: 'GitHub', note: 'github.com/hisham-cs' },
    { href: `${import.meta.env.BASE_URL}${profile.cv}`, label: 'Download my CV', note: 'PDF' },
  ]
  return (
    <>
      <section className="contact dark" id="contact" aria-labelledby="contact-h">
        <div className="row">
          <h2 id="contact-h">Get in touch</h2>
          <span className="note">For data analyst and AI engineer roles. I reply from Makkah, UTC+3.</span>
        </div>
        {rows.map((r) => (
          <div className="row" key={r.href}>
            <a href={r.href} rel={r.href.startsWith('http') ? 'noopener' : undefined}>{r.label}</a>
            {r.note && <span className="note">{r.note}</span>}
          </div>
        ))}
      </section>
      <footer className="dark">
        <svg className="wordmark" viewBox="0 0 1000 160" role="img" aria-label={profile.name}>
          <text x="0" y="122" textLength="1000" lengthAdjust="spacingAndGlyphs">{profile.first} {profile.last}</text>
        </svg>
        <div className="foot">
          <span>© 2026 {profile.name}</span>
          <span>
            Picture credit:{' '}
            {credits.map((c) => (
              <span key={c.href}><a href={c.href} rel="noopener">“{c.what}”</a> by {c.who}, {c.licence}, via Wikimedia Commons.</span>
            ))}
          </span>
        </div>
      </footer>
    </>
  )
}
