import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import {
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
