import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import { dotBadgeColors, dotBadgePositions, dotBadgeSizes } from "./dot-badge.types";
import { DotBadge } from "./index";
import styles from "./styles.module.css";

const meta = {
  title: "Shared/UI/DotBadge",
  component: DotBadge,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  argTypes: {
    size: {
      control: "select",
      options: dotBadgeSizes,
      type: "string",
      description: "Dot diameter: sm (default) or lg.",
    },
    position: {
      control: "select",
      options: dotBadgePositions,
      type: "string",
      description:
        "Optional logical corner of a positioned ancestor. Omit for inline placement. Start/end follow writing direction.",
    },
    color: {
      control: "select",
      options: dotBadgeColors,
      type: "string",
      description: "Semantic fill color; defaults to primary.",
    },
    "aria-label": {
      control: "text",
      type: "string",
      description: "Accessible status name; omit for a decorative dot.",
    },
    "aria-hidden": {
      control: "boolean",
      type: "boolean",
      description: "Override automatic decorative visibility.",
    },
    "aria-labelledby": {
      control: "text",
      type: "string",
      description: "ID of an external accessible label.",
    },
    className: { control: false, type: "string", description: "Additional layout class." },
  },
  args: { size: "sm", color: "primary", "aria-label": "Status indicator" },
  render: (args) => (
    <div className={styles.preview}>
      <DotBadge {...args} />
      <span>
        {args.size} · {args.color}
      </span>
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("img", { name: "Status indicator" })).toBeVisible();
    await expect(canvas.getByText(`${args.size} · ${args.color}`)).toBeVisible();
    if (args.position) {
      const dot = canvas.getByRole("img", { name: "Status indicator" });
      const parent = dot.parentElement;
      if (!parent) throw new Error("Missing positioned ancestor");
      const bounds = dot.getBoundingClientRect();
      const frame = parent.getBoundingClientRect();
      await expect(getComputedStyle(dot).position).toBe("absolute");
      await expect(
        args.position.startsWith("top") ? bounds.top - frame.top : frame.bottom - bounds.bottom,
      ).toBeCloseTo(4, 0);
      await expect(
        args.position.endsWith("start") ? bounds.left - frame.left : frame.right - bounds.right,
      ).toBeCloseTo(4.8, 0);
    }
  },
} satisfies Meta<typeof DotBadge>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const SmPrimary: Story = { args: { size: "sm", color: "primary" } };
export const SmSecondary: Story = { args: { size: "sm", color: "secondary" } };
export const SmSuccess: Story = { args: { size: "sm", color: "success" } };
export const SmError: Story = { args: { size: "sm", color: "error" } };
export const SmNeutral: Story = { args: { size: "sm", color: "neutral" } };
export const LgPrimary: Story = { args: { size: "lg", color: "primary" } };
export const LgSecondary: Story = { args: { size: "lg", color: "secondary" } };
export const LgSuccess: Story = { args: { size: "lg", color: "success" } };
export const LgError: Story = { args: { size: "lg", color: "error" } };
export const LgNeutral: Story = { args: { size: "lg", color: "neutral" } };
export const Decorative: Story = {
  args: { "aria-label": undefined },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryByRole("img")).toBeNull();
    await expect(canvasElement.querySelector('[data-slot="dot-badge"]')).toBeVisible();
  },
};

export const TopStart: Story = { args: { position: "top-start" } };
export const TopEnd: Story = { args: { position: "top-end" } };
export const BottomStart: Story = { args: { position: "bottom-start" } };
export const BottomEnd: Story = { args: { position: "bottom-end" } };
export const RightToLeft: Story = {
  render: () => (
    <div dir="rtl">
      {dotBadgePositions.map((position) => (
        <div key={position} className={styles.preview}>
          <DotBadge position={position} aria-label={position} />
          <span>{position}</span>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    await Promise.all(
      dotBadgePositions.map(async (position) => {
        const dot = within(canvasElement).getByRole("img", { name: position });
        await expect(dot).toBeVisible();
        const parent = dot.parentElement;
        if (!parent) throw new Error("Missing positioned ancestor");
        const bounds = dot.getBoundingClientRect();
        const frame = parent.getBoundingClientRect();
        await expect(
          position.endsWith("start") ? frame.right - bounds.right : bounds.left - frame.left,
        ).toBeCloseTo(4.8, 0);
        await expect(
          position.startsWith("top") ? bounds.top - frame.top : frame.bottom - bounds.bottom,
        ).toBeCloseTo(4, 0);
      }),
    );
  },
};
