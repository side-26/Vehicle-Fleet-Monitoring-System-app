"use client";

import { useId } from "react";

import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

import styles from "./styles.module.css";
import type { TextFieldProps } from "./text-field.types";

export function TextField({
  size = "md",
  color = "neutral",
  variant = "outline",
  label = "",
  message = "",
  haveMessage = true,
  children,
  id,
  className,
  required,
  disabled,
  "aria-describedby": describedBy,
  ...props
}: Readonly<TextFieldProps>) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  return (
    <Field
      size={size}
      data-color={color}
      data-variant={variant}
      data-disabled={disabled || undefined}
      className={styles.root}
    >
      {label && (
        <FieldLabel htmlFor={inputId}>
          {required && <span aria-hidden="true">*</span>}
          {label}
        </FieldLabel>
      )}
      <FieldContent>
        <InputGroup className={styles.group} data-focus-style="outline">
          <InputGroupInput
            {...props}
            id={inputId}
            required={required}
            disabled={disabled}
            aria-describedby={
              [describedBy, haveMessage && message ? messageId : undefined]
                .filter(Boolean)
                .join(" ") || undefined
            }
            className={cn(styles.input, className)}
          />
          {children}
        </InputGroup>
      </FieldContent>
      {haveMessage && (
        <>
          <FieldDescription id={messageId} className={styles.message}>
            {message && (
              <span key={message} className={styles["slide-y"]}>
                {message}
              </span>
            )}
          </FieldDescription>
        </>
      )}
    </Field>
  );
}
