import process from "node:process";

const input = await readJsonFromStdin();
const command = input?.tool_input?.command ?? "";

const blockedPatterns = [
  /rm\s+-rf\s+/,
  /git\s+reset\s+--hard/,
  /git\s+checkout\s+--/,
  /git\s+clean\s+-fd/,
  /sudo\s+rm\s+/
];

if (blockedPatterns.some((pattern) => pattern.test(command))) {
  console.error(
    "Blocked risky command. Review the command manually and ask for explicit confirmation before running destructive operations."
  );
  process.exit(2);
}

process.exit(0);

async function readJsonFromStdin() {
  let data = "";
  for await (const chunk of process.stdin) {
    data += chunk;
  }

  if (!data.trim()) {
    return {};
  }

  try {
    return JSON.parse(data);
  } catch {
    return {};
  }
}
