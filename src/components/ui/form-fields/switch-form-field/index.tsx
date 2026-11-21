"use client";
import type { FieldValues } from "react-hook-form";

import { SwitchField } from "@/components/ui/switch-field";
import { useFormField } from "@/hooks/use-form-field";

import type { SwitchFormFieldProps } from "./switch-form-field.types";

export function SwitchFormField<TFields extends FieldValues>({
  name,
  rules,
  shouldUnregister,
  required,
  disabled,
  message = "",
  ...props
}: SwitchFormFieldProps<TFields>) {
  const { field, fieldState, isRequired, validated } = useFormField<TFields>({
    name,
    rules,
    shouldUnregister,
    required,
    disabled,
  });
  const { value, onChange, ...binding } = field;
  return (
    <SwitchField
      {...props}
      {...binding}
      checked={value === true}
      onCheckedChange={onChange}
      required={isRequired}
      message={fieldState.error?.message ?? message}
      aria-invalid={fieldState.invalid || undefined}
      data-validated={validated || undefined}
    />
  );
}
