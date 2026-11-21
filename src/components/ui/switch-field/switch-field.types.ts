import type { ComponentProps } from "react";

import type { Switch } from "@base-ui/react/switch";

import type { FieldSize } from "@/components/ui/field/field.types";
export const switchFieldColors = ["primary", "error", "success", "neutral"] as const;
export const switchFieldVariants = ["fill", "tonal", "outline", "ghost"] as const;
export const switchFieldSizes = ["xs", "sm", "md", "lg", "xl"] as const;
export type SwitchFieldColor = (typeof switchFieldColors)[number];
/** Distinct state colors, accounting for primary/error defaults when omitted. */
type StateColors = {
  [TrueColor in SwitchFieldColor]: {
    [FalseColor in Exclude<SwitchFieldColor, TrueColor>]: (TrueColor extends "primary"
      ? { readonly trueValueColor?: TrueColor }
      : { readonly trueValueColor: TrueColor }) &
      (FalseColor extends "error"
        ? { readonly falseValueColor?: FalseColor }
        : { readonly falseValueColor: FalseColor });
  }[Exclude<SwitchFieldColor, TrueColor>];
}[SwitchFieldColor];
export type SwitchFieldProps = Readonly<
  Omit<ComponentProps<typeof Switch.Root>, "color" | "children" | "size"> & {
    /** Field font scale. Defaults to md. */
    size?: FieldSize;
    /** Track treatment. Defaults to fill. */
    variant?: (typeof switchFieldVariants)[number];
    /** Visible label. Defaults to an empty string. */
    label?: string;
    /** Helper message. Defaults to an empty string. */
    message?: string;
  } & StateColors
>;
