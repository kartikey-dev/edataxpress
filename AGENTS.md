# Agent instructions — eDataXpress

## Mission

Build and maintain a fast, accessible, search-friendly, book-inspired B2B website for eDataXpress, a Delhi-based business offering Publication, Printing Solutions, Digital Studio Setup, and Digital Marketing (including an Interactive Flat Panel 65-inch product detail page).

## Before coding

1. Read `README.md` and all files in `docs/`.
2. Inspect the current codebase, package scripts, routes, dependencies, and existing tests.
3. Preserve useful working code and existing conventions unless the implementation plan explicitly calls for a justified change.
4. Keep confirmed owner facts authoritative and never fill unconfirmed gaps with invented claims.

## Owner-confirmed facts (from repo brief & owner confirmation)

- Brand: eDataXpress ("Connecting Businesses Globally")
- Established: 2017
- Address: PN92A, 2nd Floor, Madangir Police Station, Lal Bahadur Shastri Marg, Madangir, Delhi–110062, India
- Hours: 7:00 am – 11:45 pm daily
- Co-founder: Ayan Sarkar (`https://in.linkedin.com/in/dmayan`)
- Still pending owner confirmation: official email, phone/WhatsApp, canonical production domain verification, and exact IFP 65-inch brand/model/SKU/datasheet/pricing/warranty.

## Architecture

- Next.js App Router + TypeScript + pnpm; prefer Server Components and semantic HTML. Use Client Components only for browser-dependent interaction.
- Keep content, navigation, metadata, product data, and contact configuration in typed data modules (`lib/content/`).
- Use `next/image` with WebP for photography/product imagery and preserve transparency for the logo (`public/assets/edataxpress-logo-transparent.png`).
- Generate route metadata, canonical URLs, sitemap, robots, `llms.txt`, and JSON-LD from verified business data.

## Design direction

- Premium editorial/book-inspired B2B portfolio ("The Business Book"): warm paper surfaces, deep charcoal ink, restrained logo-red accents, serif display typography, and legible sans-serif body typography.
- Respect `prefers-reduced-motion` and keep motion subtle and purposeful.

## Quality gates & commands

- TDD: write/adjust tests before implementing behaviour; add regression tests for defects.
- `pnpm dev` / `pnpm build` / `pnpm start`: Next.js dev, production build, and serve.
- `pnpm lint` / `pnpm typecheck` / `pnpm test` / `pnpm test:coverage` / `pnpm format:check`: quality gates.
- SonarScanner configuration lives in `sonar-project.properties`. Never commit secrets, tokens, or generated build artifacts.
