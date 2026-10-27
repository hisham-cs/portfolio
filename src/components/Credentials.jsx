import { useRef, useState } from 'react'
import { certification, courses } from '../data/site.js'
import { natural } from '../data/images.js'

// Certification first and largest; courses as a list. Every image is a
// thumbnail that opens full size in a native <dialog>.
export default function Credentials() {
  const dialog = useRef(null)
  const [open, setOpen] = useState(null)
  const show = (image, alt) => {
    setOpen({ image, alt })
    const d = dialog.current
    if (!d) return
    d.showModal()
    // Focus the dialog, not its Close button: the rest of the Enter keypress
    // that opened it would otherwise land on Close and shut it at once.
    d.focus()
  }

  const items = courses.map((c) => ({
    ...c,
    image: c.imageName && c.publish ? natural(c.imageName, c.ratio) : null,
  }))

  return (
    <section className="creds light" id="credentials" aria-labelledby="creds-h">
      <h2 id="creds-h" data-reveal>Certification and courses</h2>

      <div className="cert">
        <button type="button" className="thumb big" onClick={() => show(certification.image, certification.alt)} data-reveal>
          <img src={certification.image.src} srcSet={certification.image.srcSet} sizes="(max-width: 760px) 92vw, 44vw"
            width={certification.image.width} height={certification.image.height} alt={certification.alt} loading="lazy" decoding="async" />
          <span className="sr-only">Open the certificate full size</span>
        </button>
        <div className="cert-text" data-reveal style={{ '--i': 1 }}>
          <h3>{certification.title}</h3>
          <p>{certification.credential}, issued by {certification.issuer} in {certification.date}. Valid through {certification.validThrough}.</p>
          {certification.verifyUrl && (
            <p><a href={certification.verifyUrl} rel="noopener">Verify the certificate</a></p>
          )}
        </div>
      </div>

      <h3 className="courses-h" data-reveal>Courses</h3>
      <ul className="courses">
        {items.map((c, i) => (
          <li key={c.title} data-reveal style={{ '--i': i }}>
            {c.image && (
              <button type="button" className="thumb" onClick={() => show(c.image, `${c.title} certificate, ${c.issuer}`)}>
                <img src={c.image.src} srcSet={c.image.srcSet} sizes="120px" width={c.image.width} height={c.image.height}
                  alt={`${c.title} certificate, ${c.issuer}`} loading="lazy" decoding="async" />
                <span className="sr-only">Open full size</span>
              </button>
            )}
            <span className="c-title">
              {c.title}
              {c.verifyUrl && (
                <a className="c-verify" href={c.verifyUrl} rel="noopener">Verify<span className="sr-only"> the {c.title} certificate</span></a>
              )}
            </span>
            <span className="c-issuer">{c.issuer}</span>
          </li>
        ))}
      </ul>

      <dialog ref={dialog} className="lightbox" tabIndex={-1} aria-label={open?.alt || 'Certificate'} onClose={() => setOpen(null)}
        onClick={(e) => { if (e.target === dialog.current) dialog.current.close() }}>
        {open && <img src={open.image.src} width={open.image.width} height={open.image.height} alt={open.alt} />}
        <form method="dialog"><button className="btn on-light">Close</button></form>
      </dialog>
    </section>
  )
}
