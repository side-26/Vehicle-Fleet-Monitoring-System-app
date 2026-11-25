import Link from "next/link";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MailIcon } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { PasswordFormField } from "@/components/ui/form-fields/password-form-field";
import { TextFormField } from "@/components/ui/form-fields/text-form-field";
import { InputGroupAddon } from "@/components/ui/input-group";

import { AuthLayoutShell } from "./index";
import styles from "./styles.module.css";

const options = { defaultValues: { email: "", password: "" } };
const submit = () => undefined;
function LoginPreview() {
  return (
    <div className={styles.preview}>
      <h1>Welcome Back</h1>
      <p>Sign in to your FleetOS account</p>
      <Form formOptions={options} onSubmit={submit}>
        <FieldGroup>
          <TextFormField
            name="email"
            label="Email or Username"
            placeholder="Enter your email or username"
            autoComplete="username"
            haveMessage={false}
          >
            <InputGroupAddon>
              <MailIcon aria-hidden="true" />
            </InputGroupAddon>
          </TextFormField>
          <PasswordFormField
            name="password"
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
            haveMessage={false}
          />
          <Link href="/forget-password" className={styles.recovery}>
            Forgot password?
          </Link>
          <Button type="submit" aria-label="Sign In">
            Sign In
          </Button>
        </FieldGroup>
      </Form>
    </div>
  );
}
const meta = {
  title: "Layouts/Auth",
  component: AuthLayoutShell,
  parameters: { layout: "fullscreen", a11y: { test: "error" } },
  tags: ["autodocs"],
  argTypes: {
    children: { control: false, description: "Page content; the page owns its heading and form." },
  },
  args: { children: <LoginPreview /> },
} satisfies Meta<typeof AuthLayoutShell>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Login: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("heading", { level: 1, name: "Welcome Back" })).toBeVisible();
    await expect(canvas.getByRole("link", { name: "FleetOS home" })).toHaveAttribute("href", "/");
    await expect(canvas.getByRole("link", { name: "Forgot password?" })).toHaveAttribute(
      "href",
      "/forget-password",
    );
    const image = canvasElement.querySelector("picture img");
    if (!(image instanceof HTMLImageElement)) throw new Error("Missing responsive image");
    const width = window.innerWidth;
    const expectedSource =
      width >= 1024
        ? "/images/auth/desktop-image.webp"
        : width >= 768
          ? "/images/auth/tablet-image.webp"
          : "/images/auth/mobile-image.webp";
    await waitFor(() => expect(image.currentSrc).toContain(expectedSource));
    await waitFor(() => expect(image.complete).toBe(true));
    expect(image.naturalWidth).toBeGreaterThan(0);
    await expect(image).toBeVisible();
    if (width >= 1024) {
      const introduction = canvas.getByRole("heading", {
        level: 2,
        name: "Smarter Fleet Operations",
      });
      const title = canvas.getByRole("heading", { level: 1, name: "Welcome Back" });
      await expect(introduction).toBeVisible();
      expect(introduction.getBoundingClientRect().right).toBeLessThan(
        title.getBoundingClientRect().left,
      );
      expect(image.getBoundingClientRect().right).toBeLessThan(title.getBoundingClientRect().left);
      const frame = canvasElement.querySelector(`.${styles.frame}`);
      if (!(frame instanceof HTMLElement)) throw new Error("Missing auth frame");
      expect(frame.getBoundingClientRect().width).toBeGreaterThan(width * 0.7);
    }
    const container = canvasElement.querySelector(`.${styles.container}`);
    const frame = canvasElement.querySelector(`.${styles.frame}`);
    if (!(container instanceof HTMLElement) || !(frame instanceof HTMLElement))
      throw new Error("Missing shell container");
    expect(container.getBoundingClientRect().height).toBeLessThanOrEqual(
      window.innerHeight * 0.9 + 1,
    );
    expect(frame.getBoundingClientRect().height).toBeLessThanOrEqual(window.innerHeight * 0.9 + 1);
    expect(frame.getBoundingClientRect().top).toBeGreaterThanOrEqual(0);
    expect(frame.getBoundingClientRect().bottom).toBeLessThanOrEqual(window.innerHeight);
    expect(canvasElement.scrollWidth).toBeLessThanOrEqual(width);
    await userEvent.type(canvas.getByLabelText("Email or Username"), "driver@example.com");
    await userEvent.type(canvas.getByLabelText("Password"), "fleet-password");
    await userEvent.click(canvas.getByRole("button", { name: "Show password" }));
    await expect(canvas.getByLabelText("Password")).toHaveValue("fleet-password");
    await expect(canvas.getByRole("button", { name: "Sign In" })).toBeVisible();
  },
};
export const Recovery: Story = {
  args: {
    children: (
      <div className={styles.preview}>
        <h1>Reset your password</h1>
        <p>Enter your email to recover access to FleetOS.</p>
        <Link href="/login">Back to sign in</Link>
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { level: 1, name: "Reset your password" }),
    ).toBeVisible();
    await expect(canvas.getByRole("link", { name: "Back to sign in" })).toHaveAttribute(
      "href",
      "/login",
    );
  },
};
