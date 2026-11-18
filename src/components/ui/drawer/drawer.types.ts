import type { ComponentProps } from "react";

import type { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";

export interface DrawerContextValue {
  readonly hasSnapPoints: boolean;
  readonly modal: DrawerPrimitive.Root.Props["modal"];
  readonly showSwipeHandle: boolean;
  readonly swipeDirection: NonNullable<DrawerPrimitive.Root.Props["swipeDirection"]>;
}

export type DrawerProps = DrawerPrimitive.Root.Props & { showSwipeHandle?: boolean };
export type DrawerContentProps = DrawerPrimitive.Popup.Props;
export type DrawerSwipeHandleProps = ComponentProps<"div">;
