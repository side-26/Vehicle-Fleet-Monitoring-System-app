/* oxlint-disable react-perf/jsx-no-new-array-as-prop, react-perf/jsx-no-new-object-as-prop, react-perf/jsx-no-new-function-as-prop, react-perf/jsx-no-jsx-as-prop -- Inline fixtures intentionally exercise Base UI composition and controlled state. */
import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import { accordionColors, accordionSizes, accordionVariants } from "./accordion.types";
import type { AccordionProps, AccordionTriggerProps } from "./accordion.types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./index";

const renderHeading: NonNullable<AccordionTriggerProps["headingProps"]>["render"] = (props) => (
  <h2 {...props}>{props.children}</h2>
);

function Example(args: AccordionProps) {
  return (
    <Accordion {...args} aria-label="Fleet questions">
      <AccordionItem value="vehicles">
        <AccordionTrigger>Supported vehicles</AccordionTrigger>
        <AccordionContent>Cars, vans, and trucks.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="drivers">
        <AccordionTrigger>Driver access</AccordionTrigger>
        <AccordionContent>Invite drivers to your workspace.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="locked" disabled>
        <AccordionTrigger>Locked question</AccordionTrigger>
        <AccordionContent>Contact your administrator.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

const meta = {
  title: "Shared/UI/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" }, layout: "padded" },
  args: {
    color: "inherit",
    variant: "ghost",
    size: "md",
    multiple: false,
    disabled: false,
    keepMounted: false,
    hiddenUntilFound: false,
    onValueChange: fn(),
  },
  argTypes: {
    color: {
      control: "select",
      options: accordionColors,
      type: { name: "enum", value: [...accordionColors] },
      description:
        "Variant surface/border palette. Default: inherit. Fill uses matching foreground colors.",
    },
    variant: {
      control: "select",
      options: accordionVariants,
      type: { name: "enum", value: [...accordionVariants] },
      description: "Item surface treatment. Default: ghost.",
    },
    size: {
      control: "select",
      options: accordionSizes,
      type: { name: "enum", value: [...accordionSizes] },
      description: "Typography and proportional spacing. Default: md.",
    },
    multiple: {
      control: "boolean",
      type: "boolean",
      description: "Allow multiple open items. Default: false.",
    },
    disabled: {
      control: "boolean",
      type: "boolean",
      description: "Disable all triggers. Default: false. Item disabled can disable just one.",
    },
    keepMounted: {
      control: "boolean",
      type: "boolean",
      description: "Retain closed panels in the DOM. Default: false; can also be set per panel.",
    },
    hiddenUntilFound: {
      control: "boolean",
      type: "boolean",
      description:
        "Use hidden=until-found for browser search. Overrides keepMounted. Default: false; also supported per panel.",
    },
    defaultValue: {
      control: "object",
      type: { name: "array", value: { name: "string" } },
      description: "Initially expanded item values in uncontrolled mode.",
    },
    value: {
      control: "object",
      type: { name: "array", value: { name: "string" } },
      description: "Controlled array of expanded item values; update it through onValueChange.",
    },
    onValueChange: {
      control: false,
      type: "function",
      description: "Receives the new expanded value array and Base UI change details.",
    },
    children: {
      control: false,
      type: "string",
      description:
        "Compose Item, Trigger (automatic h3) and Content parts. Trigger headingProps can change the heading level.",
    },
    className: {
      control: false,
      type: "function",
      description: "Layout class string or Base UI state callback; supported on every part.",
    },
    render: {
      control: false,
      type: "function",
      description: "Base UI element/render function composition; supported on all parts.",
    },
    orientation: { table: { disable: true } },
    loopFocus: { table: { disable: true } },
  },
  render: (args) => <Example {...args} />,
} satisfies Meta<typeof Accordion<string>>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole("heading", { level: 3 })).toHaveLength(3);
    const first = canvas.getByRole("button", { name: "Supported vehicles" });
    await expect(first).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(first);
    await expect(canvas.getByRole("region", { name: "Supported vehicles" })).toHaveTextContent(
      "Cars, vans, and trucks.",
    );
    await userEvent.click(canvas.getByRole("button", { name: "Driver access" }));
    await expect(first).toHaveAttribute("aria-expanded", "false");
    await expect(canvas.getByRole("region", { name: "Driver access" })).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Driver access" }));
    await expect(canvas.getByRole("button", { name: "Driver access" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    await expect(canvas.getByRole("button", { name: "Locked question" })).toBeDisabled();
  },
};

export const InitiallyOpen: Story = {
  args: { defaultValue: ["vehicles"] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("region", { name: "Supported vehicles" })).toBeVisible();
  },
};

export const Multiple: Story = {
  args: { multiple: true, defaultValue: ["vehicles"] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Driver access" }));
    await expect(canvas.getAllByRole("region")).toHaveLength(2);
    await userEvent.click(canvas.getByRole("button", { name: "Supported vehicles" }));
    await expect(canvas.getByRole("button", { name: "Driver access" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: ["vehicles"] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await Promise.all(canvas.getAllByRole("button").map((button) => expect(button).toBeDisabled()));
    await expect(canvas.getByRole("region", { name: "Supported vehicles" })).toBeVisible();
  },
};

function ControlledExample(args: AccordionProps) {
  const [value, setValue] = useState<string[]>([]);
  return (
    <>
      <button type="button" onClick={() => setValue(["drivers"])}>
        Open drivers externally
      </button>
      <Example
        {...args}
        value={value}
        onValueChange={(next, details) => {
          setValue(next);
          args.onValueChange?.(next, details);
        }}
      />
      <output>Open values: {value.join(", ") || "none"}</output>
    </>
  );
}
export const Controlled: Story = {
  render: (args) => <ControlledExample {...args} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Open drivers externally" }));
    await expect(canvas.getByRole("status")).toHaveTextContent("Open values: drivers");
    await expect(canvas.getByRole("region", { name: "Driver access" })).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Supported vehicles" }));
    await expect(canvas.getByRole("status")).toHaveTextContent("Open values: vehicles");
    await expect(args.onValueChange).toHaveBeenCalledWith(
      ["vehicles"],
      expect.objectContaining({ reason: "trigger-press" }),
    );
  },
};

export const Keyboard: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole("button", { name: "Supported vehicles" });
    first.focus();
    await expect(first).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(first).toHaveAttribute("aria-expanded", "true");
    await userEvent.keyboard(" ");
    await expect(first).toHaveAttribute("aria-expanded", "false");
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Driver access" })).toHaveFocus();
  },
};

export const KeptMounted: Story = {
  args: { keepMounted: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Cars, vans, and trucks.")).not.toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Supported vehicles" }));
    await expect(canvas.getByText("Cars, vans, and trucks.")).toBeVisible();
  },
};

export const HiddenUntilFound: Story = {
  args: { hiddenUntilFound: true, keepMounted: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const panel = canvas
      .getByText("Cars, vans, and trucks.")
      .closest('[data-slot="accordion-content"]');
    await expect(panel).toHaveAttribute("hidden", "until-found");
    panel?.dispatchEvent(new Event("beforematch", { bubbles: true }));
    await waitFor(() =>
      expect(canvas.getByRole("button", { name: "Supported vehicles" })).toHaveAttribute(
        "aria-expanded",
        "true",
      ),
    );
    await expect(canvas.getByRole("region", { name: "Supported vehicles" })).toBeVisible();
  },
};

export const ColorsVariantsAndSizes: Story = {
  render: () => (
    <>
      {accordionVariants.flatMap((variant) =>
        accordionColors.flatMap((color) =>
          accordionSizes.map((size) => {
            const label = `${variant} / ${color} / ${size}`;
            return (
              <Accordion
                key={label}
                variant={variant}
                color={color}
                size={size}
                defaultValue={["example"]}
                aria-label={label}
              >
                <AccordionItem value="example">
                  <AccordionTrigger>{label}</AccordionTrigger>
                  <AccordionContent>Readable panel content for {label}.</AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          }),
        ),
      )}
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole("heading", { level: 3 })).toHaveLength(100);
    await Promise.all(
      accordionVariants.flatMap((variant) =>
        accordionColors.flatMap((color) =>
          accordionSizes.map(async (size) => {
            const label = `${variant} / ${color} / ${size}`;
            const trigger = canvas.getByRole("button", { name: label });
            await expect(trigger).toHaveAttribute("aria-expanded", "true");
            await expect(canvas.getByRole("region", { name: label })).toHaveTextContent(
              `Readable panel content for ${label}.`,
            );
          }),
        ),
      ),
    );
  },
};

export const CustomComposition: Story = {
  render: (args) => (
    <Accordion
      {...args}
      defaultValue={["custom"]}
      render={<section aria-label="Custom composition" />}
    >
      <AccordionItem
        value="custom"
        onOpenChange={fn()}
        className={(state) => (state.open ? "is-open" : "is-closed")}
      >
        <AccordionTrigger
          render={<button type="button" aria-label="Custom heading level" />}
          headingProps={{ render: renderHeading }}
        >
          Custom heading level
        </AccordionTrigger>
        <AccordionContent keepMounted>
          <p>
            Rich content with a <a href="#accordion-example">help link</a>.
          </p>
          <p>Second paragraph.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { level: 2, name: "Custom heading level" }),
    ).toBeVisible();
    await expect(canvas.getByRole("link", { name: "help link" })).toBeVisible();
    const trigger = canvas.getByRole("button", { name: "Custom heading level" });
    const item = trigger.closest('[data-slot="accordion-item"]');
    await expect(item).toHaveClass("is-open");
    await userEvent.click(trigger);
    await expect(item).toHaveClass("is-closed");
    await waitFor(() => expect(canvas.getByText("Second paragraph.")).not.toBeVisible());
  },
};

export const Primary: Story = { ...Default, args: { color: "primary", variant: "outline" } };
export const Inherit: Story = { ...Default, args: { color: "inherit", variant: "outline" } };
export const Neutral: Story = { ...Default, args: { color: "neutral", variant: "outline" } };
export const Success: Story = { ...Default, args: { color: "success", variant: "outline" } };
export const Error: Story = { ...Default, args: { color: "error", variant: "outline" } };
export const Fill: Story = { ...Default, args: { color: "primary", variant: "fill" } };
export const Tonal: Story = { ...Default, args: { color: "primary", variant: "tonal" } };
export const Outline: Story = { ...Default, args: { color: "primary", variant: "outline" } };
export const Ghost: Story = { ...Default, args: { color: "primary", variant: "ghost" } };
export const ExtraSmall: Story = { ...Default, args: { size: "xs" } };
export const Small: Story = { ...Default, args: { size: "sm" } };
export const Medium: Story = { ...Default, args: { size: "md" } };
export const Large: Story = { ...Default, args: { size: "lg" } };
export const ExtraLarge: Story = { ...Default, args: { size: "xl" } };
