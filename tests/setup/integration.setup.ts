import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { server } from "@tests/mocks/server";
import { afterAll, afterEach, beforeAll, expect } from "vitest";

expect.extend(matchers);

beforeAll(() => {
  server.listen({
    onUnhandledFrame: "error",
  });
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
