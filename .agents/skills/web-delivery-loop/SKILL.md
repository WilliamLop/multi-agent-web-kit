---
name: web-delivery-loop
description: Use when building, fixing, or extending a website or web app and you want a disciplined workflow: inspect the project, define acceptance criteria, plan phased work, implement carefully, validate with Playwright when UI is involved, and report risks clearly.
---

# Web Delivery Loop

Use this skill for website and web app work where speed is important but quality gates must stay intact.

Announce at start: "I'm using the web-delivery-loop skill."

## Core outcome

Turn vague website work into a repeatable delivery loop:

1. inspect the project
2. clarify the goal and constraints
3. write acceptance criteria
4. split work into phases
5. implement with checkpoints
6. validate with tests and Playwright when applicable
7. classify failures clearly
8. report what changed, what was verified, and what remains risky

## Required workflow

### 1. Project intake

Before changing code:

- identify framework, package manager, and main entrypoints
- identify if the task touches UI, backend, or both
- identify how the app is started locally
- identify current constraints from the repo and user

If the task is still vague after inspection, ask only the smallest set of questions needed.

For intake prompts and evaluation questions, read `references/intake-questions.md`.

### 2. Acceptance criteria

Convert the request into observable behavior before implementation.

- write a small set of `Dado / Cuando / Entonces` criteria
- include at least one success case
- include invalid input or edge behavior when relevant
- include dependency failure behavior when relevant

For examples and a writing pattern, read `references/acceptance-criteria.md`.

### 3. Delivery phases

Break the work into small phases. Default order:

1. baseline inspection
2. behavior change
3. validation
4. cleanup and reporting

Do not batch unrelated UI, data, and infrastructure changes into one step unless the task requires it.

### 4. Quality review

Do not stop at "it works." Review for:

- clarity
- maintainability
- error handling
- consistency
- test coverage
- production risk

Use `references/quality-review.md` for the review checklist.

### 5. UI validation with Playwright

Use Playwright when the work changes visible user behavior such as:

- navigation
- forms
- filters
- dashboards
- modals
- auth flows

Preferred validation loop:

1. open the app
2. navigate the main flow
3. verify checkpoints
4. capture visible failures
5. classify the failure source

Use `references/playwright-flow.md` for the standard loop.

### 6. Failure classification

When something fails, classify it as:

- `entrada`: bad or incomplete input
- `logica`: incorrect app behavior or incorrect handling of another failure
- `infraestructura`: environment, service, network, browser, or config problem

Do not hide an app logic problem behind an external failure if the app handled it badly.

### 7. Final report

Always close with:

- what changed
- what was verified
- what still remains risky

## Guardrails

- do not implement before acceptance criteria are clear
- do not assume a UI change is correct without validation
- do not treat a happy path as proof of reliability
- do not ship silent failures
- prefer accessible locators in Playwright over fragile CSS selectors
- if UI is involved, verify visible behavior, not only internal code

## References

- Intake and discovery questions: `references/intake-questions.md`
- Acceptance criteria patterns: `references/acceptance-criteria.md`
- Quality and production review: `references/quality-review.md`
- Playwright validation loop: `references/playwright-flow.md`
- Hook recommendations: `references/hook-points.md`
- Generic Playwright smoke template: `assets/playwright-smoke.spec.ts`
