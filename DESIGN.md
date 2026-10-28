# Design system

Direction **M, the name as a monument**, with the **Ochre** colour system. Chosen through the design-taste-frontend skill (dealt direction, then three exploration rounds; the record is in `design-exploration/` locally). If a change conflicts with a rule below, revisit the rule first.

## Idea

The site presents one technologist, not one role: every project is shown at the same three stages, **data → model → product**. The name holds the first screen at two corners, and the proof (one product per project) fills the space between them. "Hand me a problem" lets a visitor pick a kind of raw material and follow it to a running product.

## Colour (all in `src/index.css`)

| Role | Tokens | Values |
| --- | --- | --- |
| Dark field (hero, skills, contact, footer) | `--dk-bg / -surface / -ink / -muted` | `#111111 / #1c1c1c / #f0f0ed / #a3a39e` |
| Light field (work, cases, about, credentials) | `--lt-bg / -surface / -ink / -muted` | `#f0f0ed / #e3e3df / #111111 / #5a5a56` |
| Accent field ("Hand me a problem" only) | `--ac-bg / -ink / -muted / -tint / -sel-bg / -sel-ink` | `#d9a62a / #111111 / #3b2e0c / #c99a27 / #111111 / #d9a62a` |
| Button on dark / on light | `--bd-*` / `--bl-*` | ochre on soot / soot on chalk |
| Interface frames | `--ui-bg / -ink / -muted / -edge` | `#f7f7f5 / #111111 / #5a5a56 / #cfcfca` |
| Focus | `--f-dk / --f-lt / --f-ac` | ochre on dark, soot on light and on ochre |

Rules: the accent appears only on the "Hand me a problem" field, the primary button on the dark field and the focus ring on dark. **Ochre is never text or an edge on a light field** (1.95:1). No colour stands for a discipline. Every required pairing was measured (lowest text 5.38:1, lowest UI 7.66:1).

## Type

One family, Bricolage Grotesque (self-hosted variable WOFF2, `font-display: swap`). Five sizes: `--s-small` 14–15, `--s-body` 18–19, `--s-head` 36–72, `--s-name` 9vw (15vw on phones), plus 16px case details and 14px case captions. Above a 1280px window, body, small, details, captions and the Edema panel text grow with the window (`--grow`, `--r`, `--r2` in `index.css`; details 16 → about 23px at 1920, 32px at 2560, then fixed), so the case details keep pace with the pictures beside them. Below 1280 nothing changes. Headings two lines at most. Arabic text inside frames uses system Arabic faces.

## House rules (from the skill, kept)

No eyebrow labels, no monospace outside real code, no 01/02/03 numbering, no hairline dividers, no gradients, no shadows on resting elements, no pills or card grids, square corners. Real interface fragments carry `data-ui` and may use their own table rules and monospace identifiers.

## Motion

Name halves rise out of a mask on load (900 ms, expo out); section parts enter in reading order (80 ms stagger, 24 px rise, once). Pictures never scale or move inside their frames, so nothing is ever cropped, even mid-animation. Transform and opacity only. `prefers-reduced-motion: reduce` removes all animation and shows everything in place; content is never hidden unless script runs (`.motion` class).
