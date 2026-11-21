import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";

import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./index";
beforeEach(() => {
  vi.stubGlobal("matchMedia", () => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});
it("toggles desktop navigation with its trigger and shortcut", () => {
  render(
    <SidebarProvider>
      <SidebarTrigger />
      <Sidebar collapsible="icon">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive>Vehicles</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>
    </SidebarProvider>,
  );
  const trigger = screen.getByRole("button", { name: "Toggle Sidebar" });
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  fireEvent.click(trigger);
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  expect(document.cookie).toContain("sidebar_state=false");
  fireEvent.keyDown(window, { key: "b", ctrlKey: true });
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("button", { name: "Vehicles" })).toHaveAttribute("data-active");
});
it("preserves controlled state and forwards change requests", () => {
  const onOpenChange = vi.fn<(value: boolean) => void>();
  render(
    <SidebarProvider open={false} onOpenChange={onOpenChange}>
      <SidebarTrigger />
      <Sidebar collapsible="none">Navigation</Sidebar>
    </SidebarProvider>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Toggle Sidebar" }));
  expect(onOpenChange).toHaveBeenCalledWith(true);
  expect(screen.getByRole("button", { name: "Toggle Sidebar" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});

it("opens mobile navigation and dismisses it with its close button", async () => {
  vi.stubGlobal("innerWidth", 500);
  render(
    <SidebarProvider>
      <SidebarTrigger />
      <Sidebar>
        <button type="button">Vehicles</button>
      </Sidebar>
    </SidebarProvider>,
  );
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Toggle Sidebar" }));
  expect(await screen.findByRole("dialog", { name: "Sidebar" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Close sidebar" }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  vi.unstubAllGlobals();
});

it.each(["primary", "neutral"] as const)("supports %s with glass enabled or disabled", (color) => {
  const { container, rerender } = render(
    <SidebarProvider>
      <Sidebar color={color}>Navigation</Sidebar>
    </SidebarProvider>,
  );
  expect(container.querySelector("[data-color]")).toHaveAttribute("data-color", color);
  expect(container.querySelector("[data-glassy]")).toHaveAttribute("data-glassy", "true");
  rerender(
    <SidebarProvider>
      <Sidebar color={color} glassy={false}>
        Navigation
      </Sidebar>
    </SidebarProvider>,
  );
  expect(container.querySelector("[data-glassy]")).toHaveAttribute("data-glassy", "false");
});
