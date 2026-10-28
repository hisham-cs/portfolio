// One real piece of a project: a screenshot, a table of its data, or a list
// from its code. Fragments carry data-ui so the product's own conventions
// (table rules, monospace identifiers) are kept inside them.
export default function Frame({ frame, sizes = '(max-width: 760px) 90vw, 40vw', className = '', eager = false }) {
  if (frame.kind === 'image') {
    const { image, alt, fill } = frame
    return (
      <span className={`frame ${className}`} style={fill ? { background: fill } : undefined}>
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={sizes}
          width={image.width}
          height={image.height}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : undefined}
          decoding="async"
        />
      </span>
    )
  }

  if (frame.kind === 'table') {
    const col = frame.columns
    const opt = (i) =>
      frame.optional?.includes(col[i]) ? 'opt'
        : frame.optionalNarrow?.includes(col[i]) ? 'opt-narrow'
          : frame.optionalTiny?.includes(col[i]) ? 'opt-tiny' : undefined
    return (
      <div className={`frame ${className}`}>
        <div data-ui className="ui" role="figure" aria-label={frame.label}>
          <div className="ui-scroll">
            <table>
              <thead>
                <tr>{frame.columns.map((c, i) => <th key={c} scope="col" className={opt(i)}>{c}</th>)}</tr>
              </thead>
              <tbody>
                {frame.rows.map((row) => (
                  <tr key={row[0]}>{row.map((cell, i) => <td key={i} className={opt(i)}>{cell}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="ui-foot">{frame.foot}</p>
        </div>
      </div>
    )
  }

  const List = frame.ordered ? 'ol' : 'ul'
  return (
    <div className={`frame ${className}`}>
      <div data-ui className="ui" role="figure" aria-label={frame.title}>
        <p className="ui-title">{frame.title}</p>
        <List dir={frame.rtl ? 'rtl' : undefined} lang={frame.rtl ? 'ar' : undefined}>
          {frame.items.map(([main, note]) => (
            <li key={main}>
              {frame.code ? <code>{main}</code> : main}
              {note && <span> {note}</span>}
            </li>
          ))}
        </List>
        <p className="ui-foot">{frame.foot}</p>
      </div>
    </div>
  )
}
