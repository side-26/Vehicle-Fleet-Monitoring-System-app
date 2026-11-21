import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "./index";
import { sidebarColors, sidebarVariants, sidebarSides, sidebarCollapsible } from "./sidebar.types";
const meta = {
  title: "Shared/UI/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  args: {
    color: "neutral",
    glassy: true,
    variant: "sidebar",
    side: "left",
    collapsible: "offcanvas",
  },
  argTypes: {
    color: {
      control: "select",
      options: sidebarColors,
      type: "string",
      description: "Semantic surface color; defaults to neutral.",
    },
    glassy: {
      control: "boolean",
      type: "boolean",
      description: "Shared glass material; defaults to true.",
    },
    variant: {
      control: "select",
      options: sidebarVariants,
      type: "string",
      description: "Surface arrangement; defaults to sidebar.",
    },
    side: {
      control: "select",
      options: sidebarSides,
      type: "string",
      description: "Navigation edge; defaults to left.",
    },
    collapsible: {
      control: "select",
      options: sidebarCollapsible,
      type: "string",
      description: "Collapse behavior; defaults to offcanvas.",
    },
  },
  play: async ({ canvasElement, args }) => {
    const surface = canvasElement.querySelector<HTMLElement>("[data-color][data-side]");
    if (!surface) throw new Error("Missing sidebar surface");
    const style = getComputedStyle(surface);
    const exposedRadius =
      args.side === "right" ? style.borderStartStartRadius : style.borderStartEndRadius;
    const attachedRadius =
      args.side === "right" ? style.borderStartEndRadius : style.borderStartStartRadius;
    await expect(parseFloat(exposedRadius)).toBeGreaterThan(0);
    await expect(parseFloat(attachedRadius)).toBe(0);
  },
  render: (args) => (
    <SidebarProvider>
      <Sidebar {...args}>
        <SidebarHeader>Fleet</SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>Vehicles</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Drivers</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton disabled>Reports</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <SidebarTrigger />
        <h1>Fleet dashboard</h1>
      </SidebarInset>
    </SidebarProvider>
  ),
} satisfies Meta<typeof Sidebar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Toggle Sidebar" });
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  },
};
export const Floating: Story = { args: { color: "neutral", glassy: true, variant: "floating" } };
export const Inset: Story = { args: { color: "neutral", glassy: true, variant: "inset" } };
export const Icon: Story = { args: { collapsible: "icon" } };
export const Fixed: Story = { args: { collapsible: "none" } };
export const Right: Story = { args: { side: "right" } };

async function checkPrimaryHover({ canvasElement }: { readonly canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);
  const item = canvas.getByRole("button", { name: "Drivers" });
  const active = canvas.getByRole("button", { name: "Vehicles" });
  if (import.meta.env.MODE !== "test") return;
  const { page } = await import("vitest/browser");
  await page.getByRole("button", { name: "Drivers", exact: true }).hover();
  await expect(getComputedStyle(item).color).toBe(getComputedStyle(active).color);
  await expect(getComputedStyle(item).backgroundColor).toBe(
    getComputedStyle(active).backgroundColor,
  );
  await expect(getComputedStyle(item).color).not.toBe(getComputedStyle(item).backgroundColor);
}
export const Primary: Story = { args: { color: "primary" }, play: checkPrimaryHover };
export const NeutralSolid: Story = { args: { color: "neutral", glassy: false } };
export const PrimarySolid: Story = {
  args: { color: "primary", glassy: false },
  play: checkPrimaryHover,
};
