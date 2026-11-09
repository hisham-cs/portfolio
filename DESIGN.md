# Design system

Direction **M, the name as a monument**, with the **Ochre** colour system. Chosen through the design-taste-frontend skill (dealt direction, then three exploration rounds). If a change conflicts with a rule below, revisit the rule first.

## Idea

The site presents one technologist, not one role: every project is shown at the same three stages, **data → model → product**. The name holds the first screen at two corners, and three live data cards (one result per project, drawn from its published figures) fill the space between them. "Hand me a problem" lets a visitor pick a kind of raw material and follow it to a running product.

## Colour (all in `src/index.css`)

| Role | Tokens | Values |
| --- | --- | --- |
| Dark field (hero, skills, contact, footer) | `--dk-bg / -surface / -raise / -line / -ink / -muted` | `#111111 / #1c1c1c / #262626 / #333331 / #f0f0ed / #a3a39e` |
| Light field (cases, about, credentials) | `--lt-bg / -surface / -ink / -muted` | `#f0f0ed / #e3e3df / #111111 / #5a5a56` |
| Accent field ("Hand me a problem" only) | `--ac-bg / -ink / -muted / -tint / -sel-bg / -sel-ink` | `#d9a62a / #111111 / #3b2e0c / #c99a27 / #111111 / #d9a62a` |
| Button on dark / on light | `--bd-*` / `--bl-*` | ochre on soot / soot on chalk |
| Interface frames | `--ui-bg / -ink / -muted / -edge` | `#f7f7f5 / #111111 / #5a5a56 / #cfcfca` |
| Focus | `--f-dk / --f-lt / --f-ac` | ochre on dark, soot on light and on ochre |

Rules: the accent appears only on the "Hand me a problem" field, the hero's centre data card and chart strokes, the primary button on the dark field and the focus ring on dark. **Ochre is never text or an edge on a light field** (1.95:1). No colour stands for a discipline. Every required pairing was measured (lowest text 5.38:1, lowest UI 7.66:1; on the hero cards lowest text 5.97:1).

## Type

One family, Bricolage Grotesque (self-hosted variable WOFF2, `font-display: swap`). Five sizes: `--s-small` 14–15, `--s-body` 18–19, `--s-head` 36–72, `--s-name` 9vw (15vw on phones), plus 16px case details and 14px case captions. The hero cards keep the mockup's fixed sizes instead of the fluid curve (16px titles, 13–14px labels, a 48–54px number, a 44–64px gauge reading); every word in a card is 13px or more, the chart labels set in HTML over the SVG so they never shrink with the drawing. The row is at most 1440px wide; the side cards are 290px tall and the centre 320px at a 1300px row, growing in proportion to 321 and 354px at the cap. Sizes and breakpoints are in rem/em, so browser zoom and the text-size setting move along one curve. From 82.5rem (1320px at the default size), where the cases sit side by side, body, small, details, captions and the Edema panel text grow with the window (`--grow`, `--r`, `--r2` in `index.css`; details 16px there, about 22px at 1920, 31px at 2560) up to a 160rem page; past that every section's content stays 160rem wide, centred, with the bands full width. Below 82.5rem the cases read in one column. Checked at 94 widths from 320 to 3840px, at 16px and 20px default text. Headings two lines at most. Arabic text inside frames uses system Arabic faces.

## House rules (from the skill, kept)

No eyebrow labels, no monospace outside real code, no 01/02/03 numbering, no hairline dividers, no gradients, no shadows on resting elements, no pills or card grids, square corners. One approved exception: the hero's three data cards (6px corners, each titled with its project's name; the shorter side cards tilted ±2.5° on their inner bottom corners, lower than the centre card and straightening on hover and focus; the row inset 1rem so the tilt stays inside the margins; stacked, upright and lead-first below 68.75em). Real interface fragments carry `data-ui` and may use their own table rules and monospace identifiers.

## Motion

Name halves rise out of a mask on load (900 ms, expo out); section parts enter in reading order (80 ms stagger, 24 px rise, once). Pictures never scale or move inside their frames, so nothing is ever cropped, even mid-animation. Transform and opacity only, except the hero cards: once on load the churn line and the agent's spokes draw in and the gauge fills (`stroke-dashoffset`), and the gauge's number reads the arc as it fills. Every final value is in the markup; the animation starts from it. `prefers-reduced-motion: reduce` removes all animation and shows everything in place; content is never hidden unless script runs (`.motion` class).
