# Antigravity execution prompt

You are the senior engineering agent responsible for the eDataXpress website.

First read `AGENTS.md`, `GEMINI.md`, `README.md`, and every file in `docs/`. Then inspect the actual repository and produce a baseline audit before modifying code.

The target is a premium, book-inspired B2B portfolio for eDataXpress (Delhi) covering Publication, Printing Solutions, Digital Studio Setup, and Digital Marketing. Build a dedicated Digital Studio Setup page and a detailed Interactive Flat Panel 65-inch product detail page. Use the supplied transparent logo. Use WebP for photographic and product imagery.

Do not copy the competitor's text, assets, or design. Use the competitor page only as a functional reference for the expected product-detail depth. Do not use competitor-specific specifications as eDataXpress facts. Product content must be based on the exact model's approved datasheet.

Engineering requirements:

- Retain the existing Next.js App Router + TypeScript + pnpm architecture unless an audit justifies a change.
- Server Components by default; client code only for genuine interaction.
- Use typed content modules as the source of truth.
- Apply TDD for all new interactive behaviour and critical utilities.
- Follow WCAG 2.2 AA, responsive design, semantic HTML, and reduced-motion preferences.
- Optimize images/fonts, avoid layout shift, and measure Core Web Vitals.
- Maintain metadata, canonical URLs, sitemap, robots, JSON-LD, and llms.txt.
- Run lint, type-check, tests, production build, and Sonar analysis.
- Do not commit secrets or generated artifacts.
- Do not invent testimonials, metrics, prices, warranty, address, contact details, founding year, client logos, or product specifications.

Work phase by phase according to `docs/IMPLEMENTATION_PLAN.md`. Before each phase, state the intended files and tests. After each phase, report changed files, tests run, build/Sonar results, and unresolved owner inputs. Stop at owner-dependent content decisions rather than fabricating answers.
