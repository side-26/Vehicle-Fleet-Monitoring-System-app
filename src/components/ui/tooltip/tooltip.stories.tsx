import { useCallback, useState } from "react";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./index";
import { tooltipColors, tooltipSides, tooltipSizes } from "./tooltip.types";
import type { TooltipContentProps } from "./tooltip.types";

const galleryStyle = { display: "flex", flexWrap: "wrap", gap: "3rem", padding: "4rem" } as const;

const meta = {
  title: "Shared/UI/Tooltip",
  component: TooltipContent,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  args: {
    children: "View vehicle details",
    color: "neutral",
    size: "md",
    glassy: false,
    side: "top",
    align: "center",
  },
  argTypes: {
    color: {
      control: "select",
      options: tooltipColors,
      type: "string",
      description: "Semantic surface color. Defaults to neutral.",
      table: { defaultValue: { summary: "neutral" } },
    },
    size: {
      control: "select",
      options: tooltipSizes,
      type: "string",
      description: "Font-size scale; em spacing scales with it. Defaults to md.",
      table: { defaultValue: { summary: "md" } },
    },
    glassy: {
      control: "boolean",
      type: "boolean",
      description: "Use the shared translucent glass material. Defaults to false.",
    },
    children: {
      control: "text",
      type: "string",
      description: "Supplementary noninteractive hint text.",
    },
    side: {
      control: "select",
      options: tooltipSides,
      type: "string",
      description: "Preferred placement; automatically adjusts for collisions. Defaults to top.",
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
      type: "string",
      description: "Alignment to the trigger. Defaults to center.",
    },
    sideOffset: {
      control: "number",
      type: "number",
      description: "Base UI positioning gap in CSS pixels. Defaults to 4.",
    },
    alignOffset: {
      control: "number",
      type: "number",
      description: "Base UI alignment offset in CSS pixels. Defaults to 0.",
    },
    className: {
      control: "text",
      type: "string",
      description: "Additional layout class or Base UI state callback.",
    },
    render: { control: false, description: "Base UI popup element or render callback." },
  },
  render: (args) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>Vehicle details</TooltipTrigger>
        <TooltipContent {...args} />
      </Tooltip>
    </TooltipProvider>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.hover(within(canvasElement).getByRole("button", { name: "Vehicle details" }));
    await findVisibleHint("View vehicle details");
  },
} satisfies Meta<typeof TooltipContent>;
export default meta;
type Story = StoryObj<typeof meta>;

async function findVisibleHint(text: string) {
  const popup = await within(document.body).findByText(text);
  await waitFor(() => expect(popup).toBeVisible());
  return popup;
}

export const Default: Story = {};
export const Glassy: Story = {
  args: { glassy: true },
  play: async ({ canvasElement }) => {
    await userEvent.hover(within(canvasElement).getByRole("button", { name: "Vehicle details" }));
    const popup = await findVisibleHint("View vehicle details");
    await userEvent.hover(popup);
    // Both the initial value and an explicit identity scale leave the hint unchanged.
    await waitFor(() => expect(["none", "1"]).toContain(getComputedStyle(popup).scale));
    await expect(getComputedStyle(popup).cursor).toBe("default");
    await expect(getComputedStyle(popup).backdropFilter).toContain("blur");
  },
};

function SizeGallery(args: TooltipContentProps) {
  return (
    <section aria-label="Tooltip sizes" style={galleryStyle}>
      {tooltipSizes.map((size) => (
        <Tooltip key={size} open>
          <TooltipTrigger>{`${args.color} ${size}`}</TooltipTrigger>
          <TooltipContent {...args} size={size}>{`${args.color} ${size} hint`}</TooltipContent>
        </Tooltip>
      ))}
    </section>
  );
}

const checkGallery: Story["play"] = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByRole("region", { name: "Tooltip sizes" })).toBeVisible();
  const fontSizes = await Promise.all(
    tooltipSizes.map(async (size) => {
      await expect(canvas.getByRole("button", { name: `${args.color} ${size}` })).toBeVisible();
      const popup = await findVisibleHint(`${args.color} ${size} hint`);
      await expect(popup).toHaveAttribute("data-slot", "tooltip-content");
      await expect(popup).toBeVisible();
      await expect(popup).toHaveAttribute("data-glassy", String(args.glassy));
      const computed = getComputedStyle(popup);
      const fontSize = Number.parseFloat(computed.fontSize);

      await expect(Number.parseFloat(computed.paddingInlineStart)).toBeCloseTo(fontSize * 0.75, 1);
      await expect(Number.parseFloat(computed.paddingBlockStart)).toBeCloseTo(fontSize * 0.5, 1);
      if (args.glassy) await expect(computed.backdropFilter).toContain("blur");
      return fontSize;
    }),
  );
  expect(fontSizes).toEqual(fontSizes.toSorted((a, b) => a - b));
  expect(new Set(fontSizes).size).toBe(tooltipSizes.length);
};

export const Primary: Story = {
  args: { color: "primary" },
  render: SizeGallery,
  play: checkGallery,
};
export const Secondary: Story = {
  args: { color: "secondary" },
  render: SizeGallery,
  play: checkGallery,
};
export const Success: Story = {
  args: { color: "success" },
  render: SizeGallery,
  play: checkGallery,
};
export const Neutral: Story = {
  args: { color: "neutral" },
  render: SizeGallery,
  play: checkGallery,
};
export const Error: Story = { args: { color: "error" }, render: SizeGallery, play: checkGallery };
export const GlassyPrimary: Story = { ...Primary, args: { color: "primary", glassy: true } };
export const GlassySecondary: Story = { ...Secondary, args: { color: "secondary", glassy: true } };
export const GlassySuccess: Story = { ...Success, args: { color: "success", glassy: true } };
export const GlassyNeutral: Story = { ...Neutral, args: { color: "neutral", glassy: true } };
export const GlassyError: Story = { ...Error, args: { color: "error", glassy: true } };

export const KeyboardDismissal: Story = {
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", { name: "Vehicle details" });
    await userEvent.tab();
    await expect(trigger).toHaveFocus();
    await findVisibleHint("View vehicle details");
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(within(document.body).queryByText("View vehicle details")).not.toBeInTheDocument(),
    );
    await expect(trigger).toHaveFocus();
  },
};

export const Disabled: Story = {
  render: (args) => (
    <TooltipProvider>
      <Tooltip disabled>
        <TooltipTrigger>Unavailable hint</TooltipTrigger>
        <TooltipContent {...args} />
      </Tooltip>
    </TooltipProvider>
  ),
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", { name: "Unavailable hint" });
    await userEvent.hover(trigger);
    await userEvent.tab();
    await expect(trigger).toHaveFocus();
    await expect(within(document.body).queryByText("View vehicle details")).not.toBeInTheDocument();
  },
};

function ControlledExample(args: TooltipContentProps) {
  const [open, setOpen] = useState(false);
  const onOpenChange = useCallback((next: boolean) => setOpen(next), []);
  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={onOpenChange}>
        <TooltipTrigger>Controlled hint</TooltipTrigger>
        <TooltipContent {...args} />
      </Tooltip>
    </TooltipProvider>
  );
}
export const Controlled: Story = {
  render: ControlledExample,
  play: async ({ canvasElement }) => {
    await userEvent.hover(within(canvasElement).getByRole("button", { name: "Controlled hint" }));
    await findVisibleHint("View vehicle details");
    await userEvent.unhover(within(canvasElement).getByRole("button"));
    await waitFor(() =>
      expect(within(document.body).queryByText("View vehicle details")).not.toBeInTheDocument(),
    );
  },
};

export const Placement: Story = {
  render: (args) => (
    <section aria-label="Tooltip placement" style={galleryStyle}>
      {tooltipSides.map((side) => (
        <Tooltip key={side} open>
          <TooltipTrigger>{side}</TooltipTrigger>
          <TooltipContent {...args} side={side}>{`${side} hint`}</TooltipContent>
        </Tooltip>
      ))}
    </section>
  ),
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole("region", { name: "Tooltip placement" }),
    ).toBeVisible();
    await Promise.all(
      tooltipSides.map(async (side) => {
        await expect(within(canvasElement).getByRole("button", { name: side })).toBeVisible();
        await findVisibleHint(`${side} hint`);
      }),
    );
  },
};
