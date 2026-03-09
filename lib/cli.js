import path from "node:path";

import { DEFAULT_SKILL } from "./catalog.js";
import { installSkill, listSkills } from "./install.js";

export async function runCli(argv) {
  const [command, ...rest] = argv;

  switch (command) {
    case "list":
      printSkills();
      return;
    case "install":
      runInstall(rest);
      return;
    case "help":
    case "--help":
    case "-h":
    case undefined:
      printHelp();
      return;
    default:
      throw new Error(`Unknown command "${command}". Run "multi-agent-web-kit help".`);
  }
}

function runInstall(args) {
  const { positional, flags } = parseArgs(args);
  const skillName = positional[0] ?? DEFAULT_SKILL;
  const projectDir = flags.project ? path.resolve(flags.project) : process.cwd();
  const target = flags.target ?? "all";
  const codexHome = flags["codex-home"]
    ? path.resolve(flags["codex-home"])
    : undefined;

  const installed = installSkill({
    skillName,
    target,
    projectDir,
    codexHome
  });

  console.log(`Installed "${skillName}" to:`);
  for (const item of installed) {
    console.log(`- ${item}`);
  }

  console.log("");
  console.log("Next:");
  console.log("- For Codex, restart Codex if you installed globally.");
  console.log("- For Claude Code, restart the session so hooks and commands reload.");
  console.log("- In the target project, invoke the workflow with your web task and mention the skill by name when useful.");
}

function printSkills() {
  console.log("Available skills:");
  for (const skill of listSkills()) {
    console.log(`- ${skill.name}: ${skill.description}`);
  }
}

function printHelp() {
  console.log("multi-agent-web-kit");
  console.log("");
  console.log("Commands:");
  console.log("  list");
  console.log("  install [skill-name] [--target agents|claude|codex|all] [--project <path>] [--codex-home <path>]");
  console.log("");
  console.log("Examples:");
  console.log("  multi-agent-web-kit list");
  console.log("  multi-agent-web-kit install web-delivery-loop --target agents,claude --project /path/to/project");
  console.log("  multi-agent-web-kit install web-delivery-loop --target codex");
}

function parseArgs(args) {
  const positional = [];
  const flags = {};

  for (let index = 0; index < args.length; index += 1) {
    const token = args[index];
    if (!token.startsWith("--")) {
      positional.push(token);
      continue;
    }

    const name = token.slice(2);
    const next = args[index + 1];
    if (!next || next.startsWith("--")) {
      flags[name] = true;
      continue;
    }

    flags[name] = next;
    index += 1;
  }

  return { positional, flags };
}
