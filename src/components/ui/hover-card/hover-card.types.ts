import type { ComponentProps } from "react";

import type { PreviewCard } from "@base-ui/react/preview-card";
export const hoverCardColors = ["primary", "secondary", "success", "error", "neutral"] as const;
export const hoverCardGutters = ["xs", "sm", "md", "lg", "xl"] as const;
export type HoverCardColor = (typeof hoverCardColors)[number];
export type HoverCardGutter = (typeof hoverCardGutters)[number];
export type HoverCardProps = Readonly<PreviewCard.Root.Props>;
export type HoverCardTriggerProps = Readonly<ComponentProps<typeof PreviewCard.Trigger>>;
export type HoverCardContentProps = Readonly<
  Omit<PreviewCard.Popup.Props, "color"> &
    Pick<PreviewCard.Positioner.Props, "side" | "sideOffset" | "align" | "alignOffset"> & {
      /** Semantic surface color. Defaults to neutral. */
      color?: HoverCardColor;
      /** Internal padding scale in em. Defaults to md. */
      gutter?: HoverCardGutter;
    }
>;
