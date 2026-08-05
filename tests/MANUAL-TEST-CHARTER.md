# Manual portfolio test charter

Automated checks protect repeatable contracts. These charters cover judgment, real-device behavior, assistive technology, and degraded states that automation cannot establish reliably.

Record the date, browser/device, operating system, theme, viewport or zoom, observations, screenshots where useful, and whether each issue blocks release.

## Recruiter five-second impression

Open the homepage without scrolling. After five seconds, state the name, role, systems tested, supporting evidence, and most obvious next action. Check whether “Sai Vamsi Kolla,” “Senior SDET · AI Quality Engineer,” and the résumé-first action register before a skill inventory. Repeat with a hiring manager unfamiliar with the candidate.

## Visual professionalism

Review at desktop, tablet, and mobile widths. Look for calm hierarchy, consistent blue identity, credible density, intentional alignment, readable line lengths, repeated visual motifs, and section transitions. Flag anything that feels like a template, résumé dump, decoration competing with content, or unfinished component.

## Content credibility

Read the engineering-project cards as a skeptical interviewer. Confirm active status, concise maturity labels, implemented evidence, technologies, and repository destinations. Verify experience statements and metrics against source material. Look for language that implies production readiness, completed outcomes, or results that are not demonstrated.

## Keyboard usability

Starting at the address bar, navigate the complete page with Tab, Shift+Tab, Enter, Space, Escape, and arrow keys where native controls require them. Verify focus order, visibility, skip link, compact-menu entry and dismissal, focus restoration, theme toggle, all CTAs, resume links, and absence of keyboard traps.

## Screen-reader experience

Use VoiceOver with Safari on macOS/iOS and, when available, NVDA with Firefox or Chrome on Windows. Review landmark and heading navigation, section names, link purpose, button state announcements, menu open/close announcements, portrait alternative text, project definitions, technology lists, contact information, and whether visual order matches reading order.

## 200% and 400% zoom

At a 1280 CSS-pixel desktop width, test browser zoom at 200% and 400%. Confirm reflow, no two-dimensional scrolling for ordinary content, readable technical terms, visible focus, usable compact navigation, non-overlapping sticky header, complete project cards, and accessible contact actions.

## Light and dark themes

Review initial system preference, manual switching, persistence after reload, and both themes across every section. Inspect text, focus, borders, status indicators, links, buttons, portrait treatment, selection, and hover states. Use a contrast analyzer for suspicious pairings.

## Real iPhone Safari

Test a current physical iPhone in portrait and landscape. Check viewport scaling, safe areas, sticky header, compact menu, theme persistence, anchor offsets, tap targets, long terminology, scroll performance, resume behavior, mail link, and rotation state reset.

## Real Android Chrome

Test a current physical Android phone in portrait and landscape. Check the same mobile contracts plus font rendering, address-bar resize effects, back navigation after fragment links, download behavior, and whether touch scrolling remains smooth.

## Slow network

Throttle to Slow 3G and disable cache. Observe first content, portrait loading, stylesheet and script arrival, layout movement, local asset failures, and whether content remains understandable before enhancement. Confirm no external service blocks the recruiter path.

## Reduced motion

Enable the operating system’s reduced-motion setting before loading. Verify that core content appears immediately, smooth scrolling and control transitions are suppressed, and state changes remain understandable without motion.

## Print output

Open print preview in light and dark preference. Confirm all professional content prints with readable contrast, sensible breaks, and visible link destinations where useful. Navigation, theme control, portrait decoration, and redundant chrome should be removed.

## Resume download

Activate each resume link with mouse, keyboard, and mobile touch. Confirm the same `files/SaiVamsiKolla_Resume.pdf` asset opens or downloads, is not a 404, has a meaningful filename, and does not strand the user. The PDF’s own content and accessibility require a separate audit.

## Broken-image behavior

Use local developer tools to block `images/profile.jpg`. Confirm the alternative text communicates identity, layout remains stable enough to read, and no decorative broken-image treatment obscures the hero.

## Delayed-script behavior

Block or delay `js/main.js`. Confirm the full name, role, sections, contact details, resume links, and anchor navigation remain available; the fallback navigation is usable; and loss of theme, menu, or copy-email enhancement does not create a blank or misleading page.

## Search and social preview

After deployment, inspect a fresh link unfurl and the public `robots.txt` and `sitemap.xml`. Confirm the name, role, description, social image, image text, canonical URL, and crawler URLs all reference the production portfolio without stale cached content.

## Exit criteria

Close critical keyboard traps, inaccessible core content, deceptive claims, missing recruiter actions, broken local assets, and viewport clipping before release. Log lower-severity visual or wording observations with reproduction context and an owner. Passing these charters improves confidence but is not proof that the site is fully accessible or defect-free.
