import { beforeAll, afterEach } from "vitest";

beforeAll(async () => {
  if (typeof document !== "undefined") {
    await import("@testing-library/jest-dom/vitest");
  }
});

afterEach(async () => {
  if (typeof document !== "undefined") {
    const { cleanup } = await import("@testing-library/react");

    cleanup();
  }
});
