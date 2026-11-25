# QA, TDD, and acceptance criteria

## TDD workflow

For each new feature:

1. Define expected behaviour and acceptance criteria.
2. Write a failing unit/component/E2E test.
3. Implement the minimum code.
4. Run focused tests.
5. Add edge-case and regression tests.
6. Run the full suite and build.

## Required test scenarios

### Navigation

- Desktop links navigate to correct routes.
- Mobile menu opens/closes by button, Escape, and selection.
- Focus is managed and visible.
- Active route is announced appropriately.

### Services

- All four service routes render server-side.
- Each route has unique H1 and metadata.
- CTA points to the correct enquiry intent.
- No unapproved claims appear.

### Product

- Product page renders only confirmed specs.
- Missing optional specs are omitted, not shown as placeholders.
- Datasheet link works and has descriptive accessible text.
- Product enquiry includes product/model context.
- Image gallery has keyboard-accessible controls if interactive.

### Enquiry

- Required fields validate on client and server.
- Invalid email/phone and oversized input are rejected.
- Success and failure states are announced to assistive technology.
- Duplicate/spam submissions are mitigated.
- Submission destination is verified in staging.

### SEO

- Canonicals and metadata unique per route.
- Sitemap includes only canonical indexable routes.
- robots.txt is valid.
- JSON-LD validates and contains only verified facts.
- 404 and redirect behaviour are correct.

### Responsive/accessibility

- 320px, 375px, 768px, 1024px, 1440px widths.
- Keyboard-only navigation.
- Screen reader labels and form errors.
- Contrast, zoom/reflow, reduced motion.
- No horizontal overflow or overlapping sticky controls.

## Release acceptance

- All lint/type/test/build commands pass.
- No new blocker/critical Sonar issues; quality gate passes.
- Major Sonar issues reviewed and resolved or documented.
- Lighthouse and CWV reviewed against measured baseline.
- No broken internal/social links.
- Owner-approved content and product datasheet.
- Enquiry reaches the intended business destination.
