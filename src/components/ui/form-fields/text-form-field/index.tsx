"use client";

import { useController, useFormContext } from "react-hook-form";
import type { FieldValues } from "react-hook-form";

import { TextField } from "@/components/ui/text-field";

import type { TextFormFieldProps } from "./text-form-field.types";

export function TextFormField<TFields extends FieldValues>({
  name,
  rules,
  shouldUnregister,
  required,
  disabled,
  color = "neutral",
  message = "",
  ...props
}: TextFormFieldProps<TFields>) {
  const { control } = useFormContext<TFields>();
  const requiredRule = rules?.required;
  const isRequired =
    required ?? Boolean(typeof requiredRule === "object" ? requiredRule.value : requiredRule);
  const { field, fieldState, formState } = useController({
    name,
    control,
    disabled,
    shouldUnregister,
    rules: { ...rules, required: requiredRule ?? (isRequired ? "This field is required." : false) },
  });
  const validated =
    formState.isSubmitted || (formState.isValid && (fieldState.isTouched || fieldState.isDirty));
  return (
    <TextField
      {...props}
      {...field}
      value={field.value ?? ""}
      required={isRequired}
      color={color}
      data-validated={validated || undefined}
      message={fieldState.error?.message ?? message}
      aria-invalid={fieldState.invalid || undefined}
    />
  );
}
