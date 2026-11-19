import { readFile, readdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";

import { __unstable__loadDesignSystem } from "tailwindcss";

const require = createRequire(import.meta.url);
const excludedDirectories = new Set([
  ".git",
  ".next",
  ".yarn",
  "node_modules",
  "coverage",
  "dist",
  "build",
  "out",
  "storybook-static",
  "playwright-report",
  "test-results",
]);
const designSystem = await __unstable__loadDesignSystem('@import "tailwindcss" prefix(tw);', {
  loadStylesheet: async (id) => ({
    content: await readFile(
      require.resolve(id === "tailwindcss" ? "tailwindcss/index.css" : id),
      "utf8",
    ),
    base: process.cwd(),
  }),
});

async function check(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const results = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        return excludedDirectories.has(entry.name) ? 0 : check(path);
      }
      if (!entry.isFile() || !entry.name.endsWith(".module.css")) return 0;
      let failures = 0;
      const source = await readFile(path, "utf8");
      for (const match of source.matchAll(/@apply\s+([^;]+);/g)) {
        for (const candidate of match[1].split(/\s+/)) {
          const [canonical] = designSystem.canonicalizeCandidates([candidate]);
          if (canonical && canonical !== candidate) {
            process.stderr.write(`${path}: ${candidate} → ${canonical}\n`);
            failures++;
          }
        }
      }
      return failures;
    }),
  );
  return results.reduce((sum, count) => sum + count, 0);
}

if (await check(".")) process.exitCode = 1;
