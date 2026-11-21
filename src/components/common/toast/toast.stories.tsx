import { useCallback } from "react";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { useToast } from "@/hooks/use-toast";

import { Toaster } from "./index";
import { toastAlignments, toastColors } from "./toast.types";
import type { ToastAlign } from "./toast.types";

interface DemoProps {
  readonly align: ToastAlign;
  readonly duration: number;
  readonly type?: string;
}
function Trigger({ align, duration, type }: DemoProps) {
  const { add } = useToast();
  const show = useCallback(() => {
    add({
      title: "Vehicle saved",
      description: "The fleet has been updated.",
      align,
      duration,
      type,
    });
  }, [add, align, duration, type]);
  return (
    <button type="button" onClick={show}>
      Show toast
    </button>
  );
}
function Demo(props: DemoProps) {
  return (
    <Toaster>
      <Trigger {...props} />
    </Toaster>
  );
}

const meta = {
  title: "Shared/Common/Toast",
  component: Demo,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  args: { align: "top-center", duration: 3000 },
  argTypes: {
    align: {
      control: "select",
      options: toastAlignments,
      type: "string",
      description:
        "Per-toast viewport position. Defaults to top-center; start/end follow writing direction.",
    },
    duration: {
      control: "number",
      type: "number",
      description: "Auto-dismiss duration in milliseconds. Defaults to 3000; 0 is persistent.",
    },
    type: {
      control: "select",
      options: ["primary", "success", "info", "warning", "error", "loading"],
      type: "string",
      description:
        "Toast type controls both the status icon and glass color. Omitted, loading or unknown types use primary.",
    },
  },
  play: async ({ canvasElement, args }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Show toast" }));
    const popup = await within(document.body).findByRole("dialog", { name: "Vehicle saved" });
    await waitFor(() => expect(popup).toBeVisible());
    await expect(popup).toHaveAccessibleDescription("The fleet has been updated.");
    await expect(popup).toHaveAttribute("data-align", args.align);
    await expect(popup).toHaveAttribute(
      "data-color",
      toastColors.find((color) => color === args.type) ?? "primary",
    );
    await expect(getComputedStyle(popup).backdropFilter).toContain("blur");
    const group = popup.closest('[data-slot="toast-group"]');
    if (!(group instanceof HTMLElement)) throw new globalThis.Error("Missing position group");
    const bounds = group.getBoundingClientRect();
    if (args.align.startsWith("top-"))
      await expect(bounds.top).toBeLessThan(window.innerHeight / 2);
    else await expect(bounds.bottom).toBeGreaterThan(window.innerHeight / 2);
    if (args.align.endsWith("-center"))
      await expect(bounds.x + bounds.width / 2).toBeCloseTo(window.innerWidth / 2, 0);
  },
} satisfies Meta<typeof Demo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Primary: Story = { args: { type: "primary" } };
export const TopStart: Story = { args: { align: "top-start" } };
export const TopEnd: Story = { args: { align: "top-end" } };
export const BottomStart: Story = { args: { align: "bottom-start" } };
export const BottomCenter: Story = { args: { align: "bottom-center" } };
export const BottomEnd: Story = { args: { align: "bottom-end" } };
export const Success: Story = { args: { type: "success" } };
export const Info: Story = { args: { type: "info" } };
export const Warning: Story = { args: { type: "warning" } };
export const Error: Story = { args: { type: "error" } };
export const Loading: Story = { args: { type: "loading", duration: 0 } };
export const Persistent: Story = { args: { duration: 0 } };
export const Close: Story = {
  args: { duration: 0 },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Show toast" }));
    const popup = await within(document.body).findByRole("dialog", { name: "Vehicle saved" });
    await waitFor(() => expect(popup).toBeVisible());
    await userEvent.click(within(popup).getByRole("button", { name: "Close toast" }));
    await waitFor(() =>
      expect(
        within(document.body).queryByRole("dialog", { name: "Vehicle saved" }),
      ).not.toBeInTheDocument(),
    );
  },
};

function MultiPositionTrigger() {
  const { add } = useToast();
  const show = useCallback(() => {
    for (const align of toastAlignments) add({ title: `Toast ${align}`, align, duration: 0 });
  }, [add]);
  return (
    <button type="button" onClick={show}>
      Show every position
    </button>
  );
}
export const MixedPositions: Story = {
  render: () => (
    <Toaster limit={6}>
      <MultiPositionTrigger />
    </Toaster>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "Show every position" }),
    );
    await Promise.all(
      toastAlignments.map(async (align) => {
        const popup = await within(document.body).findByRole("dialog", { name: `Toast ${align}` });
        await waitFor(() => expect(popup).toBeVisible());
        await expect(popup.closest('[data-slot="toast-group"]')).toHaveAttribute(
          "data-align",
          align,
        );
      }),
    );
  },
};

function ColorTrigger() {
  const { add } = useToast();
  const show = useCallback(() => {
    for (const color of toastColors) {
      add({
        title: `Toast ${color}`,
        description: "Vehicle details updated.",
        type: color,
        duration: 0,
      });
    }
  }, [add]);
  return (
    <button type="button" onClick={show}>
      Show every color
    </button>
  );
}
const checkColors: Story["play"] = async ({ canvasElement }) => {
  await userEvent.click(within(canvasElement).getByRole("button", { name: "Show every color" }));
  await Promise.all(
    toastColors.map(async (color) => {
      const popup = await within(document.body).findByRole("dialog", { name: `Toast ${color}` });
      await waitFor(() => expect(popup).toBeVisible());
      await expect(popup).toHaveAttribute("data-color", color);
      await expect(popup).toHaveAccessibleDescription("Vehicle details updated.");
      await expect(getComputedStyle(popup).backdropFilter).toContain("blur");
    }),
  );
};
export const AllColors: Story = {
  render: () => (
    <Toaster limit={5}>
      <ColorTrigger />
    </Toaster>
  ),
  play: checkColors,
};
export const DarkColors: Story = {
  ...AllColors,
  beforeEach: () => {
    const wasDark = document.documentElement.classList.contains("dark");
    document.documentElement.classList.add("dark");
    return () => document.documentElement.classList.toggle("dark", wasDark);
  },
};
