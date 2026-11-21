import type { ComponentProps } from "react";

import type { MapContainer } from "react-leaflet";

/** All native React Leaflet MapContainer props, including its instance ref. */
export type LeafletMapProps = Readonly<ComponentProps<typeof MapContainer>>;

/** Internal prop name avoids the dynamic loader intercepting the native ref. */
export type LeafletMapClientProps = Readonly<
  Omit<LeafletMapProps, "ref"> & { instanceRef?: LeafletMapProps["ref"] }
>;
