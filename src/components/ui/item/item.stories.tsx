import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Target } from "lucide-react";
import { expect, within } from "storybook/test";

import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "./index";
import { itemColors, itemVariants } from "./item.types";

const meta = {
  title: "Shared/UI/Item",
  component: Item,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  args: { color: "inherit", variant: "default" },
  argTypes: {
    variant: {
      control: "select",
      options: itemVariants,
      type: { name: "enum", value: [...itemVariants] },
      description: "Surface treatment: default (transparent), outline, or muted.",
    },
    color: {
      control: "select",
      options: itemColors,
      type: { name: "enum", value: [...itemColors] },
      description: "Border and muted background palette. Defaults to inherit (currentColor).",
    },
    children: {
      control: false,
      type: "string",
      description: "Compose media and content parts inside a native list item.",
    },
    className: {
      control: "text",
      type: "string",
      description: "Additional layout classes for the item.",
    },
  },
  render: (args) => (
    <ItemGroup aria-label="FleetOS principles">
      <Item {...args} />
    </ItemGroup>
  ),
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <ItemMedia>
          <Target />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Our Mission</ItemTitle>
          <ItemDescription>Simplify fleet operations for every business.</ItemDescription>
        </ItemContent>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("list", { name: "FleetOS principles" })).toBeVisible();
    await expect(canvas.getByRole("listitem")).toBeVisible();
    await expect(canvas.getByRole("heading", { level: 3, name: "Our Mission" })).toBeVisible();
    await expect(canvas.getByText("Simplify fleet operations for every business.")).toBeVisible();
  },
};

export const WithoutMedia: Story = {
  args: {
    children: (
      <ItemContent>
        <ItemTitle>Our Values</ItemTitle>
        <ItemDescription>Reliability and transparency.</ItemDescription>
      </ItemContent>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("heading", { level: 3, name: "Our Values" })).toBeVisible();
    await expect(canvas.getByText("Reliability and transparency.")).toBeVisible();
    await expect(canvasElement.querySelector('[data-slot="item-media"]')).toBeNull();
  },
};

export const Primary: Story = { ...Default, args: { ...Default.args, color: "primary" } };
export const Neutral: Story = { ...Default, args: { ...Default.args, color: "neutral" } };
export const Error: Story = { ...Default, args: { ...Default.args, color: "error" } };
export const Success: Story = { ...Default, args: { ...Default.args, color: "success" } };

export const AllVariantsAndColors: Story = {
  render: () => (
    <ItemGroup aria-label="Item variants and colors">
      {itemVariants.flatMap((variant) =>
        itemColors.map((color) => (
          <Item key={`${variant}-${color}`} variant={variant} color={color}>
            <ItemMedia>
              <Target />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>
                {variant} / {color}
              </ItemTitle>
              <ItemDescription>Color styles the surface and border.</ItemDescription>
            </ItemContent>
          </Item>
        )),
      )}
    </ItemGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole("listitem")).toHaveLength(15);
    await Promise.all(
      itemVariants.flatMap((variant) =>
        itemColors.map((color) =>
          expect(
            canvas.getByRole("heading", { level: 3, name: `${variant} / ${color}` }),
          ).toBeVisible(),
        ),
      ),
    );
  },
};
