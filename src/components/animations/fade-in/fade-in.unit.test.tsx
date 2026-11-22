import { createRef } from "react";

import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { FadeIn } from "./index";

const customStyle = { padding: "1rem" };

it("renders children and uses default timing", () => {
  render(
    <FadeIn data-testid="fade">
      <h2>Fleet overview</h2>
    </FadeIn>,
  );
  expect(screen.getByRole("heading", { name: "Fleet overview" })).toBeInTheDocument();
  expect(screen.getByTestId("fade")).toHaveStyle("--fade-in-duration: 400ms; --fade-in-delay: 0ms");
});

it("forwards native props, styles, class names and refs with custom timing", () => {
  const ref = createRef<HTMLDivElement>();
  render(
    <FadeIn
      ref={ref}
      data-testid="overview"
      aria-label="Overview"
      className="custom"
      style={customStyle}
      duration={250}
      delay={100}
    >
      Content
    </FadeIn>,
  );
  const region = screen.getByTestId("overview");
  expect(ref.current).toBe(region);
  expect(region).toHaveClass("custom");
  expect(region.style.padding).toBe("1rem");
  expect(region).toHaveStyle("--fade-in-duration: 250ms; --fade-in-delay: 100ms");
});

it("clamps negative timing and falls back for nonfinite values", () => {
  const { rerender } = render(<FadeIn data-testid="fade" duration={-100} delay={-50} />);
  expect(screen.getByTestId("fade")).toHaveStyle("--fade-in-duration: 0ms; --fade-in-delay: 0ms");
  rerender(<FadeIn data-testid="fade" duration={Infinity} delay={NaN} />);
  expect(screen.getByTestId("fade")).toHaveStyle("--fade-in-duration: 400ms; --fade-in-delay: 0ms");
});
