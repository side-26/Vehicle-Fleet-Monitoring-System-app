"use client";

import { useCallback } from "react";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

import { cn } from "@/lib/utils";

import styles from "./styles.module.css";
import type {
  TooltipContentProps,
  TooltipProps,
  TooltipProviderProps,
  TooltipTriggerProps,
} from "./tooltip.types";

export type {
  TooltipColor,
  TooltipContentProps,
  TooltipProps,
  TooltipProviderProps,
  TooltipSize,
  TooltipTriggerProps,
} from "./tooltip.types";

export function TooltipProvider({ delay = 0, ...props }: TooltipProviderProps) {
  return <TooltipPrimitive.Provider {...props} delay={delay} />;
}

export function Tooltip(props: TooltipProps) {
  return <TooltipPrimitive.Root {...props} />;
}

export function TooltipTrigger(props: TooltipTriggerProps) {
  return <TooltipPrimitive.Trigger {...props} data-slot="tooltip-trigger" />;
}

export function TooltipContent({
  className,
  color = "neutral",
  size = "md",
  glassy = false,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  ...props
}: TooltipContentProps) {
  const resolveClassName = useCallback(
    (state: TooltipPrimitive.Popup.State) =>
      cn(styles.content, typeof className === "function" ? className(state) : className),
    [className],
  );

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className={styles.positioner}
      >
        <TooltipPrimitive.Popup
          {...props}
          data-slot="tooltip-content"
          data-color={color}
          data-size={size}
          data-glassy={glassy}
          className={resolveClassName}
        />
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}
