import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "./index";

const image = "/images/random-avatar.jpg";

const meta = {
  title: "Shared/UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src={image} alt="Fleet operator portrait" />
      <AvatarFallback>FO</AvatarFallback>
    </Avatar>
  ),
} satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Loaded: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByRole("img", { name: "Fleet operator portrait" })).toBeVisible();
  },
};

export const Fallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>FO</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText("FO")).toBeVisible();
  },
};

export const FailedImage: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="/images/missing-avatar.jpg" alt="Fleet operator portrait" />
      <AvatarFallback>FO</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText("FO")).toBeVisible();
  },
};

export const WithBadge: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src={image} alt="Online fleet operator" />
      <AvatarFallback>FO</AvatarFallback>
      <AvatarBadge aria-label="Online" />
    </Avatar>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByLabelText("Online")).toBeVisible();
  },
};

export const Group: Story = {
  render: () => (
    <AvatarGroup aria-label="Fleet operators">
      <Avatar>
        <AvatarImage src={image} alt="Fleet operator" />
        <AvatarFallback>FO</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <AvatarGroupCount aria-label="Three more operators">+3</AvatarGroupCount>
    </AvatarGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("Fleet operators")).toBeVisible();
    await expect(canvas.getByLabelText("Three more operators")).toBeVisible();
    await expect(canvas.getByText("JD")).toBeVisible();
  },
};
