import type { ComponentProps } from "react";

import type { Menu } from "@base-ui/react/menu";

export type DropdownMenuProps = Omit<Menu.Root.Props, "modal">;
export type DropdownMenuContentProps = Menu.Popup.Props &
  Pick<Menu.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">;
export type DropdownMenuItemProps = Menu.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
};
export type DropdownMenuLabelProps = Menu.GroupLabel.Props & { inset?: boolean };
export type DropdownMenuSubTriggerProps = Menu.SubmenuTrigger.Props & { inset?: boolean };
export type DropdownMenuCheckboxItemProps = Menu.CheckboxItem.Props & { inset?: boolean };
export type DropdownMenuRadioItemProps = Menu.RadioItem.Props & { inset?: boolean };
export type DropdownMenuShortcutProps = ComponentProps<"span">;
