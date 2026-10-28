import { useId, useState } from 'react'

// The plain film with a model's heatmap wiped across it. Every layer is the
// app's real output at the same size as the X-ray, so they overlay at zero
// offset; nothing here draws or alters a heatmap. All layers are stacked and
// only the chosen one is shown, so switching model is instant and keeps the
// slider where it is.
export default function RevealSlider({ reveal, initial = 50 }) {
  const [value, setValue] = useState(initial)
  const [chosen, setChosen] = useState(reveal.layers[0].id)
  const id = useId()
  const { base, layers, label, ratio } = reveal
  const layer = layers.find((l) => l.id === chosen)
  const sizes = '(max-width: 82.5em) min(calc(100vw - 2rem), 45rem), 56vw'
  return (
    <div className="reveal" style={{ '--p': `${value}%` }}>
      <div className="reveal-top dark">
        <fieldset className="models">
          <legend>Heatmap from</legend>
          <div className="models-row">
            {layers.map((l) => (
              <label key={l.id} className={l.id === chosen ? 'on' : undefined}>
                <input type="radio" name={`${id}-model`} value={l.id} checked={l.id === chosen} onChange={() => setChosen(l.id)} />
                {l.label}
              </label>
            ))}
          </div>
        </fieldset>
        <p className="model-read" aria-live="polite">
          <b>{layer.probability}</b> edema probability from {layer.label} on this example image
          {layer.agreement && <>; model agreement: {layer.agreement}</>}
        </p>
        <p className="model-note">
          Each network looks at different regions; the ensemble averages them. Outputs on one image, not accuracy. For research and education, not diagnosis.
        </p>
      </div>
      <div className="reveal-stage" style={{ aspectRatio: `${1 / ratio}`, '--ar': 1 / ratio }}>
        <img src={base.src} srcSet={base.srcSet} sizes={sizes} width={base.width} height={base.height}
          alt="Chest X-ray, the example input" loading="lazy" decoding="async" />
        {layers.map((l) => {
          const on = l.id === chosen
          return (
            <img key={l.id} className={`reveal-overlay${on ? ' on' : ''}`} src={l.image.src} srcSet={l.image.srcSet} sizes={sizes}
              width={l.image.width} height={l.image.height} loading="lazy" decoding="async" aria-hidden={on ? undefined : true}
              alt={on ? `The same X-ray under the ${l.label} Grad-CAM heatmap, shown across ${value}% of the image` : ''} />
          )
        })}
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
