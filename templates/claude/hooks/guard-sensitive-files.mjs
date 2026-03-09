import process from "node:process";

const input = await readJsonFromStdin();
const filePath = input?.tool_input?.file_path ?? "";

const blockedSnippets = [
  ".env",
  `${pathSeparator()}.git${pathSeparator()}`,
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  `${pathSeparator()}dist${pathSeparator()}`,
  `${pathSeparator()}build${pathSeparator()}`,
  `${pathSeparator()}.next${pathSeparator()}`
];

if (blockedSnippets.some((snippet) => filePath.includes(snippet))) {
  console.error(
    `Blocked edit to a protected or generated path: ${filePath}. Review manually before editing sensitive files.`
  );
  process.exit(2);
}

process.exit(0);

function pathSeparator() {
  return process.platform === "win32" ? "\\" : "/";
}

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
