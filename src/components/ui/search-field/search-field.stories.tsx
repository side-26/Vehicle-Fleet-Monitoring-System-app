import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import { SearchField } from "./index";

const meta = {
  title: "Shared/UI/SearchField",
  component: SearchField,
  args: { "aria-label": "Search fleet", placeholder: "Search fleet" },
  parameters: { a11y: { test: "error" } },
  argTypes: {
    clearLabel: {
      control: "text",
      type: "string",
      description: "Accessible name of the clear button.",
    },
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getAllByRole("searchbox")[0]).toBeVisible();
  },
} satisfies Meta<typeof SearchField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true, defaultValue: "Truck" } };
export const ReadOnly: Story = { args: { readOnly: true, defaultValue: "Truck" } };
