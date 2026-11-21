import { createRef } from "react";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { Marker } from "leaflet";
import { expect, it, vi } from "vitest";

import { LeafletMap } from "@/components/ui/maps/leaflet/leaflet-map";
import { MapPointer } from "@/components/ui/maps/leaflet/map-pointer";

import { PointerIcon } from "./index";
const click = vi.fn();
const eventHandlers = { click };
const center = [0, 0] satisfies [number, number];
it("renders live children in a marker, forwards clicks and restores the original icon", async () => {
  const ref = createRef<Marker>();

  const { rerender } = render(
    <LeafletMap center={center} zoom={2}>
      <MapPointer ref={ref} position={center} alt="Vehicle" eventHandlers={eventHandlers}>
        <PointerIcon>
          <span>Truck icon</span>
        </PointerIcon>
      </MapPointer>
    </LeafletMap>,
  );
  const icon = await screen.findByText("Truck icon");
  await waitFor(() => expect(icon.closest(".leaflet-marker-icon")).not.toBeNull());
  fireEvent.click(icon);
  expect(click).toHaveBeenCalled();
  rerender(
    <LeafletMap center={center} zoom={2}>
      <MapPointer ref={ref} position={center} alt="Vehicle">
        <PointerIcon>
          <span>Updated icon</span>
        </PointerIcon>
      </MapPointer>
    </LeafletMap>,
  );
  expect(await screen.findByText("Updated icon")).toBeInTheDocument();
  rerender(
    <LeafletMap center={center} zoom={2}>
      <MapPointer ref={ref} position={center} alt="Vehicle" />
    </LeafletMap>,
  );
  await waitFor(() => expect(ref.current?.getElement()?.tagName).toBe("IMG"));
});
