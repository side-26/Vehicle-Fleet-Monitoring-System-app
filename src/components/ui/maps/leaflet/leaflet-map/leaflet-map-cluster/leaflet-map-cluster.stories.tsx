import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor, within } from "storybook/test";

import { LeafletMap } from "@/components/ui/maps/leaflet/leaflet-map";
import { MapPointer } from "@/components/ui/maps/leaflet/map-pointer";
import { MapTile } from "@/components/ui/maps/leaflet/map-tile";

import { LeafletMapCluster } from "./index";

const center = [35.7, 51.4] satisfies [number, number];
const vehicles = [
  { name: "Vehicle one", position: [35.7, 51.4] satisfies [number, number] },
  { name: "Vehicle two", position: [35.701, 51.401] satisfies [number, number] },
  { name: "Vehicle three", position: [35.702, 51.402] satisfies [number, number] },
];
const meta = {
  title: "Shared/UI/Maps/Leaflet/LeafletMapCluster",
  component: LeafletMapCluster,
  parameters: { layout: "fullscreen", a11y: { test: "error" } },
  args: { children: null, animate: false, chunkedLoading: false, maxClusterRadius: 80 },
  argTypes: {
    children: {
      control: false,
      type: "string",
      description: "MapPointer elements grouped in this cluster layer.",
    },
    animate: {
      control: "boolean",
      type: "boolean",
      description:
        "Native cluster split/merge animation; disabled in these examples for deterministic inspection.",
    },
    chunkedLoading: {
      control: "boolean",
      type: "boolean",
      description: "Native option to process markers in chunks.",
    },
    maxClusterRadius: {
      control: "number",
      type: "number",
      description:
        "Native maximum cluster radius in screen pixels; defaults to 80 in the dependency.",
    },
    showCoverageOnHover: {
      control: "boolean",
      type: "boolean",
      description: "Show the cluster coverage polygon on hover.",
    },
    spiderfyOnMaxZoom: {
      control: "boolean",
      type: "boolean",
      description: "Spread overlapping markers at the maximum zoom.",
    },
    disableClusteringAtZoom: {
      control: "number",
      type: "number",
      description: "Zoom at or above which markers are shown individually.",
    },
  },
  render: (args) => (
    <LeafletMap center={center} zoom={10} maxZoom={18}>
      <MapTile lightUrl="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LeafletMapCluster {...args}>
        {vehicles.map(({ name, position }) => (
          <MapPointer key={name} position={position} alt={name} />
        ))}
      </LeafletMapCluster>
    </LeafletMap>
  ),
} satisfies Meta<typeof LeafletMapCluster>;
export default meta;
type Story = StoryObj<typeof meta>;

async function checkCluster(canvasElement: HTMLElement) {
  await waitFor(() => {
    const map = canvasElement.querySelector(".leaflet-container")?.getBoundingClientRect();
    expect(map?.width).toBeGreaterThan(200);
    expect(map?.height).toBeGreaterThan(200);
    const cluster = canvasElement.querySelector(".marker-cluster");
    expect(cluster).toBeVisible();
    expect(cluster).toHaveTextContent("3");
  });
}

export const Default: Story = {
  play: async ({ canvasElement }) => {
    await checkCluster(canvasElement);
  },
};
export const WithoutCoverage: Story = {
  args: { showCoverageOnHover: false, spiderfyOnMaxZoom: false },
  play: async ({ canvasElement }) => {
    await checkCluster(canvasElement);
  },
};
export const UnclusteredAtCurrentZoom: Story = {
  args: { disableClusteringAtZoom: 8 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByRole("button", { name: "Vehicle one" })).toBeVisible();
    await expect(await canvas.findByRole("button", { name: "Vehicle two" })).toBeVisible();
    await expect(await canvas.findByRole("button", { name: "Vehicle three" })).toBeVisible();
    await expect(canvasElement.querySelector(".marker-cluster")).toBeNull();
  },
};
