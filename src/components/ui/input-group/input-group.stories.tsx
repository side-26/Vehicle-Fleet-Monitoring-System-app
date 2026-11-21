import type { MouseEvent } from "react";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import {
  Input,
  Textarea as StandaloneTextarea,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "./index";
import { inputGroupAlignments, inputGroupButtonSizes } from "./input-group.types";

const meta = {
  title: "Shared/UI/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  render: () => (
    <InputGroup aria-label="Search">
      <InputGroupAddon>
        <InputGroupText>Search</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput aria-label="Query" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton aria-label="Submit search">Go</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
} satisfies Meta<typeof InputGroup>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("textbox", { name: "Query" })).toBeVisible();
  },
};
export const Alignments: Story = {
  render: () => (
    <>
      {inputGroupAlignments.map((align) => (
        <InputGroup key={align}>
          <InputGroupInput aria-label={`${align} input`} />
          <InputGroupAddon align={align}>{align}</InputGroupAddon>
        </InputGroup>
      ))}
    </>
  ),
};
export const ButtonSizes: Story = {
  render: () => (
    <>
      {inputGroupButtonSizes.map((size) => (
        <InputGroup key={size}>
          <InputGroupInput aria-label={`${size} input`} />
          <InputGroupAddon>
            <InputGroupButton size={size} aria-label={`${size} action`}>
              Go
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      ))}
    </>
  ),
};
export const Textarea: Story = {
  render: () => (
    <InputGroup>
      <InputGroupTextarea aria-label="Notes" />
      <InputGroupAddon align="block-end">Notes footer</InputGroupAddon>
    </InputGroup>
  ),
};
export const Disabled: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput disabled aria-label="Disabled input" />
      <InputGroupAddon>Disabled</InputGroupAddon>
    </InputGroup>
  ),
};
export const Invalid: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput aria-invalid="true" aria-label="Invalid input" />
      <InputGroupAddon>Invalid</InputGroupAddon>
    </InputGroup>
  ),
};

export const StandaloneControls: Story = {
  render: () => (
    <>
      <Input aria-label="Standalone query" defaultValue="Van" />
      <StandaloneTextarea aria-label="Standalone notes" defaultValue="Service due" />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Standalone query" });
    const textarea = canvas.getByRole("textbox", { name: "Standalone notes" });
    await userEvent.clear(input);
    await userEvent.type(input, "Truck");
    await expect(input).toHaveValue("Truck");
    await userEvent.type(textarea, " tomorrow");
    await expect(textarea).toHaveValue("Service due tomorrow");
  },
};

export const AddonFocus: Story = {
  render: () => (
    <>
      <InputGroup aria-label="Search field">
        <InputGroupAddon>Query prefix</InputGroupAddon>
        <InputGroupInput aria-label="Search query" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton aria-label="Search action">Go</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup aria-label="Notes field">
        <InputGroupTextarea aria-label="Vehicle notes" />
        <InputGroupAddon align="block-end">Notes suffix</InputGroupAddon>
      </InputGroup>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("Query prefix"));
    await expect(canvas.getByRole("textbox", { name: "Search query" })).toHaveFocus();
    await userEvent.click(canvas.getByRole("button", { name: "Search action" }));
    await expect(canvas.getByRole("button", { name: "Search action" })).toHaveFocus();
    await expect(canvas.getByRole("button")).toHaveAttribute("type", "button");
    await expect(canvas.getByRole("button")).toHaveAttribute("data-group-size", "xs");
    await userEvent.click(canvas.getByText("Notes suffix"));
    await expect(canvas.getByRole("textbox", { name: "Vehicle notes" })).toHaveFocus();
  },
};

function cancelAddonClick(event: MouseEvent<HTMLDivElement>) {
  event.preventDefault();
}

export const CanceledAddonFocus: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon onClick={cancelAddonClick}>Canceled prefix</InputGroupAddon>
      <InputGroupInput aria-label="Unfocused query" />
    </InputGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("Canceled prefix"));
    await expect(canvas.getByRole("textbox")).not.toHaveFocus();
  },
};
