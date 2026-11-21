import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Form } from "@/components/ui/form";

import { SwitchFormField } from "./index";

const options = { defaultValues: { vehicle: false } };
const rules = { required: "Enter a vehicle" };
const submit = () => undefined;
async function expectColor(input: HTMLElement, token: string) {
  const root = input.closest('[data-slot="field"]');
  if (!(root instanceof HTMLElement)) throw new Error("Missing field");
  // Resolve both colors through the browser so CSS :has() behavior is tested.
  const probe = document.createElement("span");
  probe.style.color = `var(${token})`;
  root.append(probe);
  const expected = getComputedStyle(probe).color;
  try {
    await waitFor(() => expect(getComputedStyle(root).color).toBe(expected));
  } finally {
    probe.remove();
  }
}
const meta = {
  title: "Shared/UI/FormFields/SwitchFormField",
  component: SwitchFormField,
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
      <SwitchFormField {...args} rules={rules} />
      <button type="submit">Save</button>
    </Form>
  ),
} satisfies Meta<typeof SwitchFormField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("switch", { name: "Vehicle" })).toBeVisible();
  },
};
export const Validation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(canvas.getByRole("switch")).toHaveAttribute("aria-invalid", "true"));
    await expect(canvas.getByRole("switch")).toHaveAccessibleDescription("Enter a vehicle");

    await expectColor(canvas.getByRole("switch"), "--error");
    await userEvent.click(canvas.getByRole("switch"));
    await userEvent.click(canvas.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(canvas.getByRole("switch")).not.toHaveAttribute("aria-invalid"));
    await expect(canvas.getByRole("switch")).toHaveAccessibleDescription("Fleet identifier");
    await expectColor(canvas.getByRole("switch"), "--success");
  },
};
export const Disabled: Story = { args: { disabled: true } };
