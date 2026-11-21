"use client";
import dynamic from "next/dynamic";

import type { MapPointerProps, MapPointerClientProps } from "./map-pointer.types";

import "./styles.module.css";
const Primitive = dynamic<MapPointerClientProps>(
  () =>
    import("react-leaflet").then((module) => {
      const Native = module.Marker;
      return function ClientPrimitive({ instanceRef, ...props }: MapPointerClientProps) {
        return <Native {...props} ref={instanceRef} />;
      };
    }),
  { ssr: false },
);
export function MapPointer({ ref, ...props }: MapPointerProps) {
  return <Primitive {...props} instanceRef={ref} />;
}
