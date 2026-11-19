import type { ComponentProps } from "react";

import type { Button } from "@/components/ui/button";

export const inputGroupAlignments = [
  "inline-start",
  "inline-end",
  "block-start",
  "block-end",
] as const;
export const inputGroupButtonSizes = ["xs", "sm", "icon-xs", "icon-sm"] as const;
export type InputGroupProps = Readonly<ComponentProps<"div">>;
export type InputGroupAddonProps = Readonly<
  ComponentProps<"div"> & { align?: (typeof inputGroupAlignments)[number] }
>;
// Distribute over Button's loading states so loading=true still requires loadingText.
type WithGroupSize<T> = T extends unknown
  ? Readonly<Omit<T, "size"> & { size?: (typeof inputGroupButtonSizes)[number] }>
  : never;
export type InputGroupButtonProps = WithGroupSize<ComponentProps<typeof Button>>;
export type InputGroupTextProps = Readonly<ComponentProps<"span">>;
export type InputGroupInputProps = Readonly<ComponentProps<"input">>;
export type InputGroupTextareaProps = Readonly<ComponentProps<"textarea">>;
