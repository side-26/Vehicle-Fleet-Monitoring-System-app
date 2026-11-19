"use client";

import { useId } from "react";

import { Checkbox } from "@base-ui/react/checkbox";
import { CheckIcon, MinusIcon } from "lucide-react";

import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

import type { CheckboxFieldProps } from "./checkbox-field.types";
import styles from "./styles.module.css";

export function CheckboxField({
  color = "primary",
  size = "md",
  label = "",
  message = "",
  haveMessage = true,
  id,
  className,
  disabled,
  required,
  indeterminate,
  "aria-describedby": describedBy,
  ...props
}: Readonly<CheckboxFieldProps>) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  return (
    <Field
      orientation="horizontal"
      size={size}
      data-color={color}
      data-disabled={disabled || undefined}
      className={styles.root}
    >
      <Checkbox.Root
        {...props}
        id={inputId}
        disabled={disabled}
        required={required}
        indeterminate={indeterminate}
        aria-describedby={
          [describedBy, haveMessage && message ? messageId : undefined].filter(Boolean).join(" ") ||
          undefined
        }
        className={cn(styles.checkbox, className)}
      >
        <Checkbox.Indicator className={styles.indicator}>
          {indeterminate ? <MinusIcon aria-hidden="true" /> : <CheckIcon aria-hidden="true" />}
        </Checkbox.Indicator>
      </Checkbox.Root>
      <FieldContent>
        {label && (
          <FieldLabel htmlFor={inputId}>
            {required && <span aria-hidden="true">*</span>}
            {label}
          </FieldLabel>
        )}
        {haveMessage && (
          <FieldDescription id={messageId} className={styles.message}>
            {message && (
              <span key={message} className={styles["slide-y"]}>
                {message}
              </span>
            )}
          </FieldDescription>
        )}
      </FieldContent>
    </Field>
  );
}
