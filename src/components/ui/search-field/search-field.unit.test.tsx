import { createRef, useCallback, useState, type ChangeEvent } from "react";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";

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
