import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import { Label } from "./index";

const meta = {
  title: "Shared/UI/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  args: { children: "Vehicle", htmlFor: "vehicle" },
  argTypes: {
    children: { control: "text", type: "string", description: "Visible accessible label text." },
    htmlFor: { control: "text", type: "string", description: "ID of the associated control." },
    className: { control: "text", type: "string", description: "Additional CSS class." },
  },
  render: (args) => (
    <>
      <Label {...args} />
      <input id={args.htmlFor} />
    </>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("textbox", { name: "Vehicle" })).toBeVisible();
  },
} satisfies Meta<typeof Label>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const DisabledField: Story = {
  render: (args) => (
    <div data-disabled="true">
      <Label {...args} />
      <input id={args.htmlFor} disabled />
    </div>
  ),
};
export const DisabledPeer: Story = {
  render: (args) => (
    <div>
      <input id={args.htmlFor} disabled />
      <Label {...args} />
    </div>
  ),
};
export const NestedControl: Story = {
  render: () => (
    <Label>
      Vehicle
      <input />
    </Label>
  ),
};
