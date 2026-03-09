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

Direct usage from GitHub right now:

```bash
npx github:WilliamLop/multi-agent-web-kit list
npx github:WilliamLop/multi-agent-web-kit install
```

Run `install` from the root of the target project. With no extra flags it installs everything:

- `.agents/skills/web-delivery-loop`
- `.claude/skills/web-delivery-loop`
- Claude command, agent, memory, and hooks
- `~/.codex/skills/web-delivery-loop`

After publishing to npm:

```bash
npx multi-agent-web-kit list
npx multi-agent-web-kit install
npx multi-agent-web-kit install web-delivery-loop --target agents,claude --project /path/to/project
npx multi-agent-web-kit install web-delivery-loop --target codex
```

## Publish To npm

The package name `multi-agent-web-kit` is available.

### 1. Log in to npm

Official npm docs: [npm login](https://docs.npmjs.com/cli/v10/commands/npm-login/)

```bash
npm login
```

What happens:

- npm opens a web-based login by default
- after login, credentials are saved in your local `.npmrc`
- if your account uses 2FA, npm may ask for the extra verification step

Useful checks:

```bash
npm whoami
```

If `npm whoami` prints your username, this machine is ready to publish.

### 2. Publish the package

From the repo root:

```bash
npm publish
```

This repo already sets `publishConfig.access` to `public`, so you do not need extra flags for a public package.

### 3. Verify install from npm

```bash
npx multi-agent-web-kit list
```

## Install In A Real Project

From the root of the target project:

```bash
npx github:WilliamLop/multi-agent-web-kit install
```

After npm publish, the cleaner version is:

```bash
npx multi-agent-web-kit install
```

If you want to install only part of the kit:

```bash
npx multi-agent-web-kit install web-delivery-loop --target agents,claude --project /path/to/project
npx multi-agent-web-kit install web-delivery-loop --target codex
```

## Restart After Install

### Codex

If you installed the Codex target globally into `~/.codex/skills`, the safest path is:

1. close the current Codex session
2. reopen Codex, or start a fresh session in the same workspace

This ensures the newly installed skill is loaded.

### Claude Code

If you installed `.claude/skills`, commands, hooks, or agents into a project:

1. stop the current Claude Code session
2. start Claude Code again from that project root

This ensures:

- `.claude/settings.local.json` hooks reload
- `.claude/commands/` commands are available
- `.claude/agents/` agents are available
- `CLAUDE.md` and `CLAUDE.web-kit.md` are read again

## How To Make The Model Use It

Installation makes the workflow available. To get consistent behavior, invoke it explicitly in your task.

Examples:

```text
Use the web-delivery-loop skill to inspect this project, define acceptance criteria, implement the change in phases, and validate the UI with Playwright.
```

For Claude Code, after install you can also use the command:

```text
/web-delivery improve the contact form and validate it with Playwright
```

Best practice:

- mention `web-delivery-loop` by name when the task starts
- say whether the task touches UI, backend, or both
- ask for acceptance criteria and phased execution when the request is ambiguous

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
npm pack --dry-run
```

## Learning Docs

This repo also keeps your training material:

- `roadmap.md`
- `weekly-review.md`

Use those to keep your growth structured while the repo itself becomes your reusable distribution kit.
