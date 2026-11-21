import { createRef } from "react";

import type { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";

import { Separator } from "./index";
import { separatorOrientations } from "./separator.types";

const composedElement = <span />;
const stateClassName = (state: SeparatorPrimitive.State) => `custom-${state.orientation}`;

afterEach(cleanup);

it("defaults to an accessible horizontal separator", () => {
  render(<Separator />);
  expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "horizontal");
});

it.each(separatorOrientations)("exposes %s orientation", (orientation) => {
  render(<Separator orientation={orientation} />);
  expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", orientation);
  expect(screen.getByRole("separator")).toHaveAttribute("data-orientation", orientation);
});

it("forwards native attributes, custom classes, and refs", () => {
  const ref = createRef<HTMLDivElement>();
  render(<Separator ref={ref} id="division" aria-label="Fleet sections" className="custom" />);
  expect(ref.current).toBe(screen.getByRole("separator", { name: "Fleet sections" }));
  expect(ref.current).toHaveAttribute("id", "division");
  expect(ref.current).toHaveClass("custom");
});

it("preserves state callbacks and render composition", () => {
  render(<Separator orientation="vertical" className={stateClassName} render={composedElement} />);
  expect(screen.getByRole("separator").tagName).toBe("SPAN");
  expect(screen.getByRole("separator")).toHaveClass("custom-vertical");
});

it("supports decorative separators hidden from assistive technology", () => {
  render(<Separator aria-hidden="true" data-testid="decoration" />);
  expect(screen.queryByRole("separator")).not.toBeInTheDocument();
  expect(screen.getByTestId("decoration")).toHaveAttribute("aria-hidden", "true");
});
