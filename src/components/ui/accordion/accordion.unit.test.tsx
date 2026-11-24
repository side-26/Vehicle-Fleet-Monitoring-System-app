/* oxlint-disable react-perf/jsx-no-new-array-as-prop, react-perf/jsx-no-new-object-as-prop, react-perf/jsx-no-new-function-as-prop, react-perf/jsx-no-jsx-as-prop -- Inline fixtures intentionally exercise Base UI composition and controlled state. */
import { createRef, useState } from "react";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

import { accordionColors, accordionSizes, accordionVariants } from "./accordion.types";
import type { AccordionProps, AccordionTriggerProps } from "./accordion.types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./index";

const renderHeading: NonNullable<AccordionTriggerProps["headingProps"]>["render"] = (props) => (
  <h2 {...props}>{props.children}</h2>
);

function Example(props: AccordionProps) {
  return (
    <Accordion {...props} aria-label="Fleet questions">
      <AccordionItem value="vehicles">
        <AccordionTrigger>Supported vehicles</AccordionTrigger>
        <AccordionContent>Cars and trucks.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="drivers">
        <AccordionTrigger>Driver access</AccordionTrigger>
        <AccordionContent>Invite your drivers.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="locked" disabled>
        <AccordionTrigger>Locked question</AccordionTrigger>
        <AccordionContent>Locked answer.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

it("uses documented defaults and accessible heading/button/panel relationships", async () => {
  const user = userEvent.setup();
  render(<Example />);
  const root = screen.getByLabelText("Fleet questions");
  expect(root).toHaveAttribute("data-color", "inherit");
  expect(root).toHaveAttribute("data-variant", "ghost");
  expect(root).toHaveAttribute("data-size", "md");
  expect(screen.getByRole("heading", { level: 3, name: "Supported vehicles" })).toBeInTheDocument();
  const trigger = screen.getByRole("button", { name: "Supported vehicles" });
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  await user.click(trigger);
  const panel = screen.getByRole("region", { name: "Supported vehicles" });
  expect(panel).toHaveTextContent("Cars and trucks.");
  expect(trigger).toHaveAttribute("aria-controls", panel.id);
  expect(panel).toHaveAttribute("aria-labelledby", trigger.id);
  expect(trigger.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  await user.click(trigger);
  await waitFor(() =>
    expect(screen.queryByRole("region", { name: "Supported vehicles" })).not.toBeInTheDocument(),
  );
});

it.each(
  accordionVariants.flatMap((variant) =>
    accordionColors.flatMap((color) => accordionSizes.map((size) => ({ variant, color, size }))),
  ),
)("supports $variant / $color / $size", ({ variant, color, size }) => {
  render(<Example variant={variant} color={color} size={size} />);
  const root = screen.getByLabelText("Fleet questions");
  expect(root).toHaveAttribute("data-color", color);
  expect(root).toHaveAttribute("data-variant", variant);
  expect(root).toHaveAttribute("data-size", size);
});

it("replaces the open panel in single mode and allows collapsing all", async () => {
  const user = userEvent.setup();
  render(<Example defaultValue={["vehicles"]} />);
  await user.click(screen.getByRole("button", { name: "Driver access" }));
  expect(screen.getByRole("button", { name: "Supported vehicles" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  expect(screen.getByRole("region", { name: "Driver access" })).toHaveTextContent(
    "Invite your drivers.",
  );
  await user.click(screen.getByRole("button", { name: "Driver access" }));
  expect(screen.getByRole("button", { name: "Driver access" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});

it("allows independently opening multiple panels", async () => {
  const user = userEvent.setup();
  render(<Example multiple defaultValue={["vehicles"]} />);
  await user.click(screen.getByRole("button", { name: "Driver access" }));
  expect(screen.getAllByRole("region")).toHaveLength(2);
});

it("supports controlled values and reports root and item changes", async () => {
  const onValueChange = vi.fn();
  const onOpenChange = vi.fn();
  function Controlled() {
    const [value, setValue] = useState<string[]>([]);
    return (
      <Accordion
        value={value}
        onValueChange={(next, details) => {
          setValue(next);
          onValueChange(next, details);
        }}
      >
        <AccordionItem value="a" onOpenChange={onOpenChange}>
          <AccordionTrigger>Controlled</AccordionTrigger>
          <AccordionContent>Controlled answer</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }
  render(<Controlled />);
  await userEvent.click(screen.getByRole("button", { name: "Controlled" }));
  expect(screen.getByRole("region")).toHaveTextContent("Controlled answer");
  expect(onValueChange).toHaveBeenCalledWith(
    ["a"],
    expect.objectContaining({ reason: "trigger-press" }),
  );
  expect(onOpenChange).toHaveBeenCalledWith(
    true,
    expect.objectContaining({ reason: "trigger-press" }),
  );
});

it("does not mutate a controlled value without a parent update", async () => {
  const onValueChange = vi.fn();
  render(<Example value={[]} onValueChange={onValueChange} />);
  const trigger = screen.getByRole("button", { name: "Supported vehicles" });
  await userEvent.click(trigger);
  expect(onValueChange).toHaveBeenCalled();
  expect(trigger).toHaveAttribute("aria-expanded", "false");
});

it("disables the whole accordion and individual items", async () => {
  const user = userEvent.setup();
  const { rerender } = render(<Example disabled />);
  for (const button of screen.getAllByRole("button")) expect(button).toBeDisabled();
  rerender(<Example />);
  const locked = screen.getByRole("button", { name: "Locked question" });
  expect(locked).toBeDisabled();
  await user.click(locked);
  expect(locked).toHaveAttribute("aria-expanded", "false");
});

it("supports Tab focus and Enter/Space activation", async () => {
  const user = userEvent.setup();
  render(<Example />);
  await user.tab();
  const first = screen.getByRole("button", { name: "Supported vehicles" });
  expect(first).toHaveFocus();
  await user.keyboard("{Enter}");
  expect(first).toHaveAttribute("aria-expanded", "true");
  await user.keyboard(" ");
  expect(first).toHaveAttribute("aria-expanded", "false");
  await user.tab();
  expect(screen.getByRole("button", { name: "Driver access" })).toHaveFocus();
});

it("supports root and per-panel mounting controls", () => {
  const { rerender } = render(<Example keepMounted />);
  expect(screen.getByText("Cars and trucks.")).not.toBeVisible();
  rerender(
    <Accordion>
      <AccordionItem value="a">
        <AccordionTrigger>Mounted</AccordionTrigger>
        <AccordionContent keepMounted>Retained content</AccordionContent>
      </AccordionItem>
    </Accordion>,
  );
  expect(screen.getByText("Retained content")).not.toBeVisible();
  rerender(<Example hiddenUntilFound />);
  expect(
    screen.getByText("Cars and trucks.").closest('[data-slot="accordion-content"]'),
  ).toHaveAttribute("hidden", "until-found");
});

it("forwards refs, native props, render composition and state classes on every part", async () => {
  const rootRef = createRef<HTMLDivElement>();
  const itemRef = createRef<HTMLDivElement>();
  const headingRef = createRef<HTMLHeadingElement>();
  const triggerRef = createRef<HTMLButtonElement>();
  const panelRef = createRef<HTMLDivElement>();
  render(
    <Accordion
      ref={rootRef}
      id="root"
      className={() => "custom-root"}
      defaultValue={["a"]}
      render={<section aria-label="Custom root" />}
    >
      <AccordionItem
        value="a"
        ref={itemRef}
        id="item"
        className={(state) => (state.open ? "open-item" : "closed-item")}
      >
        <AccordionTrigger
          ref={triggerRef}
          title="Trigger title"
          className={(state) => (state.open ? "open-trigger" : "closed-trigger")}
          render={<button type="button" aria-label="Custom heading" />}
          headingProps={{
            render: renderHeading,
            ref: headingRef,
            className: () => "custom-heading",
            id: "heading",
          }}
        >
          Custom heading
        </AccordionTrigger>
        <AccordionContent ref={panelRef} title="Panel title" className={() => "custom-panel"}>
          Custom content
        </AccordionContent>
      </AccordionItem>
    </Accordion>,
  );
  expect(rootRef.current?.tagName).toBe("SECTION");
  expect(rootRef.current).toHaveClass("custom-root");
  expect(rootRef.current).toHaveAttribute("id", "root");
  expect(itemRef.current).toHaveAttribute("id", "item");
  expect(itemRef.current).toHaveClass("open-item");
  expect(headingRef.current).toBe(screen.getByRole("heading", { level: 2 }));
  expect(headingRef.current).toHaveClass("custom-heading");
  expect(triggerRef.current).toHaveClass("open-trigger");
  expect(triggerRef.current).toHaveAttribute("title", "Trigger title");
  expect(panelRef.current).toHaveClass("custom-panel");
  expect(panelRef.current).toHaveAttribute("title", "Panel title");
  await userEvent.click(screen.getByRole("button", { name: "Custom heading" }));
  expect(itemRef.current).toHaveClass("closed-item");
});
