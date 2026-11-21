import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor, within } from "storybook/test";

import { MapPointer } from "@/components/ui/maps/leaflet/map-pointer";
import { MapTile } from "@/components/ui/maps/leaflet/map-tile";

import { LeafletMap } from "./index";
const center = [35.7, 51.4] satisfies [number, number];
const meta = {
  title: "Shared/UI/Maps/Leaflet/LeafletMap",
  component: LeafletMap,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", a11y: { test: "error" } },
  args: { center, zoom: 10 },
  argTypes: {
    center: {
      control: "object",
      description: "Native initial map center.",
      type: { name: "object", value: {} },
    },
    zoom: { control: "number", description: "Native initial zoom level.", type: "number" },
  },
  render: (args) => (
    <LeafletMap {...args}>
      <MapTile />
      <MapPointer position={center} alt="Fleet vehicle" />
    </LeafletMap>
  ),
} satisfies Meta<typeof LeafletMap>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      const bounds = canvasElement.querySelector(".leaflet-container")?.getBoundingClientRect();
      expect(bounds?.width).toBeGreaterThan(200);
      expect(bounds?.height).toBeGreaterThan(200);
    });
    await expect(await canvas.findByRole("button", { name: "Fleet vehicle" })).toBeVisible();
  },
};
export const WithoutZoomControl: Story = { args: { zoomControl: false } };
