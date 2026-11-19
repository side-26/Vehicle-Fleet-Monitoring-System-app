import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import { fieldSizes } from "@/components/ui/field/field.types";

import { checkboxFieldColors } from "./checkbox-field.types";
import { CheckboxField } from "./index";

const meta = {
  title: "Shared/UI/CheckboxField",
  component: CheckboxField,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  args: {
    label: "Accept terms and conditions",
    message: "By clicking this checkbox, you agree to the terms.",
  },
  argTypes: {
    size: {
      control: "select",
      options: fieldSizes,
      type: { name: "enum", value: [...fieldSizes] },
      description: "Field size; defaults to md.",
    },
    color: {
      control: "select",
      options: checkboxFieldColors,
      type: { name: "enum", value: [...checkboxFieldColors] },
      description: "Semantic color; defaults to primary.",
    },
    label: { control: "text", type: "string", description: "Optional visible label." },
    message: { control: "text", type: "string", description: "Helper or validation message." },
    haveMessage: {
      control: "boolean",
      type: "boolean",
      description: "Reserve message space; defaults to true.",
    },
    disabled: { control: "boolean", type: "boolean", description: "Disable interaction." },
    required: {
      control: "boolean",
      type: "boolean",
      description: "Require selection and show a required marker.",
    },
    indeterminate: {
      control: "boolean",
      type: "boolean",
      description: "Show mixed selection state.",
    },
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getAllByRole("checkbox")[0]).toBeVisible();
  },
} satisfies Meta<typeof CheckboxField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Required: Story = { args: { required: true } };
export const Indeterminate: Story = { args: { indeterminate: true } };
export const WithoutMessage: Story = { args: { haveMessage: false } };
export const WithoutLabel: Story = { args: { label: "", "aria-label": "Accept terms" } };
export const SizesAndColors: Story = {
  render: (args) => (
    <>
      {fieldSizes.flatMap((size) =>
        checkboxFieldColors.map((color) => (
          <CheckboxField
            {...args}
            key={`${size}-${color}`}
            size={size}
            color={color}
            label={`${size} ${color}`}
          />
        )),
      )}
    </>
  ),
};
