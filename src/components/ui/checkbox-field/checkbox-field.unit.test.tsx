import { createRef } from "react";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

import { fieldSizes } from "@/components/ui/field/field.types";

import { checkboxFieldColors } from "./checkbox-field.types";
import { CheckboxField } from "./index";

afterEach(cleanup);
it("connects label and description, toggles, and forwards ref", () => {
  const ref = createRef<HTMLSpanElement>();
  const onCheckedChange = vi.fn();
  render(
    <CheckboxField
      ref={ref}
      label="Terms"
      message="Read terms"
      required
      onCheckedChange={onCheckedChange}
      aria-describedby="external"
    />,
  );
  const checkbox = screen.getByRole("checkbox", { name: "Terms" });
  expect(ref.current).toBe(checkbox);
  expect(checkbox.getAttribute("aria-describedby")).toContain("external");
  expect(checkbox.getAttribute("aria-describedby")).toContain(screen.getByText("Read terms").id);
  fireEvent.click(screen.getByText("Terms"));
  expect(checkbox).toBeChecked();
  expect(onCheckedChange).toHaveBeenCalled();
  expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
});
it("supports controlled checked state, indeterminate and disabled", () => {
  const { rerender } = render(<CheckboxField label="Terms" checked disabled />);
  expect(screen.getByRole("checkbox")).toBeChecked();
  expect(screen.getByRole("checkbox")).toHaveAttribute("aria-disabled", "true");
  rerender(<CheckboxField label="Terms" indeterminate />);
  expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "mixed");
});
it("reserves message space and can omit it", () => {
  const { container, rerender } = render(<CheckboxField aria-label="Terms" defaultChecked />);
  expect(screen.getByRole("checkbox")).toBeChecked();
  expect(container.querySelector('[data-slot="field-description"]')).not.toBeNull();
  rerender(<CheckboxField aria-label="Terms" message="Hidden" haveMessage={false} />);
  expect(container.querySelector('[data-slot="field-description"]')).toBeNull();
  expect(screen.queryByText("Hidden")).toBeNull();
});
it.each(fieldSizes)("supports size %s", (size) => {
  render(<CheckboxField label="Terms" size={size} />);
  expect(screen.getByRole("group")).toHaveAttribute("data-size", size);
});
it.each(checkboxFieldColors)("supports color %s", (color) => {
  render(<CheckboxField label="Terms" color={color} />);
  expect(screen.getByRole("group")).toHaveAttribute("data-color", color);
});
