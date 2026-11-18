import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import { cardColors, cardSizes, cardVariants } from "./card.types";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./index";

const meta = {
  title: "Shared/UI/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  argTypes: {
    color: {
      control: "select",
      options: cardColors,
      type: { name: "enum", value: [...cardColors] },
      description: "Card color theme.",
    },
    size: {
      control: "select",
      options: cardSizes,
      type: { name: "enum", value: [...cardSizes] },
      description: "Card spacing and text size.",
    },
    variant: {
      control: "select",
      options: cardVariants,
      type: { name: "enum", value: [...cardVariants] },
      description: "Glass surface treatment.",
    },
  },
  args: { color: "neutral", size: "md", variant: "tonal" },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Fleet overview</CardTitle>
        <CardDescription>Current vehicle status</CardDescription>
        <CardAction>Today</CardAction>
      </CardHeader>
      <CardContent>42 vehicles are active.</CardContent>
      <CardFooter>Updated recently</CardFooter>
    </Card>
  ),
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

async function checkCards(canvasElement: HTMLElement, expectedCount: number) {
  const canvas = within(canvasElement);
  const cards = canvasElement.querySelectorAll<HTMLElement>('[data-slot="card"]');
  await expect(cards).toHaveLength(expectedCount);
  await expect(canvas.getAllByRole("heading", { level: 2 })).toHaveLength(expectedCount);
  await Promise.all(
    Array.from(cards, async (card) => {
      const title = card.querySelector<HTMLElement>('[data-slot="card-title"]');
      await expect(title).toBeVisible();
      await expect(card.querySelector<HTMLElement>('[data-slot="card-content"]')).toBeVisible();
      await expect(canvas.getByRole("heading", { name: title?.textContent ?? "" })).toBeVisible();
      await expect(title).toHaveAccessibleName(title?.textContent ?? "");
      const foreground = getComputedStyle(title!).color;
      const background = getComputedStyle(card).backgroundColor;
      await expect(foreground).not.toBe("transparent");
      await expect(background).not.toBe("");
    }),
  );
}

export const Default: Story = { play: async ({ canvasElement }) => checkCards(canvasElement, 1) };
export const Colors: Story = {
  render: (args) => (
    <div className="tw:grid tw:gap-4">
      {cardColors.map((color) => (
        <Card key={color} color={color} size={args.size} variant={args.variant}>
          <CardHeader>
            <CardTitle>{color}</CardTitle>
            <CardDescription>Fleet overview</CardDescription>
          </CardHeader>
          <CardContent>42 active vehicles</CardContent>
          <CardFooter>Updated recently</CardFooter>
        </Card>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => checkCards(canvasElement, cardColors.length),
};
export const Variants: Story = {
  render: (args) => (
    <div className="tw:grid tw:gap-4">
      {cardVariants.map((variant) => (
        <Card key={variant} color={args.color} size={args.size} variant={variant}>
          <CardHeader>
            <CardTitle>{variant}</CardTitle>
          </CardHeader>
          <CardContent>42 active vehicles</CardContent>
        </Card>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => checkCards(canvasElement, cardVariants.length),
};
export const Sizes: Story = {
  render: (args) => (
    <div className="tw:grid tw:gap-4">
      {cardSizes.map((size) => (
        <Card key={size} color={args.color} size={size} variant={args.variant}>
          <CardHeader>
            <CardTitle>{size}</CardTitle>
          </CardHeader>
          <CardContent>42 active vehicles</CardContent>
        </Card>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => checkCards(canvasElement, cardSizes.length),
};
export const Matrix: Story = {
  render: (args) => (
    <div className="tw:grid tw:gap-4">
      {cardColors.flatMap((color) =>
        cardVariants.map((variant) => (
          <Card key={`${color}-${variant}`} color={color} size={args.size} variant={variant}>
            <CardHeader>
              <CardTitle>
                {color} / {variant}
              </CardTitle>
            </CardHeader>
            <CardContent>42 active vehicles</CardContent>
          </Card>
        )),
      )}
    </div>
  ),
  play: async ({ canvasElement }) =>
    checkCards(canvasElement, cardColors.length * cardVariants.length),
};
