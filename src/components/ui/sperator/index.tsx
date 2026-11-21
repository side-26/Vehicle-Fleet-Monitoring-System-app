"use client";

import { useCallback } from "react";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import { cn } from "@/lib/utils";

import type { SperatorProps } from "./sperator.types";
import styles from "./styles.module.css";

export type { SperatorProps } from "./sperator.types";

export function Sperator({ className, orientation = "horizontal", ...props }: SperatorProps) {
  const resolveClassName = useCallback(
    (state: SeparatorPrimitive.State) =>
      cn(styles.sperator, typeof className === "function" ? className(state) : className),
    [className],
  );

  return (
    <SeparatorPrimitive
      {...props}
      data-slot="sperator"
      orientation={orientation}
      className={resolveClassName}
    />
  );
}
