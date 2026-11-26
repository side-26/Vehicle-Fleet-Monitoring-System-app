import Link from "next/link";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CarFront, Search } from "lucide-react";
import { expect, within } from "storybook/test";

import { Button } from "@/components/ui/button";

import { emptyMediaVariants } from "./empty.types";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./index";
import styles from "./styles.module.css";

const meta = {
  title: "Shared/UI/Empty",
  component: EmptyMedia,
  subcomponents: { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent },
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  argTypes: {
    variant: {
      control: "select",
      options: emptyMediaVariants,
      type: { name: "enum", value: [...emptyMediaVariants] },
      description:
        "Decorative media treatment. Defaults to default; icon adds a muted rounded surface.",
    },
    children: {
      control: false,
      type: { name: "other", value: "ReactNode" },
      description: "Decorative artwork; meaningful text belongs in title or description.",
    },
    className: {
      control: "text",
      type: "string",
      description: "Additional layout class for the media wrapper.",
    },
  },
  args: { variant: "default" },
  render: (args) => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia {...args}>
          <CarFront />
        </EmptyMedia>
        <EmptyTitle>No vehicles yet</EmptyTitle>
        <EmptyDescription>Your vehicles will appear here once added.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("heading", { name: "No vehicles yet", level: 2 })).toBeVisible();
    await expect(canvas.getByText("Your vehicles will appear here once added.")).toBeVisible();
    await expect(canvasElement.querySelector('[data-slot="empty-icon"]')).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  },
} satisfies Meta<typeof EmptyMedia>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Icon: Story = { args: { variant: "icon" } };
export const CustomArtwork: Story = {
  args: { children: <CarFront className={styles.artwork} /> },
  render: (args) => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia {...args} />
        <EmptyTitle>No vehicles yet</EmptyTitle>
        <EmptyDescription>Your vehicles will appear here once added.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
};
export const WithoutMedia: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No results</EmptyTitle>
        <EmptyDescription>Try a different search.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole("heading", { name: "No results", level: 2 }),
    ).toBeVisible();
    await expect(within(canvasElement).getByText("Try a different search.")).toBeVisible();
    await expect(canvasElement.querySelector('[data-slot="empty-icon"]')).toBeNull();
  },
};
export const WithAction: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CarFront />
        </EmptyMedia>
        <EmptyTitle>No vehicles yet</EmptyTitle>
        <EmptyDescription>Your vehicles will appear here once added.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button aria-label="Add vehicle">Add vehicle</Button>
      </EmptyContent>
    </Empty>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("button", { name: "Add vehicle" })).toBeEnabled();
    await expect(
      within(canvasElement).getByRole("heading", { name: "No vehicles yet", level: 2 }),
    ).toBeVisible();
  },
};
export const DisabledAction: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No vehicles yet</EmptyTitle>
        <EmptyDescription>You need permission to add vehicles.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button aria-label="Add vehicle" disabled>
          Add vehicle
        </Button>
      </EmptyContent>
    </Empty>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("button", { name: "Add vehicle" })).toBeDisabled();
    await expect(
      within(canvasElement).getByRole("heading", { name: "No vehicles yet", level: 2 }),
    ).toBeVisible();
  },
};
export const WithLink: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Search />
        </EmptyMedia>
        <EmptyTitle>No results</EmptyTitle>
        <EmptyDescription>
          Try another search or <Link href="/">return home</Link>.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole("heading", { name: "No results", level: 2 }),
    ).toBeVisible();
    await expect(within(canvasElement).getByRole("link", { name: "return home" })).toHaveAttribute(
      "href",
      "/",
    );
  },
};
