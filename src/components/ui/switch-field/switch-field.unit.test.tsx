import { createRef } from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { SwitchField } from "./index";
import { switchFieldColors, switchFieldSizes, switchFieldVariants } from "./switch-field.types";
it("labels, describes, and toggles an uncontrolled switch", () => {
  const onCheckedChange = vi.fn();
  render(
    <SwitchField
      label="Live tracking"
      message="Update positions"
      required
      onCheckedChange={onCheckedChange}
    />,
  );
  const control = screen.getByRole("switch", { name: "Live tracking" });
  expect(control).toHaveAccessibleDescription("Update positions");
  expect(control).not.toBeChecked();
  fireEvent.click(control);
  expect(control).toBeChecked();
  expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
});
it("preserves controlled state, input ref and native form value", () => {
  const inputRef = createRef<HTMLInputElement>();
  const { rerender, container } = render(
    <form>
      <SwitchField
        label="Tracking"
        checked={false}
        inputRef={inputRef}
        name="tracking"
        value="enabled"
      />
    </form>,
  );
  fireEvent.click(screen.getByRole("switch"));
  expect(screen.getByRole("switch")).not.toBeChecked();
  rerender(
    <form>
      <SwitchField label="Tracking" checked inputRef={inputRef} name="tracking" value="enabled" />
    </form>,
  );
  expect(inputRef.current).toBeChecked();
  expect(new FormData(container.querySelector("form")!).get("tracking")).toBe("enabled");
});
it.each(["disabled", "readOnly"] as const)("prevents interaction when %s", (property) => {
  render(<SwitchField aria-label="Tracking" {...{ [property]: true }} />);
  fireEvent.click(screen.getByRole("switch"));
  expect(screen.getByRole("switch")).not.toBeChecked();
});
it("merges descriptions and hides empty optional content", () => {
  const { rerender } = render(
    <>
      <span id="extra">Extra</span>
      <SwitchField aria-label="Tracking" aria-describedby="extra" message="Help" />
    </>,
  );
  expect(screen.getByRole("switch")).toHaveAccessibleDescription("Extra Help");
  rerender(<SwitchField aria-label="Tracking" />);
  expect(screen.getByRole("switch")).not.toHaveAttribute("aria-describedby");
  expect(document.querySelector('[data-slot="field-label"]')).toBeNull();
  expect(document.querySelector('[data-slot="field-description"]')).toBeNull();
});
it.each(switchFieldColors)("renders %s across all sizes and variants", (color) => {
  const { rerender } = render(
    <SwitchField
      label="Tracking"
      {...(color === "error"
        ? ({ trueValueColor: "error", falseValueColor: "primary" } as const)
        : ({ trueValueColor: color, falseValueColor: "error" } as const))}
    />,
  );
  for (const size of switchFieldSizes)
    for (const variant of switchFieldVariants) {
      rerender(
        <SwitchField
          label="Tracking"
          {...(color === "error"
            ? ({ trueValueColor: "error", falseValueColor: "primary" } as const)
            : ({ trueValueColor: color, falseValueColor: "error" } as const))}
          size={size}
          variant={variant}
        />,
      );
      const field = document.querySelector("[data-true-color]");
      expect(field).toHaveAttribute("data-true-color", color);
      expect(field).toHaveAttribute("data-size", size);
      expect(field).toHaveAttribute("data-variant", variant);
    }
});

it("defaults to primary when checked and error when unchecked", () => {
  const { container } = render(<SwitchField label="Tracking" />);
  expect(container.querySelector("[data-true-color]")).toHaveAttribute(
    "data-true-color",
    "primary",
  );
  expect(container.querySelector("[data-false-color]")).toHaveAttribute(
    "data-false-color",
    "error",
  );
});
it("rejects duplicate state colors including defaults", () => {
  const duplicate = (
    // @ts-expect-error Duplicate state colors are intentionally invalid.
    <SwitchField trueValueColor="success" falseValueColor="success" aria-label="Tracking" />
  );
  expect(() => render(duplicate)).toThrow("must be different");
  // @ts-expect-error Unchecked defaults to error, so checked error needs an explicit different unchecked color.
  const duplicateDefault = <SwitchField trueValueColor="error" aria-label="Tracking" />;
  expect(() => render(duplicateDefault)).toThrow("must be different");
  const invalid = (
    // @ts-expect-error Booleans are not semantic colors.
    <SwitchField trueValueColor={false} falseValueColor={false} aria-label="Tracking" />
  );
  expect(() => render(invalid)).toThrow("colors must be");
});
