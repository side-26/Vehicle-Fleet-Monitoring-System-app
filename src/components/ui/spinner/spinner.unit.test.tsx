import * as jestDomMatchers from "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, assert, describe, expect, it } from "vitest";

import { Spinner } from "./index";
import styles from "./styles.module.css";

void jestDomMatchers;
const spinnerClass = styles.spinner;
const largeClass = styles.large;
assert(typeof spinnerClass === "string" && typeof largeClass === "string");

describe("Spinner", () => {
  afterEach(cleanup);

  it("provides a default accessible loading status", () => {
    render(<Spinner />);
    expect(screen.getByRole("status", { name: "Loading" })).toHaveAttribute("data-slot", "spinner");
  });
  it("supports a specific accessible label", () => {
    render(<Spinner aria-label="Loading vehicles" />);
    expect(screen.getByRole("status", { name: "Loading vehicles" })).toBeInTheDocument();
  });
  it("merges custom classes and forwards SVG props", () => {
    render(<Spinner aria-label="Loading report" className={styles.large} data-icon="inline-end" />);
    expect(screen.getByRole("status", { name: "Loading report" })).toHaveClass(
      spinnerClass,
      largeClass,
    );
    expect(screen.getByRole("status", { name: "Loading report" })).toHaveAttribute(
      "data-icon",
      "inline-end",
    );
  });
  it("can be hidden from assistive technology inside a labelled control", () => {
    render(
      <button aria-label="Saving changes">
        <Spinner aria-hidden="true" />
        Saving changes
      </button>,
    );
    expect(screen.getByRole("button", { name: "Saving changes" })).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
