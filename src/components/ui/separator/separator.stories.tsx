import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import { Separator } from "./index";
import { separatorOrientations } from "./separator.types";

const horizontalLayout = {
  inlineSize: "20rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
} as const;
const verticalLayout = { ...horizontalLayout, flexDirection: "row" } as const;

const meta = {
  title: "Shared/UI/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  args: { orientation: "horizontal", "aria-label": "Fleet sections" },
  argTypes: {
    orientation: {
      control: "select",
      options: separatorOrientations,
      type: "string",
      description: "Direction of the separator. Defaults to horizontal.",
      table: { defaultValue: { summary: "horizontal" } },
    },
    className: {
      control: "text",
      type: "string",
      description: "Additional layout class or Base UI state callback.",
    },
    "aria-label": {
      control: "text",
      type: "string",
      description: "Accessible name for a semantic separator.",
    },
    "aria-hidden": {
      control: "boolean",
      type: "boolean",
      description: "Hide a purely decorative divider from assistive technology.",
    },
    render: { control: false, description: "Base UI element or render callback for composition." },
  },
  render: (args) => (
    <section
      aria-label="Fleet summary"
      style={args.orientation === "vertical" ? verticalLayout : horizontalLayout}
    >
      <p>Active vehicles</p>
      <Separator {...args} />
      <p>Maintenance</p>
    </section>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("region", { name: "Fleet summary" })).toBeVisible();
    await expect(canvas.getByText("Active vehicles")).toBeVisible();
    await expect(canvas.getByText("Maintenance")).toBeVisible();
    if (args["aria-hidden"]) {
      await expect(canvas.queryByRole("separator")).not.toBeInTheDocument();
    } else {
      await expect(canvas.getByRole("separator", { name: "Fleet sections" })).toHaveAttribute(
        "aria-orientation",
        args.orientation,
      );
    }
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Vertical: Story = { args: { orientation: "vertical" } };
export const Decorative: Story = { args: { "aria-hidden": true } };
export const DecorativeVertical: Story = { args: { orientation: "vertical", "aria-hidden": true } };
