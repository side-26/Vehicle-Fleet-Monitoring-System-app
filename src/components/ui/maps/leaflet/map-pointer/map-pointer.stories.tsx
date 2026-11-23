import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor, within } from "storybook/test";

import { LeafletMap } from "@/components/ui/maps/leaflet/leaflet-map";
import { MapTile } from "@/components/ui/maps/leaflet/map-tile";

import { MapPointer } from "./index";
const center = [35.7, 51.4] satisfies [number, number];
const meta = {
  title: "Shared/UI/Maps/Leaflet/MapPointer",
  component: MapPointer,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", a11y: { test: "error" } },
  args: { position: center, alt: "Fleet vehicle", title: "Fleet vehicle" },
  argTypes: {
    position: {
      control: "object",
      description: "Native marker coordinates.",
      type: { name: "object", value: {} },
    },
    alt: { control: "text", description: "Accessible marker name.", type: "string" },
    draggable: { control: "boolean", description: "Allow marker dragging.", type: "boolean" },
  },
  render: (args) => (
    <LeafletMap center={center} zoom={10}>
      <MapTile lightUrl="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapPointer {...args} />
    </LeafletMap>
  ),
} satisfies Meta<typeof MapPointer>;
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
    const marker = await canvas.findByRole("button", { name: "Fleet vehicle" });
    await expect(marker).toBeVisible();
    if (!(marker instanceof HTMLImageElement)) throw new Error("Expected native marker image");
    await waitFor(() => expect(marker.naturalWidth).toBeGreaterThan(0));
  },
};
export const Draggable: Story = { args: { draggable: true } };
