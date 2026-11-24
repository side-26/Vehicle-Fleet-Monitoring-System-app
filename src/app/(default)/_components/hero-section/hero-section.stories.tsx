import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor, within } from "storybook/test";

import { HeroSection } from "./index";

const meta = {
  title: "Landing/HeroSection",
  component: HeroSection,
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
    viewport: {
      options: {
        mobile: { name: "Mobile", styles: { width: "390px", height: "844px" } },
        tablet: { name: "Tablet", styles: { width: "1024px", height: "900px" } },
        desktop: { name: "Desktop", styles: { width: "1440px", height: "900px" } },
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole("heading", {
      level: 1,
      name: /Your Fleet. One Platform.\s*Total Control./,
    });
    await waitFor(() => expect(heading).toBeVisible());
    await expect(canvas.getByRole("link", { name: "Get started" })).toHaveAttribute(
      "href",
      "/login",
    );
    await expect(canvas.getByRole("link", { name: "Explore features" })).toHaveAttribute(
      "href",
      "/#features",
    );
    const image = canvas.getByRole("img");
    if (!(image instanceof HTMLImageElement)) throw new Error("Missing hero image");
    await waitFor(() => expect(image.complete && image.naturalWidth > 0).toBe(true));
    await expect(image.currentSrc).toContain(
      window.innerWidth > 1024 ? "hero-desktop.png" : "hero-mobile-tablet.png",
    );
    await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(window.innerWidth);
  },
} satisfies Meta<typeof HeroSection>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
