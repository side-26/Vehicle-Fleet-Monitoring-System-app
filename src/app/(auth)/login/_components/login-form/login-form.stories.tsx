import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { AuthLayoutShell } from "@/app/(auth)/_components/auth-shell";

import { LoginForm } from "./index";

const rejectSignIn = async () => {
  throw new Error("Unavailable");
};
const pendingSignIn = () => new Promise<void>(() => undefined);
const meta = {
  title: "Pages/Auth/Login",
  component: LoginForm,
  parameters: { layout: "fullscreen", a11y: { test: "error" } },
  argTypes: {
    onSubmit: {
      control: false,
      description:
        "Optional async authentication handler. Without it, a valid submission reports sign-in is unavailable.",
    },
  },
  render: (args) => (
    <AuthLayoutShell>
      <LoginForm {...args} />
    </AuthLayoutShell>
  ),
} satisfies Meta<typeof LoginForm>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("heading", { level: 1, name: "Welcome Back" })).toBeVisible();
    await expect(canvas.getByLabelText(/Password/)).toHaveAttribute("type", "password");
    await expect(canvas.getByRole("link", { name: "Forgot password?" })).toHaveAttribute(
      "href",
      "/forget-password",
    );
    expect(canvasElement.scrollWidth).toBeLessThanOrEqual(window.innerWidth);
    await userEvent.type(canvas.getByLabelText(/Email or Username/), "driver@example.com");
    await userEvent.type(canvas.getByLabelText(/Password/), "fleet-password");
    await userEvent.click(canvas.getByRole("button", { name: "Show password" }));
    await expect(canvas.getByLabelText(/Password/)).toHaveAttribute("type", "text");
    await expect(canvas.getByLabelText(/Password/)).toHaveValue("fleet-password");
    await userEvent.click(canvas.getByRole("button", { name: "Hide password" }));
    await userEvent.click(canvas.getByRole("button", { name: "Sign In" }));
    await expect(canvas.getByRole("alert")).toHaveTextContent("Sign-in is currently unavailable.");
  },
};
export const RequiredFields: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Sign In" }));
    await waitFor(() => expect(canvas.getByText("Enter your email or username.")).toBeVisible());
    await waitFor(() => expect(canvas.getByText("Enter your password.")).toBeVisible());
    await waitFor(() => expect(canvas.getByLabelText(/Email or Username/)).toHaveFocus());
    await expect(canvas.getByLabelText(/Password/)).toHaveAttribute("aria-invalid", "true");
  },
};
export const SubmissionFailure: Story = {
  args: { onSubmit: rejectSignIn },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Email or Username/), "fleet-driver");
    await userEvent.type(canvas.getByLabelText(/Password/), "fleet-password");
    await userEvent.click(canvas.getByRole("button", { name: "Sign In" }));
    await expect(canvas.getByRole("alert")).toHaveTextContent("Unable to sign in.");
    await expect(canvas.getByRole("button", { name: "Sign In" })).toBeEnabled();
  },
};
export const Submitting: Story = {
  args: { onSubmit: pendingSignIn },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Email or Username/), "fleet-driver");
    await userEvent.type(canvas.getByLabelText(/Password/), "fleet-password");
    await userEvent.click(canvas.getByRole("button", { name: "Sign In" }));
    await expect(canvas.getByRole("button", { name: "Sign In" })).toBeDisabled();
    await expect(canvas.getByRole("button", { name: "Sign In" })).toHaveAttribute(
      "aria-busy",
      "true",
    );
    await expect(canvas.getByLabelText(/Password/)).toBeDisabled();
  },
};
