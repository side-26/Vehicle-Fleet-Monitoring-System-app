import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor, within } from "storybook/test";

import { HowItWorksSection } from "./index";

const meta = {
  title: "Landing/HowItWorksSection",
  component: HowItWorksSection,
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
    const steps = canvas.getAllByRole("article");
    await expect(steps).toHaveLength(3);
    await Promise.all(
      steps.map((step) =>
        waitFor(() => expect(within(step).getByRole("heading", { level: 3 })).toBeVisible()),
      ),
    );
    const first = steps[0];
    if (!first) throw new Error("Missing step");
    const item = first.parentElement;
    const grid = item?.parentElement;
    if (!item || !grid) throw new Error("Missing staggered step grid");
    const wide = window.innerWidth >= 768;
    await expect(getComputedStyle(grid).gridTemplateColumns.split(" ")).toHaveLength(wide ? 3 : 1);
    await expect(getComputedStyle(item, "::after").content).toBe(wide ? '""' : "none");
    await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(window.innerWidth);
  },
} satisfies Meta<typeof HowItWorksSection>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
