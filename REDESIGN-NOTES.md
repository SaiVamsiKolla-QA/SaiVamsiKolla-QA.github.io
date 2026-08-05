# Responsive portfolio redesign notes

> Historical implementation record for the August 1–3, 2026 redesign. `CONTENT.md`, `TESTABILITY.md`, and the current implementation supersede details below that reference the former canvas, reveal animation, test mode, or unreviewed visual-regression setup.

## 1. Executive summary

The portfolio has been reorganized from a broad résumé-style presentation into a concise engineering narrative: what Sai Vamsi builds, the quality systems currently in progress, the scope of prior ownership, the method used to create confidence, and a direct contact path. The visual system remains blue, static, and framework-free while adding calmer spacing, stronger typography, clearer surfaces, robust compact navigation, accessible theme behavior, deterministic testing, and CI-verifiable contracts.

## 2. Files changed

- `index.html` — information architecture, content, semantics, metadata, and stable state hooks.
- `css/style.css` — tokenized light/dark design system, responsive layouts, focus, reduced-motion, test-mode, and print rules.
- `js/main.js` — compact navigation, theme, reveal enhancement, accessible state, and persistence.
- `js/background.js` — hero-scoped, bounded, pausable decorative canvas with deterministic test opt-out.
- `CONTENT.md` — maintained editorial source and truthfulness notes.
- `package.json`, lock file, TypeScript and HTML validation configuration — development-only quality tooling.
- `playwright.config.ts`, `tests/e2e/*`, and `tests/helpers/*` — functional, responsive, accessibility, link, no-JavaScript, project-status, and visual tests.
- `scripts/*` and `lighthouse-budget.json` — local-asset and performance checks.
- `TESTABILITY.md` and `tests/MANUAL-TEST-CHARTER.md` — executable contracts and human review scope.
- `.github/workflows/portfolio-quality.yml` — pull-request, main-branch, and manual quality gates.

## 3. Sections removed or merged

Repeated skills, tooling, services, certifications, education, profile, and contact presentations were consolidated. Credentials now combines certifications and education; About combines the concise career arc and working principles; project presentation moved from showcase language to a consistent active-build disclosure. Long historical experience is condensed while recent ownership remains detailed.

## 4. New information architecture

1. Header
2. Hero
3. Capability strip
4. What I engineer
5. Building now
6. Experience and leadership
7. Quality-engineering approach
8. Credentials
9. About
10. Contact CTA
11. Footer

The header exposes only Expertise, Building, Experience, About, Contact, résumé, and theme actions.

## 5. Responsive decisions

Wide screens use three-column capability and project grids. Small desktop moves to two columns and compact navigation before labels can wrap. Tablet and mobile use a single scanning column, safe text wrapping, contained controls, and approximately 20 px mobile edge spacing. The DOM keeps hero copy before the portrait so reading and visual order agree. Sticky-section offsets protect anchored headings.

## 6. Mobile behavior preserved

The existing compact navigation concept, tap-friendly actions, stacked reading flow, and persistent header remain. Changes are limited to the new information architecture, explicit keyboard/ARIA states, desktop-reset behavior, safe wrapping, and the reading-order correction required for accessibility. Primary and secondary hero actions wrap only when space requires it instead of being forced into an arbitrary stack.

## 7. Accessibility improvements

The redesign adds a working skip link, one H1, semantic landmarks, labelled sections, logical headings, native controls, descriptive action names, synchronized ARIA state, keyboard dismissal and focus restoration, visible focus, reduced-motion handling, no-JavaScript content visibility, meaningful portrait alternative text, light/dark tokens, and print rules. Automated axe coverage is included, but manual assistive-technology, zoom, contrast, and reading-order review remains required.

## 8. Testability improvements

Interactive state is observable through `aria-expanded`, `aria-pressed`, `hidden`, `data-theme`, and a limited stable locator surface. `?testMode=1` disables random canvas and motion. Browser tests attach environment and diagnostic data and fail on console errors, uncaught exceptions, failed local requests, missing assets, broken anchors, serious/critical axe findings, responsive overflow, or contract regressions. Tests use web-first assertions without arbitrary waits or retries.

## 9. Project-status wording

All three repositories are labeled “Active build.” Each card distinguishes the problem, what is being built, current implementation evidence, known incompleteness, next milestone, technologies, and repository. `qa-agent` explicitly acknowledges the current small-model limitation; the FHIR and Medusa cards identify coverage that remains to be implemented.

## 10. Claims intentionally excluded

The redesign does not promote the historical 109-defect figure, invent delivery metrics, show fake screenshots, claim production readiness, imply unfinished suites are complete, or describe the site as fully accessible, fully tested, defect-free, or production-ready. The résumé file and its URL are preserved without alteration.

## 11. Validation performed

- Locked dependencies installed under Node 24.14.0 using an isolated local cache; the dependency audit reported zero vulnerabilities.
- HTML validation, local asset/anchor validation, TypeScript checking, JavaScript syntax checks, workflow YAML parsing, and `git diff --check` pass.
- The rendered site was inspected in the in-app browser at 1440 × 900, 1024 × 768, 768 × 1024, and 390 × 844. Those checks found no horizontal overflow, unresolved internal anchors, duplicate IDs, heading-level skips, or elements outside the viewport.
- The compact menu opens with synchronized visible/ARIA state, closes with Escape, and returns focus to its trigger. The theme action changed the root theme and persisted it after reload. The primary CTA reached `#building` below the sticky header.
- The rendered page produced no browser console errors or warnings during the final interaction pass. Test mode hid the decorative canvas and removed randomized visual behavior.
- Command-line Playwright could not launch Chromium, Firefox, or WebKit in this restricted macOS environment. `npm test` discovered 90 non-visual browser/test combinations and all 90 stopped during browser launch. Targeted diagnostics reported the same setup failure for accessibility (6), links (1), mobile (36), and the controlled visual command (4); those targeted counts overlap the full matrix rather than representing additional unique product tests. No site assertion executed in these blocked runs, so they are environment constraints rather than evidence of product failures.
- Chromium fails macOS Mach-port registration with `Permission denied (1100)`; Firefox exits with `SIGABRT`; WebKit exits with an abort trap. Lighthouse likewise could not connect to the Chromium debugging port (`ECONNREFUSED`). No Lighthouse score or reviewed visual-regression baseline is claimed from this environment.

## 12. Remaining issues

- Physical iPhone Safari, Android Chrome, screen-reader, 200%/400% zoom, slow-network, print, broken-image, and delayed-script charters remain human checks.
- External services and repository URLs are format-checked, not used as unstable blocking availability gates.
- The résumé PDF requires a separate content and accessibility audit.
- The first Playwright visual baselines must be generated and reviewed in an unrestricted browser environment. Visual specifications exist, but the visual CI gate is intentionally deferred until those baselines are accepted.
- The complete Playwright matrix and Lighthouse budgets must run in GitHub Actions or another unrestricted environment before merge or release decisions.
- Lighthouse category thresholds are provisional because the sandbox prevented a measured baseline. The byte ceilings were checked against the approximately 130 KB of uncompressed production assets loaded by the homepage, but the score floors need confirmation from the first successful desktop/mobile run.

## 13. Recommendations for a later phase

- Replace status copy only when linked repositories provide verifiable new evidence.
- Add case-study evidence such as diagrams or annotated artifacts only after it exists and can be presented without implying unsupported outcomes.
- Perform a moderated five-second recruiter test and a screen-reader/zoom audit before public release.
- Consider self-hosted, subsetted type assets only if a measured readability or branding need justifies the extra payload and licensing review.
- Add privacy-respecting field performance data only if the site later gains enough traffic to make the sample meaningful.
