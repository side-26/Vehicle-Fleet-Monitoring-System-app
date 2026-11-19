import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { fieldOrientations, fieldSizes } from "./field.types";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./index";

afterEach(cleanup);

const duplicateErrors = [{ message: "Required" }, { message: "Required" }];
const multipleErrors = [{ message: "Required" }, { message: "Too short" }];
const requiredErrors = [{ message: "Required" }];

describe("Field", () => {
  it.each(fieldSizes)("supports %s size", (size) => {
    render(<Field size={size} aria-label="Sized field" />);
    expect(screen.getByRole("group", { name: "Sized field" }).getAttribute("data-size")).toBe(size);
  });
  it("defaults to medium size", () => {
    render(<Field aria-label="Default field" />);
    expect(screen.getByRole("group", { name: "Default field" }).getAttribute("data-size")).toBe(
      "md",
    );
  });
  it.each(fieldOrientations)("composes an accessible %s field", (orientation) => {
    render(
      <FieldGroup>
        <Field orientation={orientation} aria-label="Vehicle">
          <FieldLabel htmlFor="vehicle">Vehicle name</FieldLabel>
          <input id="vehicle" aria-describedby="hint" />
          <FieldDescription id="hint">Use the fleet identifier.</FieldDescription>
        </Field>
      </FieldGroup>,
    );
    expect(screen.getByRole("group", { name: "Vehicle" }).getAttribute("data-orientation")).toBe(
      orientation,
    );
    expect(
      screen.getByRole("textbox", { name: "Vehicle name" }).getAttribute("aria-describedby"),
    ).toBe("hint");
  });
  it("names a native fieldset with its legend", () => {
    render(
      <FieldSet>
        <FieldLegend>Fleet settings</FieldLegend>
      </FieldSet>,
    );
    expect(screen.getByRole("group", { name: "Fleet settings" })).toBeTruthy();
  });
  it("omits empty errors", () => {
    render(<FieldError />);
    expect(screen.queryByRole("alert")).toBeNull();
  });
  it("deduplicates validation messages", () => {
    render(<FieldError errors={duplicateErrors} />);
    expect(screen.getByRole("alert").textContent).toBe("Required");
  });
  it("renders multiple errors as a list and prioritizes explicit content", () => {
    const { rerender } = render(<FieldError errors={multipleErrors} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    rerender(<FieldError errors={requiredErrors}>Custom error</FieldError>);
    expect(screen.getByRole("alert").textContent).toBe("Custom error");
  });
});
