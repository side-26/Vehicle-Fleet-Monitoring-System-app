import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import { Button } from "@/components/ui/button";

import { Spinner } from "./index";
import styles from "./styles.module.css";

const meta = {
  title: "Shared/UI/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  argTypes: {
    "aria-label": {
      control: "text",
      description: "Accessible description of the loading operation.",
    },
    className: { control: false, description: "CSS class for custom size or color." },
  },
  args: { "aria-label": "Loading" },
} satisfies Meta<typeof Spinner>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("status", { name: "Loading" })).toBeVisible();
  },
};
export const CustomLabel: Story = {
  args: { "aria-label": "Loading vehicles" },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole("status", { name: "Loading vehicles" }),
    ).toBeVisible();
  },
};
export const Sizes: Story = {
  render: () => (
    <div className="tw:flex tw:items-center tw:gap-4">
      <Spinner aria-label="Small loading indicator" className={styles.small} />
      <Spinner aria-label="Default loading indicator" />
      <Spinner aria-label="Large loading indicator" className={styles.large} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await Promise.all(
      ["Small loading indicator", "Default loading indicator", "Large loading indicator"].map(
        (name) => expect(canvas.getByRole("status", { name })).toBeVisible(),
      ),
    );
  },
};
export const InButton: Story = {
  render: () => (
    <Button aria-label="Saving changes" disabled>
      <Spinner aria-hidden="true" data-icon="inline-start" />
      Saving changes
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Saving changes" });
    await expect(button).toBeDisabled();
    await expect(button.querySelector('[data-slot="spinner"]')).toBeVisible();
  },
};
export const AfterButtonLabel: Story = {
  render: () => (
    <Button aria-label="Loading report" disabled>
      Loading report
      <Spinner aria-hidden="true" data-icon="inline-end" />
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Loading report" });
    await expect(button).toBeDisabled();
    await expect(button.querySelector('[data-icon="inline-end"]')).toBeVisible();
  },
};
