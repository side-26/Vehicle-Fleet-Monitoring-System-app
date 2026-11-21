"use client";
import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";

import type { LeafletMapProps, LeafletMapClientProps } from "./leaflet-map.types";
import styles from "./styles.module.css";

import "leaflet/dist/leaflet.css";
const Primitive = dynamic<LeafletMapClientProps>(
  () =>
    import("react-leaflet").then((module) => {
      const Native = module.MapContainer;
      return function ClientPrimitive({ instanceRef, ...props }: LeafletMapClientProps) {
        return <Native {...props} ref={instanceRef} />;
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
