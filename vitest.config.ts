import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },

  plugins: [react()],

  test: {
    globals: false,

    clearMocks: true,
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,

    projects: [
      {
        extends: true,

        test: {
          name: "unit",
          environment: "node",

          include: ["src/**/*.unit.test.{ts,tsx}"],

          setupFiles: ["./tests/setup/unit.setup.ts"],
        },
      },
      {
        extends: true,

        test: {
          name: "integration",
          environment: "jsdom",

          include: ["src/**/*.integration.test.{ts,tsx}"],

          setupFiles: ["./tests/setup/integration.setup.ts"],
        },
      },
    ],

    coverage: {
      provider: "v8",

      reporter: ["text", "html", "lcov", "json-summary"],

      reportsDirectory: "./coverage",

      include: ["src/**/*.{ts,tsx}"],

      exclude: [
        "**/*.test.{ts,tsx}",
        "**/*.spec.{ts,tsx}",
        "**/*.stories.{ts,tsx}",
        "**/*.types.ts",
        "**/*.d.ts",
      ],
    },
  },
});
