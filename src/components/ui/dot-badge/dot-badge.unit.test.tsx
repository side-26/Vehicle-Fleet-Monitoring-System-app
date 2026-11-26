import { createRef } from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { dotBadgeColors, dotBadgePositions, dotBadgeSizes } from "./dot-badge.types";
import { DotBadge } from "./index";

afterEach(cleanup);
describe("DotBadge", () => {
  it("defaults to a decorative small primary dot", () => {
    const { container } = render(<DotBadge />);
    const dot = container.querySelector('[data-slot="dot-badge"]');
    expect(dot).toHaveAttribute("data-size", "sm");
    expect(dot).toHaveAttribute("data-color", "primary");
    expect(dot).not.toHaveAttribute("data-position");
    expect(dot).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("img")).toBeNull();
  });
  for (const size of dotBadgeSizes) {
    it.each(dotBadgeColors)(`renders ${size} %s with an accessible name`, (color) => {
      render(<DotBadge size={size} color={color} aria-label="Unread notifications" />);
      const dot = screen.getByRole("img", { name: "Unread notifications" });
      expect(dot).toHaveAttribute("data-size", size);
      expect(dot).toHaveAttribute("data-color", color);
    });
  }
  it.each(dotBadgePositions)(
    "supports %s placement without forwarding a position attribute",
    (position) => {
      render(<DotBadge position={position} aria-label="Positioned dot" />);
      const dot = screen.getByRole("img", { name: "Positioned dot" });
      expect(dot).toHaveAttribute("data-position", position);
      expect(dot).not.toHaveAttribute("position");
    },
  );
  it("forwards ref and native attributes and merges classes", () => {
    const ref = createRef<SVGSVGElement>();
    render(
      <DotBadge ref={ref} id="unread" className="custom" aria-label="Unread" data-testid="dot" />,
    );
    expect(ref.current).toBe(screen.getByTestId("dot"));
    expect(ref.current).toHaveAttribute("id", "unread");
    expect(ref.current).toHaveClass("custom");
    expect(ref.current?.getAttribute("class")).toContain("dot");
  });
  it("supports an external label and explicit decorative override", () => {
    const { rerender } = render(
      <>
        <span id="status">Online</span>
        <DotBadge aria-labelledby="status" />
      </>,
    );
    expect(screen.getByRole("img", { name: "Online" })).toBeTruthy();
    rerender(<DotBadge aria-label="Online" aria-hidden="true" />);
    expect(screen.queryByRole("img")).toBeNull();
  });
});
