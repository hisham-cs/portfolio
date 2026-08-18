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
| Hero section | `pt-20 sm:pt-24`, `pb-20 sm:pb-24` | `pb` bumped from `pb-16 sm:pb-20` when Hero was resized for its full-width column — the statement needed more closing room under the taller type scale |
| Hero: title → intro paragraph | `mt-5` | Bumped from `mt-4` after the specialty rotator was deleted — the intro now follows the title paragraph directly instead of the rotator line, so it earns a half-step more room than the old tight follow-on gap had |
| About / Skills / Experience / Education / Contact | `py-16 sm:py-20` | Tightened from `py-24 sm:py-32` — these were the sections flagged as having excess empty space. New sections should default to this value, not invent one |
| Projects | `py-20 sm:py-28` | Smaller trim than the others; it carries the site's densest section (a scroll strip plus a filter row) and needs slightly more room |
| Projects: filter pills → card strip | `mt-6` | Tight — the pills are a control on the strip immediately below them, not a separate block |
| Two-column row gap (Contact) | `gap-10` (stacked/mobile), `lg:gap-x-12` (desktop column gap) | Tightened from a uniform `gap-12`. About no longer uses this grid — see its quote-first pattern below |
| Skills card grid | `gap-5` | 2-up capability cards |
| Projects card strip | `gap-6` | Fixed `w-80` cards in a horizontal scroll strip, not a grid — see "Section composition patterns" below |
| Card internal padding | `p-6 sm:p-8` (Skills), `p-6` (Projects, flat — no responsive bump) | Projects cards are uniform; no separate flagship padding exists to differ from |
| Education: degree card → certificates pivot | `mt-10` | Tightened from `mt-12` — they're one story, not two disconnected blocks |
| Education: certificate row | `py-5`, hairline `border-b border-border` | Same row grammar as Skills/Projects, not a card |
| Education: certificates → credentials gallery pivot | `mt-10` | Same value as the degree→certificates pivot above — a third zone in the same established rhythm, not a new gap |
| Contact: Elsewhere rail links | `gap-2` | Tightened from `gap-3` |
| About: quote → paragraph → chip → Focus band | `mt-8`, `mt-6`, `mt-10`+`pt-8` | See "Section composition patterns" below — these values are load-bearing for the quote-first structure, not arbitrary |

**Borders vs. background**: prefer a background/radius shift over a visible
border for new card-style components (this is why Skills cards use
`bg-surface` with no static border, only a hover-triggered one). The
existing hairline-rule grammar (`border-b border-border` between sections,
`border-l border-border` on rail dividers) is a different, deliberate,
already-restrained pattern — keep reusing it for structural dividers, don't
extend it into new card chrome.

## Image asset pipeline

`src/assets/projects/{slug}/{n}-{width}w.webp` and
`src/assets/credentials/{slug}/{thumb,full}-{w}x{h}.webp` — one subfolder
per project/credential, not a flat folder of `{slug}-{n}-{width}w` files.
27 files across three flat-named projects was unreadable at a glance;
subfolders make the tree self-organizing as project count grows.

**Two width tiers per project image, not three**: 480w (mobile) and
1280w (everything else). A middle 960w tier was cut — with only two
tiers the browser still always has a correctly-sized option on either
side of the mobile/desktop split, so the tier bought negligible
real-world benefit for a third of the file count. This is a measured
decision, not a guess: reducing from three tiers to two took the real
project images from 27 files to 18, and a post-change Lighthouse mobile
run against the production build held **96/100 performance, CLS 0** —
the same floor this project holds everywhere else. If a future change
ever drops mobile below 95, add the third tier back rather than
assuming two is always enough.

Credentials keep their existing two tiers (`thumb`/`full`) — those were
never three, so nothing was cut there, only reorganized into
per-credential subfolders. Both tiers stay filename-encoded with real
pixel dimensions (`{w}x{h}`, not a fixed ratio) because, unlike project
screenshots, credentials mix landscape certificates and portrait
letters with no single aspect ratio to derive from — see the comment
above `getCredentialImage` in `data.js`.

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
- **Projects is a horizontally-scrolling row of uniform cards — not a
  grid, and not the flagship/compact two-tier pattern.** All four
  projects render through the same `ProjectCard` in `Projects.jsx`,
  each a fixed `w-80` (320px), in one `flex snap-x snap-mandatory
  overflow-x-auto` strip that scrolls natively — no `FlagshipProject`
  component, no full-width card, no multi-image mosaic grid, and (as
  of this pass) no 2-up `grid` either; that was itself a transitional
  step on the way here, not a destination. Priority is expressed by
  **array order in `data.js`, not by size** — Telco Customer Churn
  Analysis leads (it's the category Hero's own title promises: "Data
  Analyst" before "AI Engineer"), Faten follows, then Pulmonary Edema
  and Smart Complaint. Telco's stat numbers (0.849 AUC, 78% recall,
  7,043 customers, 26.5% churn rate) live in its description prose;
  there is no metrics row anywhere in Projects — the `dl`/`dt`/`dd`
  stat grammar stays exclusively Education's. Multi-image projects
  (Telco and Faten, four screenshots each) use the same `ProjectMedia`
  hover-cycle/tap-dot mechanism every project uses; each project's
  lead (`{slug}/1-*.webp`) was already the right screenshot before any
  of this — Telco's dashboard overview, Faten's Arabic landing screen.
  **320px width, measured not guessed:** at `max-w-6xl`'s ~1104px
  content area, `w-80` + `gap-6` shows 3 full cards (1008px) plus a
  4th peeking ~96px in — the "3 visible, 4th partial" affordance this
  was built for. A throwaway test page rendered against the real
  compiled CSS (not estimated from character counts) measured Telco's
  original description at 13 wrapped lines at this width against 6
  for Faten/Smart Complaint and 4 for Pulmonary Edema — since every
  card in one flex row stretches to the tallest, that outlier alone
  would have forced all four into a mostly-empty 13-line shape. Telco's
  description was shortened to fit (9 lines, measured) while keeping
  the 26.5% churn-rate figure (the scale that makes the model's
  numbers mean something) and the word "independently" (the
  difference between "two methods agreed" and "two methods happened
  to say similar things") — both restored after an initial cut and an
  explicit call to put them back. Faten, Pulmonary Edema, and Smart
  Complaint were left untouched; their lengths are normal, not
  outliers.
- **Category filter — three pills, and `category` vs. `categoryTag`
  are deliberately not the same field.** Filtering only has two real
  buckets now (`category`: `'Data Analysis'` | `'AI'`, one per
  project, still derived via `Set(projects.map(p => p.category))`
  rather than hardcoded — a new bucket still appears as a pill for
  free), but each card's own displayed label stays specific:
  `categoryTag` is a separate field ("Data Analysis · Machine
  Learning" for Telco, "AI Systems · Full-Stack" for Faten, "Computer
  Vision · Medical AI" for Pulmonary Edema, "RAG / LLM Systems" for
  Smart Complaint — dropped "Machine Learning" from that last one, it
  was noise once "AI" already covers the bucket). Splitting the two
  fields apart is what makes a coarse 3-pill filter compatible with
  specific per-card labels; forcing one field to serve both jobs would
  have meant either fragmenting the filter back toward one-pill-per-
  project or flattening every card's label down to "Data Analysis" /
  "AI" and losing the specificity. Pills reuse the existing chip
  grammar (`bg-surface`, no border); the active pill inverts to
  `bg-text-primary text-background`, not the accent — accent
  discipline holds at exactly four locations. Filtering is instant:
  cards stay permanently mounted and toggle via the `hidden` utility
  rather than being filtered out of the array, so the shared Reveal
  entrance never replays on a filter click. A single-result filter
  centers the lone card (`justify-center` on the strip) instead of
  leaving it stranded at the left — it stays the same 320px card
  either way; widening it for this one case would have quietly
  reintroduced size-as-importance right after the flagship tier was
  retired specifically to remove that. An empty filter result is
  structurally impossible: every pill value is extracted from a real
  project's `category`, so by construction each pill always matches at
  least the project it came from. Accessible per the usual bar: real
  `<button>`s in a `role="group"` with `aria-label`, `aria-pressed`
  for state, a `sr-only` `aria-live="polite"` region announcing the
  visible count, and — new this pass — the scroll strip itself carries
  `role="region"` + `tabIndex={0}` so it's independently
  keyboard-scrollable, on top of each card's links already being
  tabbable in document order. At 375px it's the same strip, one card
  per snap position, native scroll only.
  **Reused, not reinvented:** the strip is `CredentialsGallery`'s
  exact scroll-snap + static right-edge fade-mask pattern
  (`bg-linear-to-l from-background to-transparent`), applied to a
  second section rather than inventing a different interaction for
  the same underlying need — no new motion touch either way, since
  native scroll and a static gradient were never counted against the
  budget for Credentials and aren't here.
  **A flexbox gotcha worth remembering:** equal card heights initially
  broke (Faten/Pulmonary Edema/Smart Complaint measured 665/624/621px
  instead of matching) because the per-card flex item carried an
  explicit `h-full` alongside the row's default `align-items: stretch`.
  On a `display:flex` row with an intrinsic (auto) height, giving the
  flex item itself a percentage height can make the browser treat it
  as having an already-definite cross size and skip the automatic
  stretch pass — CSS Grid's stretch doesn't have this failure mode,
  which is why the same pattern worked fine on the old 2-up `grid`.
  Fix: leave the direct flex item's height alone (let default stretch
  size it), and put `h-full` only on elements nested inside it
  (`Reveal`, then `ProjectCard`'s root) once the item's own box has a
  resolved height to reference. If a future flex-row layout shows
  uneven card heights, check this before anything else.
  **Measured cost, reported honestly, continued:** this pass's
  Lighthouse mobile run (2 runs, reproducible) landed at 94/100, LCP
  2.6s→2.8s, CLS unchanged at 0 — one more point down from the 95
  already logged and accepted after the filter was first added. Same
  diagnosis as before: the LCP element is still Hero's eyebrow text,
  unrelated to Projects, so this is the same category of small
  main-thread cost (now slightly larger: a scroll region, per-card
  wrapper/`hidden` markup, and `tabIndex`/`role` attributes) paid
  during this SPA's single synchronous initial render. Not silently
  accepted — logged the same way each time so the trend is visible
  rather than each drop looking like an isolated, unexplained mystery.
- **Education's credentials gallery is a third zone, not its own
  section.** Education already had a proven zone-pivot pattern (degree
  card → certificate list, `mt-10`); the gallery extends that same
  rhythm rather than inventing new section-level chrome. The
  alternative — a standalone "Credentials" section — was rejected
  because this site's nav mirrors its sections 1:1, and 4-6 thumbnails
  don't carry enough weight to justify a 7th nav entry next to
  Projects and Experience. Recommendation letters (queued behind
  professor permission, not built yet) technically reference
  Experience more than Education, but functionally they're the same
  "paper trail" story Education already tells — pairing them as one
  zone reads as coherent, not a category mismatch.
- **Hero is Statement + Status Band, not two-column.** The original
  "bio column + decorative right rail" skeleton left a hole that
  demanded filler (a constellation canvas, then debate over what to put
  there instead) — the fix was structural, not a better filler. Hero was
  rebuilt single-column: name/title/intro/CTAs as one editorial
  statement, then a hairline pivot (the same `mt-10`/`pt-8` values as
  About's Focus-band pivot, deliberately) into a status band. This
  directly extends About's paragraph-then-band DNA, which is why it was
  trusted for the highest-stakes section instead of proposing something
  unproven. The two bands stay deliberately different *devices*, not
  just different weights: About's Focus band is domains (titles +
  descriptions); Hero's status band is status (a mono eyebrow line, no
  descriptions). Available For is chips now, not the mono-dash rail it
  used to be — if you're looking for that layout, it's gone on purpose.
  A follow-up pass then resized the whole section for the full-width
  column it now owns (it shipped sized for the old half-column at
  first): the name runs `text-6xl sm:text-7xl lg:text-8xl` (up from
  `text-5xl sm:text-6xl lg:text-7xl`), title moved up one step, and
  headings run at their natural width — only the intro paragraph keeps
  a readable measure (`max-w-2xl`, up from `max-w-md`). `lg:text-8xl`
  (96px) sits just above taste-editorial's Dramatic-Display reference
  point (92px): consistent with Display-tier type at a dramatic ratio,
  not an unbounded escalation — no taste file caps absolute pixel size,
  only typeface count. The status band's status signal moved into the
  eyebrow line itself — `● AVAILABLE FOR`, the same static `bg-success`
  dot as About's Currently chip, inline before the label, matching the
  FOCUS/ACHIEVEMENTS mono-eyebrow pattern — so the chip row underneath
  is purely the three `heroCard.seeking` roles (sized up to `px-5
  py-2.5 text-sm`), no "Available" chip mixed in with them. A
  right-pole mono meta line (`profile.location`) closes the row,
  baseline-aligned with the chips via `items-baseline justify-start
  gap-x-6 gap-y-3 sm:justify-between` (explicit `justify-start` base
  rather than relying on flexbox's single-wrapped-item default). At
  375px the chip row wraps to two rows before the meta line drops below
  it, left-aligned — verified, not assumed.
- **The specialty rotator is gone.** `SpecialtyRotator.jsx`, its
  reserved-height invisible-spacer mechanism, and the "Specializing
  in…" line are deleted outright — not hidden, not reduced-motion-
  gated. `profile.title` ("Data Analyst | AI Engineer") now carries
  identity alone at its existing scale; it was never sized down to
  share the line with the rotator, so nothing needs to grow to fill
  the gap. The vertical rhythm was rebalanced instead: the intro
  paragraph, which used to sit `mt-4` under the rotator line, now sits
  `mt-5` directly under the title paragraph — a half-step up from the
  old tight follow-on gap, in from the scale, so the paragraph reads as
  the statement's second beat rather than an orphaned leftover. Stagger
  delays on the remaining `hero-in` elements (h1 70ms, title 140ms,
  intro 210ms, CTAs 280ms, status band 320ms) were left untouched
  rather than renumbered — removing one element from a staggered
  sequence doesn't obligate re-timing the rest. The Hero's only
  remaining live signal is the static `bg-success` status dot on
  "AVAILABLE FOR" (see motion budget below).

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
| Skills card hover/focus lift | 200ms | ease-out (translate + background + border) | `Skills.jsx` | Yes (1) |
| Projects image hover/focus auto-cycle | 500ms crossfade, 2.5s hold | ease-out (opacity only) | `ProjectMedia.jsx` | Yes (2) |
| Credentials lightbox open/close | 200ms | ease-out (opacity + scale only) | `CredentialsGallery.jsx` | Yes (3) |
| Scroll-reveal (fade-up on first view) | 600ms | ease-out (opacity + translateY) | `Reveal.jsx` / `.reveal` in `index.css` | No — shared baseline, used on every section |
| Hero entrance (on mount) | 500ms, staggered | cubic-bezier(0.215,.61,.355,1) | `.hero-in` in `index.css` | No — same baseline pattern, on-mount instead of on-scroll |
| Nav active-section underline | instant (state, not animated) | — | `Navbar.jsx` | No — explicitly not animated |

**Credentials lightbox — the fourth touch would-be, justified.** Adding
this brings the count back to three, exactly where it was before the
specialty rotator was removed above — a wash across the two changes,
not growth. It clears the budget on every axis: 200ms sits at the
strict-gsap micro-interaction ceiling, not the higher entrance-tier
allowance; only `opacity`/`transform` (scale) animate, both
compositor-friendly; it's `prefers-reduced-motion`-aware (skips
straight to the end state); and it's the only way to view a
credential at readable size, so it's load-bearing, not decorative.
The horizontal scroll strip itself and the right-edge fade mask are
native scroll and a static gradient respectively — neither is
JS-driven motion, so neither adds a row.

**Removed — Hero specialty-line crossfade.** Used to be `500ms per
transition, 4s hold, ease-out (opacity only)` in `SpecialtyRotator.jsx`,
counted as touch (1) of three. The component, its reserved-height
spacer, and the "Specializing in…" line are deleted outright (not
reduced-motion-gated, not hidden) — see the Hero composition note
above. This is a net reduction in the touch budget, not a swap: nothing
new was added to replace it.

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
About's Currently chip — so it adds zero rows here too. The rotator
itself outlived that restructure and was removed in a later pass (see
above); Skills hover and Projects auto-cycle are unchanged throughout.

Rules to keep this from growing back into clutter:

- **`prefers-reduced-motion: reduce` is mandatory** on every animation, no exceptions. Check the media query and either skip the transition class or freeze state on the first frame — every component above already does this; new ones must too.
- **Reachability can't depend on hover.** Any hover-revealed content (Projects' extra screenshots) needs a tap/click/focus path that doesn't require a pointer with hover — see the dot indicators in `ProjectMedia.jsx`.
- **Reserve space, don't reflow.** If text length changes, size the container from an invisible longest-value spacer in normal flow rather than letting content reflow live — this was the specialty rotator's mechanism before it was removed; the rule still applies to any future component with variable-length live text.
- No scroll-jacking, no particle backgrounds, no typing-effect headlines — these read as template output, not craft.
- Cap new interactions per section at 1–2. This site has exactly three bespoke motion touches (table above); adding a fourth anywhere should prompt the same "what am I removing to make room" question as the accent rule.
