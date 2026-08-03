# Portfolio Repository Instructions

## Repository Purpose

- This is Sai Vamsi Kolla's professional QA/SDET portfolio.
- The production website is intentionally a lightweight static site built primarily with semantic HTML, CSS, and small progressive JavaScript enhancements.
- Node.js dependencies are development-only quality tooling, not production runtime dependencies.
- Keep every public professional claim technically accurate and supportable.

## Sources of Truth

- Read the relevant repository documentation before changing implementation or content; reference it rather than copying it here.
- `CONTENT.md` defines editorial intent and portfolio claims; `index.html` contains the rendered website content. A content change may require coordinated updates to both.
- `TESTABILITY.md` defines behavioural, accessibility, responsive, and testing contracts.
- `tests/MANUAL-TEST-CHARTER.md` defines areas that require human review.
- `package.json` is the source of truth for available commands.
- Do not invent commands, architecture, test results, project maturity, or professional outcomes.

## Understand Before Editing

- Inspect the relevant implementation, documentation, and tests before editing.
- For non-trivial work, state material assumptions and define observable completion criteria before implementation.
- Distinguish confirmed repository facts from assumptions; do not silently invent requirements.
- If requirements conflict, identify the conflict before implementing.
- For small, obvious changes, avoid unnecessary planning overhead.

## Simplicity First

- Preserve the static HTML/CSS/JavaScript architecture.
- Do not introduce React, Vue, Next.js, Astro, a CSS framework, component system, CMS, or other runtime dependency unless explicitly requested.
- Prefer semantic HTML and native browser behaviour; prefer CSS when it can satisfy the requirement.
- Prefer a small local change over a repository-wide redesign.
- Reuse existing tokens, layout patterns, scripts, fixtures, and helpers.
- Do not introduce speculative abstractions or configuration, or add a dependency when the existing stack is sufficient.
- Avoid premature optimization and unnecessary defensive code.

## Surgical Changes

- Modify only files connected to the requested outcome; every modified file must have a clear reason to change.
- Do not refactor, rename, relocate, reformat, or alter wording in unrelated files.
- Do not update dependencies or lockfiles unless the task requires it.
- Do not update visual snapshots merely to make a failure disappear.
- Report unrelated issues separately instead of fixing them without permission.
- Preserve public links, section IDs, resume paths, and accessible names unless the requested change requires modifying them.

## Content Integrity

- Never invent employment history, metrics, certifications, project results, production adoption, test coverage, maturity, or business impact.
- Do not describe prototypes or active builds as completed production systems, or use passing tests as evidence for a professional claim.
- Preserve distinctions among implemented functionality, planned work, experiments, and active builds.
- When changing public content, check whether `CONTENT.md` and `index.html` must be synchronized.
- Keep technical descriptions understandable to recruiters without exaggeration.
- Do not replace precise evidence with generic marketing language.
- Preserve the established professional positioning unless the task explicitly changes it.

## Accessibility and Progressive Enhancement

- Follow `TESTABILITY.md`; keep primary content available without JavaScript.
- Use semantic HTML and native controls, with logical headings and landmarks.
- Preserve keyboard support, visible focus, accurate accessible names, and ARIA state only where needed.
- Prefer role and accessible-name locators in Playwright; do not add test IDs when semantic locators are sufficient.
- Respect reduced-motion preferences and preserve light- and dark-theme accessibility.
- Do not rely only on color, animation, screenshots, or visual position to communicate meaning.
- Treat automated accessibility scans as evidence, not proof of full accessibility.

## Responsive Design

- Check wide desktop, small desktop, tablet, and mobile behaviour for layout changes.
- Prevent horizontal overflow, clipped text, overlapping navigation, and inaccessible controls.
- Preserve the existing compact-navigation behaviour.
- Do not create separate desktop and mobile content trees unless explicitly required.
- Prefer resilient wrapping and fluid layout over viewport-specific duplication.
- Validate meaningful layout changes with responsive tests, not screenshots alone.

## Testing and Verification

Run verification proportionally and use only commands defined in `package.json`; choose the relevant subset below, but run both broad/high-risk checks.

### Static content or markup changes

```bash
npm run validate:html
npm run validate:assets
npm run test:smoke
npm run test:links
```

### JavaScript behaviour changes

```bash
npm run typecheck
npm run test:functional
npm run test:responsive
npm run test:a11y
```

### CSS or layout changes

```bash
npm run validate:html
npm run test:responsive
npm run test:a11y
npm run lighthouse:baseline
```

### Broad or high-risk changes

```bash
npm run quality
npm run lighthouse:ci
```

- Run the narrowest relevant checks first, then expand verification according to risk.
- Add or update the smallest meaningful tests; test behaviour and accessible meaning rather than exact wrapper structure.
- Use the established deterministic test mode; do not use arbitrary sleeps in Playwright tests.
- Do not weaken assertions to make tests pass or automatically update visual baselines.
- Visual baseline updates require an intentional visual change and manual review.
- Report exact commands executed, including passes, failures, skips, warnings, and checks not run.
- Never claim verification when the relevant command was not run.
- Passing automation does not prove full accessibility, usability, or factual persuasiveness.

## Git Safety

- Check `git status` before editing and preserve existing uncommitted work.
- Never run destructive Git commands without explicit permission.
- Do not commit, push, merge, rebase, force-update, or open a pull request unless explicitly requested.
- Do not modify secrets or environment files, or combine unrelated changes into the current task.

## Definition of Done

A task is complete only when:

- The requested behaviour or content is implemented and the change remains focused.
- Relevant documentation remains synchronized and relevant automated checks were run.
- Accessibility and responsive risks were considered.
- No unsupported public claims were introduced.
- The final response accurately reports what changed and what was verified.
