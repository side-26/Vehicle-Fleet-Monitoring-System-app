import type { ComponentProps } from "react";

import type { TileLayer } from "react-leaflet";

export const DEFAULT_MAP_TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
export const DEFAULT_MAP_TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

/** All native React Leaflet TileLayer props, including its instance ref. */
export type MapTileProps = Readonly<
  Omit<ComponentProps<typeof TileLayer>, "url"> & {
    /** Tile URL template. Defaults to OpenStreetMap standard tiles. */
    url?: string;
  }
>;

/** Internal prop name avoids the dynamic loader intercepting the native ref. */
export type MapTileClientProps = Readonly<
  Omit<ComponentProps<typeof TileLayer>, "ref"> & { instanceRef?: MapTileProps["ref"] }
>;
