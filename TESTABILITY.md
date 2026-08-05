# Portfolio testability contract

## 1. Testability principles

The portfolio treats testability as part of the interface. Core content and the static hero background have an HTML/CSS baseline; progressive JavaScript only adds compact navigation, theme persistence, and Clipboard API behavior. Important state is exposed through semantic HTML, accessible names, `aria-expanded`, `aria-pressed`, `hidden`, stable section IDs, and a small set of intentional test IDs. Tests collect browser, viewport, theme, JavaScript, console, page-error, request-failure, screenshot-on-failure, and trace evidence.

## 2. Supported browsers

Pull-request gates use Chromium desktop plus one emulated Chromium mobile profile. Firefox desktop, WebKit desktop, and emulated mobile Safari run after pushes to `main` or through manual workflow dispatch. The manual charter retains real iPhone Safari and Android Chrome because emulation cannot prove platform browser behavior.

## 3. Supported viewport categories

| Category | Representative automated size | Layout expectation |
| --- | --- | --- |
| Wide desktop | 1440 × 900 | Three-column content and inline navigation |
| Small desktop | 1024 × 768 | Compact navigation and two-column content where useful |
| Tablet | 768 × 1024 | Compact navigation and single-column project flow |
| Mobile | 390 × 844 | Compact navigation, safe wrapping, and 20 px edge spacing |

Responsive tests assert geometry and overflow; screenshots are supporting evidence, not the only oracle.

## 4. Stable locator strategy

Tests prefer `getByRole()` plus accessible name, then stable visible text, then section IDs. Test IDs are limited to state or contract boundaries that cannot be located as clearly through semantics: `site-header`, `mobile-navigation`, `theme-toggle`, `hero-primary-action`, `resume-link`, `capability-list`, and `building-project-list`.

Future changes should preserve the behavior and accessible meaning, not exact wrapper structure. Avoid selectors based on styling classes, DOM depth, list position, or entire paragraphs. If visible wording changes intentionally, update the accessible-name contract and its test together.

## 5. Interactive component states

| Component | Observable states | Contract |
| --- | --- | --- |
| Compact navigation | Closed/open, desktop/compact | Trigger `aria-expanded`, accessible action name, menu `hidden`, and visible state agree. Resizing to desktop resets stale open state. |
| Theme toggle | Light/dark | Root `data-theme`, toggle `aria-pressed`, accessible action name, theme-color metadata, and stored preference agree. |
| Copy email | Hidden/available/success/failure | The control is exposed only when the modern Clipboard API is available. The email address and mail link remain usable without it. Success and failure feedback is announced politely. |

## 6. Keyboard expectations

- The skip link is the first focusable control and moves focus to `#main-content`.
- Enter and Space operate native buttons and links.
- Escape closes the compact menu and returns focus to its trigger.
- Focus can move from the trigger into the open menu in document order.
- Choosing a menu destination closes the compact menu.
- Every interactive control has a clearly visible focus indicator.

## 7. Accessibility expectations

The target is WCAG 2.2 AA. The page uses one H1, semantic landmarks, labelled sections, logical heading levels, named controls, useful image alternative text, non-color state cues, reduced-motion support, visible focus, and light/dark tokens designed for contrast. Axe runs against desktop and mobile light/dark states and the open mobile menu, failing on serious or critical findings.

Automated scans do not replace keyboard testing, screen-reader review, 200%/400% zoom, contrast review, reading-order review, print review, or human usability evaluation. Passing automation must never be described as proof that the site is fully accessible.

## 8. Deterministic test behavior

The site contains no random rendering or JavaScript-dependent content visibility. A `theme=light` or `theme=dark` query value controls the initial theme for deterministic checks without changing the public default. Playwright requests reduced motion, creates independent browser contexts, avoids arbitrary sleeps, and uses web-first assertions.

## 9. Automated test scope

- Homepage landmarks, one-H1 contract, primary CTA, and résumé links.
- Desktop and compact navigation destinations and keyboard state transitions.
- Theme state, accessible action, focus, and persistence.
- Responsive overflow, clipping, container geometry, navigation mode, and anchor offset.
- No-JavaScript core-content and anchor-navigation fallback.
- Active-project disclosure and prohibited high-visibility claims.
- Duplicate IDs, internal anchors, local asset responses, email, and URL format.
- Canonical, Open Graph, Twitter, JSON-LD, `robots.txt`, and `sitemap.xml` metadata.
- Exact TN wording in both public content sources and absence of outdated wording across repository text files.
- Browser console errors, uncaught page errors, and failed local requests.
- Axe scans across theme, viewport, and open-menu states.
- Desktop/mobile Lighthouse and resource-size budgets.

## 10. Manual test scope

Human review remains required for recruiter comprehension, visual credibility, copy truthfulness, real assistive technology, zoom/reflow, real mobile browsers, slow or interrupted loading, print quality, and degraded asset/script behavior. See `tests/MANUAL-TEST-CHARTER.md`.

## 11. Known limitations

- External destinations are format-checked but not fetched in pull-request gates; third-party availability is unstable.
- Mobile projects are device emulations, not physical-device certification.
- Axe does not assess every WCAG criterion or whether alternative text is contextually ideal.
- The résumé PDF is checked for availability, not audited or altered by this redesign.
- Lighthouse is a local synthetic sample and should be interpreted as a regression signal, not a field-performance guarantee.

## 12. CI quality gates

`.github/workflows/portfolio-quality.yml` runs for pull requests, pushes to `main`, and manual dispatch. Every run installs locked Node dependencies and Chromium, then gates HTML, local assets and content, TypeScript, desktop smoke, desktop/mobile functional behavior, responsive geometry, accessibility, links, and metadata. Non-pull-request runs additionally install Firefox and WebKit, execute the broader browser checks, and enforce Lighthouse budgets. Reports, traces, screenshots-on-failure, and Lighthouse output are uploaded even after a failure. Retries remain disabled so consistent failures are not hidden.

Visual regression configuration was removed because no reviewed baselines existed, so it provided setup without regression protection. Intentional visual review remains in the manual charter and requested multi-viewport review.

The Lighthouse budgets are stored in `lighthouse-budget.json`. The August 3, 2026 desktop and mobile baselines each scored 1.0 for performance, accessibility, best practices, and SEO, with 127,244 transferred bytes and 4,194 script bytes. Category floors remain deliberately below 100 and payload ceilings retain headroom for transfer variance and modest growth; they are regression signals, not claims of perfect real-user performance or accessibility.

## 13. Local commands

```bash
npm ci
npx playwright install chromium firefox webkit
npm run validate:html
npm run validate:assets
npm run typecheck
npm run test:smoke
npm run test:functional
npm run test:responsive
npm run test:a11y
npm run test:links
npm run test:broad
npm run lighthouse:baseline
npm run lighthouse:ci
npm run quality
```

The development tooling requires Node `^22.22.0` or `>=24.8.0`; the CI workflow uses Node 24.

`npm test` runs the regular specifications in Chromium desktop and the representative mobile Chromium project. `npm run test:broad` targets recruiter-path behavior in Firefox desktop, WebKit desktop, and emulated mobile Safari. Human visual review is required for intentional layout changes.

## 14. Requirement-to-test traceability

| Requirement | Risk | Automated test | Manual coverage | CI gate |
| --- | --- | --- | --- | --- |
| NAV-001 | Desktop destinations fail or wrap unpredictably | `navigation.spec.ts` | Recruiter path, zoom | Functional |
| NAV-002 | Escape does not close compact menu | `navigation.spec.ts` | Keyboard usability | Functional |
| NAV-003 | Focus is lost after compact-menu dismissal | `navigation.spec.ts` | Keyboard and screen reader | Functional |
| THEME-001 | Theme state, action, or persistence disagree | `theme.spec.ts` | Light/dark visual review | Functional |
| A11Y-001 | JavaScript failure hides core content | `no-javascript.spec.ts` | Delayed scripts | Functional |
| A11Y-002 | Keyboard users cannot bypass navigation | `navigation.spec.ts` | Keyboard and screen reader | Functional |
| A11Y-003 | High-impact automated accessibility violation | `accessibility.spec.ts` | Full accessibility charter | Accessibility |
| A11Y-004 | Document semantics or names regress | `accessibility.spec.ts` | Reading order and screen reader | Accessibility |
| RESP-001 | Content clips or sits behind navigation | `responsive.spec.ts` | Real devices and zoom | Responsive |
| LINK-001 | Internal destinations or URL contracts break | `navigation.spec.ts`, `links.spec.ts` | External destination spot check | Links |
| ASSET-001 | Required image, CSS, JS, or résumé is missing | `homepage.spec.ts`, `links.spec.ts`, `check-assets.mjs` | Broken-image and résumé checks | Static, smoke, links |
| CONTENT-001 | Recruiter hierarchy loses its single headline | `homepage.spec.ts` | Five-second impression | Smoke |
| CONTENT-002 | Active work is presented as completed | `project-status.spec.ts` | Credibility review | Functional |
| CONTACT-001 | Contact actions become duplicated, hidden, or unusable without clipboard access | `homepage.spec.ts`, `no-javascript.spec.ts`, `responsive.spec.ts` | Recruiter path, keyboard, copy feedback | Functional, responsive |
| SEO-001 | Search/social metadata or crawler discovery points to the wrong profile | `links.spec.ts`, `check-assets.mjs` | Live unfurl and indexability checks | Static, links |

## Contributor change checklist

Keep core content visible before scripts run. Use native elements and accurate accessible names for new interactions. Add stable state attributes before adding a test ID. Keep section IDs unique and update link plus traceability tests when information architecture changes. Test at all four viewport categories, both themes, keyboard-only, and without JavaScript. Do not accept a visual-baseline update until the semantic, functional, responsive, and accessibility assertions also pass.
