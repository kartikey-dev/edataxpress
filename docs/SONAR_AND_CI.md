# Sonar and CI implementation

## Sonar configuration audit

Inspect existing `sonar-project.properties` and verify:

- `sonar.projectKey` and organization/host settings.
- Source and test directories.
- LCOV coverage path from the actual test runner.
- Exclusions for `.next`, `node_modules`, coverage, generated types, and build output.
- TypeScript/JavaScript analysis compatibility.
- Scanner version and CI runtime.

## Suggested pipeline

Use the repository's current CI provider if present; otherwise add GitHub Actions.

```yaml
steps:
  - checkout
  - setup Node (version from project policy)
  - setup pnpm
  - pnpm install --frozen-lockfile
  - format check
  - lint
  - typecheck
  - test with coverage
  - production build
  - Sonar scan
  - quality gate check
```

Replace placeholder commands with actual package scripts after inspecting `package.json`.

## Secrets

Store Sonar token and host/organization values in repository/environment secrets. Never commit tokens or `.env` files.

## Quality gate policy

- Blocker/Critical: must be fixed.
- Major: fix or document with a specific rationale and owner.
- Security hotspots: review individually.
- Coverage: establish baseline, then enforce coverage on new code.
- Avoid blanket suppressions and broad exclusions.

## Local example

```bash
# Use actual scripts from package.json
pnpm lint
pnpm typecheck
pnpm test -- --coverage
pnpm build
sonar-scanner
```
