# eDataXpress website

A responsive Next.js App Router website for eDataXpress, with dedicated pages for its publishing, printing and marketing services. Route content is rendered by Next.js server components; client JavaScript is limited to the mobile menu and contact form.

## Run locally

Requires Node.js 20 or newer and pnpm.

Development writes its cache to `.next-dev`; production builds use `.next` so the two modes do not overwrite one another.

```sh
pnpm install
pnpm dev
```

The local server runs at `http://localhost:3000`. To create and serve a production build:

```sh
pnpm build
pnpm start
```

The site uses Next.js App Router, TypeScript, React server components and shared CSS. The contact form prepares an email in the visitor’s configured email app, without assuming a business email address; connect a form provider or backend endpoint to receive enquiries directly.

## Structure

- `app/`: route pages, global layout, metadata, sitemap and robots rules
- `components/`: shared site header, footer, service pages and contact form
- `app/globals.css`: shared design system and responsive styles
- `public/robots.txt`, `app/sitemap.ts`, `public/llms.txt`: crawler discovery and GEO context
- `sonar-project.properties`: SonarQube/SonarCloud scanner settings
- `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`: project guidance for coding agents

## Search and GEO

The pages include descriptive titles and summaries, canonical URLs, Open Graph metadata, crawlable internal links, and structured business data on the home page. `llms.txt` gives AI answer engines a concise overview and links to authoritative pages. Keep business facts consistent across these files and external listings. Before launch, confirm the production canonical domain, configure Search Console and Bing Webmaster Tools, and submit the sitemap.

## Sonar analysis

Install or configure SonarScanner in your environment, set the project key and host/token as needed, then run `sonar-scanner`. This repo includes a baseline Sonar project configuration and excludes generated dependencies/build output. Configure secrets through environment variables or your CI secret store; do not commit tokens.

## Business details

The supplied brief is treated as the source of truth for the establishment year (2017), address, hours, services and co-founder link. External directory descriptions can change and should be reviewed periodically.
