# Portfolio editorial content specification

This file is the editorial specification for the portfolio. It is not a build-time source of truth and does not generate `index.html`. Any content change must be reflected in both this file and `index.html`.

Last synchronized: August 2026.

## Editorial rules

- Present Sai as a quality engineer who designs systems, understands product risk, promotes testability, and communicates release confidence.
- Primary role: **AI Quality Engineer · Senior SDET**.
- Do not promote defect counts as proof of seniority.
- Describe personal repositories as active builds, prototypes, architecture-stage work, or early explorations.
- Do not invent project outcomes, test results, coverage, maturity, production usage, screenshots, or business impact.
- Use tools as evidence of engineering decisions, not as repeated inventories.
- Preserve the résumé path and download behavior: `files/resume.pdf`.
- Keep one responsive semantic HTML document for every viewport.

## Header

Navigation:

1. Expertise → `#expertise`
2. Building → `#building`
3. Experience → `#experience`
4. About → `#about`
5. Contact → `#contact`

Primary header action: Resume → `files/resume.pdf` with download behavior.

Secondary control: persisted light/dark theme toggle.

## Hero

Eyebrow:

> AI Quality Engineer · Senior SDET

Headline:

> I build quality systems for AI-powered products.

Supporting copy:

> I design automation, API validation, realistic test-data, observability, and behavioral evaluation systems for AI agents, microservices, mobile applications, and high-risk data workflows.

Primary CTA:

> See what I’m building

Secondary CTA:

> View résumé

Availability:

> Vancouver, BC, Canada · Eligible to work in the US (TN visa)

Professional profiles:

- GitHub: <https://github.com/SaiVamsiKolla-QA>
- LinkedIn: <https://www.linkedin.com/in/saivamsi-kolla/>

## Capability strip

- **7+ years** — in quality engineering
- **AI systems** — and agent testing
- **API automation** — for microservices
- **Mobile validation** — for health-data flows

No defect counts belong in this strip.

## What I engineer

Section heading:

> Quality systems built around product risk.

Introduction:

> I connect test strategy, automation, data, and diagnostics so teams can understand both what failed and whether the product is ready.

### AI Systems Quality

Plain-language explanation:

> I translate user intent into observable checks for agent obligations, constraints, tool use, and failure behavior—then evaluate non-deterministic output without pretending every answer has one exact assertion.

Evidence areas:

- Intent, obligation, and constraint validation
- Behavioral evaluation and output invariants
- Failure analysis using logs, reports, and traces
- Evaluation strategy for agentic workflows

### API and Microservice Quality

Plain-language explanation:

> I combine schemas with realistic state and failure paths, using contracts as a starting point rather than the whole test strategy.

Evidence areas:

- OpenAPI contract and integration validation
- Fuzz, seeded-data, and failure-path testing
- Python, pytest, Schemathesis, and Playwright APIs
- Service-boundary diagnostics and reporting

### Mobile and Health-Data Quality

Plain-language explanation:

> I validate data as it moves from devices and operating-system services through mobile workflows and backend systems.

Evidence areas:

- HealthKit ingestion and BLE-connected workflows
- Background, foreground, and synchronization states
- Data-integrity and end-to-end health flows
- Cross-layer logging, traceability, and diagnosis

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

Own quality engineering for a multi-agent, on-device AI health application across agent behavior, backend services, HealthKit and BLE-connected data flows, and mobile workflows.

- Defined the test strategy and quality process for a new product area.
- Built the first automation foundation with Schemathesis, pytest, and behavioral evaluation.
- Designed checks around contracts, structured outputs, obligations, invariants, and cross-layer failure evidence.

### Test Lead · HCLTech, client Meta

**Vancouver · 2025–2026**

Led functional quality work for AI-assisted commerce workflows across 10–15 merchant integrations on iOS, Android, and Shopify.

- Coordinated the work of 20 offshore QA engineers.
- Aligned product, engineering, and QA around integration risk and release readiness.
- Supported quality decisions across multiple merchant and platform boundaries.

### Senior QA Analyst · Peace Hills General Insurance

**Edmonton · 2022–2024**

Owned end-to-end validation for Guidewire ClaimCenter and its PolicyCenter, BillingCenter, and customer-portal integrations.

- Built the team’s first Selenium and Python regression-automation framework.
- Connected business rules, integration behavior, and release risk across a high-consequence claims workflow.
- Worked across functional, API, database, and system-integration testing.

### Earlier experience

- **QA Analyst · TELUS · 2021–2022:** System integration, regression, and A/B validation across 12 Agile releases.
- **Software Engineer, QA · Accenture · 2016–2019:** Enterprise Guidewire implementations, UI/API/database validation, and support for 30+ releases.

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

- ISTQB Advanced Test Automation Engineer — 2025, Advanced
- AWS Certified AI Practitioner — 2024, Early adopter
- Guidewire Certified Associate — 2024, InsuranceSuite Analyst
- ISTQB Certified Tester — 2018, Foundation level

### Education

- Master of Science, Internetworking Technologies — University of Alberta, 2021
- Bachelor of Technology, Information Technology — GITAM University, 2015

## About

> I started in enterprise insurance QA, moved through telecom and AI-assisted commerce, and now own quality engineering for an on-device AI health product. Across those domains, the constant has been learning the system deeply enough to make risk visible and automation maintainable.

> I moved from India to Canada in 2019 for my master’s degree and worked from dishwasher to front supervisor while studying. That progression strengthened the calm coordination, adaptability, and ownership I bring to technical leadership today.

Working principles:

- Make risk explicit
- Design for testability
- Prefer observable systems
- Communicate with evidence

## Contact call to action

Heading:

> Building an AI product that needs stronger quality engineering?

Supporting copy:

> I can help design AI-quality strategy, API automation, end-to-end validation systems, test-data approaches, and senior test-engineering workflows.

Primary action:

- Email: <mailto:saivamsikolla@gmail.com>

Supporting links:

- LinkedIn: <https://www.linkedin.com/in/saivamsi-kolla/>
- GitHub: <https://github.com/SaiVamsiKolla-QA>
- Résumé: `files/resume.pdf`

Location line:

> Vancouver, BC · Canada and US opportunities

## Footer

- Sai Vamsi Kolla
- AI Quality Engineer · Senior SDET
- “Static, lightweight, and designed for testability.”
- Back-to-top anchor
