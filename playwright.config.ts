import { defineConfig, devices } from "@playwright/test";

import { PERFORMANCE_DEVICES } from "./playwright/performance/config/devices";

export default defineConfig({
  testDir: "./playwright",

  fullyParallel: true,

  forbidOnly: Boolean(process.env.CI),

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 2 : undefined,

  timeout: 30_000,

  outputDir: "./test-results",

  reporter: [["list"], ["html", { open: "never" }]],

  use: {
    baseURL: "http://localhost:3100",

    trace: "retain-on-failure",

    screenshot: "only-on-failure",

    video: "retain-on-failure",
  },

  projects: [
    // E2E testing
    {
      name: "e2e-chromium",
      testDir: "./playwright/e2e",
      testMatch: "**/*.e2e.spec.ts",

      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "e2e-firefox",
      testDir: "./playwright/e2e",
      testMatch: "**/*.e2e.spec.ts",

      use: {
        ...devices["Desktop Firefox"],
      },
    },
    {
      name: "e2e-webkit",
      testDir: "./playwright/e2e",
      testMatch: "**/*.e2e.spec.ts",

      use: {
        ...devices["Desktop Safari"],
      },
    },
    {
      name: "e2e-mobile",
      testDir: "./playwright/e2e",
      testMatch: "**/*.e2e.spec.ts",

      use: {
        ...devices["Pixel 7"],
      },
    },

    // Performance testing
    ...Object.entries(PERFORMANCE_DEVICES).map(([device, options]) => ({
      name: `performance-${device}`,

      testDir: "./playwright/performance",

      testMatch: "**/*.perf.spec.ts",

      fullyParallel: false,

      workers: 1,

      retries: 0,

      repeatEach: 1,

      timeout: 60_000,

      use: {
        ...options,

        browserName: "chromium" as const,

        serviceWorkers: "block" as const,

        trace: "off" as const,

        screenshot: "off" as const,

        video: "off" as const,
      },
    })),
  ],

  webServer: {
    command: "pnpm build && pnpm start --port 3100",

    url: "http://localhost:3100",

    reuseExistingServer: false,

    timeout: 180_000,
  },
});
