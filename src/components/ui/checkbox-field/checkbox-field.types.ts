import type { Checkbox } from "@base-ui/react/checkbox";

import type { FieldSize } from "@/components/ui/field/field.types";

export const checkboxFieldColors = ["primary", "secondary", "error", "success"] as const;
export interface CheckboxFieldProps extends Omit<Checkbox.Root.Props, "color" | "children"> {
  readonly color?: (typeof checkboxFieldColors)[number];
  readonly size?: FieldSize;
  readonly label?: string;
  readonly message?: string;
  /** Reserve a message line even when empty; defaults to true. */
  readonly haveMessage?: boolean;
}
