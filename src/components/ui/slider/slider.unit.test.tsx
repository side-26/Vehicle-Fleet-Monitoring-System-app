import { createRef, useCallback, useState } from "react";

import type { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";

import { Slider } from "./index";
import { sliderColors, sliderOrientations } from "./slider.types";

const rangeValues = [20, 80] as const;

afterEach(cleanup);

it("defaults to one primary thumb at min with an accessible name", () => {
  const { container } = render(<Slider aria-label="Speed" min={10} />);
  expect(screen.getAllByRole("slider")).toHaveLength(1);
  expect(screen.getByRole("slider", { name: "Speed" })).toHaveValue("10");
  expect(screen.getByRole("slider")).toHaveAttribute("aria-orientation", "horizontal");
  expect(container.firstChild).toHaveAttribute("data-color", "primary");
});

it.each(sliderColors)("supports %s color for single, range and disabled sliders", (color) => {
  const { container, rerender } = render(
    <Slider aria-label="Speed" color={color} defaultValue={40} />,
  );
  expect(container.firstChild).toHaveAttribute("data-color", color);
  expect(screen.getByRole("slider")).toHaveValue("40");
  rerender(<Slider aria-label="Speed" color={color} value={rangeValues} disabled />);
  expect(screen.getByRole("slider", { name: "Speed 1" })).toBeDisabled();
  expect(screen.getByRole("slider", { name: "Speed 2" })).toBeDisabled();
});

it.each(sliderOrientations)("exposes %s orientation", (orientation) => {
  render(<Slider aria-label="Speed" orientation={orientation} defaultValue={40} />);
  expect(screen.getByRole("slider")).toHaveAttribute("aria-orientation", orientation);
});

it("updates using keyboard steps, Home and End and commits changes", async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();
  const onValueCommitted = vi.fn();
  render(
    <Slider
      aria-label="Speed"
      min={10}
      max={50}
      step={5}
      defaultValue={20}
      onValueChange={onValueChange}
      onValueCommitted={onValueCommitted}
    />,
  );
  const input = screen.getByRole("slider");
  await user.tab();
  expect(input).toHaveFocus();
  await user.keyboard("{ArrowRight}");
  expect(input).toHaveValue("25");
  expect(onValueChange).toHaveBeenCalledWith(25, expect.objectContaining({ reason: "keyboard" }));
  expect(onValueCommitted).toHaveBeenCalledWith(
    25,
    expect.objectContaining({ reason: "keyboard" }),
  );
  await user.keyboard("{Home}");
  expect(input).toHaveValue("10");
  await user.keyboard("{End}{ArrowRight}");
  expect(input).toHaveValue("50");
});

it("does not update a disabled slider", async () => {
  const onValueChange = vi.fn();
  render(<Slider aria-label="Speed" defaultValue={40} disabled onValueChange={onValueChange} />);
  expect(screen.getByRole("slider")).toBeDisabled();
  await userEvent.tab();
  expect(screen.getByRole("slider")).not.toHaveFocus();
  await userEvent.keyboard("{ArrowRight}");
  expect(screen.getByRole("slider")).toHaveValue("40");
  expect(onValueChange).not.toHaveBeenCalled();
});

function ControlledSlider() {
  const [value, setValue] = useState(30);
  const onValueChange = useCallback((next: number) => setValue(next), []);
  return (
    <>
      <Slider aria-label="Speed" value={value} onValueChange={onValueChange} />
      <output aria-label="Current speed">{value}</output>
    </>
  );
}

it("supports controlled updates", async () => {
  render(<ControlledSlider />);
  await userEvent.tab();
  await userEvent.keyboard("{ArrowRight}");
  expect(screen.getByRole("slider")).toHaveValue("31");
  expect(screen.getByRole("status", { name: "Current speed" })).toHaveTextContent("31");
});

const rangeLabels = (index: number) => (index === 0 ? "Minimum speed" : "Maximum speed");
const speedValueText = (_formatted: string, value: number) => `${value} km/h`;

it("gives range thumbs distinct names and spoken units and submits both values", () => {
  const { container } = render(
    <form>
      <p id="speed-help">Allowed speed range</p>
      <Slider
        aria-label="Speed"
        defaultValue={rangeValues}
        getAriaLabel={rangeLabels}
        getAriaValueText={speedValueText}
        aria-describedby="speed-help"
        name="speed"
      />
    </form>,
  );
  const min = screen.getByRole("slider", { name: "Minimum speed" });
  const max = screen.getByRole("slider", { name: "Maximum speed" });
  expect(min).toHaveValue("20");
  expect(max).toHaveValue("80");
  expect(min).toHaveAttribute("aria-valuetext", "20 km/h");
  expect(max).toHaveAccessibleDescription("Allowed speed range");
  const form = container.querySelector("form");
  if (!form) throw new Error("Missing form");
  expect(new FormData(form).getAll("speed")).toEqual(["20", "80"]);
});

it("forwards root refs, native props, state classes and cleans up the ref", () => {
  const ref = createRef<HTMLDivElement>();
  const className = vi.fn((state: SliderPrimitive.Root.State) =>
    state.disabled ? "disabled-slider" : "enabled-slider",
  );
  const { container, unmount } = render(
    <Slider ref={ref} aria-label="Speed" id="speed" className={className} disabled />,
  );
  expect(ref.current).toBe(container.firstChild);
  expect(ref.current).toHaveAttribute("id", "speed");
  expect(ref.current).toHaveClass("disabled-slider");
  unmount();
  expect(ref.current).toBeNull();
});

it("supports external labels and ordinary root classes", () => {
  const { container } = render(
    <>
      <span id="speed-label">Vehicle speed</span>
      <Slider aria-label="Speed" aria-labelledby="speed-label" className="custom" />
    </>,
  );
  expect(screen.getByRole("slider", { name: "Vehicle speed" })).toBeInTheDocument();
  expect(container.querySelector('[data-slot="slider"]')).toHaveClass("custom");
});
