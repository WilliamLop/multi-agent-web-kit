import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { SKILL_CATALOG } from "./catalog.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const SKILLS_ROOT = path.join(REPO_ROOT, "skills");
const CLAUDE_ROOT = path.join(REPO_ROOT, "templates", "claude");

const SENSITIVE_PATH_SNIPPETS = [
  ".env",
  ".git/",
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock"
];

export function listSkills() {
  return Object.entries(SKILL_CATALOG).map(([name, metadata]) => ({
    name,
    description: metadata.description
  }));
}

export function installSkill({
  skillName,
  target = "all",
  projectDir = process.cwd(),
  codexHome = path.join(os.homedir(), ".codex")
}) {
  if (!SKILL_CATALOG[skillName]) {
    throw new Error(`Unknown skill "${skillName}". Run "multi-agent-web-kit list".`);
  }

  const sourceSkillDir = path.join(SKILLS_ROOT, skillName);
  if (!fs.existsSync(sourceSkillDir)) {
    throw new Error(`Skill source not found: ${sourceSkillDir}`);
  }

  const normalizedTargets = normalizeTargets(target);
  const installed = [];

  if (normalizedTargets.has("agents")) {
    const destination = path.join(projectDir, ".agents", "skills", skillName);
    copyDirectory(sourceSkillDir, destination);
    installed.push(destination);
  }

  if (normalizedTargets.has("claude")) {
    const destination = path.join(projectDir, ".claude", "skills", skillName);
    copyDirectory(sourceSkillDir, destination);
    installed.push(destination);

    const commandTemplate = path.join(CLAUDE_ROOT, "commands", "web-delivery.md");
    const agentTemplate = path.join(
      CLAUDE_ROOT,
      "agents",
      "web-delivery-specialist.md"
    );
    const hooksSource = path.join(CLAUDE_ROOT, "hooks");
    const memoryTemplate = path.join(CLAUDE_ROOT, "CLAUDE.web-kit.md");

    copyFile(commandTemplate, path.join(projectDir, ".claude", "commands", "web-delivery.md"));
    copyFile(
      agentTemplate,
      path.join(projectDir, ".claude", "agents", "web-delivery-specialist.md")
    );
    copyDirectory(hooksSource, path.join(projectDir, ".claude", "hooks"));
    copyFile(memoryTemplate, path.join(projectDir, "CLAUDE.web-kit.md"));
    ensureClaudeImport(projectDir);
    mergeClaudeSettings(projectDir);

    installed.push(path.join(projectDir, ".claude", "commands", "web-delivery.md"));
    installed.push(
      path.join(projectDir, ".claude", "agents", "web-delivery-specialist.md")
    );
    installed.push(path.join(projectDir, ".claude", "hooks"));
    installed.push(path.join(projectDir, "CLAUDE.web-kit.md"));
    installed.push(path.join(projectDir, ".claude", "settings.local.json"));
  }

  if (normalizedTargets.has("codex")) {
    const destination = path.join(codexHome, "skills", skillName);
    copyDirectory(sourceSkillDir, destination);
    installed.push(destination);
  }

  return installed;
}

export function normalizeTargets(target) {
  const normalized = new Set();
  const items = String(target)
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  for (const item of items) {
    if (item === "all") {
      normalized.add("agents");
      normalized.add("claude");
      normalized.add("codex");
      continue;
    }

    if (!["agents", "claude", "codex"].includes(item)) {
      throw new Error(
        `Unsupported target "${item}". Use agents, claude, codex, or all.`
      );
    }
    normalized.add(item);
  }

  if (normalized.size === 0) {
    normalized.add("all");
    return normalizeTargets("all");
  }

  return normalized;
}

function copyDirectory(source, destination) {
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.rmSync(destination, { recursive: true, force: true });
  fs.cpSync(source, destination, { recursive: true });
}

function copyFile(source, destination) {
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}

function ensureClaudeImport(projectDir) {
  const claudeMdPath = path.join(projectDir, "CLAUDE.md");
  const importLine = "@CLAUDE.web-kit.md";

  if (!fs.existsSync(claudeMdPath)) {
    fs.writeFileSync(claudeMdPath, `${importLine}\n`, "utf8");
    return;
  }

  const current = fs.readFileSync(claudeMdPath, "utf8");
  if (!current.includes(importLine)) {
    const next = current.trimEnd().length > 0 ? `${current.trimEnd()}\n\n${importLine}\n` : `${importLine}\n`;
    fs.writeFileSync(claudeMdPath, next, "utf8");
  }
}

function mergeClaudeSettings(projectDir) {
  const settingsPath = path.join(projectDir, ".claude", "settings.local.json");
  const existing = fs.existsSync(settingsPath)
    ? JSON.parse(fs.readFileSync(settingsPath, "utf8"))
    : {};

  const hooks = existing.hooks ?? {};
  hooks.PreToolUse = mergeHookEntries(hooks.PreToolUse, [
    {
      matcher: "Bash",
      hooks: [
        {
          type: "command",
          command: "node .claude/hooks/guard-risky-bash.mjs"
        }
      ]
    },
    {
      matcher: "Edit|MultiEdit|Write",
      hooks: [
        {
          type: "command",
          command: "node .claude/hooks/guard-sensitive-files.mjs"
        }
      ]
    }
  ]);
  hooks.PostToolUse = mergeHookEntries(hooks.PostToolUse, [
    {
      matcher: "Edit|MultiEdit|Write",
      hooks: [
        {
          type: "command",
          command: "node .claude/hooks/post-edit-reminder.mjs"
        }
      ]
    }
  ]);

  existing.hooks = hooks;

  if (!existing.webKit) {
    existing.webKit = {
      managedBy: "multi-agent-web-kit",
      version: "0.1.0",
      protectedPaths: SENSITIVE_PATH_SNIPPETS
    };
  }

  fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
  fs.writeFileSync(settingsPath, `${JSON.stringify(existing, null, 2)}\n`, "utf8");
}

function mergeHookEntries(existingEntries = [], desiredEntries = []) {
  const merged = [...existingEntries];

  for (const desired of desiredEntries) {
    const existing = merged.find((entry) => entry.matcher === desired.matcher);
    if (!existing) {
      merged.push(desired);
      continue;
    }

    const hookCommands = new Set(
      (existing.hooks ?? []).map((hook) => `${hook.type}:${hook.command}`)
    );
    for (const hook of desired.hooks) {
      const key = `${hook.type}:${hook.command}`;
      if (!hookCommands.has(key)) {
        existing.hooks = existing.hooks ?? [];
        existing.hooks.push(hook);
        hookCommands.add(key);
      }
    }
  }

  return merged;
}
