# Engineering standards

## Stack

Retain the existing stack found in the repository: Next.js App Router, TypeScript, React Server Components, pnpm, and existing shared CSS unless the code audit justifies a change.

## Code quality

- Strict TypeScript; avoid `any`, unsafe casts, and ignored errors.
- Small components with clear responsibilities.
- Prefer composition and typed data over giant conditional components.
- Keep business content separate from presentation.
- Use server components by default; isolate interactive islands.
- Avoid duplicate dependencies and unnecessary abstractions.
- Follow existing formatter/linter configuration.

## Security

- Validate and sanitize all untrusted form input on the server.
- Add rate limiting and spam mitigation to public endpoints.
- Keep API keys and secrets server-only.
- Use secure headers and a restrictive Content Security Policy where compatible.
- Avoid unsafe HTML injection; sanitize any approved rich text.
- Do not expose internal errors or stack traces to visitors.
- Keep dependencies patched; review lockfile changes.

## Accessibility

- WCAG 2.2 AA target.
- Semantic landmarks and headings.
- Keyboard-operable menus/forms.
- Focus visibility and logical focus order.
- Labels and useful validation messages.
- Contrast checks for all text and controls.
- Meaningful alt text; decorative images have empty alt.
- Reduced-motion support.
- Do not convey status through colour alone.

## Performance

- Minimize client JS and third-party scripts.
- Optimize fonts and images; prevent layout shift.
- Use static rendering/ISR where content allows.
- Set cache headers intentionally.
- Avoid blocking scripts and oversized dependencies.
- Test mobile throttled conditions, not only local desktop.

## Git workflow

- Small feature branches and focused commits.
- No secrets, generated output, or local environment files committed.
- Keep lockfile synchronized.
- Require CI quality gates before merge.
