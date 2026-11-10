# DESIGN.md — Lato Studio

The visual world as built. Generated from `index.html`; update it when the system changes,
not when a single instance does.

## Color

The palette is deliberately near-monochrome. The colour on this page comes from the
thumbnails themselves — the work is the palette, and the interface stays out of it.

| Token | Value | Role |
|---|---|---|
| Ground | `#000000` | Page background, every section |
| Ink | `#FFFFFF` | Headings, primary text, active nav pill |
| Ink secondary | `rgba(255,255,255,0.60)` | Body copy, descriptions |
| Ink tertiary | `rgba(255,255,255,0.50)` | Metadata (subscriber counts, roles) |
| Rule | `rgba(255,255,255,0.15–0.20)` | Hairlines, dividers, column rules |
| Glass fill | `rgba(255,255,255,0.08)` / `0.10` | Surfaces (see Materials) |

Pure black is a deliberate choice, not an oversight: it lets the hero video and the
thumbnails bleed into the page with no visible seam.

## Type

Two families, clearly distinct in role.

- **Alfabet** (Adobe Fonts, kit `njx3mwm`), weight 700 — section headings.
  Falls back to Inter. Tracking `-0.03em`.
- **Inter** — hero headline (500), UI, labels, nav, numbers.
- **Instrument Serif** italic 400 — the accent voice. Used at `1.1em` against the
  surrounding sans so the two optical sizes match.
- **Barlow** 300/400 — body copy and paragraphs.

**Accent rule.** Instrument Serif italic marks exactly one idea per line — `handle`,
`growth`, `Lato Studio`. It is the studio's signature, applied sparingly. Do not extend
it to new places without a reason; three instances is the working ceiling.

**Scale.** Heading size encodes section importance, deliberately unequal:

| Level | Size | Where |
|---|---|---|
| Display | `5xl → 8xl` | "Thumbnails that perform." — the portfolio leads the page |
| Section | `4xl → 6xl` | Process, Why, Testimonials, Contact |
| Minor | `3xl → 5xl` | FAQ |
| Sub | `2xl → 4xl` | Row titles inside Process |
| Body | `sm → base` | All copy |

**Tracking floor:** `-0.04em`. Express tracking in `em`, never `px` — px tracking blows
past the floor at small breakpoints.

## Materials

Two glass weights, and the distinction carries hierarchy:

- `.liquid-glass` — 8% white, 4px blur. Content surfaces: cards, FAQ panel, portfolio
  thumbnails, creator chips.
- `.liquid-glass-strong` — 10% white, 50px blur, deeper shadow. Floating chrome: nav
  pill, buttons, arrow controls, lightbox.

Both carry a gradient edge (bright at top and bottom, transparent at the centre) that
reads as light catching a real edge. **Never stack one glass surface on another** —
legibility collapses.

Radius: `rounded-full` for chrome and portraits, `rounded-2xl` for content surfaces,
`rounded-3xl` for the stats panel. Radius follows role, not habit.

## Motion

**One authored moment: the hero load.** Headline, description, buttons, and client
carousel arrive in a staggered blur-and-rise sequence. Nothing else on the page
performs an entrance of that weight.

Everything below the fold uses a plain 0.45s opacity settle — no slide, no blur. Section
entrances that all move identically read as generated; these merely stop being invisible.

**Motion that answers an action** is welcome and uses the spring tokens:

```
--spring:        cubic-bezier(0.32, 0.72, 0, 1)   /* critically damped, no overshoot */
--spring-bounce: cubic-bezier(0.2, 1.25, 0.4, 1)  /* only after real momentum */
--resp: 0.4s   --resp-fast: 0.28s
```

Rules that follow from this:

- Feedback fires on pointer-down, not release (`scale(0.97)`).
- The lightbox opens *from the thumbnail that was clicked* (`transform-origin` on its
  centre) and closes along the same path.
- Glass surfaces materialise — blur, scale, and opacity animate together — rather than
  fading flat.
- Animations interpolate from the current on-screen value, so they can be interrupted
  and reversed without a jump.
- The portfolio marquee slows to 35% on hover, per row, with a ramped transition; on
  touch it scrubs 1:1 with the finger and resumes where released.

## Layout

Content max-width `6xl` (`3xl` for FAQ, so the measure stays under 75ch). Section
padding `py-14 md:py-24`, `px-6 md:px-12 lg:px-24`.

Sections are centred by default; the two Process rows alternate left/right on desktop
and centre on mobile. Structural devices carry information, not decoration: the "What
you get" columns are separated by a hairline rule, the contact column by rules between
Studio / Mail / Follow.

**No eyebrow labels above headings** — banned outright, not a stylistic preference.
**No card grids as page structure** — the four-column "What you get" block is rules and
type, not containers.

## Browser surfaces

Themed from the palette, not left to the browser: text selection (white on black),
caret colour, focus ring (`:focus-visible`, 2px white, 3px offset), placeholder colour,
scrollbar, link underline offset.

## Accessibility

- `prefers-reduced-motion` — marquee stops, transitions collapse to 200ms, press
  feedback becomes opacity instead of scale.
- `prefers-reduced-transparency` — glass becomes near-solid `rgba(24,24,24,0.96)`.
- `prefers-contrast: more` — near-solid surfaces with a defined 1px white border.
- Touch targets ≥44px. Viewport-dependent layout reads a live media query, so rotation
  and resize reflow correctly.

## Anti-patterns for this project

- Adding colour. The thumbnails are the colour.
- Extending the serif italic accent past its three uses.
- Wrapping new content in another glass card by default.
- A second entrance animation competing with the hero.
- Any Italian string in the interface.
