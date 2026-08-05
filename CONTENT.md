# Portfolio editorial content specification

This file is the editorial specification for the portfolio. It is not a build-time source of truth and does not generate `index.html`. Any content change must be reflected in both this file and `index.html`.

Last synchronized: August 2026.

## Editorial rules

- Present Sai as a quality engineer who designs systems, understands product risk, promotes testability, and communicates release confidence.
- Primary role: **Senior SDET · AI Quality Engineer**.
- Keep core positioning focused on AI systems, APIs, UI automation, web quality, testability, observability, failure diagnosis, quality architecture, and release confidence.
- Past platform-specific work may appear only as limited historical context when necessary. Do not present it as a specialization or career direction.
- Do not position Sai around a single insurance platform.
- Do not promote defect counts as proof of seniority.
- Describe personal repositories as active builds, prototypes, architecture-stage work, or early explorations.
- Do not invent project outcomes, test results, coverage, maturity, production usage, screenshots, or business impact.
- Use tools as evidence of engineering decisions, not as repeated inventories.
- Preserve the resume path and download behavior: `files/SaiVamsiKolla_Resume.pdf`.
- Keep one responsive semantic HTML document for every viewport.

## Header

Navigation:

1. Expertise → `#expertise`
2. Projects → `#building`
3. Experience → `#experience`
4. About → `#about`
5. Contact → `#contact`

Primary header action: View resume → `files/SaiVamsiKolla_Resume.pdf` in a new tab.

Secondary control: persisted light/dark theme toggle.

## Hero

Role:

> Senior SDET · AI Quality Engineer

Name and H1:

> Sai Vamsi Kolla

Positioning:

> Quality engineering for AI agents, APIs, microservices, and web automation.

Supporting copy:

> I validate behavioral obligations and tool use, model realistic data and failure paths, design for testability and observability, and diagnose failures with browser, network, console, trace, and logging evidence.

Primary CTA:

> View resume

Secondary CTA:

> View engineering projects

Availability:

> Vancouver, BC, Canada · Canadian citizen · Eligible to apply for TN status for qualifying U.S. roles

Professional links:

- GitHub: <https://github.com/SaiVamsiKolla-QA>
- LinkedIn: <https://www.linkedin.com/in/saivamsi-kolla/>
- Email Sai → `#contact`

## Evidence strip

- **7+ years:** Quality engineering experience
- **20 QA engineers:** Coordinated across distributed work
- **10–15 integrations:** Validated across commerce workflows
- **AI product quality:** Current end-to-end engineering ownership

No defect counts belong in this strip.

## Engineering focus

Section heading:

> Three connected quality disciplines.

Introduction:

> Tools support the engineering story: understand behavior, test realistic system boundaries, and make failures explainable.

### AI Systems and Behavioral Quality

Plain-language explanation:

> I turn user intent into observable checks for agent obligations, constraints, tool use, output quality, and failure behavior.

Evidence areas:

- Intent, obligation, and tool-use validation
- Output invariants and failure behavior
- Evaluation of non-deterministic systems
- Evidence that explains why behavior failed

### API, Microservices, and Realistic Data

Plain-language explanation:

> I test service boundaries beyond the happy path with explicit contracts, realistic system state, and deliberately difficult data.

Evidence areas:

- OpenAPI contracts and schema validation
- Contract, integration, and fuzz testing
- Seeded data and stateful workflows
- Missing, extreme, contradictory, and invalid data

### UI Automation, Testability, and Observability

Plain-language explanation:

> I build Playwright automation around accessible semantics, reliable fixtures, and diagnostic evidence instead of brittle selectors and screenshots alone.

Evidence areas:

- Semantic locators and reliable fixtures
- Browser, network, console, trace, and logging evidence
- Accessibility and responsive validation
- Systems designed for testability

## Engineering projects

Section heading:

> Evidence you can inspect.

Supporting copy:

> Three active builds that demonstrate AI evaluation, API quality, and reliable browser automation.

All three entries use the status **Active build** plus a concise maturity label.

### qa-agent

- **Maturity:** Evaluation baseline implemented
- **Problem:** Small local language models can sound authoritative while producing inconsistent or unsupported testing guidance.
- **Implemented:** A local RAG mentor with document ingestion, CLI queries, grounded retrieval, citation and abstention rules, automated tests, and a golden evaluation harness. Current work improves model quality and evaluation reliability.
- **Technologies:** Python, pytest, ChromaDB, DeepEval
- **Repository:** <https://github.com/SaiVamsiKolla-QA/qa-agent>

### fhir-contract-fuzz

- **Maturity:** Test architecture implemented
- **Problem:** FHIR integrations can fail when live API behavior drifts from expected resource shapes or mishandles unusual inputs.
- **Implemented:** A Dockerized HAPI FHIR target, HTTP adapter, initial Pydantic contract model, capability-statement smoke test, and CI structure. Contract, workflow, and fuzz coverage is expanding from this working foundation.
- **Technologies:** pytest, Schemathesis, pydantic, Docker
- **Repository:** <https://github.com/SaiVamsiKolla-QA/fhir-contract-fuzz>

### medusa-checkout-e2e

- **Maturity:** CI foundation implemented
- **Problem:** Checkout spans storefront, backend, data, and third-party boundaries where timing and state make brittle UI tests easy to create.
- **Implemented:** A Dockerized Medusa stack with page objects, injected fixtures, readiness polling, smoke checks, linting, Allure reporting, and CI. Seeded cart and checkout coverage is expanding from this foundation.
- **Technologies:** Playwright, JavaScript, Docker, Allure
- **Repository:** <https://github.com/SaiVamsiKolla-QA/medusa-checkout-e2e>

## Experience and leadership

### Quality Engineer · mimik

**Vancouver · 2026–present**

Own quality engineering for a multi-agent AI product across agent behavior, APIs, microservices, data flows and end-to-end product risk.

- Defined the test strategy and quality process for a new AI product area.
- Built an automation foundation using Schemathesis, pytest and behavioral evaluation.
- Designed checks around contracts, structured outputs, obligations, invariants and cross-service failure evidence.
- Improved testability through logging, reporting, tracing and deterministic test data.

### Test Lead · HCLTech, client Meta

**Vancouver · 2025–2026**

Led functional quality work for AI-assisted commerce workflows across 10–15 merchant integrations on iOS, Android, and Shopify.

- Coordinated the work of 20 offshore QA engineers.
- Aligned product, engineering, and QA around integration risk and release readiness.
- Supported quality decisions across multiple merchant and platform boundaries.

### Senior QA Analyst · Peace Hills General Insurance

**Edmonton · 2022–2024**

Owned end-to-end validation for enterprise claims, policy, billing and customer-portal integrations.

- Built the team’s first Selenium and Python regression-automation framework.
- Connected business rules, integration behavior, and release risk across a high-consequence claims workflow.
- Worked across functional, API, database, and system-integration testing.

### Earlier experience

- **QA Analyst · TELUS · 2021–2022:** System integration, regression, and A/B validation across 12 Agile releases.
- **Software Engineer, QA · Accenture · 2016–2019:** Enterprise insurance implementations, UI/API/database validation and support for 30+ releases.

## Quality-engineering approach

Section heading:

> Four steps from intent to confidence.

1. **Understand intent and product risk:** Clarify what the system must accomplish and where behavior, data, integration, accessibility, or reliability can fail.
2. **Model realistic data and failure paths:** Create valid, missing, extreme, contradictory, invalid, and stateful scenarios.
3. **Validate contracts and behavior:** Check service boundaries and deterministic results, then evaluate AI behavior against clear obligations.
4. **Diagnose failures and communicate confidence:** Connect logs, traces, browser evidence, and system state to explain failures, coverage, and remaining risk.

## Credentials

### Certifications

- ISTQB Advanced Test Automation Engineer, 2025, Advanced
- AWS Certified AI Practitioner, 2024, Early adopter
- ISTQB Certified Tester, 2018, Foundation level

### Education

- Master of Science, Internetworking Technologies, University of Alberta, 2021
- Bachelor of Technology, Information Technology, GITAM University, 2015

## About

> I moved from India to Canada in 2019 for my master’s degree and progressed from dishwasher to front supervisor while studying.

> That experience reinforced the adaptability, ownership, calm coordination, and persistence I now bring to quality engineering and technical leadership.

## Contact call to action

Heading:

> Need complex systems to be testable and explainable?

Supporting copy:

> I bring AI behavioral testing, API and browser automation, realistic test data, observability, and failure diagnosis to product teams.

Primary action:

- Email Sai: <mailto:saivamsikolla@gmail.com>

Supporting links:

- LinkedIn: <https://www.linkedin.com/in/saivamsi-kolla/>
- GitHub: <https://github.com/SaiVamsiKolla-QA>
- Resume: `files/SaiVamsiKolla_Resume.pdf`

Location and availability:

- **Location:** Vancouver, BC
- **Availability:** Canada and US opportunities

## Footer

- Sai Vamsi Kolla
- Senior SDET · AI Quality Engineer
- “Static, lightweight, and designed for testability.”
- Back-to-top anchor

## Metadata

- Page title: `Sai Vamsi Kolla | Senior SDET · AI Quality Engineer`
- Meta description: `Sai Vamsi Kolla is a Senior SDET and AI Quality Engineer who tests AI-agent behavior, APIs, microservices, and web applications through realistic data, automation, testability, and failure diagnosis.`
- Canonical URL: `https://saivamsikolla-qa.github.io/`
- Open Graph title: `Sai Vamsi Kolla | Senior SDET · AI Quality Engineer`
- Open Graph description: `Quality engineering for AI-agent behavior, APIs, microservices, and web automation, backed by realistic data and observable failure evidence.`
- Open Graph and Twitter image: `images/social-preview.jpg`
- Twitter card: `summary_large_image`
- JSON-LD: Person profile using only the public name, role, portfolio URL, portrait, email, location, GitHub, and LinkedIn details above.
