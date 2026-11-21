import type { ComponentProps } from "react";

import type { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

export const tooltipColors = ["primary", "secondary", "success", "neutral", "error"] as const;
export const tooltipSizes = ["xs", "sm", "md", "lg", "xl"] as const;
export const tooltipSides = ["top", "bottom", "inline-start", "inline-end"] as const;
export type TooltipColor = (typeof tooltipColors)[number];
export type TooltipSize = (typeof tooltipSizes)[number];
export type TooltipProps = Readonly<TooltipPrimitive.Root.Props>;
export type TooltipProviderProps = Readonly<TooltipPrimitive.Provider.Props>;
export type TooltipTriggerProps = Readonly<ComponentProps<typeof TooltipPrimitive.Trigger>>;
export type TooltipContentProps = Readonly<
  Omit<TooltipPrimitive.Popup.Props, "color"> &
    Pick<TooltipPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset"> & {
      /** Semantic surface and text color. @default "neutral" */
      readonly color?: TooltipColor;
      /** Scales font size; padding and radius scale with em. @default "md" */
      readonly size?: TooltipSize;
      /** Translucent surface using the shared glass material. @default false */
      readonly glassy?: boolean;
    }
>;
