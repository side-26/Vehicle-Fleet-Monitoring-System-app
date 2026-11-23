import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor, within } from "storybook/test";

import { demoFleetTotal } from "@/app/(default)/_components/fleet-map/demo-fleet-config";

import { FleetMapSection } from "./index";

const meta = {
  title: "Landing/FleetMapSection",
  component: FleetMapSection,
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
    await waitFor(() =>
      expect(
        canvas.getByRole("heading", { name: "See Your Fleet Across the USA.", level: 2 }),
      ).toBeVisible(),
    );
    await waitFor(
      () => {
        const map = canvasElement.querySelector(".leaflet-container");
        expect(map).toBeVisible();
        const rect = map?.getBoundingClientRect();
        expect(rect?.height).toBeGreaterThan(0);
        const clusters = [...canvasElement.querySelectorAll(".marker-cluster")];
        const total = clusters.reduce((sum, cluster) => sum + Number(cluster.textContent), 0);
        expect(total).toBe(demoFleetTotal);
      },
      { timeout: 20000 },
    );
    await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(window.innerWidth);
    await expect(canvas.getByRole("list", { name: "Demo fleet vehicle counts" })).toHaveTextContent(
      "400 Trucks300 Vans200 Cars",
    );
  },
} satisfies Meta<typeof FleetMapSection>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
