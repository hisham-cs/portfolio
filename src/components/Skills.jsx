import { useMemo, useState } from 'react'
import { projects, STAGES, otherEvidence } from '../data/projects.js'
import { skillGroups, untraced } from '../data/site.js'

const ALL_CELLS = projects.flatMap((p) => STAGES.map((s) => `${p.id}-${s.id}`))
const expand = (cells) => (cells.includes('*') ? [...ALL_CELLS, ...cells.filter((c) => c !== '*')] : cells)

function whereUsed(cells) {
  const names = []
  for (const p of projects) if (cells.some((c) => c.startsWith(`${p.id}-`))) names.push(p.name)
  for (const e of otherEvidence) if (cells.includes(e.id)) names.push(e.name)
  return names.length === projects.length + otherEvidence.length ? 'Everywhere' : names.join(', ')
}

// "Trace a skill": choose a skill and the map lights the exact stages that
// used it. The "where" text is always visible, so nothing depends on clicking.
export default function Skills() {
  const [chosen, setChosen] = useState(skillGroups[1].skills[0][0]) // Python
  const lit = useMemo(() => {
    for (const g of skillGroups) for (const [name, cells] of g.skills) if (name === chosen) return expand(cells)
    return []
  }, [chosen])
  const stageCount = lit.filter((c) => ALL_CELLS.includes(c)).length

  return (
    <section className="skills dark" id="skills" aria-labelledby="skills-h">
      <h2 id="skills-h" data-reveal>Every skill, traced to where I used it</h2>

      <div className="map-wrap" data-reveal>
        <table className="map">
          <caption>Lit cells used the chosen skill: <b>{chosen}</b>, {stageCount} of {ALL_CELLS.length} project stages{lit.some((c) => !ALL_CELLS.includes(c)) ? ', and the co-op' : ''}.</caption>
          <thead>
            <tr>
              <th scope="col">Project</th>
              {STAGES.map((s) => <th key={s.id} scope="col">{s.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <th scope="row">{p.name}</th>
                {STAGES.map((s) => {
                  const on = lit.includes(`${p.id}-${s.id}`)
                  return <td key={s.id} className={on ? 'lit' : undefined}>{p.map[s.id]}<span className="sr-only">{on ? ' (used)' : ''}</span></td>
                })}
              </tr>
            ))}
            {otherEvidence.map((e) => {
              const on = lit.includes(e.id)
              return (
                <tr key={e.id} className="other">
                  <th scope="row">{e.name}</th>
                  <td colSpan={STAGES.length} className={on ? 'lit' : undefined}>{e.label}<span className="sr-only">{on ? ' (used)' : ''}</span></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="groups">
        {skillGroups.map((g, gi) => (
          <div className="group" key={g.name} data-reveal style={{ '--i': gi }}>
            <h3>{g.name}</h3>
            <ul>
              {g.skills.map(([name, cells]) => (
                <li key={name}>
                  <button type="button" aria-pressed={name === chosen} onClick={() => setChosen(name)}>
                    <span className="s">{name}</span>
                    <span className="w">{whereUsed(expand(cells))}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="also" data-reveal><b>{untraced.label}:</b> {untraced.text}</p>
    </section>
  )
}
