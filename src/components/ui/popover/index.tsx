"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";

import { cn } from "@/lib/utils";

import type { PopoverContentProps, PopoverHeaderProps, PopoverProps } from "./popover.types";
import styles from "./styles.module.css";

export function Popover(props: PopoverProps) {
  return <PopoverPrimitive.Root {...props} data-slot="popover" />;
}
export function PopoverTrigger(props: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger {...props} data-slot="popover-trigger" />;
}
export function PopoverClose(props: PopoverPrimitive.Close.Props) {
  return <PopoverPrimitive.Close {...props} data-slot="popover-close" />;
}
export function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className={styles.positioner}
      >
        <PopoverPrimitive.Popup
          {...props}
          data-slot="popover-content"
          className={cn(styles.content, className)}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}
export function PopoverHeader({ className, ...props }: PopoverHeaderProps) {
  return <div {...props} data-slot="popover-header" className={cn(styles.header, className)} />;
}
export function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      {...props}
      data-slot="popover-title"
      className={cn(styles.title, className)}
    />
  );
}
export function PopoverDescription({ className, ...props }: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      {...props}
      data-slot="popover-description"
      className={cn(styles.description, className)}
    />
  );
}
