# Quality Review

Use this checklist after implementation and before closing the task.

## Functional quality

- Does the feature satisfy the acceptance criteria?
- Did you verify the visible behavior?
- Did you verify at least one non-happy path when relevant?

## Code quality

- Is the code readable?
- Is the logic separated cleanly?
- Is naming clear?
- Is there avoidable duplication?

## Reliability

- What happens on bad input?
- What happens if a dependency fails?
- Is success ever reported falsely?
- Are silent failures possible?

## Testing quality

- Is there enough automated coverage for the change?
- If the UI changed, was Playwright or equivalent UI validation used?
- If a test failed, was the cause classified as entrada, logica, or infraestructura?

## Production thinking

- Would this still be trustworthy under normal user variance?
- What is still fragile?
- What logs, alerts, or monitoring are missing?
- Is this only a prototype, or is it closer to production-ready?
