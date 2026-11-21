import type { ComponentProps } from "react";

import type { Input } from "@base-ui/react/input";
import type { useRender } from "@base-ui/react/use-render";

import type { Button } from "@/components/ui/button";
import type { Separator } from "@/components/ui/separator";
import type { TooltipContent } from "@/components/ui/tooltip";
export const sidebarColors = ["primary", "neutral"] as const;
export type SidebarColor = (typeof sidebarColors)[number];

export const sidebarStates = ["expanded", "collapsed"] as const;
export const sidebarSides = ["left", "right"] as const;
export const sidebarVariants = ["sidebar", "floating", "inset"] as const;
export const sidebarCollapsible = ["offcanvas", "icon", "none"] as const;
export const sidebarMenuSizes = ["default", "sm", "lg"] as const;
export const sidebarMenuVariants = ["default", "outline"] as const;
export const sidebarSubSizes = ["sm", "md"] as const;
export type SidebarContextProps = {
  state: (typeof sidebarStates)[number];
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

export type SidebarMenuSubButtonProps = Readonly<
  useRender.ComponentProps<"a"> &
    ComponentProps<"a"> & {
      size?: (typeof sidebarSubSizes)[number];
      isActive?: boolean;
    }
>;

export type SidebarMenuSubItemProps = Readonly<ComponentProps<"li">>;

export type SidebarMenuSubProps = Readonly<ComponentProps<"ul">>;

export type SidebarMenuSkeletonProps = Readonly<
  ComponentProps<"div"> & {
    showIcon?: boolean;
  }
>;

export type SidebarMenuBadgeProps = Readonly<ComponentProps<"div">>;

export type SidebarMenuActionProps = Readonly<
  useRender.ComponentProps<"button"> &
    ComponentProps<"button"> & {
      showOnHover?: boolean;
    }
>;

export type SidebarMenuButtonProps = Readonly<
  useRender.ComponentProps<"button"> &
    ComponentProps<"button"> & {
      isActive?: boolean;
      tooltip?: string | ComponentProps<typeof TooltipContent>;
    } & {
      readonly size?: (typeof sidebarMenuSizes)[number];
      readonly variant?: (typeof sidebarMenuVariants)[number];
    }
>;

export type SidebarMenuItemProps = Readonly<ComponentProps<"li">>;

export type SidebarMenuProps = Readonly<ComponentProps<"ul">>;

export type SidebarGroupContentProps = Readonly<ComponentProps<"div">>;

export type SidebarGroupActionProps = Readonly<
  useRender.ComponentProps<"button"> & ComponentProps<"button">
>;

export type SidebarGroupLabelProps = Readonly<
  useRender.ComponentProps<"div"> & ComponentProps<"div">
>;

export type SidebarGroupProps = Readonly<ComponentProps<"div">>;

export type SidebarContentProps = Readonly<ComponentProps<"div">>;

export type SidebarSeparatorProps = Readonly<ComponentProps<typeof Separator>>;

export type SidebarFooterProps = Readonly<ComponentProps<"div">>;

export type SidebarHeaderProps = Readonly<ComponentProps<"div">>;

export type SidebarInputProps = Readonly<ComponentProps<typeof Input>>;

export type SidebarInsetProps = Readonly<ComponentProps<"main">>;

export type SidebarRailProps = Readonly<ComponentProps<"button">>;

export type SidebarTriggerProps = Readonly<
  Omit<ComponentProps<typeof Button>, "aria-label" | "loading" | "loadingText"> & {
    readonly "aria-label"?: string;
  }
>;

export type SidebarProps = Readonly<
  Omit<ComponentProps<"div">, "color"> & {
    /** Semantic surface color. Defaults to neutral. */
    readonly color?: SidebarColor;
    /** Use the shared glass material. Defaults to true. */
    readonly glassy?: boolean;
    side?: (typeof sidebarSides)[number];
    variant?: (typeof sidebarVariants)[number];
    collapsible?: (typeof sidebarCollapsible)[number];
  }
>;

export type SidebarProviderProps = Readonly<
  ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>;
