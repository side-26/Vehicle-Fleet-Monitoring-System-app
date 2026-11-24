"use client";

import { useCallback } from "react";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionProps,
  AccordionTriggerProps,
} from "./accordion.types";
import styles from "./styles.module.css";

export type {
  AccordionColor,
  AccordionContentProps,
  AccordionItemProps,
  AccordionProps,
  AccordionSize,
  AccordionTriggerProps,
  AccordionVariant,
} from "./accordion.types";

export function Accordion<Value = string>({
  color = "inherit",
  variant = "ghost",
  size = "md",
  className,
  ...props
}: AccordionProps<Value>) {
  const resolveClassName = useCallback(
    (state: AccordionPrimitive.Root.State<Value>) =>
      cn(styles.root, typeof className === "function" ? className(state) : className),
    [className],
  );
  return (
    <AccordionPrimitive.Root
      {...props}
      data-slot="accordion"
      data-color={color}
      data-variant={variant}
      data-size={size}
      className={resolveClassName}
    />
  );
}

export function AccordionItem({ className, ...props }: AccordionItemProps) {
  const resolveClassName = useCallback(
    (state: AccordionPrimitive.Item.State) =>
      cn(styles.item, typeof className === "function" ? className(state) : className),
    [className],
  );
  return (
    <AccordionPrimitive.Item {...props} data-slot="accordion-item" className={resolveClassName} />
  );
}

export function AccordionTrigger({
  className,
  children,
  headingProps,
  ...props
}: AccordionTriggerProps) {
  const { className: headingClassName, ...headerProps } = headingProps ?? {};
  const resolveHeadingClassName = useCallback(
    (state: AccordionPrimitive.Header.State) =>
      cn(
        styles.heading,
        typeof headingClassName === "function" ? headingClassName(state) : headingClassName,
      ),
    [headingClassName],
  );
  const resolveClassName = useCallback(
    (state: AccordionPrimitive.Trigger.State) =>
      cn(styles.trigger, typeof className === "function" ? className(state) : className),
    [className],
  );
  return (
    <AccordionPrimitive.Header
      {...headerProps}
      data-slot="accordion-heading"
      className={resolveHeadingClassName}
    >
      <AccordionPrimitive.Trigger
        {...props}
        data-slot="accordion-trigger"
        className={resolveClassName}
      >
        {children}
        <ChevronDown aria-hidden="true" className={styles.icon} />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className, children, ...props }: AccordionContentProps) {
  const resolveClassName = useCallback(
    (state: AccordionPrimitive.Panel.State) =>
      cn(styles.panel, typeof className === "function" ? className(state) : className),
    [className],
  );
  return (
    <AccordionPrimitive.Panel {...props} data-slot="accordion-content" className={resolveClassName}>
      <div className={styles.content}>{children}</div>
    </AccordionPrimitive.Panel>
  );
}
