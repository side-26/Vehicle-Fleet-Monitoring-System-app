import { useCallback, useState } from "react";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { fieldSizes } from "@/components/ui/field/field.types";
import { InputGroupAddon, InputGroupText } from "@/components/ui/input-group";

import { TextField } from "./index";
import { textFieldColors, textFieldVariants } from "./text-field.types";

const meta = {
  title: "Shared/UI/TextField",
  component: TextField,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  args: {
    haveMessage: true,
    label: "Vehicle name",
    message: "Enter the fleet identifier.",
    size: "md",
    color: "neutral",
    variant: "outline",
  },
  argTypes: {
    haveMessage: {
      control: "boolean",
      type: "boolean",
      description: "Reserve a description line; defaults to true.",
    },
    size: {
      control: "select",
      options: fieldSizes,
      type: { name: "enum", value: [...fieldSizes] },
      description: "Field font size; defaults to md.",
    },
    color: {
      control: "select",
      options: textFieldColors,
      type: { name: "enum", value: [...textFieldColors] },
      description: "Semantic color; defaults to neutral.",
    },
    variant: {
      control: "select",
      options: textFieldVariants,
      type: { name: "enum", value: [...textFieldVariants] },
      description: "Input appearance; defaults to outline.",
    },
    label: { control: "text", type: "string", description: "Optional visible label." },
    message: { control: "text", type: "string", description: "Optional description." },
  },
} satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole("textbox", { name: "Vehicle name" }),
    ).toBeVisible();
  },
};
export const Sizes: Story = {
  render: (args) => (
    <>
      {fieldSizes.map((size) => (
        <TextField {...args} key={size} size={size} label={`${size} vehicle`} />
      ))}
    </>
  ),
};
export const ColorsAndVariants: Story = {
  render: (args) => (
    <>
      {textFieldColors.flatMap((color) =>
        textFieldVariants.map((variant) => (
          <TextField
            {...args}
            key={`${color}-${variant}`}
            color={color}
            variant={variant}
            label={`${color} ${variant}`}
          />
        )),
      )}
    </>
  ),
};
export const Required: Story = { ...Default, args: { required: true } };
export const Disabled: Story = { ...Default, args: { disabled: true } };

export const WithAddons: Story = {
  render: (args) => (
    <TextField {...args}>
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupText>.com</InputGroupText>
      </InputGroupAddon>
    </TextField>
  ),
};

export const WithoutMessage: Story = { args: { haveMessage: false }, ...Default };
function MessageDemo() {
  const [message, setMessage] = useState("");
  const showMessage = useCallback(() => setMessage("Vehicle name is required."), []);
  return (
    <>
      <TextField label="Vehicle name" message={message} />
      <button type="button" onClick={showMessage}>
        Show message
      </button>
    </>
  );
}
export const AnimatedMessage: Story = {
  render: () => <MessageDemo />,
  play: async ({ canvasElement }) => {
    const description = canvasElement.querySelector('[data-slot="field-description"]');
    if (!(description instanceof HTMLElement)) throw new Error("Missing description");
    const height = description.getBoundingClientRect().height;
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Show message" }));
    await waitFor(() =>
      expect(within(canvasElement).getByText("Vehicle name is required.")).toBeVisible(),
    );
    await expect(description.getBoundingClientRect().height).toBe(height);
  },
};
