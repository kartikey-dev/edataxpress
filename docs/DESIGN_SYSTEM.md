# Design system — The Business Book

## Concept

A modern business portfolio designed like a well-produced business book: considered typography, editorial pacing, tactile surfaces, strong hierarchy, and precise use of brand colour.

## Palette direction

Sample exact red/black from the transparent logo during implementation. Suggested semantic roles:

- `paper`: warm ivory background.
- `paper-muted`: slightly darker paper panel.
- `ink`: near-black primary text.
- `ink-soft`: secondary copy.
- `brand-red`: logo red; use sparingly for actions, chapter markers, and emphasis.
- `rule`: warm grey hairline borders.
- `surface`: white/near-white product panel.

Do not choose final hex values by guess; sample the supplied logo and validate contrast.

## Typography

- Display: editorial serif with expressive but legible forms.
- Body/UI: neutral sans-serif with strong x-height and clear numerals.
- Use a small type scale with responsive clamp values.
- Body copy should remain comfortable on mobile; avoid tiny uppercase labels for essential information.
- Use tabular numerals for specification tables where helpful.
- Load fonts with `next/font`; verify font licensing and subset language coverage.

## Layout

- Constrained readable text width.
- Wide editorial image plates for hero and service introductions.
- Asymmetric grids only when they preserve reading order and responsiveness.
- Chapter numbers and folio markers as subtle navigation cues.
- Thin rules instead of excessive cards and shadows.
- Consistent spacing scale and predictable breakpoints.

## Interaction

- Clear hover, active, focus-visible, disabled, loading, success, and error states.
- Visible focus rings with sufficient contrast.
- Mobile menu works by keyboard and touch.
- Motion duration short and purposeful; disable/reduce motion under `prefers-reduced-motion`.
- Never use motion as the only way to reveal important content.

## Avoid

- Generic purple/blue gradients.
- Overly rounded SaaS cards.
- Decorative book imagery that confuses the business offering.
- Excessive parallax, auto-rotating carousels, autoplay video, or cursor-following effects.
- Text embedded in images.
