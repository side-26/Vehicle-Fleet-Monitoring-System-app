import { createRef } from "react";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { ViewportSuspense } from "./index";

const { hook, observerRef } = vi.hoisted(() => ({ hook: vi.fn(), observerRef: vi.fn() }));
vi.mock("@/hooks/use-animation-run-on-intersection-observer", () => ({
  useAnimationRunOnIntersectionObserver: hook,
}));

const fallback = <p>Loading section</p>;
const main = <h2>Main section</h2>;

it("shows the supplied fallback before entry using the default threshold", () => {
  hook.mockReturnValue({ ref: observerRef, isVisible: false });
  render(<ViewportSuspense fallback={fallback} dynamicMain={main} />);
  expect(screen.getByText("Loading section")).toBeInTheDocument();
  expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  expect(hook).toHaveBeenCalledWith({ threshold: 0.35 }, undefined);
});

it("renders main content after entry and forwards wrapper props, threshold and ref", () => {
  hook.mockReturnValue({ ref: observerRef, isVisible: true });
  const ref = createRef<HTMLDivElement>();
  render(
    <ViewportSuspense
      ref={ref}
      threshold={0.6}
      id="details"
      className="custom"
      data-testid="wrapper"
      fallback={null}
      dynamicMain={main}
    />,
  );
  expect(screen.getByRole("heading", { name: "Main section" })).toBeInTheDocument();
  expect(screen.getByTestId("wrapper")).toHaveAttribute("id", "details");
  expect(screen.getByTestId("wrapper")).toHaveClass("custom");
  expect(hook).toHaveBeenCalledWith({ threshold: 0.6 }, ref);
  expect(observerRef).toHaveBeenCalledWith(screen.getByTestId("wrapper"));
});
