import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor, within } from "storybook/test";

import { LeafletMap } from "@/components/ui/maps/leaflet/leaflet-map";

import { MapTile } from "./index";
const center = [35.7, 51.4] satisfies [number, number];
const meta = {
  title: "Shared/UI/Maps/Leaflet/MapTile",
  component: MapTile,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", a11y: { test: "error" } },
  args: {},
  argTypes: {
    url: { control: "text", description: "Native tile URL template.", type: "string" },
    opacity: { control: "number", description: "Tile opacity from 0 to 1.", type: "number" },
  },
  render: (args) => (
    <LeafletMap center={center} zoom={10}>
      <MapTile {...args} />
    </LeafletMap>
  ),
} satisfies Meta<typeof MapTile>;
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
    await expect(await canvas.findByText("OpenStreetMap")).toBeVisible();
  },
};
export const Translucent: Story = { args: { opacity: 0.5 } };
