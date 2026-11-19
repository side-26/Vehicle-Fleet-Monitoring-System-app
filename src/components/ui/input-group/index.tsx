/* oxlint-disable jsx-a11y/prefer-tag-over-role, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, react-perf/jsx-no-new-function-as-prop -- Addons provide pointer focus convenience; controls remain the keyboard focus targets. */
"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type {
  InputGroupAddonProps,
  InputGroupButtonProps,
  InputGroupInputProps,
  InputGroupProps,
  InputGroupTextareaProps,
  InputGroupTextProps,
} from "./input-group.types";
import styles from "./styles.module.css";

export function InputGroup({ className, ...props }: InputGroupProps) {
  // A generic control group can contain a textarea or nested layout; fieldset would alter its layout semantics.

  return (
    <div role="group" {...props} data-slot="input-group" className={cn(styles.group, className)} />
  );
}
export function InputGroupAddon({
  className,
  align = "inline-start",
  onClick,
  ...props
}: InputGroupAddonProps) {
  return (
    <div
      {...props}
      data-slot="input-group-addon"
      data-align={align}
      className={cn(styles.addon, className)}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          !(event.target instanceof Element) ||
          event.target.closest("button, a, input, textarea, select, [role=button]")
        )
          return;
        event.currentTarget
          .closest('[data-slot="input-group"]')
          ?.querySelector<HTMLElement>('[data-slot="input-group-control"]')
          ?.focus();
      }}
    />
  );
}
export function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: InputGroupButtonProps) {
  return (
    <Button
      {...props}
      type={type}
      variant={variant}
      size={size === "icon-xs" ? "xs" : size === "icon-sm" ? "sm" : size}
      data-slot="input-group-button"
      data-group-size={size}
      className={cn(styles.button, className)}
    />
  );
}
export function InputGroupText({ className, ...props }: InputGroupTextProps) {
  return <span {...props} data-slot="input-group-text" className={cn(styles.text, className)} />;
}
export function InputGroupInput({ className, ...props }: InputGroupInputProps) {
  return (
    <InputPrimitive
      {...props}
      data-slot="input-group-control"
      className={cn(styles.control, className)}
    />
  );
}
export function InputGroupTextarea({ className, ...props }: InputGroupTextareaProps) {
  return (
    <textarea
      {...props}
      data-slot="input-group-control"
      className={cn(styles.control, styles.textarea, className)}
    />
  );
}

/** Standalone Base UI input; grouped controls use InputGroupInput. */
export function Input({ className, ...props }: InputGroupInputProps) {
  return <InputPrimitive {...props} data-slot="input" className={cn(styles.input, className)} />;
}

/** Standalone textarea; grouped controls use InputGroupTextarea. */
export function Textarea({ className, ...props }: InputGroupTextareaProps) {
  return (
    <textarea
      {...props}
      data-slot="textarea"
      className={cn(styles.standaloneTextarea, className)}
    />
  );
}
