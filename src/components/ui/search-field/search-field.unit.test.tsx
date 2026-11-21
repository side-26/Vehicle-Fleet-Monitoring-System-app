import { createRef, useCallback, useState, type ChangeEvent } from "react";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

import { SearchField } from "./index";

function Controlled() {
  const [value, setValue] = useState("Truck");
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value),
    [],
  );
  return <SearchField aria-label="Search" value={value} onChange={onChange} />;
}

afterEach(cleanup);
it("clears an uncontrolled input and forwards focus and ref", () => {
  const ref = createRef<HTMLInputElement>();
  const { container } = render(<SearchField ref={ref} aria-label="Search" defaultValue="Truck" />);
  fireEvent.click(screen.getByRole("button", { name: "Clear search" }));
  expect(ref.current?.value).toBe("");
  expect(document.activeElement).toBe(ref.current);
  expect(container.querySelector('[data-slot="field-description"]')).toBeNull();
});
it("clears a controlled input through its change handler", () => {
  render(<Controlled />);
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("searchbox")).toHaveValue("");
});
it.each([{ disabled: true }, { readOnly: true }])(
  "prevents clearing immutable inputs: %o",
  (props) => {
    render(<SearchField {...props} aria-label="Search" defaultValue="Truck" />);
    expect(screen.getByRole("button")).toBeDisabled();
  },
);

it("attaches and cleans up callback refs", () => {
  const ref = vi.fn();
  const { unmount } = render(<SearchField ref={ref} aria-label="Search" />);
  expect(ref).toHaveBeenCalledWith(screen.getByRole("searchbox"));
  unmount();
  expect(ref).toHaveBeenLastCalledWith(null);
});

it("cleans up object refs on unmount", () => {
  const ref = createRef<HTMLInputElement>();
  const { unmount } = render(<SearchField ref={ref} aria-label="Search" />);
  expect(ref.current).toBe(screen.getByRole("searchbox"));
  unmount();
  expect(ref.current).toBeNull();
});

it("forwards native attributes and emits the cleared value through onChange", () => {
  const values: string[] = [];
  const onChange = vi.fn((event: ChangeEvent<HTMLInputElement>) => values.push(event.target.value));
  render(
    <SearchField
      aria-label="Search"
      name="query"
      placeholder="Find vehicle"
      defaultValue="Truck"
      clearLabel="Reset query"
      className="custom"
      onChange={onChange}
    />,
  );
  const input = screen.getByRole("searchbox");
  expect(input).toHaveAttribute("name", "query");
  expect(input).toHaveAttribute("placeholder", "Find vehicle");
  expect(input).toHaveClass("custom");
  fireEvent.click(screen.getByRole("button", { name: "Reset query" }));
  expect(values).toEqual([""]);
  expect(input).toHaveFocus();
});
