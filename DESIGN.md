# Design System

This document exists so future changes — by anyone, including a future me —
don't quietly erode the system this portfolio was redesigned around. If a
change conflicts with something below, that's a signal to stop and
reconsider, not to edit this file to match the change.

All tokens live in `src/index.css`. Components reference the plain token
(`bg-accent`, `text-text-secondary`, etc.) with no `dark:` prefix — the
`.dark` class override on `<html>` swaps every `--color-*` value at once.
Never add a one-off `dark:` variant; add the color to both blocks in
`index.css` instead.

## Color system — "Oxide Ink"

One accent hue (burnt-vermillion oxide), one warm-ink neutral family shared
by both light and dark mode, and a semantic state set (success/warning/
error) that is deliberately **not** the accent color.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--color-background` | `#faf9f6` | `#17140f` | Page background |
| `--color-surface` | `#f1efe9` | `#201c16` | Card backgrounds (Skills, Projects, Education) |
| `--color-surface-elevated` | `#ffffff` | `#29241c` | Hover/elevated state on cards |
| `--color-border` | `#e3e0d8` | `#342e24` | Hairlines, card borders |
| `--color-text-primary` | `#1c1a17` | `#f4f0e8` | Headings, primary copy — 16.5:1 / 16.2:1 |
| `--color-text-secondary` | `#5a564c` | `#b4ac9c` | Body copy — 6.95:1 / 8.15:1 |
| `--color-text-muted` | `#736c63` | `#928b7c` | Captions, mono labels — 4.92:1 / 5.43:1 |
| `--color-accent` | `#b8402c` | `#e2704f` | **The one accent — see discipline below** |
| `--color-success` / `warning` / `error` | — | — | Status dots, semantic states only, never decorative |

`--color-ink*` (in `index.css`) is a fixed dark island used only by the
Projects placeholder mockup — it does not follow light/dark mode by design,
so don't "fix" it into the theme system.

### Accent discipline

The accent color (`--color-accent`) is a scarce resource. It appears in
**exactly four places** in the whole site. Before adding a fifth, stop and
ask whether something else should be removed instead.

1. **Primary CTA** — `Button.jsx`'s `primary` variant (`bg-accent`), used once, on Hero's "View My Work".
2. **Active nav underline** — `Navbar.jsx`, `border-accent` on the current section's link (desktop + mobile menu are the same one spot, just two responsive renderings).
3. **Pull-quote rule** — `About.jsx`, `border-l-2 border-accent` on the blockquote. The quote text itself stays neutral so the accent doesn't multiply within one block.
4. **Email link** — `Contact.jsx`, `text-accent` on the mailto link.

`Badge.jsx` still defines an `accent` variant that is **not used anywhere**
— it's kept token-consistent for a possible future need, but wiring it up
would be a fifth location. Don't, without revisiting this section first.

**Explicit exception**: the global keyboard focus ring (`a:focus-visible,
button:focus-visible, [tabindex]:focus-visible { outline: 2px solid
var(--color-accent); }` in `index.css`) also resolves to the accent token.
This is intentionally not counted against the four content locations above
— it's an accessibility-mandated system affordance applied uniformly to
every focusable element, not a decorative/attention use. Don't flag it as
a violation in a future accent audit; don't remove it to "get back to
exactly one usage" either.

Every other emphasis need (hover states, status, links) should reach for
`text-primary`/`text-secondary` weight or color shifts, or the semantic
`success`/`warning`/`error` tokens — never a second accent. The Currently
chip in `About.jsx` (`bg-surface` pill + `bg-success` status dot) is the
reference example: success used semantically for "active now," the same
dot language as the status badges in `Projects.jsx` — not a new accent
spot, and not itemized separately because it's the same token/pattern
reused, not a new one invented.

## Spacing scale (post rhythm-pass)

No magic numbers — every value below comes from Tailwind's default 4px
scale. If a new section needs padding, pick from this table rather than
inventing a value.

| Context | Value | Notes |
|---|---|---|
| Hero section | `pt-20 sm:pt-24`, `pb-16 sm:pb-20` | Unchanged since the rhythm pass — never flagged as loose, needs the air |
| About / Skills / Experience / Education / Contact | `py-16 sm:py-20` | Tightened from `py-24 sm:py-32` — these were the sections flagged as having excess empty space. New sections should default to this value, not invent one |
| Projects | `py-20 sm:py-28` | Smaller trim than the others; it carries the flagship card and needs slightly more room |
| Two-column row gap (About, Contact) | `gap-10` (stacked/mobile), `lg:gap-x-12` (desktop column gap) | Tightened from a uniform `gap-12` |
| Skills card grid | `gap-5` | 2-up capability cards |
| Projects compact card grid | `gap-6` | 2-up cards below the flagship |
| Card internal padding | `p-6 sm:p-8` (Skills, compact Projects), `p-6 sm:p-10` (flagship Project) | Flagship gets more room to earn its treatment |
| Education: degree card → certificates pivot | `mt-10` | Tightened from `mt-12` — they're one story, not two disconnected blocks |
| Education: certificate row | `py-5`, hairline `border-b border-border` | Same row grammar as Skills/Projects, not a card |
| Contact: Elsewhere rail links | `gap-2` | Tightened from `gap-3` |
| About: quote → paragraph → chip → Focus band | `mt-8`, `mt-6`, `mt-10`+`pt-8` | See "Section composition patterns" below — these values are load-bearing for the quote-first structure, not arbitrary |

**Borders vs. background**: prefer a background/radius shift over a visible
border for new card-style components (this is why Skills cards use
`bg-surface` with no static border, only a hover-triggered one). The
existing hairline-rule grammar (`border-b border-border` between sections,
`border-l border-border` on rail dividers) is a different, deliberate,
already-restrained pattern — keep reusing it for structural dividers, don't
extend it into new card chrome.

## Section composition patterns

Not every section has to share the same internal grammar. Two Phase 2
decisions are system law now — a future session should not "fix" either
one back toward consistency-for-its-own-sake:

- **About is quote-first, not two-column.** After two failed incremental
  passes (a two-column prose+rail layout, then a full-width quote
  breakout bolted onto that same layout) proved the two-column structure
  itself was the ceiling, About was rebuilt around one organizing idea:
  the pull-quote leads as the section's thesis (large, first thing after
  the heading), the paragraph supports it, a Currently chip closes the
  narrative beat, and a hairline rule pivots into a compact 3-up Focus
  band. This works specifically because Hero already owns "who" (name,
  title, the specialty rotator) — About is voice, not evidence, and it's
  the one section allowed to read differently from Skills/Projects/
  Education, which *are* evidence and correctly share a denser, row-based
  grammar. Do not re-introduce a sidebar or force About back into the
  8/4 column split used elsewhere — that split was the diagnosed problem,
  not an inconsistency to resolve.
- **Certificate ordering is signal-based, not chronological.** KAUST
  Academy (×2) and SDAIA lead `certificates` in `data.js` regardless of
  year, because they carry the most recognition for Saudi AI recruiters.
  Each row still shows its own year specifically so the ordering reads as
  intentional rather than an accident of data entry. Don't "fix" this
  back to date order.
- **Card vs. numbered-row grammar is chosen per how many entries there
  are, not by section identity.** Education's degree and Experience's job
  entries both use the richer degree-card treatment (`bg-surface
  rounded-2xl border p-8 sm:p-10`, no number badge) because each is one
  or few substantial entries earning real weight. Certificates, Skills
  categories, and Projects use the dense numbered-row/card grammar
  because they're several similar-weight siblings being enumerated. If
  Experience grows to several jobs, keep the card treatment (stack with
  `space-y-6`) rather than converting to rows — the card-vs-row choice
  tracks entry richness, not entry count alone. Within a card, sub-points
  (Experience's achievements) use the mono-dash `–` marker, never numbers
  — numbers are reserved for enumerating sibling entities across a
  section, not sub-points within one.
- **Hero is Statement + Status Band, not two-column.** The original
  "bio column + decorative right rail" skeleton left a hole that
  demanded filler (a constellation canvas, then debate over what to put
  there instead) — the fix was structural, not a better filler. Hero was
  rebuilt single-column: name/title/rotator/intro/CTAs as one editorial
  statement, then a hairline pivot (the same `mt-10`/`pt-8` values as
  About's Focus-band pivot, deliberately) into a status band —
  "Available" plus the `heroCard.seeking` items, as `bg-surface` chips.
  This directly extends About's paragraph-then-band DNA, which is why it
  was trusted for the highest-stakes section instead of proposing
  something unproven. The two bands stay deliberately different
  *devices*, not just different weights: About's Focus band is domains
  (titles + descriptions); Hero's status band is status (short chips, no
  descriptions) — the leading chip's `bg-success` dot (the same static
  pattern as About's Currently chip) is what makes that read as a
  different device, not a lighter copy. Available For is chips now, not
  the mono-dash rail it used to be — if you're looking for that layout,
  it's gone on purpose.

## Motion budget

Every animation in this codebase should be nameable in one phrase ("state
changed," "more content available," "this is the active one"). If you can't
name it, it's decoration — cut it.

The table has six rows, but only **three count against the "motion
touches" budget** — the bespoke, per-section ones. The other three are
either the shared baseline entrance system (used everywhere, not a
per-section addition) or explicitly not animated at all:

| Interaction | Duration | Easing | File | Counts as a touch? |
|---|---|---|---|---|
| Hero specialty-line crossfade | 500ms per transition, 4s hold | ease-out (opacity only) | `SpecialtyRotator.jsx` | Yes (1) |
| Skills card hover/focus lift | 200ms | ease-out (translate + background + border) | `Skills.jsx` | Yes (2) |
| Projects image hover/focus auto-cycle | 500ms crossfade, 2.5s hold | ease-out (opacity only) | `ProjectMedia.jsx` | Yes (3) |
| Scroll-reveal (fade-up on first view) | 600ms | ease-out (opacity + translateY) | `Reveal.jsx` / `.reveal` in `index.css` | No — shared baseline, used on every section |
| Hero entrance (on mount) | 500ms, staggered | cubic-bezier(0.215,.61,.355,1) | `.hero-in` in `index.css` | No — same baseline pattern, on-mount instead of on-scroll |
| Nav active-section underline | instant (state, not animated) | — | `Navbar.jsx` | No — explicitly not animated |

Phase 2 (About/Education/Contact) added zero new rows to this table —
every hover/transition it uses is the pre-existing sitewide link-hover
pattern (`transition-colors` + arrow-nudge) or the shared Reveal
baseline, confirmed by grep across `About.jsx`, `Education.jsx`,
`Contact.jsx` during the Phase 2 final audit.

**Net change — Hero restructure:** `HeroVisual.jsx` (the constellation
canvas: continuous `requestAnimationFrame` drift, a `ResizeObserver`, a
`MutationObserver` watching for theme changes) is deleted entirely. It
was never itemized in the table above even when it existed — continuous
ambient/idle motion is a different category from the interaction-
triggered touches this budget tracks — but it was still real, constant
motion on the page, and it's now gone with nothing replacing it: a net
reduction, not a swap. The status band's leading chip has a colored dot
(`bg-success`), but it's static — the same non-animated treatment as
About's Currently chip — so it adds zero rows here too. The three
bespoke touches (rotator, Skills hover, Projects auto-cycle) are
unchanged; the rotator's reserved-height mechanism moved with it into
the new single-column layout unmodified.

Rules to keep this from growing back into clutter:

- **`prefers-reduced-motion: reduce` is mandatory** on every animation, no exceptions. Check the media query and either skip the transition class or freeze state on the first frame — every component above already does this; new ones must too.
- **Reachability can't depend on hover.** Any hover-revealed content (Projects' extra screenshots) needs a tap/click/focus path that doesn't require a pointer with hover — see the dot indicators in `ProjectMedia.jsx`.
- **Reserve space, don't reflow.** If text length changes (like the specialty rotator), size the container from an invisible longest-value spacer in normal flow rather than letting content reflow live.
- No scroll-jacking, no particle backgrounds, no typing-effect headlines — these read as template output, not craft.
- Cap new interactions per section at 1–2. This site has exactly three bespoke motion touches (table above); adding a fourth anywhere should prompt the same "what am I removing to make room" question as the accent rule.
