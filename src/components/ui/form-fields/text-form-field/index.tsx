"use client";

import type { FieldValues } from "react-hook-form";

import { TextField } from "@/components/ui/text-field";
import { useFormField } from "@/hooks/use-form-field";

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
  const { field, fieldState, isRequired, validated } = useFormField<TFields>({
    name,
    rules,
    shouldUnregister,
    required,
    disabled,
  });
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
