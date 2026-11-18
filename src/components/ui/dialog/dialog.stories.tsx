import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Button } from "@/components/ui/button";

import { dialogSizes } from "./dialog.types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./index";

const openButton = <Button aria-label="Open dialog" />;
const glassButton = <Button aria-label="Open glass dialog" />;
const sizeButtons = dialogSizes.map((size) => (
  <Button key={size} aria-label={`Open ${size} dialog`} />
));

const meta = {
  title: "Shared/UI/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  argTypes: {
    eager: { control: "boolean", description: "Allow Escape and outside click to close." },
  },
  args: { eager: true },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger render={openButton}>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fleet settings</DialogTitle>
          <DialogDescription>Adjust fleet preferences.</DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  ),
} satisfies Meta<typeof Dialog>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Open dialog" }));
    await expect(
      within(document.body).getByRole("dialog", { name: "Fleet settings" }),
    ).toBeVisible();
  },
};
export const Sizes: Story = {
  render: () => (
    <div className="tw:flex tw:gap-2">
      {dialogSizes.map((size, index) => (
        <Dialog key={size}>
          <DialogTrigger render={sizeButtons[index]}>Open {size}</DialogTrigger>
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>{size} dialog</DialogTitle>
              <DialogDescription>Dialog size preview.</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await Promise.all(
      dialogSizes.map((size) =>
        expect(canvas.getByRole("button", { name: `Open ${size} dialog` })).toBeVisible(),
      ),
    );
  },
};
export const Glassy: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={glassButton}>Open glass dialog</DialogTrigger>
      <DialogContent glassy>
        <DialogHeader>
          <DialogTitle>Glass dialog</DialogTitle>
          <DialogDescription>Translucent surface.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Open glass dialog" }));
    await expect(
      within(document.body).getByRole("dialog", { name: "Glass dialog" }),
    ).toHaveAttribute("data-glassy", "true");
  },
};
export const Dismissible: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Open dialog" }));
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(
        within(document.body).queryByRole("dialog", { name: "Fleet settings" }),
      ).not.toBeInTheDocument(),
    );
  },
};
export const Persistent: Story = {
  args: { eager: false },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Open dialog" }));
    await userEvent.keyboard("{Escape}");
    await expect(
      within(document.body).getByRole("dialog", { name: "Fleet settings" }),
    ).toBeVisible();
    await userEvent.click(
      within(document.body).getByRole("button", { name: "Close dialog from footer" }),
    );
    await waitFor(() =>
      expect(
        within(document.body).queryByRole("dialog", { name: "Fleet settings" }),
      ).not.toBeInTheDocument(),
    );
  },
};
