const center = [35.7, 51.4] satisfies [number, number];
import { createRef } from "react";

import { render, screen, waitFor } from "@testing-library/react";
import type { Map } from "leaflet";
import { expect, it, vi } from "vitest";

import { LeafletMap } from "./index";
it("creates a map with native options, ref and children, then cleans up", async () => {
  const ref = createRef<Map>();
  const whenReady = vi.fn();
  const { unmount } = render(
    <LeafletMap
      ref={ref}
      center={center}
      zoom={9}
      zoomControl={false}
      whenReady={whenReady}
      id="fleet-map"
    >
      <span>Map child</span>
    </LeafletMap>,
  );
  await screen.findByText("Map child");
  await waitFor(() => expect(ref.current).not.toBeNull());
  expect(ref.current?.getZoom()).toBe(9);
  expect(ref.current?.getCenter().lat).toBeCloseTo(35.7);
  expect(whenReady).toHaveBeenCalled();
  expect(document.getElementById("fleet-map")).toHaveClass("leaflet-container");
  expect(screen.queryByRole("button", { name: "Zoom in" })).not.toBeInTheDocument();
  unmount();
  expect(ref.current).toBeNull();
});
