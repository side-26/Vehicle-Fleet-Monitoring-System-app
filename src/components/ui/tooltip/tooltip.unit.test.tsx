import { createRef } from "react";

import type { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./index";
import { tooltipColors, tooltipSizes } from "./tooltip.types";
import type { TooltipContentProps } from "./tooltip.types";

function Example(props: TooltipContentProps) {
  return (
    <TooltipProvider>
      <Tooltip defaultOpen>
        <TooltipTrigger>Vehicle</TooltipTrigger>
        <TooltipContent {...props}>Vehicle details</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

afterEach(cleanup);

it("defaults to neutral, md, and a solid surface in a portal", () => {
  const { container } = render(<Example />);
  const popup = screen.getByText("Vehicle details");
  expect(popup).toHaveTextContent("Vehicle details");
  expect(popup).toHaveAttribute("data-color", "neutral");
  expect(popup).toHaveAttribute("data-size", "md");
  expect(popup).toHaveAttribute("data-glassy", "false");
  expect(container).not.toContainElement(popup);
});

it.each(tooltipColors)("supports %s in every size with solid and glass surfaces", (color) => {
  for (const size of tooltipSizes) {
    for (const glassy of [false, true]) {
      const { unmount } = render(<Example color={color} size={size} glassy={glassy} />);
      expect(screen.getByText("Vehicle details")).toHaveAttribute("data-color", color);
      expect(screen.getByText("Vehicle details")).toHaveAttribute("data-size", size);
      expect(screen.getByText("Vehicle details")).toHaveAttribute("data-glassy", String(glassy));
      unmount();
    }
  }
});

it("opens on keyboard focus and dismisses with Escape while retaining focus", async () => {
  const user = userEvent.setup();
  render(
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>Vehicle</TooltipTrigger>
        <TooltipContent>Vehicle details</TooltipContent>
      </Tooltip>
    </TooltipProvider>,
  );
  expect(screen.queryByText("Vehicle details")).not.toBeInTheDocument();
  await user.tab();
  expect(await screen.findByText("Vehicle details")).toHaveTextContent("Vehicle details");
  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByText("Vehicle details")).not.toBeInTheDocument());
  expect(screen.getByRole("button", { name: "Vehicle" })).toHaveFocus();
});

it("opens on hover with a shared delay and closes on pointer leave", async () => {
  const user = userEvent.setup();
  render(
    <TooltipProvider delay={25}>
      <Tooltip>
        <TooltipTrigger>Vehicle</TooltipTrigger>
        <TooltipContent>Vehicle details</TooltipContent>
      </Tooltip>
    </TooltipProvider>,
  );
  await user.hover(screen.getByRole("button"));
  expect(await screen.findByText("Vehicle details")).toHaveTextContent("Vehicle details");
  await user.unhover(screen.getByRole("button"));
  await waitFor(() => expect(screen.queryByText("Vehicle details")).not.toBeInTheDocument());
});

it("does not open a disabled tooltip on focus or hover", async () => {
  const user = userEvent.setup();
  render(
    <TooltipProvider>
      <Tooltip disabled>
        <TooltipTrigger>Vehicle</TooltipTrigger>
        <TooltipContent>Vehicle details</TooltipContent>
      </Tooltip>
    </TooltipProvider>,
  );
  await user.hover(screen.getByRole("button"));
  await user.tab();
  expect(screen.getByRole("button")).toHaveFocus();
  expect(screen.queryByText("Vehicle details")).not.toBeInTheDocument();
});

it("forwards popup and trigger refs, native props and state classes", () => {
  const popupRef = createRef<HTMLDivElement>();
  const triggerRef = createRef<HTMLButtonElement>();
  const popupClassName = vi.fn((state: TooltipPrimitive.Popup.State) =>
    state.open ? "open-popup" : "closed-popup",
  );
  render(
    <Tooltip open>
      <TooltipTrigger ref={triggerRef} id="vehicle-trigger">
        Vehicle
      </TooltipTrigger>
      <TooltipContent ref={popupRef} id="vehicle-hint" title="Fleet" className={popupClassName}>
        Vehicle details
      </TooltipContent>
    </Tooltip>,
  );
  expect(triggerRef.current).toBe(screen.getByRole("button"));
  expect(popupRef.current).toBe(screen.getByText("Vehicle details"));
  expect(popupRef.current).toHaveAttribute("id", "vehicle-hint");
  expect(popupRef.current).toHaveAttribute("title", "Fleet");
  expect(popupRef.current).toHaveClass("open-popup");
  expect(popupClassName).toHaveBeenCalled();
});

it("forwards controlled open changes and respects caller open state", async () => {
  const onOpenChange = vi.fn();
  const { rerender } = render(
    <Tooltip open onOpenChange={onOpenChange}>
      <TooltipTrigger>Vehicle</TooltipTrigger>
      <TooltipContent className="custom">Vehicle details</TooltipContent>
    </Tooltip>,
  );
  expect(screen.getByText("Vehicle details")).toHaveClass("custom");
  await userEvent.keyboard("{Escape}");
  expect(onOpenChange).toHaveBeenCalledWith(
    false,
    expect.objectContaining({ reason: "escape-key" }),
  );
  rerender(
    <Tooltip open={false}>
      <TooltipTrigger>Vehicle</TooltipTrigger>
      <TooltipContent>Vehicle details</TooltipContent>
    </Tooltip>,
  );
  await waitFor(() => expect(screen.queryByText("Vehicle details")).not.toBeInTheDocument());
});

const customTrigger = <button type="button" aria-label="Vehicle" />;
const customPopup = <aside />;

it("supports Base UI render composition for the trigger and popup", () => {
  render(
    <Tooltip defaultOpen>
      <TooltipTrigger render={customTrigger}>Vehicle</TooltipTrigger>
      <TooltipContent render={customPopup}>Vehicle details</TooltipContent>
    </Tooltip>,
  );
  expect(screen.getByRole("button", { name: "Vehicle" })).toHaveAttribute(
    "data-slot",
    "tooltip-trigger",
  );
  expect(screen.getByText("Vehicle details").tagName).toBe("ASIDE");
});

it("keeps controlled gallery samples open together", async () => {
  render(
    <TooltipProvider>
      <Tooltip open>
        <TooltipTrigger>First</TooltipTrigger>
        <TooltipContent>First hint</TooltipContent>
      </Tooltip>
      <Tooltip open>
        <TooltipTrigger>Second</TooltipTrigger>
        <TooltipContent>Second hint</TooltipContent>
      </Tooltip>
    </TooltipProvider>,
  );
  await userEvent.hover(screen.getByRole("button", { name: "Second" }));
  expect(screen.getByText("First hint")).toBeInTheDocument();
  expect(screen.getByText("Second hint")).toBeInTheDocument();
});
