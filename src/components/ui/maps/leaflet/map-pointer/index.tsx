"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

import type { Icon, DivIcon } from "leaflet";

import { PointerIconContext } from "./map-pointer-context";
import type { MapPointerProps, MapPointerClientProps } from "./map-pointer.types";

import "./styles.module.css";
const Primitive = dynamic<MapPointerClientProps>(
  () =>
    Promise.all([import("react-leaflet"), import("leaflet")]).then(([module, leaflet]) => {
      const defaultIcon = new leaflet.Icon.Default();
      const Native = module.Marker;
      return function ClientPrimitive({ instanceRef, ...props }: MapPointerClientProps) {
        return <Native {...props} icon={props.icon ?? defaultIcon} ref={instanceRef} />;
      };
    }),
  { ssr: false },
);
export function MapPointer({
  ref,
  children,
  icon,
  title,
  alt = "Marker",
  ...props
}: MapPointerProps) {
  const [customIcon, setCustomIcon] = useState<Icon | DivIcon>();
  return (
    <Primitive
      {...props}
      alt={alt}
      title={title ?? alt}
      icon={customIcon ?? icon}
      instanceRef={ref}
    >
      <PointerIconContext value={setCustomIcon}>{children}</PointerIconContext>
    </Primitive>
  );
}
