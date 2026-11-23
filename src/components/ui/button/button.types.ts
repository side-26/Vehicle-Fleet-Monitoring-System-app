import type { ComponentPropsWithRef } from "react";

import type { Button as ButtonPrimitive } from "@base-ui/react/button";

export const buttonVariants = ["filled", "outlined", "tonal", "ghost", "link"] as const;

export const buttonSizes = ["xs", "sm", "md", "lg", "xl"] as const;

export const buttonColor = [
  "primary",
  "secondary",
  "neutral",
  "destructive",
  "success",
  "error",
] as const;

export type ButtonVariant = (typeof buttonVariants)[number];

export type ButtonSize = (typeof buttonSizes)[number];

export type ButtonColor = (typeof buttonColor)[number];

type ButtonPrimitiveProps = Omit<
  ComponentPropsWithRef<typeof ButtonPrimitive>,
  "aria-label" | "className" | "color" | "size" | "variant"
>;

interface ButtonBaseProps extends ButtonPrimitiveProps {
  "aria-label": string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  className?: string;
  loading?: false;
  loadingText?: string;
}

interface LoadingButtonProps extends ButtonPrimitiveProps {
  "aria-label": string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  className?: string;
  loading: true;
  loadingText: string;
}

export type ButtonProps = ButtonBaseProps | LoadingButtonProps;
