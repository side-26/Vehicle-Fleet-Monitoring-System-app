"use client";

import type { FieldValues } from "react-hook-form";

import { TextareaField } from "@/components/ui/textarea-field";
import { useFormField } from "@/hooks/use-form-field";

import type { TextareaFormFieldProps } from "./textarea-form-field.types";

export function TextareaFormField<TFields extends FieldValues>({
  name,
  rules,
  shouldUnregister,
  required,
  disabled,
  color = "neutral",
  message = "",
  ...props
}: TextareaFormFieldProps<TFields>) {
  const { field, fieldState, isRequired, validated } = useFormField<TFields>({
    name,
    rules,
    shouldUnregister,
    required,
    disabled,
  });
  return (
    <TextareaField
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
