import type { ComponentProps } from "react";

import type MarkerClusterGroup from "react-leaflet-cluster";

/** Local boundary for all native cluster options, events, children and the instance ref. */
export type LeafletMapClusterProps = Readonly<ComponentProps<typeof MarkerClusterGroup>>;

/** Avoid next/dynamic treating the Leaflet instance ref as a loader ref. */
export type LeafletMapClusterClientProps = Readonly<
  Omit<LeafletMapClusterProps, "ref"> & { instanceRef?: LeafletMapClusterProps["ref"] }
>;
