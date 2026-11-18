import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./index";

const sides = ["top", "right", "bottom", "left"] as const;
const aligns = ["start", "center", "end"] as const;

const meta = {
  title: "Shared/UI/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  argTypes: {
    modal: { control: "boolean", description: "Trap interaction within the popover." },
    defaultOpen: { control: "boolean", description: "Open on initial render." },
  },
  args: { modal: false, defaultOpen: false },
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>Open popover</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Vehicle details</PopoverTitle>
          <PopoverDescription>Current fleet information.</PopoverDescription>
        </PopoverHeader>
        <PopoverClose>Close popover</PopoverClose>
      </PopoverContent>
    </Popover>
  ),
} satisfies Meta<typeof Popover>;
export default meta;
type Story = StoryObj<typeof meta>;

async function openPopover(canvasElement: HTMLElement, triggerName = "Open popover") {
  await userEvent.click(within(canvasElement).getByRole("button", { name: triggerName }));
  const dialog = await within(document.body).findByRole("dialog", { name: "Vehicle details" });
  await waitFor(() => expect(dialog).toBeVisible());
  await expect(dialog).toHaveAccessibleDescription("Current fleet information.");
  return dialog;
}

export const Default: Story = {
  play: async ({ canvasElement }) => {
    await openPopover(canvasElement);
  },
};
export const InitiallyOpen: Story = {
  args: { defaultOpen: true },
  play: async () => {
    const dialog = await within(document.body).findByRole("dialog", { name: "Vehicle details" });
    await waitFor(() => expect(dialog).toBeVisible());
  },
};
export const Modal: Story = {
  args: { modal: true },
  play: async ({ canvasElement }) => {
    await openPopover(canvasElement);
  },
};
export const ClosesWithEscape: Story = {
  play: async ({ canvasElement }) => {
    await openPopover(canvasElement);
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(
        within(document.body).queryByRole("dialog", { name: "Vehicle details" }),
      ).not.toBeInTheDocument(),
    );
  },
};
export const ClosesWithButton: Story = {
  play: async ({ canvasElement }) => {
    const dialog = await openPopover(canvasElement);
    await userEvent.click(within(dialog).getByRole("button", { name: "Close popover" }));
    await waitFor(() =>
      expect(
        within(document.body).queryByRole("dialog", { name: "Vehicle details" }),
      ).not.toBeInTheDocument(),
    );
  },
};
export const Sides: Story = {
  render: () => (
    <div className="tw:flex tw:gap-4">
      {sides.map((side) => (
        <Popover key={side}>
          <PopoverTrigger>Open {side}</PopoverTrigger>
          <PopoverContent side={side}>
            <PopoverHeader>
              <PopoverTitle>Vehicle details</PopoverTitle>
              <PopoverDescription>Current fleet information.</PopoverDescription>
            </PopoverHeader>
            <PopoverClose>Close popover</PopoverClose>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const dialog = await openPopover(canvasElement, "Open top");
    await expect(dialog).toHaveAttribute("data-side");
  },
};
export const Alignments: Story = {
  render: () => (
    <div className="tw:flex tw:gap-4">
      {aligns.map((align) => (
        <Popover key={align}>
          <PopoverTrigger>Open {align}</PopoverTrigger>
          <PopoverContent align={align}>
            <PopoverHeader>
              <PopoverTitle>Vehicle details</PopoverTitle>
              <PopoverDescription>Current fleet information.</PopoverDescription>
            </PopoverHeader>
            <PopoverClose>Close popover</PopoverClose>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    await openPopover(canvasElement, "Open start");
  },
};
