import type { ComponentPropsWithRef } from "react";

import type { Button as ButtonPrimitive } from "@base-ui/react/button";
export const buttonVariants = ["filled", "outlined", "tonal", "ghost", "link"] as const;

export const buttonSizes = ["xs", "sm", "md", "lg", "xl"] as const;

export const buttonColor = ["primary", "secondary", "destructive", "success", "error"] as const;

export type ButtonVariant = (typeof buttonVariants)[number];

export type ButtonSize = (typeof buttonSizes)[number];

export type ButtonColor = (typeof buttonColor)[number];

export interface ButtonProps extends Omit<
  ComponentPropsWithRef<typeof ButtonPrimitive>,
  "className" | "color" | "size" | "variant"
> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  className?: string;
}
