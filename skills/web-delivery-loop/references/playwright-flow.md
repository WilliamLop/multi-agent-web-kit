# Playwright Flow

Use this loop when visible browser behavior matters.

## Standard loop

1. Start the app locally.
2. Open the target page.
3. Verify the first stable checkpoint.
4. Navigate through the user flow.
5. Verify each major checkpoint.
6. Capture the failure if something breaks.
7. Classify the failure.

## Stable locator preference

Prefer:

- `getByRole`
- `getByLabel`
- `getByPlaceholder`
- `getByText` when the text itself is the behavior

Avoid fragile selectors when a user-facing locator is available.

## Required checkpoints

For a basic website flow, verify:

- landing page opened
- target navigation succeeded
- intended form or control is visible
- action can be performed
- expected result appears

## Failure triage

- `entrada`: user input was incomplete, malformed, or ambiguous
- `logica`: the app behaved incorrectly or handled another error incorrectly
- `infraestructura`: the service, browser, environment, or network failed

## Reporting

Report:

- page or flow tested
- actions performed
- visible result
- failure class if broken
