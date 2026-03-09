# Web Delivery Memory

Use the `web-delivery-loop` skill whenever the task is to build, fix, or extend a website or web app.

## Default workflow

1. inspect the project before changing code
2. turn the request into acceptance criteria
3. split work into phases
4. validate visible changes
5. classify failures as `entrada`, `logica`, or `infraestructura`
6. close with verification and remaining risks

## UI rule

If the work changes visible browser behavior, validate it with Playwright or an equivalent browser flow before claiming success.

## Quality rule

Do not stop at "it works." Also review maintainability, error handling, and production risk.
