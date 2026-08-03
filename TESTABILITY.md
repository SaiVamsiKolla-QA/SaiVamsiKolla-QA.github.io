# Portfolio testability contract

## 1. Testability principles

The portfolio treats testability as part of the interface. Core content has a visible HTML baseline; progressive JavaScript only adds menu, theme, reveal, and canvas behavior. Important state is exposed through semantic HTML, accessible names, `aria-expanded`, `aria-pressed`, `hidden`, stable section IDs, and a small set of intentional test IDs. Tests collect browser, viewport, theme, JavaScript, console, page-error, request-failure, screenshot, and trace evidence.

## 2. Supported browsers

Automated projects cover current Playwright Chromium, Firefox, and WebKit desktop engines plus emulated Chromium and WebKit mobile profiles. The manual charter retains real iPhone Safari and Android Chrome because emulation cannot prove platform browser behavior.

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
| Reveal enhancement | Baseline/pending/visible | Content starts visible. JavaScript may mark motion-ready content pending only when motion is permitted and Intersection Observer exists. |
| Hero canvas | Running/paused/disabled | Canvas is decorative, scoped to the hero, paused offscreen or in a hidden tab, and disabled in deterministic test mode. |

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

Use `?testMode=1` for visual and functional automation. Test mode disables decorative canvas rendering and motion, makes reveal content immediately visible, and removes random visual output. A `theme=light` or `theme=dark` query value controls the initial theme without changing the public default. Tests create independent browser contexts, avoid arbitrary sleeps, and use web-first assertions.

## 9. Automated test scope

- Homepage landmarks, one-H1 contract, primary CTA, and résumé links.
- Desktop and compact navigation destinations and keyboard state transitions.
- Theme state, accessible action, focus, and persistence.
- Responsive overflow, clipping, container geometry, navigation mode, and anchor offset.
- No-JavaScript core-content and anchor-navigation fallback.
- Active-project disclosure and prohibited high-visibility claims.
- Duplicate IDs, internal anchors, local asset responses, email, and URL format.
- Browser console errors, uncaught page errors, and failed local requests.
- Axe scans across theme, viewport, and open-menu states.
- Stable-area visual comparisons.
- Desktop/mobile Lighthouse and resource-size budgets.

## 10. Manual test scope

Human review remains required for recruiter comprehension, visual credibility, copy truthfulness, real assistive technology, zoom/reflow, real mobile browsers, slow or interrupted loading, print quality, and degraded asset/script behavior. See `tests/MANUAL-TEST-CHARTER.md`.

## 11. Known limitations

- External destinations are format-checked but not fetched in pull-request gates; third-party availability is unstable.
- Mobile projects are device emulations, not physical-device certification.
- Axe does not assess every WCAG criterion or whether alternative text is contextually ideal.
- The controlled visual specifications are present, but their first reviewed baselines have not been accepted yet. Until they are, visual comparison is an explicit local review step rather than a blocking CI gate.
- The résumé PDF is checked for availability, not audited or altered by this redesign.
- Lighthouse is a local synthetic sample and should be interpreted as a regression signal, not a field-performance guarantee.

## 12. CI quality gates

`.github/workflows/portfolio-quality.yml` runs for pull requests, pushes to `main`, and manual dispatch. It installs locked Node dependencies and the three browser engines, then gates HTML, local assets, TypeScript, smoke, functional, responsive, accessibility, link, and Lighthouse checks. Reports, traces, screenshots, and Lighthouse output are uploaded even after a failure. Retries remain disabled so consistent failures are not hidden.

Visual specifications remain deliberately outside the blocking workflow until the first cross-browser baseline set can be generated and reviewed in an unrestricted browser environment. Enabling the visual gate before baseline approval would make every CI run fail for setup rather than for a visual regression.

The provisional Lighthouse budgets are stored in `lighthouse-budget.json`. Category floors are deliberately below 100. Payload ceilings are informed by the current approximately 130 KB of uncompressed HTML, CSS, JavaScript, and initially loaded image source, with explicit headroom for transfer variance and modest growth. The category floors must be confirmed or revised against the first successful desktop/mobile baseline before they are treated as established regression limits; document the measured result and reason for any change.

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
npm run test:visual
npm run lighthouse:baseline
npm run lighthouse:ci
```

The development tooling requires Node `^22.22.0` or `>=24.8.0`; the CI workflow uses Node 24.

Use `npm run test:visual:update` only in an unrestricted browser environment and only after confirming an intentional visual change. Review the generated baseline images before accepting them, then add `npm run test:visual` to the CI workflow. `npm test` runs the non-visual Playwright specifications across configured projects; visual comparison remains an explicit command until its first baselines are approved.

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
| VISUAL-001 | Stable desktop landmarks drift unexpectedly | `visual.spec.ts` | Visual professionalism | Deferred until baseline approval |
| VISUAL-002 | Open compact-navigation layout regresses | `visual.spec.ts` | Real mobile browsers | Deferred until baseline approval |

## Contributor change checklist

Keep core content visible before scripts run. Use native elements and accurate accessible names for new interactions. Add stable state attributes before adding a test ID. Keep section IDs unique and update link plus traceability tests when information architecture changes. Test at all four viewport categories, both themes, keyboard-only, and without JavaScript. Do not accept a visual-baseline update until the semantic, functional, responsive, and accessibility assertions also pass.
