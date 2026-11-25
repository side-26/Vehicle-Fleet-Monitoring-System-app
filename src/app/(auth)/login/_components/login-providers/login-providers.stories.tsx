import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { LoginProviders } from "./index";
import { loginProviders } from "./login-providers.types";

const meta = {
  title: "Pages/Auth/LoginProviders",
  component: LoginProviders,
  parameters: { layout: "padded", a11y: { test: "error" } },
  args: { onGoogleSignIn: fn(), onMicrosoftSignIn: fn() },
  argTypes: {
    disabled: {
      control: "boolean",
      type: "boolean",
      description: "Disables both provider actions; defaults to false.",
    },
    pendingProvider: {
      control: "select",
      options: loginProviders,
      type: { name: "enum", value: [...loginProviders] },
      description: "Provider displaying the connecting state; defaults to none.",
    },
    onGoogleSignIn: { control: false, description: "Called when Google is selected." },
    onMicrosoftSignIn: { control: false, description: "Called when Microsoft is selected." },
  },
} satisfies Meta<typeof LoginProviders>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("or continue with")).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Continue with Google" }));
    await expect(args.onGoogleSignIn).toHaveBeenCalled();
    await userEvent.click(canvas.getByRole("button", { name: "Continue with Microsoft" }));
    await expect(args.onMicrosoftSignIn).toHaveBeenCalled();
  },
};
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    await Promise.all(
      within(canvasElement)
        .getAllByRole("button")
        .map(async (button) => expect(button).toBeDisabled()),
    );
  },
};
export const GooglePending: Story = {
  args: { disabled: true, pendingProvider: "google" },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole("button", { name: "Continue with Google" }),
    ).toHaveAttribute("aria-busy", "true");
  },
};
export const MicrosoftPending: Story = {
  args: { disabled: true, pendingProvider: "microsoft" },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole("button", { name: "Continue with Microsoft" }),
    ).toHaveAttribute("aria-busy", "true");
  },
};
