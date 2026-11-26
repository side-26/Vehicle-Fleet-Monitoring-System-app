"use client";

import { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";
import type { CSSProperties } from "react";

import { Dialog } from "@base-ui/react/dialog";
import { Input } from "@base-ui/react/input";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { PanelLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import type {
  SidebarContextProps,
  SidebarProps,
  SidebarMenuSubButtonProps,
  SidebarMenuSubItemProps,
  SidebarMenuSubProps,
  SidebarMenuSkeletonProps,
  SidebarMenuBadgeProps,
  SidebarMenuActionProps,
  SidebarMenuButtonProps,
  SidebarMenuItemProps,
  SidebarMenuProps,
  SidebarGroupContentProps,
  SidebarGroupActionProps,
  SidebarGroupLabelProps,
  SidebarGroupProps,
  SidebarContentProps,
  SidebarSeparatorProps,
  SidebarFooterProps,
  SidebarHeaderProps,
  SidebarInputProps,
  SidebarInsetProps,
  SidebarRailProps,
  SidebarTriggerProps,
  SidebarProviderProps,
} from "./sidebar.types";
import styles from "./styles.module.css";

const skeletonStyle = { inlineSize: "70%" } satisfies CSSProperties;
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";

const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

const SidebarContext = createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      setOpenProp?.(openState);
      if (openProp === undefined) _setOpen(openState);

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open, openProp],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = useCallback(() => {
    return isMobile
      ? setOpenMobile((previousOpen) => !previousOpen)
      : setOpen((previousOpen) => !previousOpen);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

  const contextValue = useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  );

  const providerStyle = useMemo(
    () =>
      ({
        "--sidebar-width": SIDEBAR_WIDTH,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        ...style,
      }) satisfies CSSProperties & Record<string, unknown>,
    [style],
  );
  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={providerStyle}
        className={cn(styles.wrapper, className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

function Sidebar({
  color = "neutral",
  glassy = true,
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  dir,
  ...props
}: SidebarProps) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        dir={dir}
        data-side={side}
        data-color={color}
        data-glassy={glassy}
        data-slot="sidebar"
        className={cn(styles.staticPanel, styles.surface, className)}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Dialog.Root open={openMobile} onOpenChange={setOpenMobile}>
        <Dialog.Portal>
          <Dialog.Backdrop className={styles.backdrop} />
          <Dialog.Popup
            dir={dir}
            data-slot="sidebar"
            data-mobile="true"
            data-side={side}
            data-color={color}
            data-glassy={glassy}
            className={cn(styles.mobile, styles.surface, className)}
            {...props}
          >
            <Dialog.Title className={styles.srOnly}>Sidebar</Dialog.Title>
            <Dialog.Description className={styles.srOnly}>
              Application navigation.
            </Dialog.Description>
            <Dialog.Close aria-label="Close sidebar">Close</Dialog.Close>
            {children}
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }

  return (
    <div
      className={cn("group", "peer", styles.outer)}
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          styles.gap,
          styles.offcanvasGap,
          styles.rightGap,
          variant === "floating" || variant === "inset" ? styles.paddedIconGap : styles.iconGap,
        )}
      />
      <div
        dir={dir}
        inert={state === "collapsed" && collapsible === "offcanvas"}
        data-slot="sidebar-container"
        data-side={side}
        className={cn(
          styles.panel,
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset" ? styles.paddedPanel : styles.borderedPanel,
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          data-side={side}
          data-color={color}
          data-glassy={glassy}
          className={cn(styles.inner, styles.surface)}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarTrigger({ className, onClick, ...props }: SidebarTriggerProps) {
  const { toggleSidebar, isMobile, openMobile, open } = useSidebar();

  const handleClick = useCallback<NonNullable<SidebarTriggerProps["onClick"]>>(
    (event) => {
      onClick?.(event);
      if (!event.defaultPrevented) toggleSidebar();
    },
    [onClick, toggleSidebar],
  );
  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="sm"
      aria-label="Toggle Sidebar"
      aria-expanded={isMobile ? openMobile : open}
      className={cn(className)}
      onClick={handleClick}
      {...props}
    >
      <PanelLeftIcon />
      <span className={styles.triggerLabel}>Toggle Sidebar</span>
    </Button>
  );
}

function SidebarRail({ className, ...props }: SidebarRailProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        styles.rail,
        styles.railCursor,
        styles.collapsedCursor,
        styles.offcanvasRail,
        styles.startRail,
        styles.endRail,
        className,
      )}
      {...props}
    />
  );
}

function SidebarInset({ className, ...props }: SidebarInsetProps) {
  return <main data-slot="sidebar-inset" className={cn(styles.inset, className)} {...props} />;
}

function SidebarInput({ className, ...props }: SidebarInputProps) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn(styles.input, className)}
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn(styles.header, className)}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn(styles.footer, className)}
      {...props}
    />
  );
}

function SidebarSeparator({ className, ...props }: SidebarSeparatorProps) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn(styles.separator, className)}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: SidebarContentProps) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(styles.content, className)}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: SidebarGroupProps) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn(styles.group, className)}
      {...props}
    />
  );
}

function SidebarGroupLabel({ className, render, ...props }: SidebarGroupLabelProps) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(styles.groupLabel, className),
      },
      props,
    ),
    render,
    state: {
      slot: "sidebar-group-label",
      sidebar: "group-label",
    },
  });
}

function SidebarGroupAction({ className, render, ...props }: SidebarGroupActionProps) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(styles.groupAction, className),
      },
      props,
    ),
    render,
    state: {
      slot: "sidebar-group-action",
      sidebar: "group-action",
    },
  });
}

function SidebarGroupContent({ className, ...props }: SidebarGroupContentProps) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn(styles.groupContent, className)}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn(styles.menu, className)}
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item", styles.menuItem, className)}
      {...props}
    />
  );
}

function SidebarMenuButton({
  render,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: SidebarMenuButtonProps) {
  const { isMobile, state } = useSidebar();
  const comp = useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          styles.menuButton,
          styles[size],
          variant === "outline" && styles.outline,
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: "sidebar-menu-button",
      sidebar: "menu-button",
      size,
      active: isActive,
    },
  });

  if (!tooltip) {
    return comp;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger render={comp} />
      <TooltipContent
        side="inline-end"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
}

function SidebarMenuAction({
  className,
  render,
  showOnHover = false,
  ...props
}: SidebarMenuActionProps) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(styles.menuAction, showOnHover && styles.actionOnHover, className),
      },
      props,
    ),
    render,
    state: {
      slot: "sidebar-menu-action",
      sidebar: "menu-action",
    },
  });
}

function SidebarMenuBadge({ className, ...props }: SidebarMenuBadgeProps) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(styles.badge, className)}
      {...props}
    />
  );
}

function SidebarMenuSkeleton({ className, showIcon = false, ...props }: SidebarMenuSkeletonProps) {
  // Random width between 50 to 90%.

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn(styles.skeleton, className)}
      {...props}
    >
      {showIcon && <span className={styles.skeletonIcon} data-sidebar="menu-skeleton-icon" />}
      <span
        className={styles.skeletonText}
        data-sidebar="menu-skeleton-text"
        style={skeletonStyle}
      />
    </div>
  );
}

function SidebarMenuSub({ className, ...props }: SidebarMenuSubProps) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(styles.subMenu, className)}
      {...props}
    />
  );
}

function SidebarMenuSubItem({ className, ...props }: SidebarMenuSubItemProps) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn(styles.subItem, className)}
      {...props}
    />
  );
}

function SidebarMenuSubButton({
  render,
  size = "md",
  isActive = false,
  className,
  ...props
}: SidebarMenuSubButtonProps) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(styles.subButton, className),
      },
      props,
    ),
    render,
    state: {
      slot: "sidebar-menu-sub-button",
      sidebar: "menu-sub-button",
      size,
      active: isActive,
    },
  });
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
