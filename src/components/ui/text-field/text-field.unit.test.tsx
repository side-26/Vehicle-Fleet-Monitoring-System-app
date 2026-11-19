import { createRef } from "react";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { fieldSizes } from "@/components/ui/field/field.types";
import { InputGroupAddon, InputGroupButton, InputGroupText } from "@/components/ui/input-group";

import { TextField } from "./index";
import styles from "./styles.module.css";
import { textFieldColors, textFieldVariants } from "./text-field.types";

afterEach(cleanup);
describe("TextField", () => {
  it("keeps the description mounted when a message appears and animates its content", () => {
    const { container, rerender } = render(<TextField label="Vehicle" />);
    const description = container.querySelector('[data-slot="field-description"]');
    expect(description).not.toBeNull();
    expect(screen.getByRole("textbox").hasAttribute("aria-describedby")).toBe(false);
    rerender(<TextField label="Vehicle" message="Required" />);
    expect(container.querySelector('[data-slot="field-description"]')).toBe(description);
    expect(screen.getByText("Required").classList.contains(styles["slide-y"] ?? "slide-y")).toBe(
      true,
    );
    expect(screen.getByRole("textbox").getAttribute("aria-describedby")).toBe(description?.id);
  });
  it("omits the description and its reference when haveMessage is false", () => {
    const { container } = render(
      <TextField
        label="Vehicle"
        message="Hidden"
        haveMessage={false}
        aria-describedby="external"
      />,
    );
    expect(container.querySelector('[data-slot="field-description"]')).toBeNull();
    expect(screen.getByRole("textbox").getAttribute("aria-describedby")).toBe("external");
  });
  it("renders addon children inside the group and focuses the input from an addon", () => {
    render(
      <TextField label="Vehicle">
        <InputGroupAddon>
          <InputGroupText>Prefix</InputGroupText>
        </InputGroupAddon>
      </TextField>,
    );
    const input = screen.getByRole("textbox", { name: "Vehicle" });
    expect(input.getAttribute("data-slot")).toBe("input-group-control");
    expect(input.closest('[data-slot="input-group"]')?.contains(screen.getByText("Prefix"))).toBe(
      true,
    );
    fireEvent.click(screen.getByText("Prefix"));
    expect(document.activeElement).toBe(input);
  });
  it("keeps addon actions interactive without passing children to the input", () => {
    const onClick = vi.fn();
    render(
      <TextField label="Vehicle">
        <InputGroupAddon align="inline-end">
          <InputGroupButton aria-label="Search" onClick={onClick}>
            Search
          </InputGroupButton>
        </InputGroupAddon>
      </TextField>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.getByRole("textbox").children).toHaveLength(0);
  });
  it("connects labels and messages and forwards refs", () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <TextField
        ref={ref}
        label="Vehicle"
        message="Fleet name"
        required
        aria-describedby="external"
      />,
    );
    const input = screen.getByRole("textbox", { name: "Vehicle" });
    expect(ref.current).toBe(input);
    expect(input.hasAttribute("required")).toBe(true);
    expect(input.getAttribute("aria-describedby")).toContain("external");
    expect(input.getAttribute("aria-describedby")).toContain(screen.getByText("Fleet name").id);
    expect(screen.getByText("*").getAttribute("aria-hidden")).toBe("true");
  });
  it("omits empty labels, reserves message space, and forwards input changes", () => {
    const onChange = vi.fn();
    const { container } = render(
      <TextField aria-label="Vehicle" onChange={onChange} defaultValue="Van" />,
    );
    expect(container.querySelector('[data-slot="field-label"]')).toBeNull();
    expect(container.querySelector('[data-slot="field-description"]')?.textContent).toBe("");
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Truck" } });
    expect(onChange).toHaveBeenCalledOnce();
  });
  it.each(fieldSizes)("supports %s size", (size) => {
    render(<TextField size={size} aria-label="Vehicle" />);
    expect(
      screen.getByRole("textbox").closest('[data-slot="field"]')?.getAttribute("data-size"),
    ).toBe(size);
  });
  it.each(textFieldColors)("supports %s color", (color) => {
    render(<TextField color={color} aria-label="Vehicle" />);
    expect(
      screen.getByRole("textbox").closest('[data-slot="field"]')?.getAttribute("data-color"),
    ).toBe(color);
  });
  it.each(textFieldVariants)("supports %s variant", (variant) => {
    render(<TextField variant={variant} aria-label="Vehicle" />);
    expect(
      screen.getByRole("textbox").closest('[data-slot="field"]')?.getAttribute("data-variant"),
    ).toBe(variant);
  });
});
