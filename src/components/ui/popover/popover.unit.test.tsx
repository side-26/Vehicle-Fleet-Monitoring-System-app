import * as jestDomMatchers from "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./index";

void jestDomMatchers;

function TestPopover({
  defaultOpen = false,
  modal = false,
  side = "bottom",
  align = "center",
}: {
  defaultOpen?: boolean;
  modal?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}) {
  return (
    <Popover defaultOpen={defaultOpen} modal={modal}>
      <PopoverTrigger>Open popover</PopoverTrigger>
      <PopoverContent side={side} align={align}>
        <PopoverHeader>
          <PopoverTitle>Vehicle details</PopoverTitle>
          <PopoverDescription>Current fleet information.</PopoverDescription>
        </PopoverHeader>
        <PopoverClose>Close popover</PopoverClose>
      </PopoverContent>
    </Popover>
  );
}

async function openPopover() {
  fireEvent.click(screen.getByRole("button", { name: "Open popover" }));
  return screen.findByRole("dialog", { name: "Vehicle details" });
}

describe("Popover", () => {
  afterEach(cleanup);
  it("opens with an accessible title and description", async () => {
    render(<TestPopover />);
    expect(await openPopover()).toHaveAccessibleDescription("Current fleet information.");
  });
  it("supports an initially open state", () => {
    render(<TestPopover defaultOpen />);
    expect(screen.getByRole("dialog", { name: "Vehicle details" })).toBeInTheDocument();
  });
  it("closes from its close button", async () => {
    render(<TestPopover />);
    await openPopover();
    fireEvent.click(screen.getByRole("button", { name: "Close popover" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog", { name: "Vehicle details" })).not.toBeInTheDocument(),
    );
  });
  it("closes with Escape", async () => {
    render(<TestPopover />);
    await openPopover();
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() =>
      expect(screen.queryByRole("dialog", { name: "Vehicle details" })).not.toBeInTheDocument(),
    );
  });
  it("supports modal mode", async () => {
    render(<TestPopover modal />);
    expect(await openPopover()).toBeInTheDocument();
  });
  it.each(["top", "right", "bottom", "left"] as const)("positions on %s side", async (side) => {
    render(<TestPopover side={side} />);
    expect(await openPopover()).toHaveAttribute("data-side", side);
  });
  it.each(["start", "center", "end"] as const)("supports %s alignment", async (align) => {
    render(<TestPopover align={align} />);
    expect(await openPopover()).toBeInTheDocument();
  });
});
