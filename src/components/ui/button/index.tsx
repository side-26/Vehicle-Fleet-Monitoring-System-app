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
  loading = false,
  loadingText,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      {...props}
      aria-busy={loading || undefined}
      data-slot="button"
      data-variant={variant}
      data-color={color}
      data-size={size}
      data-loading={loading || undefined}
      disabled={disabled || loading}
      className={cn(styles.button, className)}
    >
      {loading ? loadingText : children}
    </ButtonPrimitive>
  );
}
