import type { ComponentProps } from "react";

export const dotBadgeSizes = ["sm", "lg"] as const;
export const dotBadgeColors = ["primary", "secondary", "success", "error", "neutral"] as const;
export const dotBadgePositions = ["top-start", "top-end", "bottom-start", "bottom-end"] as const;
export type DotBadgePosition = (typeof dotBadgePositions)[number];
export type DotBadgeSize = (typeof dotBadgeSizes)[number];
export type DotBadgeColor = (typeof dotBadgeColors)[number];

export interface DotBadgeProps extends Omit<ComponentProps<"svg">, "children" | "color" | "role"> {
  /** Optional corner placement within a positioned ancestor. Omit to remain inline. */
  readonly position?: DotBadgePosition;
  /** Diameter preset. Defaults to sm. */
  readonly size?: DotBadgeSize;
  /** Semantic fill color. Defaults to primary. */
  readonly color?: DotBadgeColor;
}
