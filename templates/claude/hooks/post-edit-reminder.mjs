import process from "node:process";

const input = await readJsonFromStdin();
const filePath = input?.tool_input?.file_path ?? "";
const uiExtensions = [".tsx", ".jsx", ".vue", ".svelte", ".html", ".css"];

if (uiExtensions.some((extension) => filePath.endsWith(extension))) {
  console.log(
    "UI file changed. Validate the visible behavior and use Playwright if the change affects browser interactions."
  );
  process.exit(0);
}

console.log("Code changed. Run at least one validation step before closing the task.");
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
