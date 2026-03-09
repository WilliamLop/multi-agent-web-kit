# Multi-Agent Web Kit

Shared workflow kit for web delivery across Codex, Claude Code, and `.agents`-based setups.

This repo gives you:

- a reusable `web-delivery-loop` skill
- Claude Code command, agent, memory, and hook templates
- an installer CLI ready to publish and run with `npx`
- a Playwright smoke-test template
- your learning roadmap and weekly review docs

## Quick Start

Local usage before publishing:

```bash
node ./bin/multi-agent-web-kit.js list
node ./bin/multi-agent-web-kit.js install web-delivery-loop --target agents,claude --project /path/to/project
node ./bin/multi-agent-web-kit.js install web-delivery-loop --target codex
```

After publishing to npm:

```bash
npx multi-agent-web-kit list
npx multi-agent-web-kit install web-delivery-loop --target agents,claude --project /path/to/project
npx multi-agent-web-kit install web-delivery-loop --target codex
```

## Repo Layout

- `skills/web-delivery-loop/`: source-of-truth shared skill
- `templates/claude/`: Claude Code command, agent, memory, and hook templates
- `bin/` and `lib/`: installer CLI
- `docs/publish.md`: GitHub and npm publishing checklist
- `roadmap.md`: learning roadmap
- `weekly-review.md`: weekly reflection template

## What The Installer Does

### `.agents` target

Copies the shared skill into:

```text
.agents/skills/web-delivery-loop
```

### `claude` target

Copies and wires:

```text
.claude/skills/web-delivery-loop
.claude/commands/web-delivery.md
.claude/agents/web-delivery-specialist.md
.claude/hooks/*
CLAUDE.web-kit.md
CLAUDE.md import
.claude/settings.local.json hooks
```

### `codex` target

Copies the shared skill into:

```text
~/.codex/skills/web-delivery-loop
```

## Development

```bash
npm test
```

## Learning Docs

This repo also keeps your training material:

- `roadmap.md`
- `weekly-review.md`

Use those to keep your growth structured while the repo itself becomes your reusable distribution kit.
