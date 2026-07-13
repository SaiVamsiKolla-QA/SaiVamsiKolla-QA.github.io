# Portfolio content

Single source of truth for the site. Every fact here traces to the GitHub
profile README or public repos as of July 2026. Fields marked `TODO(you)`
were not publicly verifiable — fill them in; the site renders them blank
or generic until you do.

## Hero

- Name: Sai Vamsi Kolla
- Title: QA Engineer | SDET | AI Quality
- Tagline: I build the tools that test AI products — automation frameworks,
  API fuzzers, and eval harnesses that catch bad model output before users
  do. 7+ years across AI, commerce, and insurance QA.
- Photo: images/profile.jpg
- GitHub: https://github.com/SaiVamsiKolla-QA
- LinkedIn: https://www.linkedin.com/in/saivamsi-kolla/
- Location: Vancouver, BC, Canada

## About

I'm a Quality Engineer at mimik, where I help ensure the quality of an
on-device AI health application built on a multi-agent architecture. My
work focuses on validating AI agent behavior, model responses, and the
end-to-end ingestion of health data from Apple HealthKit.

I enjoy finding bugs before customers do, but even more, I enjoy building
tools that help teams find them faster. Whether it's creating automation
frameworks, writing API tests, or developing utilities that make testing
easier, I like solving quality problems through engineering.

Before mimik I spent years in insurance and telecom QA, most of it on
Guidewire, where a missed defect meant a wrong claim payout. That's where I
learned to test systems the boring, thorough way before I started
automating them.

I'm currently open to SDET and QA Automation opportunities in Vancouver,
Toronto, Calgary, and Dallas-Fort Worth.

Voice rule: write like an engineer, not a resume. Banned words: passionate,
results-driven, leveraged, dynamic, detail-oriented, proven track record,
cutting-edge, innovative solutions, deliver with confidence.

## Skills (grouped chips — every group coherent, no tool/domain mixing)

- Automation: Playwright (JS/TS), Selenium (Python), Page Object Model, BDD
- API & Contract Testing: Schemathesis (fuzz), pydantic, httpx, Postman
- AI Quality: AI agent validation, model-output validation, RAG evaluation, DeepEval
- CI/CD & Tooling: GitHub Actions, Docker, Jenkins, Allure
- Languages: Python, JavaScript/TypeScript, SQL
- Domains: Healthcare / AI, Insurance (P&C, Guidewire), e-commerce, Telecom

## Experience (newest first)

All experience facts below come from SaiVamsiKolla_Resume.pdf (July 2026),
also committed as files/resume.pdf. Logos: TODO(you), monograms until then.

Format rule: each role renders as 2-3 short achievement bullets, never a
paragraph. Recruiters scan.

### mimik, Vancouver — AI Quality Engineer (March 2026 - Present)
- Sole QA engineer for an on-device AI health application.
- Built Playwright and Schemathesis automation frameworks from scratch.
- Developed QA tooling to validate AI workflows, HealthKit ingestion, and
  API contracts.

### HCLTech, Vancouver — Test Lead, Client: Meta (Aug 2025 - Feb 2026)
- Led QA for AI-powered checkout experiences, validating autonomous agent
  workflows across 10 to 15 merchant integrations.
- Coordinated a team of 20 offshore QA engineers supporting iOS, Android,
  and Shopify commerce journeys.

### Peace Hills General Insurance, Edmonton — Senior QA Analyst (Nov 2022 - Dec 2024)
- Owned end-to-end QA for Guidewire ClaimCenter and cross-suite
  integrations including PolicyCenter, BillingCenter, and customer portals.
- Designed 1,900+ functional test cases and identified 975 defects before UAT.
- Built the team's first Selenium + Python regression suite.

### TELUS, Edmonton — QA Analyst (Sept 2021 - Nov 2022)
- Executed SIT, regression, and A/B validation across 12 Agile releases.
- Reduced critical production defects by 70% through improved functional
  test coverage.
- Optimized more than 575 regression test cases.

### Accenture, India — Software Engineer, QA (Mar 2016 - Aug 2019)
- Delivered QA for three enterprise Guidewire migration programs covering
  UI, API, and SQL validation.
- Supported more than 30 production releases with 100% on-time delivery.
- Received the Above & Beyond Award for QA excellence.

## What I've Tested (dedicated section, cards with public references)

Copy style rule: no em dashes or double dashes anywhere in site copy.

1. mimik agentic-native platform: the agentic AI platform and mimOE runtime
   behind the on-device AI health app I test every day.
   https://www.mimik.com/agentic-native-taxonomy
2. Meta AI shopping and checkout: AI-powered product discovery and one-tap
   checkout, the autonomous shopping flows my team validated.
   https://www.facebook.com/business/news/ai-and-creators-product-discovery
3. Peace Hills on Guidewire Cloud: the Guidewire Cloud implementation I led
   QA on, covered by Canadian Underwriter.
   https://www.insuranceinstitute.ca/en/Insights-And-Publications/CanadianUnderwriterArticles/items/2025/06/24/Peace-Hills-Insurance-Announces-Implementation-of-Guidewire-Cloud-Platform-to-Drive-Innovation-and-

## Education

- Master of Science, Internetworking Technologies, University of Alberta, 2021
- Bachelor of Technology, Information Technology, GITAM University, 2015

## Certifications (own section, interactive card grid)

Each card: emblem icon, level badge, skill tags, and a View Credential
button (placeholder until a credential URL is added; wire real Credly or
issuer URLs into the `.cert-cred` anchors when available).

- ISTQB Advanced Test Automation Engineer (CT-TAE), June 2025
  - Level: Advanced. Tags: Test Automation, API Testing, CI/CD, Framework Design
- Guidewire Certified Associate, Insurance Suite Analyst, 2024
  - Level: Associate. Tags: ClaimCenter, PolicyCenter, BillingCenter, Insurance Suite
- AWS Certified AI Practitioner (Early Adopter), 2024
  - Level: Foundational. Tags: Generative AI, Prompt Engineering, AI Fundamentals, Cloud AI
- ISTQB Certified Tester, Foundation Level (CTFL), 2018
  - Level: Foundation. Tags: Software Testing, Functional Testing, SDLC, Agile

Emblems are custom inline SVGs (trademark-safe, theme-aware, zero
requests). Official logo files can replace them later via images/logos/.

## Projects (public repos only)

Ordered by brand fit (AI/eval tooling first). Each card leads with the
problem it solves, then tech tags, then the GitHub link. Frame honestly, no
"in active development" apology in the copy.

1. qa-agent — Tests an AI whose answers change every run: local RAG answers
   ISTQB questions, a DeepEval gate fails CI when answer quality drops. Runs
   offline, 59 tests. Tags: Python, ChromaDB, DeepEval, RAG.
   https://github.com/SaiVamsiKolla-QA/qa-agent
2. fhir-contract-fuzz — pydantic models pin the FHIR R4 contract, Schemathesis
   fuzzes the live OpenAPI surface; fast PR gate + nightly deep fuzz. Tags:
   PyTest, Schemathesis, pydantic v2, Docker.
   https://github.com/SaiVamsiKolla-QA/fhir-contract-fuzz
3. medusa-checkout-e2e — End-to-end checkout tests against a real Dockerized
   Medusa store; page objects, Playwright auto-wait, Allure on every PR. Tags:
   Playwright, JavaScript, Docker, Allure.
   https://github.com/SaiVamsiKolla-QA/medusa-checkout-e2e

## Footer / contact

- Email: saivamsikolla@gmail.com
- Resume: files/resume.pdf — TODO(you): add the PDF; the button 404s until
  it exists.
