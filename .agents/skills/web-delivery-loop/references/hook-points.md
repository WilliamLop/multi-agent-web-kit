# Hook Points

Use these hook ideas to enforce the workflow without relying on memory.

## Pre-implementation hook

Run before code edits:

- confirm the objective is explicit
- confirm acceptance criteria exist
- confirm scope boundaries are known

If any are missing, stop and ask for clarification or derive them from repo context.

## Post-edit hook

Run after code changes:

- summarize what changed
- require at least one validation step
- if UI changed, require browser validation or a reason why not

## Pre-risky-command hook

Run before destructive or privileged commands:

- detect danger level
- ask for confirmation when needed
- prevent accidental resets or unrelated reversions

## Post-test hook

Run after failed validation:

- capture the failing step
- classify as entrada, logica, or infraestructura
- propose the smallest next action

## Final-close hook

Run before marking work complete:

- confirm acceptance criteria status
- list what was verified
- list remaining risks
