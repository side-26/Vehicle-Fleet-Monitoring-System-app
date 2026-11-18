import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

import type { SpinnerProps } from "./spinner.types";
import styles from "./styles.module.css";

/* oxlint-disable jsx-a11y/prefer-tag-over-role -- The spinner must remain an SVG icon. */

export function Spinner({
  className,
  "aria-label": ariaLabel = "Loading",
  ...props
}: SpinnerProps) {
  return (
    <Loader2Icon
      {...props}
      data-slot="spinner"
      role="status"
      aria-label={ariaLabel}
      className={cn(styles.spinner, className)}
    />
  );
}
