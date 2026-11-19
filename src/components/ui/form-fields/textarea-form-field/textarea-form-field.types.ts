import type { FieldPath, FieldValues, UseControllerProps } from "react-hook-form";

import type { TextareaFieldProps } from "@/components/ui/textarea-field/textarea-field.types";

export type TextareaFormFieldProps<TFields extends FieldValues> = Readonly<
  Omit<TextareaFieldProps, "name" | "value" | "defaultValue" | "ref" | "onChange" | "onBlur"> & {
    name: FieldPath<TFields>;
    rules?: UseControllerProps<TFields>["rules"];
    shouldUnregister?: boolean;
  }
>;
