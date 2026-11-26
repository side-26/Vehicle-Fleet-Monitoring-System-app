import { cn } from "@/lib/utils";

import type { DotBadgeProps } from "./dot-badge.types";
import styles from "./styles.module.css";

export function DotBadge({
  size = "sm",
  color = "primary",
  position,
  className,
  "aria-label": label,
  "aria-labelledby": labelledBy,
  "aria-hidden": hidden,
  ...props
}: Readonly<DotBadgeProps>) {
  const decorative = hidden ?? !(label || labelledBy);
  return (
    <svg
      {...props}
      viewBox="0 0 10 10"
      focusable="false"
      role={decorative ? undefined : "img"}
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-hidden={decorative}
      data-slot="dot-badge"
      data-size={size}
      data-color={color}
      data-position={position}
      className={cn(styles.dot, className)}
    >
      <circle cx="5" cy="5" r="5" fill="currentColor" />
    </svg>
  );
}
