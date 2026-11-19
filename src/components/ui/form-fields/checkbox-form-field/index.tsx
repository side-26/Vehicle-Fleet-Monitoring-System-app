"use client";

import type { FieldValues } from "react-hook-form";

import { CheckboxField } from "@/components/ui/checkbox-field";
import { useFormField } from "@/hooks/use-form-field";

import type { CheckboxFormFieldProps } from "./checkbox-form-field.types";

export function CheckboxFormField<TFields extends FieldValues>({
  name,
  rules,
  shouldUnregister,
  required,
  disabled,
  color = "primary",
  message = "",
  ...props
}: CheckboxFormFieldProps<TFields>) {
  const { field, fieldState, isRequired, validated } = useFormField<TFields>({
    name,
    rules,
    shouldUnregister,
    required,
    disabled,
  });
  const { value, onChange, ...binding } = field;
  return (
    <CheckboxField
      {...props}
      {...binding}
      checked={value === true}
      onCheckedChange={onChange}
      required={isRequired}
      color={color}
      data-validated={validated || undefined}
      message={fieldState.error?.message ?? message}
      aria-invalid={fieldState.invalid || undefined}
    />
  );
}
