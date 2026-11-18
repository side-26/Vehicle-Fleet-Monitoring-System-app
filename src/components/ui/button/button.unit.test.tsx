import * as jestDomMatchers from "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Button } from "./index";

void jestDomMatchers;

const handleClick = vi.fn();

describe("Button", () => {
  afterEach(cleanup);

  it("renders children and exposes its accessible name", () => {
    render(
      <Button aria-label="Submit form" onClick={handleClick}>
        Submit
      </Button>,
    );

    expect(screen.getByRole("button", { name: "Submit form" })).toHaveTextContent("Submit");
  });

  it("renders the required loading text and marks the button busy and disabled", () => {
    render(
      <Button
        aria-label="Saving changes"
        loading
        loadingText="Saving changes…"
        onClick={handleClick}
      >
        Save changes
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Saving changes" });
    expect(button).toHaveTextContent("Saving changes…");
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toBeDisabled();
  });

  it("keeps its children and enabled state when not loading", () => {
    render(
      <Button aria-label="Save changes" loading={false} onClick={handleClick}>
        Save changes
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Save changes" });
    expect(button).toHaveTextContent("Save changes");
    expect(button).not.toHaveAttribute("aria-busy");
    expect(button).toBeEnabled();
  });

  it("preserves explicit disabled state when not loading", () => {
    render(
      <Button aria-label="Unavailable action" disabled onClick={handleClick}>
        Unavailable
      </Button>,
    );

    expect(screen.getByRole("button", { name: "Unavailable action" })).toBeDisabled();
  });
});
