import type { ComponentProps } from "react";

import type { Marker } from "react-leaflet";

/** All native React Leaflet Marker props, including its instance ref. */
export type MapPointerProps = Readonly<ComponentProps<typeof Marker>>;

/** Internal prop name avoids the dynamic loader intercepting the native ref. */
export type MapPointerClientProps = Readonly<
  Omit<MapPointerProps, "ref"> & { instanceRef?: MapPointerProps["ref"] }
>;
