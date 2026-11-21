import { createRef, useCallback, useState, type ChangeEvent } from "react";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { SearchField } from "./index";

const meta = {
  title: "Shared/UI/SearchField",
  component: SearchField,
  args: { "aria-label": "Search fleet", placeholder: "Search fleet" },
  parameters: { a11y: { test: "error" } },
  argTypes: {
    clearLabel: {
      control: "text",
      type: "string",
      description: "Accessible name of the clear button.",
    },
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getAllByRole("searchbox")[0]).toBeVisible();
  },
} satisfies Meta<typeof SearchField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Truck" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("searchbox")).toBeDisabled();
    await expect(canvas.getByRole("button")).toBeDisabled();
    await expect(canvas.getByRole("searchbox")).toHaveValue("Truck");
  },
};
export const ReadOnly: Story = {
  args: { readOnly: true, defaultValue: "Truck" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("searchbox")).toHaveAttribute("readonly");
    await expect(canvas.getByRole("button")).toBeDisabled();
    await expect(canvas.getByRole("searchbox")).toHaveValue("Truck");
  },
};

const searchRef = createRef<HTMLInputElement>();

export const ClearSearch: Story = {
  args: { defaultValue: "Truck", clearLabel: "Reset fleet search", ref: searchRef },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("searchbox", { name: "Search fleet" });
    await expect(input).toHaveValue("Truck");
    await expect(searchRef.current).toBe(input);
    await userEvent.click(canvas.getByRole("button", { name: "Reset fleet search" }));
    await expect(input).toHaveValue("");
    await expect(input).toHaveFocus();
    await userEvent.type(input, "Van");
    await expect(input).toHaveValue("Van");
  },
};

function ControlledSearch() {
  const [value, setValue] = useState("Truck");
  const [attached, setAttached] = useState(false);
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value),
    [],
  );
  const ref = useCallback((input: HTMLInputElement | null) => setAttached(input !== null), []);
  return (
    <>
      <SearchField
        ref={ref}
        aria-label="Controlled fleet search"
        value={value}
        onChange={onChange}
      />
      <output aria-label="Current query">{value || "Empty query"}</output>
      <output aria-label="Ref status">{attached ? "Attached" : "Detached"}</output>
    </>
  );
}

export const Controlled: Story = {
  render: ControlledSearch,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("status", { name: "Ref status" })).toHaveTextContent("Attached");
    await userEvent.click(canvas.getByRole("button", { name: "Clear search" }));
    await expect(canvas.getByRole("searchbox")).toHaveValue("");
    await expect(canvas.getByRole("searchbox")).toHaveFocus();
    await expect(canvas.getByRole("status", { name: "Current query" })).toHaveTextContent(
      "Empty query",
    );
    await userEvent.type(canvas.getByRole("searchbox"), "Van");
    await expect(canvas.getByRole("status", { name: "Current query" })).toHaveTextContent("Van");
  },
};
