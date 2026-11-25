import type { FieldValues } from "react-hook-form";

import type { TextFormFieldProps } from "@/components/ui/form-fields/text-form-field/text-form-field.types";

/** TextFormField behavior with a fixed lock prefix and password visibility toggle.
 * Inherits md size, neutral color, and outline variant defaults.
 * Input type and addon content are managed internally.
 */
export type PasswordFormFieldProps<TFields extends FieldValues> = Readonly<
  Omit<TextFormFieldProps<TFields>, "type" | "children">
>;
