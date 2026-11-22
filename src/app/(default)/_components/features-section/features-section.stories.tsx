import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { FeaturesSection } from "./index";

const meta = {
  title: "Landing/FeaturesSection",
  component: FeaturesSection,
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
    viewport: {
      options: {
        mobile: { name: "Mobile", styles: { width: "390px", height: "844px" } },
        tablet: { name: "Tablet", styles: { width: "768px", height: "1024px" } },
        desktop: { name: "Desktop", styles: { width: "1440px", height: "900px" } },
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => expect(canvas.getByRole("heading", { level: 2 })).toBeVisible());
    const articles = canvas.getAllByRole("article");
    await expect(articles).toHaveLength(6);
    await Promise.all(
      articles.map((article) =>
        waitFor(() => expect(within(article).getByRole("heading", { level: 3 })).toBeVisible()),
      ),
    );
    const first = articles[0];
    const second = articles[1];
    if (!first || !second) throw new Error("Missing feature cards");
    const grid = first.parentElement?.parentElement;
    if (!grid) throw new Error("Missing features grid");
    const expectedColumns = window.innerWidth > 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    await expect(getComputedStyle(grid).gridTemplateColumns.split(" ")).toHaveLength(
      expectedColumns,
    );
    await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(window.innerWidth);
    const card = first.querySelector('[data-slot="card"]');
    if (!card) throw new Error("Missing feature surface");
    await userEvent.hover(card);
    await expect(getComputedStyle(card).cursor).toBe("default");
    await expect(getComputedStyle(card).scale).toBe("none");
  },
} satisfies Meta<typeof FeaturesSection>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
