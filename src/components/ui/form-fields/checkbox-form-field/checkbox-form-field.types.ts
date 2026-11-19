import type { FieldPathByValue, FieldValues, UseControllerProps } from "react-hook-form";

import type { CheckboxFieldProps } from "@/components/ui/checkbox-field/checkbox-field.types";

export type CheckboxFormFieldProps<TFields extends FieldValues> = Readonly<
  Omit<
    CheckboxFieldProps,
    | "name"
    | "value"
    | "defaultValue"
    | "checked"
    | "defaultChecked"
    | "ref"
    | "onCheckedChange"
    | "onBlur"
  > & {
    name: FieldPathByValue<TFields, boolean>;
    rules?: UseControllerProps<TFields>["rules"];
    shouldUnregister?: boolean;
  }
>;
