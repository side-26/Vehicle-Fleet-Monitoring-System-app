import type { ComponentProps } from "react";

export const fieldSizes = ["xs", "sm", "md", "lg", "xl"] as const;
export type FieldSize = (typeof fieldSizes)[number];

export const fieldOrientations = ["vertical", "horizontal", "responsive"] as const;
export const fieldLegendVariants = ["legend", "label"] as const;
export type FieldProps = Readonly<
  ComponentProps<"div"> & { size?: FieldSize; orientation?: (typeof fieldOrientations)[number] }
>;
export type FieldLegendProps = Readonly<
  ComponentProps<"legend"> & { variant?: (typeof fieldLegendVariants)[number] }
>;
export type FieldErrorProps = Readonly<
  ComponentProps<"div"> & { errors?: ReadonlyArray<Readonly<{ message?: string }> | undefined> }
>;
