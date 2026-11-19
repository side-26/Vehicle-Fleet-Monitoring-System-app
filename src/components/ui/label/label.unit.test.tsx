import { createRef } from "react";

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it } from "vitest";

import { Label } from "./index";

afterEach(cleanup);
it("associates a control and focuses it when clicked", async () => {
  render(
    <>
      <Label htmlFor="vehicle">Vehicle</Label>
      <input id="vehicle" />
    </>,
  );
  await userEvent.click(screen.getByText("Vehicle"));
  expect(screen.getByRole("textbox", { name: "Vehicle" })).toHaveFocus();
});
it("supports nested controls", () => {
  render(
    <Label>
      Vehicle
      <input />
    </Label>,
  );
  expect(screen.getByRole("textbox", { name: "Vehicle" })).toBeInTheDocument();
});
it("forwards refs, native attributes, and custom classes", () => {
  const ref = createRef<HTMLLabelElement>();
  render(
    <Label ref={ref} htmlFor="vehicle" id="caption" className="custom" title="Fleet">
      Vehicle
    </Label>,
  );
  expect(ref.current).toBe(screen.getByText("Vehicle"));
  expect(ref.current).toHaveAttribute("for", "vehicle");
  expect(ref.current).toHaveAttribute("id", "caption");
  expect(ref.current).toHaveAttribute("title", "Fleet");
  expect(ref.current).toHaveClass("custom");
});
