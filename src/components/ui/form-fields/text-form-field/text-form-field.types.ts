import type { FieldPath, FieldValues, UseControllerProps } from "react-hook-form";

import type { TextFieldProps } from "@/components/ui/text-field/text-field.types";

export type TextFormFieldProps<TFields extends FieldValues> = Readonly<
  Omit<TextFieldProps, "name" | "value" | "defaultValue" | "ref" | "onChange" | "onBlur"> & {
    name: FieldPath<TFields>;
    rules?: UseControllerProps<TFields>["rules"];
    shouldUnregister?: boolean;
  }
>;
