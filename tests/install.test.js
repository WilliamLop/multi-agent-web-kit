import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

import { installSkill, listSkills } from "../lib/install.js";

test("listSkills exposes the shared skill catalog", () => {
  const skills = listSkills();
  assert.ok(skills.some((skill) => skill.name === "web-delivery-loop"));
});

test("installSkill installs the skill for agents and Claude in a project", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "web-kit-project-"));
  const projectDir = path.join(root, "project");
  fs.mkdirSync(projectDir, { recursive: true });
  fs.writeFileSync(
    path.join(projectDir, "CLAUDE.md"),
    "# Existing Claude Memory\n",
    "utf8"
  );

  const installed = installSkill({
    skillName: "web-delivery-loop",
    target: "agents,claude",
    projectDir,
    codexHome: path.join(root, "codex-home")
  });

  assert.ok(
    installed.includes(path.join(projectDir, ".agents", "skills", "web-delivery-loop"))
  );
  assert.ok(
    fs.existsSync(path.join(projectDir, ".agents", "skills", "web-delivery-loop", "SKILL.md"))
  );
  assert.ok(
    fs.existsSync(path.join(projectDir, ".claude", "skills", "web-delivery-loop", "SKILL.md"))
  );
  assert.ok(
    fs.existsSync(path.join(projectDir, ".claude", "commands", "web-delivery.md"))
  );
  assert.ok(
    fs.existsSync(
      path.join(projectDir, ".claude", "agents", "web-delivery-specialist.md")
    )
  );
  assert.ok(fs.existsSync(path.join(projectDir, ".claude", "hooks", "guard-risky-bash.mjs")));
  assert.ok(fs.existsSync(path.join(projectDir, "CLAUDE.web-kit.md")));

  const claudeMd = fs.readFileSync(path.join(projectDir, "CLAUDE.md"), "utf8");
  assert.match(claudeMd, /@CLAUDE\.web-kit\.md/);

  const settings = JSON.parse(
    fs.readFileSync(path.join(projectDir, ".claude", "settings.local.json"), "utf8")
  );
  assert.equal(settings.webKit.managedBy, "multi-agent-web-kit");
  assert.ok(Array.isArray(settings.hooks.PreToolUse));
  assert.ok(Array.isArray(settings.hooks.PostToolUse));
});

test("installSkill installs the skill to Codex home", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "web-kit-codex-"));
  const codexHome = path.join(root, "codex-home");
  const projectDir = path.join(root, "project");
  fs.mkdirSync(projectDir, { recursive: true });

  installSkill({
    skillName: "web-delivery-loop",
    target: "codex",
    projectDir,
    codexHome
  });

  assert.ok(
    fs.existsSync(path.join(codexHome, "skills", "web-delivery-loop", "SKILL.md"))
  );
});
