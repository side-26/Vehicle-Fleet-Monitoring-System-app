import { createRef } from "react";

import { render, waitFor } from "@testing-library/react";
import { Point, type TileLayer } from "leaflet";
import { expect, it, vi } from "vitest";

import { LeafletMap } from "@/components/ui/maps/leaflet/leaflet-map";

import { MapTile } from "./index";
const tileCoords = Object.assign(new Point(0, 0), { z: 2 });
const origin = [0, 0] satisfies [number, number];
const theme = vi.hoisted(() => ({ resolvedTheme: "light" }));
vi.mock("next-themes", () => ({ useTheme: () => theme }));

it("forwards tile options, supports native mutable opacity, and cleans up", async () => {
  const ref = createRef<TileLayer>();
  const { rerender, unmount } = render(
    <LeafletMap center={origin} zoom={2}>
      <MapTile
        ref={ref}
        lightUrl="/tiles/{z}/{x}/{y}.png"
        attribution="Fleet tiles"
        opacity={0.6}
      />
    </LeafletMap>,
  );
  await waitFor(() => expect(ref.current).not.toBeNull());
  expect(ref.current?.options.opacity).toBe(0.6);
  rerender(
    <LeafletMap center={origin} zoom={2}>
      <MapTile
        ref={ref}
        lightUrl="/tiles/{z}/{x}/{y}.png"
        attribution="Fleet tiles"
        opacity={0.3}
      />
    </LeafletMap>,
  );
  await waitFor(() => expect(ref.current?.options.opacity).toBe(0.3));
  expect(document.body).toHaveTextContent("Fleet tiles");
  unmount();
  expect(ref.current).toBeNull();
});

it("uses OpenStreetMap attribution for the standard light URL", async () => {
  render(
    <LeafletMap center={origin} zoom={2}>
      <MapTile lightUrl="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </LeafletMap>,
  );
  await waitFor(() => expect(document.body).toHaveTextContent("OpenStreetMap"));
  expect(
    document.querySelector('a[href="https://www.openstreetmap.org/copyright"]'),
  ).not.toBeNull();
});

it("switches tile URLs with the theme and encodes the optional key", async () => {
  const ref = createRef<TileLayer>();
  const content = () => (
    <LeafletMap center={origin} zoom={2}>
      <MapTile
        ref={ref}
        lightUrl="/light/{z}/{x}/{y}.png"
        darkUrl="/dark/{z}/{x}/{y}.png?style=night"
        apiKey="test & key"
      />
    </LeafletMap>
  );
  const { rerender } = render(content());
  await waitFor(() => expect(ref.current?.getTileUrl(tileCoords)).toContain("/light/"));
  expect(ref.current?.getTileUrl(tileCoords)).toContain("?apiKey=test%20%26%20key");
  theme.resolvedTheme = "dark";
  rerender(content());
  await waitFor(() => expect(ref.current?.getTileUrl(tileCoords)).toContain("/dark/"));
  expect(ref.current?.getTileUrl(tileCoords)).toContain("?style=night&apiKey=test%20%26%20key");
  rerender(
    <LeafletMap center={origin} zoom={2}>
      <MapTile ref={ref} lightUrl="/fallback/{z}/{x}/{y}.png" />
    </LeafletMap>,
  );
  await waitFor(() => expect(ref.current?.getTileUrl(tileCoords)).toContain("/fallback/"));
  expect(ref.current?.getTileUrl(tileCoords)).not.toContain("apiKey");
  theme.resolvedTheme = "light";
});
