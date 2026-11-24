import { expect, it } from "vitest";

it("can be imported on the server without evaluating browser-only Leaflet code", async () => {
  expect(typeof window).toBe("undefined");
  const { LeafletMapCluster } = await import("./index");
  expect(LeafletMapCluster).toBeTypeOf("function");
});
