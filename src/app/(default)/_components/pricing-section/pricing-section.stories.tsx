import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor, within } from "storybook/test";

import { PricingSection } from "./index";

const meta = {
  title: "Landing/PricingSection",
  component: PricingSection,
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
    viewport: {
      options: {
        mobile: { name: "Mobile", styles: { width: "390px", height: "844px" } },
        tablet: { name: "Tablet", styles: { width: "768px", height: "1024px" } },
        desktop: { name: "Desktop", styles: { width: "1440px", height: "1000px" } },
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => expect(canvas.getByRole("heading", { level: 2 })).toBeVisible());
    const cards = canvas.getAllByRole("article");
    await expect(cards).toHaveLength(3);
    await Promise.all(
      cards.map(async (card) => {
        await waitFor(() => expect(within(card).getByRole("heading", { level: 3 })).toBeVisible());
        await expect(within(card).getByRole("link")).toHaveAttribute("href", "/login");
        await expect(getComputedStyle(card).gridTemplateColumns.split(" ")).toHaveLength(
          window.innerWidth >= 768 ? 4 : 1,
        );
      }),
    );
    await expect(canvas.getByText("Most Popular")).toBeVisible();
    await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(window.innerWidth);
  },
} satisfies Meta<typeof PricingSection>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
