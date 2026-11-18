import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./index";

const directions = ["down", "up", "left", "right"] as const;

const meta = {
  title: "Shared/UI/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  argTypes: {
    swipeDirection: {
      control: "select",
      options: directions,
      type: { name: "enum", value: [...directions] },
      description: "Edge and swipe-to-dismiss direction.",
    },
    modal: { control: "boolean", description: "Trap focus and display a backdrop." },
    showSwipeHandle: { control: "boolean", description: "Show the visual swipe affordance." },
  },
  args: { swipeDirection: "down", modal: true, showSwipeHandle: false },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger>Open drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Fleet filters</DrawerTitle>
          <DrawerDescription>Choose vehicles to display.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>Close drawer</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
} satisfies Meta<typeof Drawer>;
export default meta;
type Story = StoryObj<typeof meta>;

async function expectOpen(canvasElement: HTMLElement, triggerName = "Open drawer") {
  await userEvent.click(within(canvasElement).getByRole("button", { name: triggerName }));
  const dialog = await within(document.body).findByRole("dialog", { name: "Fleet filters" });
  await expect(dialog).toBeVisible();
  await expect(within(dialog).getByText("Choose vehicles to display.")).toBeVisible();
  return dialog;
}

export const Default: Story = {
  play: async ({ canvasElement }) => {
    await expectOpen(canvasElement);
  },
};
export const WithSwipeHandle: Story = {
  args: { showSwipeHandle: true },
  play: async ({ canvasElement }) => {
    const dialog = await expectOpen(canvasElement);
    await expect(dialog.querySelector('[data-slot="drawer-swipe-handle"]')).toBeInTheDocument();
  },
};
export const NonModal: Story = {
  args: { modal: false },
  play: async ({ canvasElement }) => {
    const dialog = await expectOpen(canvasElement);
    await expect(dialog.closest('[data-slot="drawer-viewport"]')).toHaveAttribute(
      "data-modal",
      "false",
    );
    await expect(document.querySelector('[data-slot="drawer-overlay"]')).not.toBeInTheDocument();
  },
};
export const SnapPoints: Story = {
  args: { snapPoints: [0.35, 1], showSwipeHandle: true },
  play: async ({ canvasElement }) => {
    const dialog = await expectOpen(canvasElement);
    await expect(dialog).toHaveAttribute("data-snap-points");
  },
};
export const Directions: Story = {
  render: () => (
    <div className="tw:flex tw:gap-2">
      {directions.map((direction) => (
        <Drawer key={direction} swipeDirection={direction}>
          <DrawerTrigger>Open {direction}</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Fleet filters</DrawerTitle>
              <DrawerDescription>{direction} drawer</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>Close drawer</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const dialog = await expectOpen(canvasElement, "Open down");
    await expect(dialog).toHaveAttribute("data-swipe-direction", "down");
    await userEvent.click(within(dialog).getByRole("button", { name: "Close drawer" }));
    await waitFor(() =>
      expect(
        within(document.body).queryByRole("dialog", { name: "Fleet filters" }),
      ).not.toBeInTheDocument(),
    );
  },
};
export const DismissWithEscape: Story = {
  play: async ({ canvasElement }) => {
    await expectOpen(canvasElement);
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(
        within(document.body).queryByRole("dialog", { name: "Fleet filters" }),
      ).not.toBeInTheDocument(),
    );
  },
};
