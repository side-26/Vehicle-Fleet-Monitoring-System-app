"use client";

import dynamic from "next/dynamic";

import type {
  LeafletMapClusterClientProps,
  LeafletMapClusterProps,
} from "./leaflet-map-cluster.types";

import "react-leaflet-cluster/dist/assets/MarkerCluster.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.Default.css";

export type { LeafletMapClusterProps } from "./leaflet-map-cluster.types";

const Primitive = dynamic<LeafletMapClusterClientProps>(
  () =>
    import("react-leaflet-cluster").then((module) => {
      const Native = module.default;
      return function ClientPrimitive({ instanceRef, ...props }: LeafletMapClusterClientProps) {
        return <Native {...props} ref={instanceRef} />;
      };
    }),
  { ssr: false },
);

export function LeafletMapCluster({ ref, ...props }: LeafletMapClusterProps) {
  return <Primitive {...props} instanceRef={ref} />;
}
