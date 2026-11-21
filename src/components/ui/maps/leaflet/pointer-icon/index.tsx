"use client";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";

import { createPortal } from "react-dom";

import { PointerIconContext } from "@/components/ui/maps/leaflet/map-pointer/map-pointer-context";
import { cn } from "@/lib/utils";

import type { PointerIconProps } from "./pointer-icon.types";
import styles from "./styles.module.css";
const Content = dynamic<PointerIconProps>(
  () =>
    import("leaflet").then((leaflet) => {
      return function IconContent({ children, className, ...props }: PointerIconProps) {
        const setIcon = useContext(PointerIconContext);
        const [container] = useState(() => document.createElement("div"));
        if (!setIcon) throw new Error("PointerIcon must be rendered inside MapPointer.");
        useEffect(() => {
          const icon = leaflet.divIcon({
            html: container,
            className: styles.marker,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          });
          setIcon(icon);
          return () => setIcon(undefined);
        }, [container, setIcon]);
        return createPortal(
          <div {...props} className={cn(styles.content, className)}>
            {children}
          </div>,
          container,
        );
      };
    }),
  { ssr: false },
);
export function PointerIcon(props: PointerIconProps) {
  return <Content {...props} />;
}
