import type { ComponentProps } from "react";

import type { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

export const dialogSizes = ["sm", "md", "lg", "xl"] as const;
export type DialogSize = (typeof dialogSizes)[number];
export type DialogProps = DialogPrimitive.Root.Props & { eager?: boolean };
export type DialogContentProps = DialogPrimitive.Popup.Props & {
  size?: DialogSize;
  glassy?: boolean;
  showCloseButton?: boolean;
};
export type DialogFooterProps = ComponentProps<"div"> & { showCloseButton?: boolean };
