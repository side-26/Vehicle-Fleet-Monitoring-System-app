"use client";

import { useCallback, useEffect, useState } from "react";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { CheckIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import type {
  DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuProps,
  DropdownMenuRadioItemProps,
  DropdownMenuShortcutProps,
  DropdownMenuSubTriggerProps,
} from "./dropdown-menu.types";
import styles from "./styles.module.css";

export function DropdownMenu({ open, defaultOpen, onOpenChange, ...props }: DropdownMenuProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const isOpen = open ?? internalOpen;
  const handleOpenChange = useCallback<NonNullable<DropdownMenuProps["onOpenChange"]>>(
    (nextOpen, details) => {
      setInternalOpen(nextOpen);
      onOpenChange?.(nextOpen, details);
    },
    [onOpenChange],
  );

  useEffect(() => {
    if (!isOpen) return;
    const openedAt = performance.now();
    const handleScroll = (event: Event) => {
      const target = event.target;
      if (
        (target === document || target === document.documentElement) &&
        performance.now() - openedAt < 100
      )
        return;
      if (
        target instanceof Node &&
        target instanceof Element &&
        target.closest('[data-slot="dropdown-menu-content"]')
      )
        return;
      setInternalOpen(false);
      onOpenChange?.(false, { reason: "outside-press", event } as Parameters<
        NonNullable<typeof onOpenChange>
      >[1]);
    };
    document.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen, onOpenChange]);

  return (
    <MenuPrimitive.Root
      {...props}
      modal={false}
      open={isOpen}
      onOpenChange={handleOpenChange}
      data-slot="dropdown-menu"
    />
  );
}

export function DropdownMenuPortal(props: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal {...props} data-slot="dropdown-menu-portal" />;
}
export function DropdownMenuTrigger(props: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger {...props} data-slot="dropdown-menu-trigger" />;
}
export function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}: DropdownMenuContentProps) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className={styles.positioner}
      >
        <MenuPrimitive.Popup
          {...props}
          data-slot="dropdown-menu-content"
          className={cn(styles.content, className)}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}
export function DropdownMenuGroup(props: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group {...props} data-slot="dropdown-menu-group" />;
}
export function DropdownMenuLabel({ className, inset, ...props }: DropdownMenuLabelProps) {
  return (
    <MenuPrimitive.GroupLabel
      {...props}
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(styles.label, className)}
    />
  );
}
export function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: DropdownMenuItemProps) {
  return (
    <MenuPrimitive.Item
      {...props}
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(styles.item, className)}
    />
  );
}
export function DropdownMenuSub(props: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot {...props} data-slot="dropdown-menu-sub" />;
}
export function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: DropdownMenuSubTriggerProps) {
  return (
    <MenuPrimitive.SubmenuTrigger
      {...props}
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(styles.item, styles.subTrigger, className)}
    >
      {children}
      <ChevronRightIcon aria-hidden="true" />
    </MenuPrimitive.SubmenuTrigger>
  );
}
export function DropdownMenuSubContent(props: DropdownMenuContentProps) {
  return <DropdownMenuContent {...props} data-slot="dropdown-menu-sub-content" />;
}
export function DropdownMenuCheckboxItem({
  className,
  inset,
  children,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <MenuPrimitive.CheckboxItem
      {...props}
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(styles.item, styles.checkable, className)}
    >
      <MenuPrimitive.CheckboxItemIndicator className={styles.indicator}>
        <CheckIcon aria-hidden="true" />
      </MenuPrimitive.CheckboxItemIndicator>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}
export function DropdownMenuRadioGroup(props: MenuPrimitive.RadioGroup.Props) {
  return <MenuPrimitive.RadioGroup {...props} data-slot="dropdown-menu-radio-group" />;
}
export function DropdownMenuRadioItem({
  className,
  inset,
  children,
  ...props
}: DropdownMenuRadioItemProps) {
  return (
    <MenuPrimitive.RadioItem
      {...props}
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(styles.item, styles.checkable, className)}
    >
      <MenuPrimitive.RadioItemIndicator className={styles.indicator}>
        <CheckIcon aria-hidden="true" />
      </MenuPrimitive.RadioItemIndicator>
      {children}
    </MenuPrimitive.RadioItem>
  );
}
export function DropdownMenuSeparator({ className, ...props }: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      {...props}
      data-slot="dropdown-menu-separator"
      className={cn(styles.separator, className)}
    />
  );
}
export function DropdownMenuShortcut({ className, ...props }: DropdownMenuShortcutProps) {
  return (
    <span
      {...props}
      data-slot="dropdown-menu-shortcut"
      className={cn(styles.shortcut, className)}
    />
  );
}
