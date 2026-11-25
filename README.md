# eDataXpress Website

A fast, accessible, book-inspired Next.js App Router B2B portfolio for **eDataXpress** (_Connecting Businesses Globally_), covering **Publication**, **Printing Solutions**, **Digital Studio Setup** (including an **Interactive Flat Panel 65-Inch** detail page), and **Digital Marketing**.

## Architecture & Key Paths

- `app/`: Next.js App Router pages, layout (`next/font` self-hosted `DM_Sans` & `Playfair_Display`), `globals.css` design tokens, `robots.ts`, `sitemap.ts`, `not-found.tsx`, and `api/enquiry/route.ts`
- `components/`: shared `SiteHeader`, `SiteFooter`, `Breadcrumbs`, `ServicePage`, `ProductDetailView`, and accessible `EnquiryForm`
- `lib/content/`: typed single source of truth (`business.ts`, `services.ts`, `products.ts`, `navigation.ts`, `seo.ts`)
- `lib/enquiry.ts`: server/client payload validation, honeypot spam mitigation, and rate limiting
- `public/`: `assets/edataxpress-logo-transparent.png`, `assets/cofounder-ayan-sarkar.jpg`, `assets/favicon.png`, WebP imagery, and `llms.txt`
- `tests/`: Vitest + Testing Library unit/component/API tests
- `docs/`: implementation plan, IA, design system, content validation rules, QA/TDD, SEO, and Sonar guides
- `sonar-project.properties`: SonarQube/SonarCloud configuration (`coverage/lcov.info`)

## Local Development & Quality Gates

Requires Node.js 20+ and `pnpm`.

```bash
pnpm install
pnpm dev
```

Quality checks:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test:coverage
pnpm build
```

Configure optional environment variables in `.env.local` based on `.env.example` (`NEXT_PUBLIC_SITE_URL`, `CONTACT_API_URL`, `CONTACT_API_KEY`, `SONAR_HOST_URL`, `SONAR_TOKEN`). Never commit secrets.
