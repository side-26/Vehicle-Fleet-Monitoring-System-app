"use client";

import { useCallback, useRef } from "react";

import { SearchIcon, XIcon } from "lucide-react";

import { InputGroupAddon, InputGroupButton } from "@/components/ui/input-group";
import { TextField } from "@/components/ui/text-field";
import { cn } from "@/lib/utils";

import type { SearchFieldProps } from "./search-field.types";
import styles from "./styles.module.css";

export function SearchField({
  clearLabel = "Clear search",
  ref,
  className,
  disabled,
  readOnly,
  ...props
}: Readonly<SearchFieldProps>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const setRef = useCallback(
    (input: HTMLInputElement | null) => {
      inputRef.current = input;
      if (typeof ref === "function") return ref(input);
      if (ref) ref.current = input;
    },
    [ref],
  );
  const clear = useCallback(() => {
    const input = inputRef.current;
    if (!input) return;
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(input, "");
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.focus();
  }, []);
  return (
    <TextField
      {...props}
      ref={setRef}
      className={cn(styles.input, className)}
      type="search"
      label=""
      message=""
      haveMessage={false}
      disabled={disabled}
      readOnly={readOnly}
    >
      <InputGroupAddon align="inline-start">
        <SearchIcon aria-hidden="true" />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label={clearLabel}
          disabled={disabled || readOnly}
          onClick={clear}
          size="icon-xs"
        >
          <XIcon aria-hidden="true" />
        </InputGroupButton>
      </InputGroupAddon>
    </TextField>
  );
}
