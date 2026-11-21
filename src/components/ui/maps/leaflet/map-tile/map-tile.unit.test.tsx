const origin = [0, 0] satisfies [number, number];
import { createRef } from "react";

import { render, waitFor } from "@testing-library/react";
import type { TileLayer } from "leaflet";
import { expect, it } from "vitest";

import { LeafletMap } from "@/components/ui/maps/leaflet/leaflet-map";

import { MapTile } from "./index";
it("forwards tile options, supports native mutable opacity, and cleans up", async () => {
  const ref = createRef<TileLayer>();
  const { rerender, unmount } = render(
    <LeafletMap center={origin} zoom={2}>
      <MapTile ref={ref} url="/tiles/{z}/{x}/{y}.png" attribution="Fleet tiles" opacity={0.6} />
    </LeafletMap>,
  );
  await waitFor(() => expect(ref.current).not.toBeNull());
  expect(ref.current?.options.opacity).toBe(0.6);
  rerender(
    <LeafletMap center={origin} zoom={2}>
      <MapTile ref={ref} url="/tiles/{z}/{x}/{y}.png" attribution="Fleet tiles" opacity={0.3} />
    </LeafletMap>,
  );
  await waitFor(() => expect(ref.current?.options.opacity).toBe(0.3));
  expect(document.body).toHaveTextContent("Fleet tiles");
  unmount();
  expect(ref.current).toBeNull();
});

it("uses OpenStreetMap tiles and attribution when no URL is provided", async () => {
  render(
    <LeafletMap center={origin} zoom={2}>
      <MapTile />
    </LeafletMap>,
  );
  await waitFor(() => expect(document.body).toHaveTextContent("OpenStreetMap"));
  expect(
    document.querySelector('a[href="https://www.openstreetmap.org/copyright"]'),
  ).not.toBeNull();
});
