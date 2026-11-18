import * as jestDomMatchers from "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./index";

void jestDomMatchers;

const sampleSnapPoints: [number, number] = [0.35, 1];

function TestDrawer({
  modal = true,
  showSwipeHandle = false,
  swipeDirection = "down",
  snapPoints,
}: {
  modal?: boolean;
  showSwipeHandle?: boolean;
  swipeDirection?: "down" | "up" | "left" | "right";
  snapPoints?: [number, number];
}) {
  return (
    <Drawer
      modal={modal}
      showSwipeHandle={showSwipeHandle}
      swipeDirection={swipeDirection}
      snapPoints={snapPoints}
    >
      <DrawerTrigger>Open drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Fleet filters</DrawerTitle>
          <DrawerDescription>Choose vehicles.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>Close drawer</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

async function openDrawer() {
  fireEvent.click(screen.getByRole("button", { name: "Open drawer" }));
  return screen.findByRole("dialog", { name: "Fleet filters" });
}

describe("Drawer", () => {
  afterEach(cleanup);
  it("opens with accessible title and description and closes explicitly", async () => {
    render(<TestDrawer />);
    const dialog = await openDrawer();
    expect(dialog).toHaveAccessibleDescription("Choose vehicles.");
    fireEvent.click(screen.getByRole("button", { name: "Close drawer" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog", { name: "Fleet filters" })).not.toBeInTheDocument(),
    );
  });
  it("renders a swipe handle when requested", async () => {
    render(<TestDrawer showSwipeHandle />);
    expect((await openDrawer()).querySelector('[data-slot="drawer-swipe-handle"]')).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
  it("does not render an overlay in nonmodal mode", async () => {
    render(<TestDrawer modal={false} />);
    const dialog = await openDrawer();
    expect(dialog.closest('[data-slot="drawer-viewport"]')).toHaveAttribute("data-modal", "false");
    expect(document.querySelector('[data-slot="drawer-overlay"]')).not.toBeInTheDocument();
  });
  it.each(["down", "up", "left", "right"] as const)(
    "supports %s direction",
    async (swipeDirection) => {
      render(<TestDrawer swipeDirection={swipeDirection} />);
      expect(await openDrawer()).toHaveAttribute("data-swipe-direction", swipeDirection);
    },
  );
  it("passes snap points to the popup", async () => {
    render(<TestDrawer snapPoints={sampleSnapPoints} />);
    expect(await openDrawer()).toHaveAttribute("data-snap-points");
  });
  it("dismisses with Escape", async () => {
    render(<TestDrawer />);
    await openDrawer();
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() =>
      expect(screen.queryByRole("dialog", { name: "Fleet filters" })).not.toBeInTheDocument(),
    );
  });
});
