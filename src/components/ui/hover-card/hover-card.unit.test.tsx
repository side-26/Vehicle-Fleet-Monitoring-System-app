import { createRef } from "react";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

import { hoverCardColors, hoverCardGutters } from "./hover-card.types";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./index";
it("opens on hover and closes when the pointer leaves", async () => {
  const user = userEvent.setup();
  const change = vi.fn();
  render(
    <HoverCard onOpenChange={change}>
      <HoverCardTrigger href="https://example.com" delay={0} closeDelay={0}>
        Vehicle
      </HoverCardTrigger>
      <HoverCardContent>Vehicle details</HoverCardContent>
    </HoverCard>,
  );
  const trigger = screen.getByRole("link", { name: "Vehicle" });
  expect(screen.queryByText("Vehicle details")).not.toBeInTheDocument();
  await user.hover(trigger);
  expect(await screen.findByText("Vehicle details")).toBeVisible();
  await user.unhover(trigger);
  await waitFor(() => expect(screen.queryByText("Vehicle details")).not.toBeInTheDocument());
  expect(change).toHaveBeenCalled();
});
it.each(hoverCardColors)("supports %s and all gutter sizes", (color) => {
  const { rerender } = render(
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle</HoverCardTrigger>
      <HoverCardContent color={color}>Details</HoverCardContent>
    </HoverCard>,
  );
  for (const gutter of hoverCardGutters) {
    rerender(
      <HoverCard open>
        <HoverCardTrigger href="https://example.com">Vehicle</HoverCardTrigger>
        <HoverCardContent color={color} gutter={gutter}>
          Details
        </HoverCardContent>
      </HoverCard>,
    );
    expect(screen.getByText("Details")).toHaveAttribute("data-color", color);
    expect(screen.getByText("Details")).toHaveAttribute("data-gutter", gutter);
  }
});
it("defaults to neutral and md and forwards native refs and props", () => {
  const ref = createRef<HTMLDivElement>();
  render(
    <HoverCard open>
      <HoverCardTrigger href="https://example.com">Vehicle</HoverCardTrigger>
      <HoverCardContent ref={ref} id="vehicle-card" className="custom">
        Details
      </HoverCardContent>
    </HoverCard>,
  );
  expect(ref.current).toBe(screen.getByText("Details"));
  expect(ref.current).toHaveAttribute("id", "vehicle-card");
  expect(ref.current).toHaveClass("custom");
  expect(ref.current).toHaveAttribute("data-color", "neutral");
  expect(ref.current).toHaveAttribute("data-gutter", "md");
});
