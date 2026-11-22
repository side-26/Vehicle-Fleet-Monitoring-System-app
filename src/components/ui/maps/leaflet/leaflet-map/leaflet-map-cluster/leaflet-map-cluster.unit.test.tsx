import { createRef } from "react";

import { render, waitFor } from "@testing-library/react";
import type { MarkerClusterGroup } from "leaflet";
import { expect, it, vi } from "vitest";

import { LeafletMap } from "@/components/ui/maps/leaflet/leaflet-map";
import { MapPointer } from "@/components/ui/maps/leaflet/map-pointer";

import { LeafletMapCluster } from "./index";

const center = [35.7, 51.4] satisfies [number, number];

it("creates a native group with forwarded options, children, ref and cleanup", async () => {
  const ref = createRef<MarkerClusterGroup>();
  const { unmount } = render(
    <LeafletMap center={center} zoom={10} maxZoom={18}>
      <LeafletMapCluster
        ref={ref}
        maxClusterRadius={60}
        chunkedLoading={false}
        showCoverageOnHover={false}
        animate={false}
      >
        <MapPointer position={center} alt="Fleet vehicle" />
      </LeafletMapCluster>
    </LeafletMap>,
  );
  await waitFor(() => expect(ref.current?.getLayers()).toHaveLength(1));
  expect(ref.current?.options).toMatchObject({ maxClusterRadius: 60 });
  expect(ref.current?.options).toMatchObject({ showCoverageOnHover: false });
  expect(ref.current?.options).toMatchObject({ chunkedLoading: false });
  unmount();
  expect(ref.current).toBeNull();
});

it("forwards native cluster events and replaces handlers and mutable options", async () => {
  const ref = createRef<MarkerClusterGroup>();
  const first = vi.fn();
  const second = vi.fn();
  const { rerender } = render(
    <LeafletMap center={center} zoom={10} maxZoom={18}>
      <LeafletMapCluster ref={ref} onContextMenu={first} maxClusterRadius={50}>
        {null}
      </LeafletMapCluster>
    </LeafletMap>,
  );
  await waitFor(() => expect(ref.current).not.toBeNull());
  ref.current?.fire("clustercontextmenu");
  expect(first).toHaveBeenCalledTimes(1);
  rerender(
    <LeafletMap center={center} zoom={10} maxZoom={18}>
      <LeafletMapCluster ref={ref} onContextMenu={second} maxClusterRadius={70}>
        {null}
      </LeafletMapCluster>
    </LeafletMap>,
  );
  await waitFor(() => expect(ref.current?.options).toMatchObject({ maxClusterRadius: 70 }));
  ref.current?.fire("clustercontextmenu");
  expect(second).toHaveBeenCalledTimes(1);
  expect(first).toHaveBeenCalledTimes(1);
});
