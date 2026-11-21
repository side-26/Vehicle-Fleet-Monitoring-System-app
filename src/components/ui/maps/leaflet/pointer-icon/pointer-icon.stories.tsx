import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TruckIcon, MapPinIcon } from "lucide-react";
import { expect, within, waitFor } from "storybook/test";

import { LeafletMap } from "@/components/ui/maps/leaflet/leaflet-map";
import { MapPointer } from "@/components/ui/maps/leaflet/map-pointer";
import { MapTile } from "@/components/ui/maps/leaflet/map-tile";

import { PointerIcon } from "./index";
const center = [35.7, 51.4] satisfies [number, number];
const meta = {
  title: "Shared/UI/Maps/Leaflet/PointerIcon",
  component: PointerIcon,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", a11y: { test: "error" } },
  args: { children: <TruckIcon aria-hidden="true" /> },
  argTypes: {
    children: {
      control: false,
      type: "function",
      description: "React icon rendered inside the parent marker.",
    },
  },
  render: (args) => (
    <LeafletMap center={center} zoom={10}>
      <MapTile />
      <MapPointer position={center} alt="Fleet vehicle">
        <PointerIcon {...args} />
      </MapPointer>
    </LeafletMap>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() =>
      expect(
        canvas.getByRole("button", { name: "Fleet vehicle" }).querySelector("svg"),
      ).not.toBeNull(),
    );
    await expect(canvas.getByRole("button", { name: "Fleet vehicle" })).toBeVisible();
  },
} satisfies Meta<typeof PointerIcon>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Pin: Story = { args: { children: <MapPinIcon aria-hidden="true" /> } };
