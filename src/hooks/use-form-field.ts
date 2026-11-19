"use client";

import { useController, useFormContext } from "react-hook-form";
import type { FieldValues, UseControllerProps } from "react-hook-form";

export type UseFormFieldOptions<TFields extends FieldValues> = Readonly<
  Omit<UseControllerProps<TFields>, "control" | "defaultValue"> & {
    required?: boolean;
  }
>;

/** Shared provider binding and validation metadata for base-field adapters. */
export function useFormField<TFields extends FieldValues>({
  name,
  rules,
  shouldUnregister,
  required,
  disabled,
}: UseFormFieldOptions<TFields>) {
  const { control } = useFormContext<TFields>();
  const requiredRule = rules?.required;
  const isRequired =
    required ?? Boolean(typeof requiredRule === "object" ? requiredRule.value : requiredRule);
  const controller = useController({
    name,
    control,
    disabled,
    shouldUnregister,
    rules: { ...rules, required: requiredRule ?? (isRequired ? "This field is required." : false) },
  });
  const { fieldState, formState } = controller;
  const validated =
    formState.isSubmitted || (formState.isValid && (fieldState.isTouched || fieldState.isDirty));
  return { ...controller, isRequired, validated };
}
