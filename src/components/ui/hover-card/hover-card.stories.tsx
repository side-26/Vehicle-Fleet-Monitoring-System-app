import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { hoverCardColors, hoverCardGutters } from "./hover-card.types";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./index";
const meta = {
  title: "Shared/UI/HoverCard",
  component: HoverCardContent,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  args: { color: "neutral", gutter: "md" },
  argTypes: {
    color: {
      control: "select",
      options: hoverCardColors,
      type: "string",
      description: "Semantic surface color; defaults to neutral.",
    },
    gutter: {
      control: "select",
      options: hoverCardGutters,
      type: "string",
      description: "Internal padding in em: xs .25, sm .5, md .75, lg 1, xl 1.5. Defaults to md.",
    },
  },
  render: (args) => (
    <HoverCard>
      <HoverCardTrigger href="https://example.com" delay={0} closeDelay={0}>
        Vehicle profile
      </HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Fleet vehicle</h2>
        <p>Last reported position and vehicle details.</p>
      </HoverCardContent>
    </HoverCard>
  ),
} satisfies Meta<typeof HoverCardContent>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByRole("link", { name: "Vehicle profile" }));
    const content = await within(document.body).findByText("Fleet vehicle");
    await waitFor(() => expect(content).toBeVisible());
  },
};
export const PrimaryXs: Story = {
  args: { color: "primary", gutter: "xs" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>primary xs</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
export const PrimarySm: Story = {
  args: { color: "primary", gutter: "sm" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>primary sm</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
export const PrimaryMd: Story = {
  args: { color: "primary", gutter: "md" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>primary md</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
export const PrimaryLg: Story = {
  args: { color: "primary", gutter: "lg" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>primary lg</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
export const PrimaryXl: Story = {
  args: { color: "primary", gutter: "xl" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>primary xl</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
export const SecondaryXs: Story = {
  args: { color: "secondary", gutter: "xs" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>secondary xs</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
export const SecondarySm: Story = {
  args: { color: "secondary", gutter: "sm" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>secondary sm</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
export const SecondaryMd: Story = {
  args: { color: "secondary", gutter: "md" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>secondary md</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
export const SecondaryLg: Story = {
  args: { color: "secondary", gutter: "lg" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>secondary lg</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
export const SecondaryXl: Story = {
  args: { color: "secondary", gutter: "xl" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>secondary xl</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
export const SuccessXs: Story = {
  args: { color: "success", gutter: "xs" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>success xs</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
export const SuccessSm: Story = {
  args: { color: "success", gutter: "sm" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>success sm</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
export const SuccessMd: Story = {
  args: { color: "success", gutter: "md" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>success md</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
export const SuccessLg: Story = {
  args: { color: "success", gutter: "lg" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>success lg</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
export const SuccessXl: Story = {
  args: { color: "success", gutter: "xl" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>success xl</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
export const ErrorXs: Story = {
  args: { color: "error", gutter: "xs" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>error xs</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
export const ErrorSm: Story = {
  args: { color: "error", gutter: "sm" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>error sm</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
export const ErrorMd: Story = {
  args: { color: "error", gutter: "md" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>error md</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
export const ErrorLg: Story = {
  args: { color: "error", gutter: "lg" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>error lg</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
export const ErrorXl: Story = {
  args: { color: "error", gutter: "xl" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>error xl</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
export const NeutralXs: Story = {
  args: { color: "neutral", gutter: "xs" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>neutral xs</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
export const NeutralSm: Story = {
  args: { color: "neutral", gutter: "sm" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>neutral sm</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
export const NeutralMd: Story = {
  args: { color: "neutral", gutter: "md" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>neutral md</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
export const NeutralLg: Story = {
  args: { color: "neutral", gutter: "lg" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>neutral lg</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
export const NeutralXl: Story = {
  args: { color: "neutral", gutter: "xl" },
  render: (args) => (
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle profile</HoverCardTrigger>
      <HoverCardContent {...args}>
        <h2>Vehicle details</h2>
        <p>neutral xl</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
