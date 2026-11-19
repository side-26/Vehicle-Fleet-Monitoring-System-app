import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Form } from "@/components/ui/form";

import { TextFormField } from "./index";

const options = { defaultValues: { vehicle: "" } };
const rules = { required: "Enter a vehicle" };
const submit = () => undefined;
function expectColor(input: HTMLElement, token: string) {
  const root = input.closest('[data-slot="field"]');
  if (!(root instanceof HTMLElement)) throw new Error("Missing field");
  // Resolve both colors through the browser so CSS :has() behavior is tested.
  const probe = document.createElement("span");
  probe.style.color = `var(${token})`;
  root.append(probe);
  const expected = getComputedStyle(probe).color;
  probe.remove();
  expect(getComputedStyle(root).color).toBe(expected);
}
const meta = {
  title: "Shared/UI/FormFields/TextFormField",
  component: TextFormField,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  args: { name: "vehicle", label: "Vehicle", message: "Fleet identifier" },
  argTypes: {
    name: {
      control: "text",
      type: "string",
      description: "Registered field path in the surrounding Form provider.",
    },
  },
  render: (args) => (
    <Form formOptions={options} onSubmit={submit}>
      <TextFormField {...args} rules={rules} />
      <button type="submit">Save</button>
    </Form>
  ),
} satisfies Meta<typeof TextFormField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("textbox", { name: "Vehicle" })).toBeVisible();
  },
};
export const Validation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Save" }));
    await waitFor(() =>
      expect(canvas.getByRole("textbox")).toHaveAttribute("aria-invalid", "true"),
    );
    await expect(canvas.getByRole("textbox")).toHaveAccessibleDescription("Enter a vehicle");
    expectColor(canvas.getByRole("textbox"), "--error");
    await userEvent.type(canvas.getByRole("textbox"), "Van");
    await userEvent.click(canvas.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(canvas.getByRole("textbox")).not.toHaveAttribute("aria-invalid"));
    await expect(canvas.getByRole("textbox")).toHaveAccessibleDescription("Fleet identifier");
    expectColor(canvas.getByRole("textbox"), "--success");
  },
};
export const Disabled: Story = { args: { disabled: true } };
