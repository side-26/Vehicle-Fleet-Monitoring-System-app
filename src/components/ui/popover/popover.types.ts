import type { ComponentProps } from "react";

import type { Popover as PopoverPrimitive } from "@base-ui/react/popover";

export type PopoverProps = PopoverPrimitive.Root.Props;
export type PopoverContentProps = PopoverPrimitive.Popup.Props &
  Pick<PopoverPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">;
export type PopoverHeaderProps = ComponentProps<"div">;
