import { useCallback, useState } from "react";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { Slider } from "./index";
import { sliderColors, sliderOrientations } from "./slider.types";

const canvasStyle = { inlineSize: "20rem", padding: "1em" } as const;
const meta = {
  title: "Shared/UI/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  args: {
    "aria-label": "Vehicle speed",
    defaultValue: 40,
    color: "primary",
    orientation: "horizontal",
    min: 0,
    max: 100,
    step: 1,
  },
  argTypes: {
    color: {
      control: "select",
      options: sliderColors,
      type: "string",
      description: "Indicator and thumb color. Defaults to primary.",
    },
    orientation: {
      control: "select",
      options: sliderOrientations,
      type: "string",
      description: "Horizontal (default) or vertical track.",
    },
    "aria-label": {
      control: "text",
      type: "string",
      description:
        "Required accessible name; range thumbs append their index unless getAriaLabel is supplied.",
    },
    "aria-labelledby": {
      control: "text",
      type: "string",
      description: "Optional visible label IDs forwarded to each thumb.",
    },
    "aria-describedby": {
      control: "text",
      type: "string",
      description: "Optional description IDs forwarded to each thumb.",
    },
    defaultValue: {
      control: "object",
      description: "Initial number or array for a range. Defaults to min.",
    },
    value: {
      control: "object",
      description: "Controlled number or array; pair with onValueChange.",
    },
    min: {
      control: "number",
      type: "number",
      description: "Minimum allowed value. Defaults to 0.",
    },
    max: {
      control: "number",
      type: "number",
      description: "Maximum allowed value. Defaults to 100.",
    },
    step: { control: "number", type: "number", description: "Value increment. Defaults to 1." },
    disabled: {
      control: "boolean",
      type: "boolean",
      description: "Prevents interaction and form submission. Defaults to false.",
    },
    className: {
      control: "text",
      type: "string",
      description: "Root layout class or Base UI state callback.",
    },
    getAriaLabel: {
      control: false,
      description: "Returns an accessible name for each thumb index.",
    },
    getAriaValueText: { control: false, description: "Formats spoken values with units." },
    onValueChange: {
      control: false,
      description: "Called with the new value and Base UI event details.",
    },
    onValueCommitted: { control: false, description: "Called when a changed value is committed." },
  },
  render: (args) => (
    <div style={canvasStyle}>
      <Slider {...args} />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const sliders = within(canvasElement).getAllByRole("slider");
    await expect(sliders).toHaveLength(
      Array.isArray(args.defaultValue) ? args.defaultValue.length : 1,
    );
    await Promise.all(
      sliders.map(async (slider) => {
        await expect(slider).toBeVisible();
        await expect(slider).toHaveAccessibleName();
        await expect(slider).toHaveAttribute("aria-orientation", args.orientation);
        if (args.disabled) await expect(slider).toBeDisabled();
      }),
    );
  },
} satisfies Meta<typeof Slider>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Neutral: Story = { args: { color: "neutral" } };
export const Range: Story = { args: { defaultValue: [20, 80] } };
export const NeutralRange: Story = { args: { color: "neutral", defaultValue: [20, 80] } };
export const Disabled: Story = { args: { disabled: true } };
export const DisabledNeutral: Story = { args: { color: "neutral", disabled: true } };
export const DisabledRange: Story = { args: { disabled: true, defaultValue: [20, 80] } };
export const DisabledNeutralRange: Story = {
  args: { color: "neutral", disabled: true, defaultValue: [20, 80] },
};
export const Vertical: Story = { args: { orientation: "vertical" } };
export const VerticalNeutral: Story = { args: { orientation: "vertical", color: "neutral" } };
export const VerticalRange: Story = { args: { orientation: "vertical", defaultValue: [20, 80] } };
export const VerticalNeutralRange: Story = {
  args: { orientation: "vertical", color: "neutral", defaultValue: [20, 80] },
};
export const CustomBounds: Story = { args: { min: 10, max: 50, step: 5, defaultValue: 20 } };

export const Keyboard: Story = {
  args: { min: 10, max: 50, step: 5, defaultValue: 20 },
  play: async ({ canvasElement }) => {
    const slider = within(canvasElement).getByRole("slider", { name: "Vehicle speed" });
    await userEvent.tab();
    await expect(slider).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(slider).toHaveValue("25");
    await userEvent.keyboard("{Home}");
    await expect(slider).toHaveValue("10");
    await userEvent.keyboard("{End}{ArrowRight}");
    await expect(slider).toHaveValue("50");
  },
};

function ControlledExample() {
  const [value, setValue] = useState(40);
  const onValueChange = useCallback((next: number) => setValue(next), []);
  return (
    <div style={canvasStyle}>
      <Slider aria-label="Vehicle speed" value={value} onValueChange={onValueChange} />
      <output aria-label="Current speed">{value}</output>
    </div>
  );
}
export const Controlled: Story = {
  render: ControlledExample,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByRole("slider", { name: "Vehicle speed" })).toHaveValue("41");
    await expect(canvas.getByRole("status", { name: "Current speed" })).toHaveTextContent("41");
  },
};

export const Pointer: Story = {
  play: async ({ canvasElement }) => {
    const slider = within(canvasElement).getByRole("slider", { name: "Vehicle speed" });
    const control = canvasElement.querySelector('[data-slot="slider-control"]');
    if (!(control instanceof HTMLElement)) throw new Error("Missing slider control");
    const rect = control.getBoundingClientRect();
    const coords = { clientX: rect.x + rect.width * 0.75, clientY: rect.y + rect.height / 2 };
    await userEvent.pointer([
      { keys: "[MouseLeft>]", target: control, coords },
      { keys: "[/MouseLeft]", target: control, coords },
    ]);
    await expect(Number(slider.getAttribute("aria-valuenow"))).toBeGreaterThan(65);
    await expect(Number(slider.getAttribute("aria-valuenow"))).toBeLessThan(85);
  },
};
