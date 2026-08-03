# Portfolio editorial content specification

This file is the editorial specification for the portfolio. It is not a build-time source of truth and does not generate `index.html`. Any content change must be reflected in both this file and `index.html`.

Last synchronized: August 2026.

## Editorial rules

- Present Sai as a quality engineer who designs systems, understands product risk, promotes testability, and communicates release confidence.
- Primary role: **AI Quality Engineer · Senior SDET**.
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
2. Building → `#building`
3. Experience → `#experience`
4. About → `#about`
5. Contact → `#contact`

Primary header action: Resume → `files/SaiVamsiKolla_Resume.pdf` with download behavior.

Secondary control: persisted light/dark theme toggle.

## Hero

Eyebrow:

> AI Quality Engineer · Senior SDET

Headline:

> I build quality systems for AI-powered products.

Supporting copy:

> I design test systems for AI agents, APIs and web applications using realistic data, behavioral validation and observable failure evidence.

Primary CTA:

> See what I’m building

Secondary CTA:

> View resume

Availability:

> Vancouver, BC, Canada · Eligible to work in the US (TN visa)

Professional profiles:

- GitHub: <https://github.com/SaiVamsiKolla-QA>
- LinkedIn: <https://www.linkedin.com/in/saivamsi-kolla/>

## Evidence strip

- **7+ years:** Quality engineering experience
- **20 engineers:** Coordinated across distributed QA work
- **10 to 15 integrations:** Validated across commerce workflows

No defect counts belong in this strip.

## What I engineer

Section heading:

> Quality systems built around product risk.

Introduction:

> I connect test strategy, automation, data, and diagnostics so teams can understand both what failed and whether the product is ready.

### AI Systems Quality

Plain-language explanation:

> I translate user intent into observable checks for agent obligations, constraints, tool use and failure behavior. I evaluate non-deterministic outputs against clear expectations without forcing every response into one exact assertion.

Evidence areas:

- Intent, obligation and constraint validation
- Tool-use validation and failure behavior
- Behavioral evaluation and output invariants
- Evaluation strategy and observable failure evidence

### API and Microservice Quality

Plain-language explanation:

> I combine contract validation with realistic data, state transitions and failure-path testing so teams can understand how services behave beyond the happy path.

Evidence areas:

- OpenAPI contracts and schema validation
- Fuzz testing and failure-path coverage
- Seeded data and stateful integration scenarios
- Python, pytest and Schemathesis across service boundaries

### UI Automation and Web Quality

Plain-language explanation:

> I build maintainable web automation around real user behavior, accessible semantics and deterministic test data. I use browser, network, console and trace evidence to diagnose failures instead of relying only on screenshots.

Evidence areas:

- Playwright coverage across Chromium, Firefox and WebKit
- Semantic locators and accessibility-first test design
- Reliable fixtures, test data and state control
- Responsive, console, network and trace validation

### Testability and Observability

Plain-language explanation:

> I promote testability as an engineering requirement. I design observable states, deterministic test controls and diagnostic evidence so failures can be reproduced, understood and resolved quickly.

Evidence areas:

- Testability built into component and API design
- Logs, reports and traces connected to test evidence
- Deterministic environments and repeatable test data
- CI quality gates and requirement traceability

## Building now

Supporting copy:

> A selection of quality-engineering systems I am actively designing, implementing, and refining.

All three entries use the status **Active build**.

### qa-agent

- **Type:** AI evaluation
- **Problem:** Small local language models can sound authoritative while producing inconsistent or unsupported testing guidance.
- **What I’m building:** A local RAG mentor with grounded retrieval, citation rules, abstention behavior, and a golden evaluation harness.
- **Current status:** The ingestion/query pipeline, CLI, automated tests, and evaluation scaffolding exist. Published baseline results document that the current small model is not yet reliable for domain Q&A.
- **Next milestone:** Upgrade the local instruct model and re-run the golden suite to compare concept accuracy, citations, and abstention behavior.
- **Technologies:** Python, pytest, ChromaDB, DeepEval
- **Repository:** <https://github.com/SaiVamsiKolla-QA/qa-agent>

### fhir-contract-fuzz

- **Type:** API quality
- **Problem:** FHIR integrations can fail when live API behavior drifts from expected resource shapes or mishandles unusual inputs.
- **What I’m building:** A layered HAPI FHIR R4 test system for smoke, contract, integration, and property-based fuzz validation.
- **Current status:** The Dockerized test target, HTTP adapter, initial pydantic model, capability-statement smoke test, and CI structure are in place. Contract, workflow, and fuzz coverage are still being implemented.
- **Next milestone:** Add response-shape contract tests and deterministic resource fixtures before expanding CRUD workflows and fuzz budgets.
- **Technologies:** pytest, Schemathesis, pydantic, Docker
- **Repository:** <https://github.com/SaiVamsiKolla-QA/fhir-contract-fuzz>

### medusa-checkout-e2e

- **Type:** Web automation
- **Problem:** Checkout spans storefront, backend, data, and third-party boundaries where timing and state make brittle UI tests easy to create.
- **What I’m building:** A Playwright suite against a Dockerized Medusa storefront, with page objects, injected fixtures, readiness polling, and diagnostic reporting.
- **Current status:** The local stack, page-object and fixture structure, global readiness setup, smoke checks, linting, and CI workflow exist. Full checkout journeys are not yet implemented.
- **Next milestone:** Implement seeded cart and checkout journeys with failure diagnostics and keep the PR smoke path fast.
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

> From intent to release confidence.

1. **Understand intent:** Determine what the feature or system is expected to accomplish for the user and product.
2. **Identify risk:** Map behavioral, data, integration, reliability, accessibility, and user-impact risks.
3. **Model realistic data:** Create valid, missing, extreme, contradictory, and stateful data scenarios.
4. **Validate contracts:** Check schemas, service boundaries, dependencies, inputs, outputs, and failure behavior.
5. **Evaluate behavior:** Assert deterministic results and evaluate non-deterministic AI behavior against clear obligations.
6. **Trace failures:** Use logs, reports, traces, browser evidence, and system state to locate the failure point.
7. **Communicate confidence:** Explain coverage, evidence, remaining risk, and whether the product is ready.

## Credentials

### Certifications

- ISTQB Advanced Test Automation Engineer, 2025, Advanced
- AWS Certified AI Practitioner, 2024, Early adopter
- ISTQB Certified Tester, 2018, Foundation level

### Education

- Master of Science, Internetworking Technologies, University of Alberta, 2021
- Bachelor of Technology, Information Technology, GITAM University, 2015

## About

> I focus on quality engineering for AI systems, APIs and web products. My work connects test strategy, automation, testability and failure evidence so teams can make clearer release decisions.

> I moved from India to Canada in 2019 for my master’s degree and worked from dishwasher to front supervisor while studying. That progression strengthened the calm coordination, adaptability, and ownership I bring to technical leadership today.

Working principles:

- Make risk explicit
- Design for testability
- Prefer observable systems
- Communicate with evidence

## Contact call to action

Heading:

> Looking for an engineer who can make complex AI systems testable?

Supporting copy:

> I bring AI systems testing, API automation, reliable UI automation, realistic test data, observability and end-to-end validation to product teams.

Primary action:

- Email: <mailto:saivamsikolla@gmail.com>

Supporting links:

- LinkedIn: <https://www.linkedin.com/in/saivamsi-kolla/>
- GitHub: <https://github.com/SaiVamsiKolla-QA>
- Resume: `files/SaiVamsiKolla_Resume.pdf`

Location and availability:

- **Location:** Vancouver, BC
- **Availability:** Canada and US opportunities

## Footer

- Sai Vamsi Kolla
- AI Quality Engineer · Senior SDET
- “Static, lightweight, and designed for testability.”
- Back-to-top anchor

## Metadata

- Page title: `Sai Vamsi Kolla | AI Quality Engineer · Senior SDET`
- Meta description: `Sai Vamsi Kolla designs test systems for AI agents, APIs, microservices and web applications with a focus on testability, automation and observable failure evidence.`
- Open Graph title: `Sai Vamsi Kolla | AI Quality Engineer · Senior SDET`
- Open Graph description: `Test systems for AI agents, APIs, microservices and web applications, with a focus on testability, automation and observable failure evidence.`
