"use client";
import dynamic from "next/dynamic";
import { useCallback } from "react";

import type { Map } from "leaflet";

import { cn } from "@/lib/utils";

import type { LeafletMapProps, LeafletMapClientProps } from "./leaflet-map.types";
import styles from "./styles.module.css";

import "leaflet/dist/leaflet.css";
const Primitive = dynamic<LeafletMapClientProps>(
  () =>
    import("react-leaflet").then((module) => {
      const Native = module.MapContainer;
      return function ClientPrimitive({ instanceRef, whenReady, ...props }: LeafletMapClientProps) {
        const ready = useCallback(
          function (this: Map) {
            this.attributionControl?.setPrefix(false);
            whenReady?.();
          },
          [whenReady],
        );
        return <Native {...props} whenReady={ready} ref={instanceRef} />;
      };
    }),
  { ssr: false },
);
export function LeafletMap({ ref, children, className, ...props }: LeafletMapProps) {
  return (
    <Primitive {...props} instanceRef={ref} className={cn(styles.map, className)}>
      {children}
    </Primitive>
  );
}
