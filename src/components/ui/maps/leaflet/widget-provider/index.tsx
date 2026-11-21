"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import type { Control, ControlPosition } from "leaflet";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

import styles from "./styles.module.css";
import type {
  WidgetAlignment,
  WidgetProviderProps,
  WidgetProviderClientProps,
} from "./widget-provider.types";
const positions = {
  "top-left": "topleft",
  "bottom-left": "bottomleft",
  "top-right": "topright",
  "bottom-right": "bottomright",
} satisfies Record<WidgetAlignment, ControlPosition>;
const Placement = dynamic<WidgetProviderClientProps>(
  () =>
    Promise.all([import("leaflet"), import("react-leaflet")]).then(([leaflet, reactLeaflet]) => {
      return function WidgetPlacement({
        instanceRef,
        children,
        align = "top-right",
        className,
        ...props
      }: WidgetProviderClientProps) {
        const map = reactLeaflet.useMap();
        const [container] = useState(() => document.createElement("div"));
        const control = useRef<Control | null>(null);
        useEffect(() => {
          const instance = new leaflet.Control();
          instance.onAdd = () => container;
          leaflet.DomEvent.disableClickPropagation(container);
          leaflet.DomEvent.disableScrollPropagation(container);
          instance.addTo(map);
          control.current = instance;
          return () => {
            control.current = null;
            instance.remove();
            leaflet.DomEvent.off(container);
          };
        }, [map, container]);
        useEffect(() => {
          control.current?.setPosition(positions[align]);
        }, [align, map, container]);
        return createPortal(
          <div
            ref={instanceRef}
            {...props}
            data-align={align}
            className={cn(styles.widgets, className)}
          >
            {children}
          </div>,
          container,
        );
      };
    }),
  { ssr: false },
);
export function WidgetProvider({ ref, ...props }: WidgetProviderProps) {
  return <Placement {...props} instanceRef={ref} />;
}
