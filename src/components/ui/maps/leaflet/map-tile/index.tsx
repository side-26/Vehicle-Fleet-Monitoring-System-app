"use client";
import dynamic from "next/dynamic";

import { useTheme } from "next-themes";

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
export function MapTile({ ref, lightUrl, darkUrl, apiKey, attribution, ...props }: MapTileProps) {
  const { resolvedTheme } = useTheme();
  const selectedUrl = resolvedTheme === "dark" ? (darkUrl ?? lightUrl) : lightUrl;
  const url = apiKey
    ? `${selectedUrl}${selectedUrl.includes("?") ? "&" : "?"}apiKey=${encodeURIComponent(apiKey)}`
    : selectedUrl;
  const credits =
    attribution ??
    (selectedUrl === DEFAULT_MAP_TILE_URL ? DEFAULT_MAP_TILE_ATTRIBUTION : undefined);
  return <Primitive {...props} url={url} attribution={credits} instanceRef={ref} />;
}
