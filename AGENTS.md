# Agent instructions

## Project
- Build a fast, accessible, mobile-first Next.js App Router site for eDataXpress.
- Prefer server components and semantic HTML. Use client components only for interactions that need browser state.
- Keep route content and metadata crawlable without client-side rendering.
- Preserve the book publishing, printing studio and independent bookstore visual direction.

## Quality
- Use descriptive page titles, meta descriptions, canonical URLs and accessible labels.
- Keep motion subtle and respect `prefers-reduced-motion`.
- Do not invent testimonials, guarantees, contact details or service claims. Treat user-provided business facts as authoritative.
- Keep sitemap, robots, llms.txt, structured data and internal links aligned when routes change.
- Keep dependencies minimal and never commit secrets or generated build artifacts.

## Commands
- `pnpm dev`: local development
- `pnpm build`: production build
- `pnpm start`: serve the production build
- SonarScanner configuration lives in `sonar-project.properties`.
