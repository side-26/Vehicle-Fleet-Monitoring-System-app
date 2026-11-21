import { createRef, type MouseEvent } from "react";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  Input,
  Textarea,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "./index";
import { inputGroupAlignments, inputGroupButtonSizes } from "./input-group.types";

afterEach(cleanup);
describe("InputGroup", () => {
  it.each(inputGroupAlignments)("focuses the control from %s addon", (align) => {
    render(
      <InputGroup aria-label="Search">
        <InputGroupAddon align={align}>
          <InputGroupText>Prefix</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput aria-label="Query" />
      </InputGroup>,
    );
    fireEvent.click(screen.getByText("Prefix"));
    expect(document.activeElement).toBe(screen.getByRole("textbox"));
    expect(screen.getByText("Prefix").parentElement?.getAttribute("data-align")).toBe(align);
  });
  it("supports textarea focus from an addon", () => {
    render(
      <InputGroup>
        <InputGroupTextarea aria-label="Notes" />
        <InputGroupAddon>Notes addon</InputGroupAddon>
      </InputGroup>,
    );
    fireEvent.click(screen.getByText("Notes addon"));
    expect(document.activeElement).toBe(screen.getByRole("textbox", { name: "Notes" }));
  });
  it.each(inputGroupButtonSizes)("supports %s action buttons", (size) => {
    const action = vi.fn();
    render(
      <InputGroup>
        <InputGroupInput aria-label="Query" />
        <InputGroupAddon>
          <InputGroupButton size={size} aria-label="Search" onClick={action}>
            Search
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(action).toHaveBeenCalledOnce();
    expect(document.activeElement).not.toBe(screen.getByRole("textbox"));
    expect(screen.getByRole("button").getAttribute("type")).toBe("button");
  });
});

it("honors canceled addon clicks and still calls the supplied handler", () => {
  const cancel = vi.fn((event: MouseEvent<HTMLDivElement>) => event.preventDefault());
  render(
    <InputGroup>
      <InputGroupAddon onClick={cancel}>Prefix</InputGroupAddon>
      <InputGroupInput aria-label="Query" />
    </InputGroup>,
  );
  fireEvent.click(screen.getByText("Prefix"));
  expect(cancel).toHaveBeenCalledOnce();
  expect(screen.getByRole("textbox")).not.toHaveFocus();
});

it("allows addons outside a group or without a control", () => {
  render(
    <>
      <InputGroupAddon>Standalone addon</InputGroupAddon>
      <InputGroup>
        <InputGroupAddon>Empty group addon</InputGroupAddon>
      </InputGroup>
    </>,
  );
  expect(() => fireEvent.click(screen.getByText("Standalone addon"))).not.toThrow();
  expect(() => fireEvent.click(screen.getByText("Empty group addon"))).not.toThrow();
});

it("preserves nested link interactions without moving focus to the group input", () => {
  render(
    <InputGroup>
      <InputGroupAddon>
        <a href="#vehicle">Vehicle link</a>
      </InputGroupAddon>
      <InputGroupInput aria-label="Query" />
    </InputGroup>,
  );
  const link = screen.getByRole("link");
  link.focus();
  fireEvent.click(link);
  expect(link).toHaveFocus();
});

it.each([Input, Textarea, InputGroupInput, InputGroupTextarea])(
  "forwards control refs, values, classes, validation and native events",
  (Control) => {
    const ref = createRef<HTMLInputElement & HTMLTextAreaElement>();
    const onChange = vi.fn();
    const { rerender } = render(
      <Control
        ref={ref}
        aria-label="Vehicle"
        defaultValue="Van"
        aria-invalid="true"
        className="custom"
        onChange={onChange}
      />,
    );
    const control = screen.getByRole("textbox", { name: "Vehicle" });
    expect(ref.current).toBe(control);
    expect(control).toHaveValue("Van");
    expect(control).toHaveClass("custom");
    expect(control).toHaveAttribute("aria-invalid", "true");
    fireEvent.change(control, { target: { value: "Truck" } });
    expect(onChange).toHaveBeenCalledOnce();
    expect(control).toHaveValue("Truck");
    rerender(<Control aria-label="Vehicle" disabled />);
    expect(control).toBeDisabled();
  },
);

it("defaults action buttons to non-submitting xs ghost buttons and forwards explicit overrides", () => {
  const { rerender } = render(<InputGroupButton aria-label="Action">Go</InputGroupButton>);
  expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  expect(screen.getByRole("button")).toHaveAttribute("data-group-size", "xs");
  expect(screen.getByRole("button")).toHaveAttribute("data-variant", "ghost");
  rerender(
    <InputGroupButton aria-label="Action" type="submit" variant="outlined" disabled>
      Go
    </InputGroupButton>,
  );
  expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  expect(screen.getByRole("button")).toHaveAttribute("data-variant", "outlined");
  expect(screen.getByRole("button")).toBeDisabled();
});
