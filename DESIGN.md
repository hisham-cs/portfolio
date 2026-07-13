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

Every other emphasis need (hover states, status, links) should reach for
`text-primary`/`text-secondary` weight or color shifts, or the semantic
`success`/`warning`/`error` tokens — never a second accent.

## Spacing scale (post rhythm-pass)

No magic numbers — every value below comes from Tailwind's default 4px
scale. If a new section needs padding, pick from this table rather than
inventing a value.

| Context | Value | Notes |
|---|---|---|
| Hero section | `pt-20 sm:pt-24`, `pb-16 sm:pb-20` | Unchanged since the rhythm pass — never flagged as loose, needs the air |
| About / Skills / Education / Contact | `py-16 sm:py-20` | Tightened from `py-24 sm:py-32` — these were the sections flagged as having excess empty space |
| Projects | `py-20 sm:py-28` | Smaller trim than the others; it carries the flagship card and needs slightly more room |
| Two-column row gap (About, Contact) | `gap-10` (stacked/mobile), `lg:gap-x-12` (desktop column gap) | Tightened from a uniform `gap-12` |
| Skills card grid | `gap-5` | 2-up capability cards |
| Projects compact card grid | `gap-6` | 2-up cards below the flagship |
| Card internal padding | `p-6 sm:p-8` (Skills, compact Projects), `p-6 sm:p-10` (flagship Project) | Flagship gets more room to earn its treatment |

**Borders vs. background**: prefer a background/radius shift over a visible
border for new card-style components (this is why Skills cards use
`bg-surface` with no static border, only a hover-triggered one). The
existing hairline-rule grammar (`border-b border-border` between sections,
`border-l border-border` on rail dividers) is a different, deliberate,
already-restrained pattern — keep reusing it for structural dividers, don't
extend it into new card chrome.

## Motion budget

Every animation in this codebase should be nameable in one phrase ("state
changed," "more content available," "this is the active one"). If you can't
name it, it's decoration — cut it.

| Interaction | Duration | Easing | File |
|---|---|---|---|
| Hero specialty-line crossfade | 500ms per transition, 4s hold | ease-out (opacity only) | `SpecialtyRotator.jsx` |
| Skills card hover/focus lift | 200ms | ease-out (translate + background + border) | `Skills.jsx` |
| Projects image hover/focus auto-cycle | 500ms crossfade, 2.5s hold | ease-out (opacity only) | `ProjectMedia.jsx` |
| Nav active-section underline | instant (state, not animated) | — | `Navbar.jsx` |
| Scroll-reveal (fade-up on first view) | 600ms | ease-out (opacity + translateY) | `Reveal.jsx` / `.reveal` in `index.css` |
| Hero entrance (on mount) | 500ms, staggered | cubic-bezier(0.215,.61,.355,1) | `.hero-in` in `index.css` |

Rules to keep this from growing back into clutter:

- **`prefers-reduced-motion: reduce` is mandatory** on every animation, no exceptions. Check the media query and either skip the transition class or freeze state on the first frame — every component above already does this; new ones must too.
- **Reachability can't depend on hover.** Any hover-revealed content (Projects' extra screenshots) needs a tap/click/focus path that doesn't require a pointer with hover — see the dot indicators in `ProjectMedia.jsx`.
- **Reserve space, don't reflow.** If text length changes (like the specialty rotator), size the container from an invisible longest-value spacer in normal flow rather than letting content reflow live.
- No scroll-jacking, no particle backgrounds, no typing-effect headlines — these read as template output, not craft.
- Cap new interactions per section at 1–2. This site has exactly four motion touches total (table above); adding a fifth anywhere should prompt the same "what am I removing to make room" question as the accent rule.
