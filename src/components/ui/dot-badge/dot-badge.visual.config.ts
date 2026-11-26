import { fileURLToPath } from "node:url";

import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  testMatch: "dot-badge.visual.spec.ts",
  snapshotPathTemplate: "{testDir}/__screenshots__/{arg}{ext}",
  outputDir: "../../../../test-results/dot-badge",
  use: {
    baseURL: "http://localhost:6006",
    browserName: "chromium",
    viewport: { width: 500, height: 250 },
    deviceScaleFactor: 1,
  },
  webServer: {
    cwd: fileURLToPath(new URL("../../../../", import.meta.url)),
    command: "pnpm --runtime-on-fail=ignore exec storybook dev --ci --port 6006",
    url: "http://localhost:6006",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
