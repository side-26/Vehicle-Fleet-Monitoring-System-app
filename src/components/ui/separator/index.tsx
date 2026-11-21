"use client";

import { useCallback } from "react";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import { cn } from "@/lib/utils";

import type { SeparatorProps } from "./separator.types";
import styles from "./styles.module.css";

export type { SeparatorProps } from "./separator.types";

export function Separator({ className, orientation = "horizontal", ...props }: SeparatorProps) {
  const resolveClassName = useCallback(
    (state: SeparatorPrimitive.State) =>
      cn(styles.separator, typeof className === "function" ? className(state) : className),
    [className],
  );

  return (
    <SeparatorPrimitive
      {...props}
      data-slot="separator"
      orientation={orientation}
      className={resolveClassName}
    />
  );
}
