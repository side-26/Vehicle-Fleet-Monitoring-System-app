"use client";

import { createContext, useContext, useMemo } from "react";
import type { ComponentProps } from "react";

import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";

import { cn } from "@/lib/utils";

import type {
  DrawerContentProps,
  DrawerContextValue,
  DrawerProps,
  DrawerSwipeHandleProps,
} from "./drawer.types";
import styles from "./styles.module.css";

const DrawerContext = createContext<DrawerContextValue | null>(null);

function useDrawer() {
  const context = useContext(DrawerContext);
  if (!context) throw new Error("DrawerContent must be used within Drawer.");
  return context;
}

export function Drawer({
  modal = true,
  showSwipeHandle = false,
  snapPoints,
  swipeDirection = "down",
  ...props
}: DrawerProps) {
  const hasSnapPoints = Boolean(snapPoints?.length);
  const context = useMemo(
    () => ({ hasSnapPoints, modal, showSwipeHandle, swipeDirection }),
    [hasSnapPoints, modal, showSwipeHandle, swipeDirection],
  );
  return (
    <DrawerContext.Provider value={context}>
      <DrawerPrimitive.Root
        {...props}
        data-slot="drawer"
        modal={modal}
        snapPoints={snapPoints}
        swipeDirection={swipeDirection}
      />
    </DrawerContext.Provider>
  );
}

export function DrawerTrigger(props: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger {...props} data-slot="drawer-trigger" />;
}
export function DrawerPortal(props: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal {...props} data-slot="drawer-portal" />;
}
export function DrawerClose(props: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close {...props} data-slot="drawer-close" />;
}
export function DrawerOverlay({ className, ...props }: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      {...props}
      data-slot="drawer-overlay"
      className={cn(styles.overlay, className)}
    />
  );
}
export function DrawerSwipeHandle({ className, ...props }: DrawerSwipeHandleProps) {
  return (
    <div
      {...props}
      data-slot="drawer-swipe-handle"
      aria-hidden="true"
      className={cn(styles.swipeHandle, className)}
    />
  );
}

export function DrawerContent({ className, children, ...props }: DrawerContentProps) {
  const { hasSnapPoints, modal, showSwipeHandle, swipeDirection } = useDrawer();
  const swipeAxis = swipeDirection === "down" || swipeDirection === "up" ? "y" : "x";
  return (
    <DrawerPortal>
      {modal === true && <DrawerOverlay data-snap-points={hasSnapPoints || undefined} />}
      <DrawerPrimitive.Viewport
        data-slot="drawer-viewport"
        data-modal={modal}
        className={styles.viewport}
      >
        <DrawerPrimitive.Popup
          {...props}
          data-slot="drawer-popup"
          data-swipe-axis={swipeAxis}
          data-snap-points={hasSnapPoints || undefined}
          className={cn(styles.popup, className)}
        >
          {showSwipeHandle && <DrawerSwipeHandle />}
          <DrawerPrimitive.Content data-slot="drawer-content" className={styles.content}>
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  );
}
export function DrawerHeader({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} data-slot="drawer-header" className={cn(styles.header, className)} />;
}
export function DrawerFooter({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} data-slot="drawer-footer" className={cn(styles.footer, className)} />;
}
export function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      {...props}
      data-slot="drawer-title"
      className={cn(styles.title, className)}
    />
  );
}
export function DrawerDescription({ className, ...props }: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      {...props}
      data-slot="drawer-description"
      className={cn(styles.description, className)}
    />
  );
}
