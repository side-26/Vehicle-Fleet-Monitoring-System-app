import { createRef } from "react";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { Map } from "leaflet";
import { expect, it, vi } from "vitest";

import { LeafletMap } from "@/components/ui/maps/leaflet/leaflet-map";

import { WidgetProvider } from "./index";
import { widgetAlignments } from "./widget-provider.types";
const center = [0, 0] satisfies [number, number];
it("places children in each corner, preserves them on alignment changes and cleans up", async () => {
  const { rerender, unmount } = render(
    <LeafletMap center={center} zoom={2}>
      <WidgetProvider>
        <input aria-label="Search vehicles" defaultValue="Van" />
      </WidgetProvider>
    </LeafletMap>,
  );
  const input = await screen.findByRole("textbox", { name: "Search vehicles" });
  await waitFor(() => expect(input.closest(".leaflet-top.leaflet-right")).not.toBeNull());
  for (const align of widgetAlignments) {
    rerender(
      <LeafletMap center={center} zoom={2}>
        <WidgetProvider align={align}>
          <input aria-label="Search vehicles" defaultValue="Van" />
        </WidgetProvider>
      </LeafletMap>,
    );
    const [vertical, horizontal] = align.split("-");
    expect(input.closest(`.leaflet-${vertical}.leaflet-${horizontal}`)).not.toBeNull();
    expect(screen.getByRole("textbox")).toBe(input);
    expect(input).toHaveValue("Van");
  }
  unmount();
  expect(document.querySelector(".leaflet-control-container")).toBeNull();
});
it("keeps widget clicks interactive without firing map clicks", async () => {
  const ref = createRef<Map>();
  const click = vi.fn();
  const mapClick = vi.fn();
  render(
    <LeafletMap ref={ref} center={center} zoom={2}>
      <WidgetProvider>
        <button type="button" onClick={click}>
          Locate vehicle
        </button>
      </WidgetProvider>
    </LeafletMap>,
  );
  const button = await screen.findByRole("button", { name: "Locate vehicle" });
  await waitFor(() => expect(button.closest(".leaflet-control")).not.toBeNull());
  ref.current?.on("click", mapClick);
  fireEvent.click(button);
  expect(click).toHaveBeenCalledOnce();
  expect(mapClick).not.toHaveBeenCalled();
});
