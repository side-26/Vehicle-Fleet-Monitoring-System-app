import type { ComponentProps } from "react";

export const cardColors = ["primary", "secondary", "neutral"] as const;
export const cardSizes = ["xs", "sm", "md", "lg"] as const;
export const cardVariants = ["fill", "tonal", "ghost"] as const;

export type CardColor = (typeof cardColors)[number];
export type CardSize = (typeof cardSizes)[number];
export type CardVariant = (typeof cardVariants)[number];

export interface CardProps extends ComponentProps<"div"> {
  color?: CardColor;
  size?: CardSize;
  variant?: CardVariant;
}
