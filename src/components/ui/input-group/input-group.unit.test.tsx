import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
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
