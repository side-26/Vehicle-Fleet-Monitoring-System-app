import type { ComponentProps } from "react";

import type { FieldSize } from "@/components/ui/field/field.types";

export const textareaFieldColors = ["primary", "secondary", "neutral", "success", "error"] as const;
export const textareaFieldVariants = ["fill", "tonal", "outline", "ghost"] as const;
export interface TextareaFieldProps extends Omit<ComponentProps<"textarea">, "size" | "color"> {
  /** Grow with content; defaults to true. CSS field sizing ignores rows when enabled. */
  readonly autoResize?: boolean;
  /** Visible rows when autoResize is false; defaults to 2. */
  readonly rows?: number;
  /** Defaults to md. */
  readonly size?: FieldSize;
  /** Defaults to neutral. */
  readonly color?: (typeof textareaFieldColors)[number];
  /** Defaults to outline. */
  readonly variant?: (typeof textareaFieldVariants)[number];
  /** Visible label; defaults to an empty string. */
  readonly label?: string;
  /** Helper or validation message; defaults to an empty string. */
  readonly message?: string;
  /** Reserve a description line even when empty. Defaults to true. */
  readonly haveMessage?: boolean;
}
