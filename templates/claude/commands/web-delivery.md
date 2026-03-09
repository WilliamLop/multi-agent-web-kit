---
description: Run the web delivery workflow for a web task with acceptance criteria, phased execution, and UI validation.
---

Use the `web-delivery-loop` skill from `.claude/skills/web-delivery-loop`.

Task:

${ARGUMENTS}

Workflow:

1. Inspect the project first.
2. Convert the task into observable acceptance criteria.
3. Split the work into small phases.
4. Implement carefully.
5. If UI changes are involved, validate the behavior in a real browser.
6. Classify failures as `entrada`, `logica`, or `infraestructura`.
7. End with what changed, what was verified, and what still remains risky.
