const click = vi.fn();
const eventHandlers = { click };
const updatedPosition = [3, 4] satisfies [number, number];
const initialPosition = [1, 2] satisfies [number, number];
const origin = [0, 0] satisfies [number, number];
import { createRef } from "react";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { Marker } from "leaflet";
import { expect, it, vi } from "vitest";

import { LeafletMap } from "@/components/ui/maps/leaflet/leaflet-map";

import { MapPointer } from "./index";
it("forwards position, accessible marker options, events and ref", async () => {
  const ref = createRef<Marker>();

  const { rerender, unmount } = render(
    <LeafletMap center={origin} zoom={2}>
      <MapPointer
        ref={ref}
        position={initialPosition}
        alt="Vehicle"
        eventHandlers={eventHandlers}
      />
    </LeafletMap>,
  );
  const marker = await screen.findByRole("button", { name: "Vehicle" });
  fireEvent.click(marker);
  expect(click).toHaveBeenCalled();
  expect(ref.current?.getLatLng().lat).toBe(1);
  rerender(
    <LeafletMap center={origin} zoom={2}>
      <MapPointer
        ref={ref}
        position={updatedPosition}
        alt="Vehicle"
        eventHandlers={eventHandlers}
      />
    </LeafletMap>,
  );
  await waitFor(() => expect(ref.current?.getLatLng().lng).toBe(4));
  unmount();
  expect(ref.current).toBeNull();
});
