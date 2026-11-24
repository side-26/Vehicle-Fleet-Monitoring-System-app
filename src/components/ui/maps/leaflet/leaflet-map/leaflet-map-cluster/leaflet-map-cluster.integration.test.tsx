import { createRef } from "react";

import { render, waitFor } from "@testing-library/react";
import type { MarkerClusterGroup } from "leaflet";
import { expect, it } from "vitest";

import { LeafletMap } from "@/components/ui/maps/leaflet/leaflet-map";
import { MapPointer } from "@/components/ui/maps/leaflet/map-pointer";

import { LeafletMapCluster } from "./index";

const center = [35.7, 51.4] satisfies [number, number];
const nearby = [35.701, 51.401] satisfies [number, number];

it("updates cluster membership when marker children are added and removed", async () => {
  const ref = createRef<MarkerClusterGroup>();
  function Example({ extra }: { readonly extra: boolean }) {
    return (
      <LeafletMap center={center} zoom={10} maxZoom={18}>
        <LeafletMapCluster ref={ref} animate={false}>
          <MapPointer position={center} alt="First vehicle" />
          {extra && <MapPointer position={nearby} alt="Second vehicle" />}
        </LeafletMapCluster>
      </LeafletMap>
    );
  }
  const { rerender, unmount } = render(<Example extra={false} />);
  await waitFor(() => expect(ref.current?.getLayers()).toHaveLength(1));
  rerender(<Example extra />);
  await waitFor(() => expect(ref.current?.getLayers()).toHaveLength(2));
  rerender(<Example extra={false} />);
  await waitFor(() => expect(ref.current?.getLayers()).toHaveLength(1));
  unmount();
  expect(ref.current).toBeNull();
});
