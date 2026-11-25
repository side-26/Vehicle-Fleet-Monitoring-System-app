"use client";

import { useCallback, useState } from "react";

import { EyeIcon, EyeOffIcon, LockKeyholeIcon } from "lucide-react";
import type { FieldValues } from "react-hook-form";

import { TextFormField } from "@/components/ui/form-fields/text-form-field";
import { InputGroupAddon, InputGroupButton } from "@/components/ui/input-group";

import type { PasswordFormFieldProps } from "./password-form-field.types";
import styles from "./styles.module.css";

export function PasswordFormField<TFields extends FieldValues>({
  disabled,
  ...props
}: PasswordFormFieldProps<TFields>) {
  const [visible, setVisible] = useState(false);
  const toggle = useCallback(() => setVisible((current) => !current), []);

  return (
    <TextFormField {...props} disabled={disabled} type={visible ? "text" : "password"}>
      <InputGroupAddon align="inline-start" className={styles.addon}>
        <LockKeyholeIcon aria-hidden="true" />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end" className={styles.addon}>
        <InputGroupButton
          type="button"
          size="icon-xs"
          className={styles.toggle}
          disabled={disabled}
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={toggle}
        >
          {visible ? <EyeOffIcon aria-hidden="true" /> : <EyeIcon aria-hidden="true" />}
        </InputGroupButton>
      </InputGroupAddon>
    </TextFormField>
  );
}
