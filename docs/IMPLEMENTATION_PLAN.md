# Antigravity implementation plan

## 0. Repository discovery and baseline

**Goal:** Understand the actual current project before changing it.

- Inspect `package.json`, lockfile, Next.js version, `app/`, `components/`, `public/`, styles, metadata, forms, existing tests, Sonar config, and CI workflows.
- Run existing install, lint, type-check, tests, and build commands where available.
- Capture baseline Lighthouse (mobile + desktop) and Sonar results.
- Map existing routes/components to the target information architecture.
- Identify dead code, duplicate UI, image formats/sizes, client components, hydration risks, and missing test coverage.
- Do not overwrite the existing design or routes until this audit is reviewed.

**Exit gate:** written baseline report, confirmed scripts, route inventory, and prioritized backlog.

## 1. Information architecture and content model

Build a data-first content layer with typed schemas.

Suggested routes:

- `/` — Home
- `/about` — Company story, approach, leadership (only verified details)
- `/services` — Service overview
- `/services/publication`
- `/services/printing-solutions`
- `/services/digital-studio-setup`
- `/services/digital-marketing`
- `/products/interactive-flat-panel-65` — dedicated product detail page (route slug can evolve when actual SKU is confirmed)
- `/insights` and `/insights/[slug]` — optional editorial/SEO content, only if owner will maintain it
- `/contact` — enquiry options and contact details
- `/privacy-policy` — only after actual data collection and business details are confirmed

Create typed content modules for:

- Business identity and contact details.
- Service descriptions and deliverables.
- Product catalogue and verified specifications.
- Navigation and footer links.
- Social profile URLs.
- SEO metadata and structured data.

Use one source of truth to generate navigation, page content, JSON-LD, sitemap entries, and `llms.txt` where applicable.

**Exit gate:** approved route map, content inventory, and unresolved-facts list.

## 2. Design system — editorial book theme

Create design tokens before building page-specific UI.

Recommended direction:

- Background: warm paper / ivory.
- Main text: deep charcoal / ink.
- Accent: restrained eDataXpress red, sampled from the logo.
- Supporting tones: muted stone, warm grey, subtle rules.
- Display type: refined editorial serif (e.g. a locally optimized variable serif via `next/font`).
- Body/UI type: neutral sans-serif with strong legibility.
- Use local/self-hosted font assets via `next/font` where licensing permits; do not rely on render-blocking third-party font requests.
- Layout motifs: chapter numbers, folio/page markers, thin rules, editorial columns, pull quotes (only approved copy), image plates, and clear section rhythm.

Build reusable tokens for spacing, typography, colour, container widths, breakpoints, radii, shadows, focus rings, and motion. Keep the design responsive and restrained.

**Exit gate:** tokens documented, header/footer and core primitives implemented, responsive review passed.

## 3. Global shell and homepage

Implement:

- Header with transparent/solid logo treatment appropriate to background, accessible navigation, and mobile menu.
- Editorial hero with a concise value proposition and two CTAs: Explore services and Discuss a project.
- Four service chapter cards/sections.
- Digital Studio Setup feature band.
- Company approach/process section.
- Selected work/case-study area only if verified material exists; otherwise use a capability-led section.
- Contact CTA and footer with verified social links.

Keep key copy server-rendered and visible without JavaScript. Avoid fake metrics, logo walls, or testimonial carousels.

**Exit gate:** responsive home page, keyboard-accessible navigation, visual regression coverage for key shell components.

## 4. Service landing pages

Each service page should share a consistent structure:

1. Breadcrumb and chapter marker.
2. Clear H1 and concise outcome-focused introduction.
3. Who it serves / common use cases.
4. Service scope and deliverables (owner-approved).
5. Process / engagement steps.
6. Related capabilities or products.
7. FAQ only for questions the business can answer accurately.
8. Strong enquiry CTA.

Keep service-specific copy and metadata in typed data rather than duplicating page templates.

**Exit gate:** four complete service routes, unique metadata, internal links, content approved.

## 5. Digital Studio Setup — dedicated solution page

This page is a priority and should feel like a solution catalogue, not a generic service paragraph.

Suggested sections:

- Hero: Digital Studio Setup / interactive learning and presentation environments.
- Use cases: digital classrooms, training rooms, lecture capture/recording studios, hybrid collaboration rooms, corporate presentation spaces. Confirm actual scope with Ayan.
- Solution components: interactive flat panels, mounts/stands, OPS computing, audio/video equipment, cameras, microphones, lighting, networking, installation, configuration, and training. Only list components eDataXpress actually supplies.
- Solution bundles: e.g. Interactive Classroom, Training Studio, Hybrid Collaboration Room. Present as configurable concepts, not fixed packages/prices unless approved.
- Delivery journey: requirement discovery → room assessment → solution proposal → supply → installation/configuration → handover/training (confirm each step).
- FAQ and quote/demo CTA.

### Product detail page: Interactive Flat Panel 65"

Use a product-detail pattern inspired by the supplied competitor reference, but do not copy its text, visual identity, images, or layout verbatim.

Recommended modules:

- Product title, model/SKU, image gallery, enquiry CTA.
- Key benefits in plain language.
- Technical specification table grouped by Display, Touch, System, Connectivity, Audio, Physical, Accessories, Compliance, and Warranty.
- Datasheet download (only approved, current PDF).
- Compatibility / use cases.
- Installation and support details (only if confirmed).
- Related sizes/models if actually available.
- Sticky mobile enquiry action that does not obscure content.

Important: the competitor PTw 65" page publicly describes features such as 4K resolution, 20-point touch, Android 14, and optional Windows OS. These are competitor-specific details, not eDataXpress product facts. Do not copy them into eDataXpress product content. Every displayed specification must be sourced from the exact product model's approved datasheet.

**Exit gate:** owner-approved product model and datasheet; spec table verified field-by-field; no competitor-owned copy/assets.

## 6. Enquiry and contact experience

- Create a reusable enquiry form with name, organization (optional), email/phone, service interest, message, and consent text where required.
- Validate on client for usability and on server for trust.
- Add spam protection/rate limiting appropriate to the chosen provider.
- Send to a confirmed endpoint (CRM, email provider, server action/API, or WhatsApp deep link). Do not silently leave a mailto-only flow if the business expects captured leads.
- Provide clear success/error states, accessible labels, and server-side validation.
- Never expose API keys in client bundles.

**Exit gate:** end-to-end test against staging destination, consent/privacy review, error handling verified.

## 7. Performance and media

- Prefer WebP for photography, editorial imagery, product images, and thumbnails; use AVIF only if the project/browser support strategy is tested and desired.
- Keep transparent logo as optimized PNG or SVG (do not flatten transparency into WebP).
- Use responsive `sizes`, explicit dimensions/aspect ratios, lazy loading below the fold, and priority only for the true LCP image.
- Use `next/image` and local image assets wherever possible.
- Compress product imagery without losing detail; provide zoom/download datasheet for technical product information.
- Avoid autoplay video, heavy sliders, excessive animation libraries, and layout shifts.
- Self-host fonts and subset where possible.
- Keep third-party scripts deferred and consent-aware where applicable.

Targets (measure, do not claim until tested):

- Lighthouse Performance: aim for 90+ mobile/desktop where realistic.
- Core Web Vitals: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 at the 75th percentile.
- No unoptimized hero image or avoidable layout shift.

## 8. SEO, local SEO, GEO/AEO

- Unique title/description/canonical for every indexable route.
- Semantic heading hierarchy and crawlable internal links.
- Open Graph and social metadata.
- `Organization` or `LocalBusiness` JSON-LD only with verified facts; choose the most accurate schema type.
- `Service` schema where appropriate; `Product` schema only for real, purchasable/listed product details and valid fields.
- NAP consistency across website and external listings.
- XML sitemap, robots rules, canonical strategy, 404 page, redirects for changed URLs.
- Image alt text based on image purpose; decorative images use empty alt.
- Create helpful, original service/product copy, not keyword-stuffed pages.
- Maintain `llms.txt` as supplemental context, not a substitute for crawlable pages.
- Set up Google Search Console and Bing Webmaster Tools after domain confirmation.

## 9. Testing and TDD

Before implementation of each interaction/utility:

1. Write a failing test for expected behaviour.
2. Implement the smallest change.
3. Run the focused test.
4. Add edge cases and regression coverage.
5. Run full quality suite before merge.

Test layers:

- Unit: content helpers, schema generation, validation, formatting.
- Component: navigation, mobile menu, service cards, product spec table, enquiry form states.
- Integration: form submission, server validation, spam/rate limits.
- E2E: core routes, mobile navigation, product enquiry, contact flow, keyboard journey.
- Accessibility: automated axe checks plus manual keyboard and screen-reader review.
- Visual: key viewport snapshots; review intentional changes rather than blindly accepting snapshots.

## 10. Sonar and CI quality gates

Use existing `sonar-project.properties` as the starting point; verify project key, source/test paths, coverage report paths, exclusions, and scanner version.

CI sequence:

1. Install from lockfile (`pnpm install --frozen-lockfile`).
2. Format check.
3. Lint.
4. Type-check.
5. Unit/component tests with coverage.
6. E2E smoke suite where configured.
7. Production build.
8. Sonar scan using CI secrets.
9. Fail on quality-gate failure.

Policy:

- No committed Sonar tokens.
- No new blocker/critical findings.
- Review major findings and security hotspots.
- Track coverage on new code; set a realistic project threshold after baseline.
- Exclude generated `.next`, dependencies, coverage artifacts, and generated files from analysis.
- Fix root causes rather than adding broad suppressions.

## 11. Release and post-launch

- Confirm content, legal details, domain, redirects, contact routing, privacy/cookie requirements.
- Run production Lighthouse and cross-browser/device QA.
- Verify sitemap, robots, canonical, JSON-LD, Open Graph previews, and social links.
- Submit sitemap to Search Console/Bing.
- Configure analytics only after privacy/consent decision.
- Monitor uptime, form delivery, 404s, CWV, and Sonar quality gate.
- Provide owner with a simple content-update guide.

## Suggested delivery order

P0: discovery + facts + route/content model + design tokens.
P1: global shell + home + service pages.
P2: Digital Studio Setup + IFP product detail.
P3: enquiry backend + SEO/schema + content approval.
P4: TDD/E2E/a11y/performance/Sonar + release.
