import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { StaggeredListAnimation } from "./stagered-list-animation";

const customStyle = { gap: "1rem" };

it("renders children in order and skips empty children when staggering", () => {
  const { container } = render(
    <StaggeredListAnimation aria-label="Items">
      <p>First</p>
      {null}
      {false}
      <p>Second</p>
    </StaggeredListAnimation>,
  );
  const list = container.firstElementChild;
  expect(list?.children).toHaveLength(2);
  expect(screen.getByText("First").parentElement).toHaveStyle("--stagger-index: 0");
  expect(screen.getByText("Second").parentElement).toHaveStyle("--stagger-index: 1");
  expect(list).toHaveStyle(
    "--stagger-duration: 400ms; --stagger-interval: 60ms; --stagger-delay: 0ms",
  );
});

it("forwards container props and supports custom timings and styles", () => {
  render(
    <StaggeredListAnimation
      data-testid="list"
      className="custom"
      duration={250}
      delay={100}
      stagger={80}
      style={customStyle}
    >
      Content
    </StaggeredListAnimation>,
  );
  expect(screen.getByTestId("list")).toHaveClass("custom");
  expect(screen.getByTestId("list").style.gap).toBe("1rem");
  expect(screen.getByTestId("list")).toHaveStyle(
    "--stagger-duration: 250ms; --stagger-delay: 100ms; --stagger-interval: 80ms",
  );
});

it("clamps negative timings and accepts an empty list", () => {
  const { container } = render(
    <StaggeredListAnimation duration={-1} delay={-1} stagger={-1}>
      {null}
    </StaggeredListAnimation>,
  );
  expect(container.firstElementChild).toHaveStyle(
    "--stagger-duration: 0ms; --stagger-delay: 0ms; --stagger-interval: 0ms",
  );
  expect(container.firstElementChild).toBeEmptyDOMElement();
});
