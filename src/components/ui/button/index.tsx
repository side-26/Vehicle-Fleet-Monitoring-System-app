"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";

import { cn } from "@/lib/utils";

import type { ButtonProps } from "./button.types";
import styles from "./styles.module.css";

export function Button({
  variant = "filled",
  color = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      {...props}
      data-slot="button"
      data-variant={variant}
      data-color={color}
      data-size={size}
      className={cn(styles.button, className)}
    />
  );
}
