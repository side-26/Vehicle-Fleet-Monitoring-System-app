"use client";

import { useCallback, useState } from "react";
import type { ComponentProps } from "react";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { DialogContentProps, DialogFooterProps, DialogProps } from "./dialog.types";
import styles from "./styles.module.css";

const iconCloseButton = (
  <Button aria-label="Close dialog" variant="ghost" size="sm" className={styles.closeButton} />
);
const footerCloseButton = <Button aria-label="Close dialog from footer" variant="outlined" />;

export function Dialog({ eager = true, open, defaultOpen, onOpenChange, ...props }: DialogProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const handleOpenChange = useCallback<NonNullable<DialogProps["onOpenChange"]>>(
    (nextOpen, details) => {
      if (!eager && !nextOpen && details.reason === "escape-key") return;
      setInternalOpen(nextOpen);
      onOpenChange?.(nextOpen, details);
    },
    [eager, onOpenChange],
  );
  return (
    <DialogPrimitive.Root
      {...props}
      open={open ?? internalOpen}
      data-slot="dialog"
      disablePointerDismissal={!eager}
      onOpenChange={handleOpenChange}
    />
  );
}
export function DialogTrigger(props: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger {...props} data-slot="dialog-trigger" />;
}
export function DialogPortal(props: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal {...props} data-slot="dialog-portal" />;
}
export function DialogClose(props: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close {...props} data-slot="dialog-close" />;
}
export function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      {...props}
      data-slot="dialog-overlay"
      className={cn(styles.overlay, className)}
    />
  );
}
export function DialogContent({
  className,
  children,
  size = "md",
  glassy = false,
  showCloseButton = true,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        {...props}
        data-slot="dialog-content"
        data-size={size}
        data-glassy={glassy || undefined}
        className={cn(styles.content, className)}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close render={iconCloseButton}>
            <XIcon aria-hidden="true" />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}
export function DialogHeader({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} data-slot="dialog-header" className={cn(styles.header, className)} />;
}
export function DialogFooter({
  className,
  children,
  showCloseButton = false,
  ...props
}: DialogFooterProps) {
  return (
    <div {...props} data-slot="dialog-footer" className={cn(styles.footer, className)}>
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={footerCloseButton}>Close</DialogPrimitive.Close>
      )}
    </div>
  );
}
export function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      {...props}
      data-slot="dialog-title"
      className={cn(styles.title, className)}
    />
  );
}
export function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      {...props}
      data-slot="dialog-description"
      className={cn(styles.description, className)}
    />
  );
}
