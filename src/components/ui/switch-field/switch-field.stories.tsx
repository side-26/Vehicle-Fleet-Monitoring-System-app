import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { SwitchField } from "./index";
import { switchFieldColors, switchFieldSizes, switchFieldVariants } from "./switch-field.types";
const meta = {
  title: "Shared/UI/SwitchField",
  component: SwitchField,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  args: {
    label: "Live tracking",
    message: "Receive live vehicle positions",
    trueValueColor: "primary",
    falseValueColor: "error",
    size: "md",
    variant: "fill",
  },
  argTypes: {
    trueValueColor: {
      control: "select",
      options: switchFieldColors,
      type: "string",
      description: "Checked color; defaults to primary. Must differ from falseValueColor.",
    },
    falseValueColor: {
      control: "select",
      options: switchFieldColors,
      type: "string",
      description: "Unchecked color; defaults to error. Must differ from trueValueColor.",
    },
    size: {
      control: "select",
      options: switchFieldSizes,
      type: "string",
      description: "Field font size; defaults to md.",
    },
    variant: {
      control: "select",
      options: switchFieldVariants,
      type: "string",
      description: "Track treatment; defaults to fill.",
    },
    label: {
      control: "text",
      type: "string",
      description: "Optional visible label; defaults to empty.",
    },
    message: {
      control: "text",
      type: "string",
      description: "Optional helper message; defaults to empty.",
    },
    disabled: { control: "boolean", type: "boolean", description: "Disables interaction." },
    required: {
      control: "boolean",
      type: "boolean",
      description: "Requires the switch and displays a required marker.",
    },
  },
} satisfies Meta<typeof SwitchField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const control = within(canvasElement).getByRole("switch", { name: "Live tracking" });
    await expect(control).toHaveAccessibleDescription("Receive live vehicle positions");
    await userEvent.click(control);
    await expect(control).toBeChecked();
    await userEvent.keyboard(" ");
    await expect(control).not.toBeChecked();
  },
};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const ReadOnly: Story = { args: { readOnly: true, defaultChecked: true } };
export const Required: Story = { args: { required: true } };
export const Unlabeled: Story = { args: { label: "", message: "", "aria-label": "Live tracking" } };
export const Variants: Story = {
  render: () => (
    <>
      {switchFieldColors.flatMap((color) =>
        switchFieldVariants.flatMap((variant) =>
          switchFieldSizes.map((size) => (
            <SwitchField
              key={`${color}-${variant}-${size}`}
              {...(color === "error"
                ? ({ trueValueColor: "error", falseValueColor: "primary" } as const)
                : ({ trueValueColor: color, falseValueColor: "error" } as const))}
              variant={variant}
              size={size}
              label={`${color} ${variant} ${size}`}
              defaultChecked
            />
          )),
        ),
      )}
    </>
  ),
};
