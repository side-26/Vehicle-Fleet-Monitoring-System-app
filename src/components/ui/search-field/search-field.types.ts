import type { TextFieldProps } from "@/components/ui/text-field/text-field.types";

export interface SearchFieldProps extends Omit<
  TextFieldProps,
  "type" | "label" | "message" | "haveMessage" | "children"
> {
  /** Accessible name for the clear action. */
  readonly clearLabel?: string;
}
