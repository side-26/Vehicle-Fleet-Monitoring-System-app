"use client";
import dynamic from "next/dynamic";

import { DEFAULT_MAP_TILE_URL, DEFAULT_MAP_TILE_ATTRIBUTION } from "./map-tile.types";
import type { MapTileProps, MapTileClientProps } from "./map-tile.types";

import "./styles.module.css";
const Primitive = dynamic<MapTileClientProps>(
  () =>
    import("react-leaflet").then((module) => {
      const Native = module.TileLayer;
      return function ClientPrimitive({ instanceRef, ...props }: MapTileClientProps) {
        return <Native {...props} ref={instanceRef} />;
      };
    }),
  { ssr: false },
);
export function MapTile({
  ref,
  url = DEFAULT_MAP_TILE_URL,
  attribution = url === DEFAULT_MAP_TILE_URL ? DEFAULT_MAP_TILE_ATTRIBUTION : undefined,
  ...props
}: MapTileProps) {
  return <Primitive {...props} url={url} attribution={attribution} instanceRef={ref} />;
}
