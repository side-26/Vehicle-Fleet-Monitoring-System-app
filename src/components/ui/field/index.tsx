"use client";

import { useMemo } from "react";
import type { ComponentProps, ReactNode } from "react";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import type { FieldErrorProps, FieldLegendProps, FieldProps } from "./field.types";
import styles from "./styles.module.css";

function FieldSet({ className, ...props }: ComponentProps<"fieldset">) {
  return <fieldset data-slot="field-set" className={cn(styles.fieldSet, className)} {...props} />;
}

function FieldLegend({ className, variant = "legend", ...props }: FieldLegendProps) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(styles.fieldLegend, className)}
      {...props}
    />
  );
}

function FieldGroup({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="field-group" className={cn(styles.fieldGroup, className)} {...props} />;
}

function Field({ className, orientation = "vertical", size = "md", ...props }: FieldProps) {
  return (
    <div
      // Field is a layout wrapper that can be nested inside a label; fieldset is not valid there.
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
      role="group"
      data-slot="field"
      data-orientation={orientation}
      data-size={size}
      className={cn(styles.field, styles[orientation], className)}
      {...props}
    />
  );
}

function FieldContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="field-content" className={cn(styles.fieldContent, className)} {...props} />
  );
}

function FieldLabel({ className, ...props }: Readonly<ComponentProps<typeof Label>>) {
  return <Label data-slot="field-label" className={cn(styles.fieldLabel, className)} {...props} />;
}

function FieldTitle({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="field-label" className={cn(styles.fieldTitle, className)} {...props} />;
}

function FieldDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(styles.fieldDescription, className)}
      {...props}
    />
  );
}

function FieldSeparator({
  children,
  className,
  ...props
}: ComponentProps<"div"> & { children?: ReactNode }) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(styles.fieldSeparator, className)}
      {...props}
    >
      <Separator className={styles.separatorLine} />
      {children && (
        <span className={styles.fieldSeparatorContent} data-slot="field-separator-content">
          {children}
        </span>
      )}
    </div>
  );
}

function FieldError({ className, children, errors, ...props }: FieldErrorProps) {
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()];

    if (uniqueErrors.length === 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <ul className={styles.errorList}>
        {uniqueErrors.map(
          (error) => error?.message && <li key={error.message}>{error.message}</li>,
        )}
      </ul>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn(styles.fieldError, className)}
      {...props}
    >
      {content}
    </div>
  );
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
};
