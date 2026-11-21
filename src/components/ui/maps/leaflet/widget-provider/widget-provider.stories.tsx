import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import { LeafletMap } from "@/components/ui/maps/leaflet/leaflet-map";
import { MapTile } from "@/components/ui/maps/leaflet/map-tile";

import { WidgetProvider } from "./index";
import { widgetAlignments } from "./widget-provider.types";
const center = [35.7, 51.4] satisfies [number, number];
const meta = {
  title: "Shared/UI/Maps/Leaflet/WidgetProvider",
  component: WidgetProvider,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", a11y: { test: "error" } },
  args: { align: "top-right" },
  argTypes: {
    align: {
      control: "select",
      options: widgetAlignments,
      type: "string",
      description: "Map corner for custom widgets. Defaults to top-right.",
    },
  },
  render: (args) => (
    <LeafletMap center={center} zoom={10}>
      <MapTile />
      <WidgetProvider {...args}>
        <button type="button">Locate vehicle</button>
        <button type="button">Map layers</button>
      </WidgetProvider>
    </LeafletMap>
  ),
  play: async ({ canvasElement, args }) => {
    const button = await within(canvasElement).findByRole("button", { name: "Locate vehicle" });
    await expect(button).toBeVisible();
    const [vertical, horizontal] = (args.align ?? "top-right").split("-");
    await expect(button.closest(`.leaflet-${vertical}.leaflet-${horizontal}`)).not.toBeNull();
  },
} satisfies Meta<typeof WidgetProvider>;
export default meta;
type Story = StoryObj<typeof meta>;
export const TopRight: Story = {};
export const TopLeft: Story = { args: { align: "top-left" } };
export const BottomLeft: Story = { args: { align: "bottom-left" } };
export const BottomRight: Story = { args: { align: "bottom-right" } };
