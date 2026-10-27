import { useId, useState } from 'react'

// The plain film with the model's heatmap wiped across it. Both images are
// the app's real output at the same size, so they overlay at zero offset;
// nothing here draws or alters the heatmap.
export default function RevealSlider({ reveal, initial = 50 }) {
  const [value, setValue] = useState(initial)
  const id = useId()
  const { base, overlay, label, ratio } = reveal
  return (
    <div className="reveal" style={{ '--p': `${value}%` }}>
      <div className="reveal-stage" style={{ aspectRatio: `${1 / ratio}` }}>
        <img src={base.src} srcSet={base.srcSet} sizes="(max-width: 760px) 92vw, 46vw" width={base.width} height={base.height}
          alt="Chest X-ray, the example input" loading="lazy" decoding="async" />
        <img className="reveal-overlay" src={overlay.src} srcSet={overlay.srcSet} sizes="(max-width: 760px) 92vw, 46vw"
          width={overlay.width} height={overlay.height} loading="lazy" decoding="async"
          alt={`The same X-ray under the ensemble Grad-CAM heatmap, shown across ${value}% of the image`} />
        <span className="reveal-edge" aria-hidden="true" />
      </div>
      <div className="reveal-bar dark">
        <label htmlFor={id}>{label}</label>
        <input id={id} type="range" min="0" max="100" step="1" value={value}
          onChange={(e) => setValue(Number(e.target.value))} aria-valuetext={`${value}% of the image shows the heatmap`} />
        <output htmlFor={id}>{value}%</output>
      </div>
    </div>
  )
}
