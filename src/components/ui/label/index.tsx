import { cn } from "@/lib/utils";

import type { LabelProps } from "./label.types";
import styles from "./styles.module.css";

export function Label({ className, htmlFor, ...props }: LabelProps) {
  return (
    <label {...props} htmlFor={htmlFor} data-slot="label" className={cn(styles.label, className)} />
  );
}
