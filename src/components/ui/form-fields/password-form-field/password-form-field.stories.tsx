import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { FieldGroup } from "@/components/ui/field";
import { fieldSizes } from "@/components/ui/field/field.types";
import { Form } from "@/components/ui/form";
import { textFieldColors, textFieldVariants } from "@/components/ui/text-field/text-field.types";

import { PasswordFormField } from "./index";
import styles from "./styles.module.css";

const options = { defaultValues: { password: "" } };
const submit = () => undefined;
const requiredRules = { required: "Enter a password" };
const meta = {
  title: "Shared/UI/FormFields/PasswordFormField",
  component: PasswordFormField,
  tags: ["autodocs"],
  parameters: { layout: "padded", a11y: { test: "error" } },
  args: { name: "password", label: "Password", message: "Enter your password" },
  argTypes: {
    name: {
      control: "text",
      type: "string",
      description: "Typed field path in the Form provider.",
    },
    label: { control: "text", type: "string", description: "Visible label; defaults to empty." },
    message: {
      control: "text",
      type: "string",
      description: "Helper text replaced by validation errors; defaults to empty.",
    },
    size: {
      control: "select",
      options: fieldSizes,
      type: { name: "enum", value: [...fieldSizes] },
      description: "Inherited field size; defaults to md.",
    },
    color: {
      control: "select",
      options: textFieldColors,
      type: { name: "enum", value: [...textFieldColors] },
      description: "Field color before validation; defaults to neutral.",
    },
    variant: {
      control: "select",
      options: textFieldVariants,
      type: { name: "enum", value: [...textFieldVariants] },
      description: "Input surface; defaults to outline.",
    },
    disabled: {
      control: "boolean",
      type: "boolean",
      description: "Disables the input and toggle.",
    },
    required: {
      control: "boolean",
      type: "boolean",
      description: "Required validation and label marker.",
    },
    readOnly: {
      control: "boolean",
      type: "boolean",
      description: "Prevents editing; visibility can still be toggled.",
    },
    haveMessage: {
      control: "boolean",
      type: "boolean",
      description: "Reserve the helper line; defaults to true.",
    },
  },
  render: (args) => (
    <Form className={styles.storyForm} formOptions={options} onSubmit={submit}>
      <PasswordFormField {...args} />
    </Form>
  ),
} satisfies Meta<typeof PasswordFormField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Password");
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute("type", "password");
    await expect(input).toHaveAccessibleDescription("Enter your password");
    await userEvent.type(input, "secret");
    await userEvent.click(canvas.getByRole("button", { name: "Show password" }));
    await expect(input).toHaveAttribute("type", "text");
    await expect(input).toHaveValue("secret");
    await userEvent.click(canvas.getByRole("button", { name: "Hide password" }));
    await expect(input).toHaveAttribute("type", "password");
    await expect(input).toHaveValue("secret");
  },
};
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("Password")).toBeDisabled();
    await expect(canvas.getByRole("button", { name: "Show password" })).toBeDisabled();
  },
};
export const ReadOnly: Story = {
  args: { readOnly: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Password");
    await expect(input).toHaveAttribute("readonly");
    await userEvent.type(input, "ignored");
    await expect(input).toHaveValue("");
    await userEvent.click(canvas.getByRole("button", { name: "Show password" }));
    await expect(input).toHaveAttribute("type", "text");
  },
};
export const Required: Story = {
  args: { required: true },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByLabelText(/Password/);
    await expect(input).toBeRequired();
    const marker = canvasElement.querySelector('label [aria-hidden="true"]');
    await expect(marker).toHaveTextContent("*");
  },
};
export const WithoutLabel: Story = {
  args: { label: "", "aria-label": "Password" },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByLabelText("Password")).toBeVisible();
    await expect(canvasElement.querySelector("label")).toBeNull();
  },
};
export const WithoutMessage: Story = {
  args: { haveMessage: false },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByLabelText("Password");
    await expect(input).not.toHaveAttribute("aria-describedby");
    await expect(canvasElement.querySelector('[data-slot="field-description"]')).toBeNull();
  },
};
function checkGalleryField(input: HTMLElement) {
  const group = input.closest('[data-slot="input-group"]');
  if (!(group instanceof HTMLElement)) throw new Error("Missing input group");
  expect(group.getBoundingClientRect().width).toBeGreaterThan(280);
  for (const addon of group.querySelectorAll('[data-slot="input-group-addon"], button')) {
    expect(getComputedStyle(addon).color).toBe(getComputedStyle(input).color);
  }
}
export const Sizes: Story = {
  render: (args) => (
    <Form className={styles.storyForm} formOptions={options} onSubmit={submit}>
      <FieldGroup>
        {fieldSizes.map((size) => (
          <PasswordFormField {...args} key={size} size={size} label={`Password ${size}`} />
        ))}
      </FieldGroup>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = fieldSizes.map((size) => canvas.getByLabelText(`Password ${size}`));
    await Promise.all(
      inputs.map(async (input) => {
        await expect(input).toBeVisible();
        await expect(input).toHaveAttribute("type", "password");
        checkGalleryField(input);
      }),
    );
    const sizes = inputs.map((input) => Number.parseFloat(getComputedStyle(input).fontSize));
    expect(sizes.every((size, index) => index === 0 || size > (sizes[index - 1] ?? 0))).toBe(true);
  },
};
export const ColorsAndVariants: Story = {
  render: (args) => (
    <Form className={styles.storyForm} formOptions={options} onSubmit={submit}>
      <FieldGroup>
        {textFieldVariants.flatMap((variant) =>
          textFieldColors.map((color) => (
            <PasswordFormField
              {...args}
              key={`${variant}-${color}`}
              variant={variant}
              color={color}
              label={`${variant} ${color}`}
            />
          )),
        )}
      </FieldGroup>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await Promise.all(
      textFieldVariants.flatMap((variant) =>
        textFieldColors.map(async (color) => {
          const input = canvas.getByLabelText(`${variant} ${color}`);
          await expect(input).toBeVisible();
          await expect(input.closest('[data-slot="field"]')).toHaveAttribute("data-color", color);
          await expect(input.closest('[data-slot="field"]')).toHaveAttribute(
            "data-variant",
            variant,
          );
          checkGalleryField(input);
        }),
      ),
    );
  },
};
export const Validation: Story = {
  render: (args) => (
    <Form className={styles.storyForm} formOptions={options} onSubmit={submit}>
      <PasswordFormField {...args} rules={requiredRules} />
      <button type="submit">Save</button>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/Password/);
    await userEvent.click(canvas.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(input).toHaveAttribute("aria-invalid", "true"));
    await expect(input).toHaveAccessibleDescription("Enter a password");
    await expect(input).toHaveFocus();
    await waitFor(() => checkGalleryField(input));
    const errorColor = getComputedStyle(input).color;
    await userEvent.type(input, "secret");
    await userEvent.click(canvas.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(input).not.toHaveAttribute("aria-invalid"));
    await expect(input).toHaveAttribute("data-validated", "true");
    await expect(input).toHaveAccessibleDescription("Enter your password");
    await waitFor(() => expect(getComputedStyle(input).color).not.toBe(errorColor));
    await waitFor(() => checkGalleryField(input));
    await expect(input).toHaveValue("secret");
  },
};
