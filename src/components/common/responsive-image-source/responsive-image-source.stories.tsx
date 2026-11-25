import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor, within } from "storybook/test";

import { ResponsiveImage } from "./index";
import type { ResponsiveImageSource } from "./responsive-image-source.types";
import styles from "./styles.module.css";

const sources: readonly ResponsiveImageSource[] = [
  { media: "(min-width: 64rem)", src: "/images/auth/desktop-image.webp", width: 1382, height: 922 },
  { media: "(min-width: 48rem)", src: "/images/auth/tablet-image.webp", width: 1152, height: 768 },
];
const meta = {
  title: "Shared/Common/ResponsiveImage",
  component: ResponsiveImage,
  tags: ["autodocs"],
  parameters: { layout: "padded", a11y: { test: "error" } },
  args: {
    sources,
    src: "/images/auth/mobile-image.webp",
    width: 768,
    height: 512,
    alt: "Fleet vehicles traveling along a mountain highway",
    unoptimized: true,
    pictureClassName: styles.preview,
  },
  argTypes: {
    sources: {
      control: "object",
      description:
        "Ordered media sources; place larger breakpoints first. Each may override fallback image options.",
    },
    src: {
      control: "text",
      type: "string",
      description: "Fallback image source when no media query matches.",
    },
    alt: {
      control: "text",
      type: "string",
      description: "Accessible image description, or empty for decorative images.",
    },
    width: { control: "number", type: "number", description: "Fallback intrinsic width." },
    height: { control: "number", type: "number", description: "Fallback intrinsic height." },
    sizes: {
      control: "text",
      type: "string",
      description: "Responsive sizes inherited by sources unless overridden.",
    },
    quality: {
      control: "number",
      type: "number",
      description: "Next.js image quality inherited by sources unless overridden.",
    },
    loader: {
      control: false,
      description: "Optional Next.js image URL loader inherited by sources.",
    },
    unoptimized: {
      control: "boolean",
      type: "boolean",
      description:
        "Use original URLs. Enabled in stories because Storybook has no Next.js optimizer.",
    },
    pictureClassName: {
      control: "text",
      type: "string",
      description: "Class applied to the picture wrapper.",
    },
    className: {
      control: "text",
      type: "string",
      description: "Class applied to the fallback img.",
    },
  },
} satisfies Meta<typeof ResponsiveImage>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const image = within(canvasElement).getByRole("img", {
      name: "Fleet vehicles traveling along a mountain highway",
    });
    if (!(image instanceof HTMLImageElement)) throw new Error("Missing image");
    await expect(image).toBeVisible();
    const expectedSource = window.matchMedia("(min-width: 64rem)").matches
      ? "desktop-image.webp"
      : window.matchMedia("(min-width: 48rem)").matches
        ? "tablet-image.webp"
        : "mobile-image.webp";
    await waitFor(() => expect(image.currentSrc).toContain(expectedSource));
    await waitFor(() => expect(image.naturalWidth).toBeGreaterThan(0));
  },
};
export const FallbackOnly: Story = {
  args: { sources: [] },
  play: async ({ canvasElement }) => {
    const image = canvasElement.querySelector("img");
    if (!(image instanceof HTMLImageElement)) throw new Error("Missing image");
    await expect(canvasElement.querySelector("source")).toBeNull();
    await waitFor(() => expect(image.currentSrc).toContain("mobile-image.webp"));
    await waitFor(() => expect(image.naturalWidth).toBeGreaterThan(0));
  },
};
export const Decorative: Story = {
  args: { alt: "" },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryByRole("img")).toBeNull();
    await expect(canvasElement.querySelector("img")).toHaveAttribute("alt", "");
  },
};
