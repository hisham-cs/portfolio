import { useRef, useState } from 'react'

// One picture full size in a native <dialog>: Escape and the Close button
// shut it, a click on the backdrop too, and focus returns to the opener.
// Returns [show(image, alt, content?), dialogElement]; render the element
// once. With `content` (a table or list fragment) the dialog shows that
// instead of an image, and `alt` names it.
export default function useLightbox(label = 'Image') {
  const ref = useRef(null)
  const [open, setOpen] = useState(null)
  const show = (image, alt, content) => {
    setOpen({ image, alt, content })
    const d = ref.current
    if (!d) return
    d.showModal()
    // Focus the dialog, not its Close button: the rest of the Enter keypress
    // that opened it would otherwise land on Close and shut it at once.
    d.focus()
  }
  const dialog = (
    <dialog ref={ref} className="lightbox" tabIndex={-1} aria-label={open?.alt || label} onClose={() => setOpen(null)}
      onClick={(e) => { if (e.target === ref.current) ref.current.close() }}>
      {open?.content}
      {open?.image && <img src={open.image.src} width={open.image.width} height={open.image.height} alt={open.alt} />}
      <form method="dialog"><button className="btn on-light">Close</button></form>
    </dialog>
  )
  return [show, dialog]
}
