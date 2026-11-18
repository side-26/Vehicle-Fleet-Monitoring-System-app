"use client";

import { useMemo } from "react";

import { FormProvider, useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";

import type { FormProps } from "./form.types";

export function Form<TFields extends FieldValues>({
  children,
  formOptions,
  validation,
  onSubmit,
  onInvalid,
  noValidate = true,
  ...formProps
}: FormProps<TFields>) {
  const methods = useForm<TFields>({
    ...formOptions,
    resolver: validation ?? formOptions?.resolver,
  });
  const submitHandler = useMemo(
    () => methods.handleSubmit(onSubmit, onInvalid),
    [methods, onInvalid, onSubmit],
  );

  return (
    <FormProvider {...methods}>
      <form {...formProps} noValidate={noValidate} onSubmit={submitHandler}>
        {typeof children === "function" ? children(methods) : children}
      </form>
    </FormProvider>
  );
}
