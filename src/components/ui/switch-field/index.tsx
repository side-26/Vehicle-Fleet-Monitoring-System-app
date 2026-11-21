"use client";
import { useId } from "react";

import { Switch } from "@base-ui/react/switch";

import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

import styles from "./styles.module.css";
import { switchFieldColors } from "./switch-field.types";
import type { SwitchFieldProps } from "./switch-field.types";
export function SwitchField({
  trueValueColor = "primary",
  falseValueColor = "error",
  size = "md",
  variant = "fill",
  label = "",
  message = "",
  id,
  className,
  disabled,
  required,
  "aria-describedby": describedBy,
  ...props
}: SwitchFieldProps) {
  const generatedId = useId();
  if (
    ![trueValueColor, falseValueColor].every((value) =>
      switchFieldColors.some((color) => color === value),
    )
  ) {
    throw new Error("SwitchField colors must be primary, error, success, or neutral.");
  }
  if (String(trueValueColor) === String(falseValueColor)) {
    throw new Error("SwitchField trueValueColor and falseValueColor must be different.");
  }
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  return (
    <Field
      orientation="horizontal"
      size={size}
      data-true-color={trueValueColor}
      data-false-color={falseValueColor}
      data-variant={variant}
      data-disabled={disabled || undefined}
      className={styles.field}
    >
      <Switch.Root
        {...props}
        id={inputId}
        disabled={disabled}
        required={required}
        aria-describedby={
          [describedBy, message ? messageId : undefined].filter(Boolean).join(" ") || undefined
        }
        className={cn(styles.control, className)}
      >
        <Switch.Thumb className={styles.thumb} />
      </Switch.Root>
      {(label || message) && (
        <FieldContent>
          {label && (
            <FieldLabel htmlFor={inputId}>
              {required && <span aria-hidden="true">*</span>}
              {label}
            </FieldLabel>
          )}
          {message && <FieldDescription id={messageId}>{message}</FieldDescription>}
        </FieldContent>
      )}
    </Field>
  );
}
