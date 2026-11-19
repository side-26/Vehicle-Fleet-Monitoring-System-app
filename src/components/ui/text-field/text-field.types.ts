import type { ComponentProps } from "react";

import type { FieldSize } from "@/components/ui/field/field.types";

export const textFieldColors = ["primary", "secondary", "neutral", "success", "error"] as const;
export const textFieldVariants = ["fill", "tonal", "outline", "ghost"] as const;
export interface TextFieldProps extends Omit<ComponentProps<"input">, "size" | "color"> {
  /** Defaults to md. */
  readonly size?: FieldSize;
  /** Defaults to neutral. */
  readonly color?: (typeof textFieldColors)[number];
  /** Defaults to outline. */
  readonly variant?: (typeof textFieldVariants)[number];
  /** Visible label; defaults to an empty string. */
  readonly label?: string;
  /** Helper or validation message; defaults to an empty string. */
  readonly message?: string;
  /** Reserve a description line even when empty. Defaults to true. */
  readonly haveMessage?: boolean;
}
