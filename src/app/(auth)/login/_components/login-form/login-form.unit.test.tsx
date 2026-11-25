import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { LoginForm } from "./index";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => false }));

function enterCredentials() {
  fireEvent.change(screen.getByLabelText(/Email or Username/), {
    target: { value: "fleet-driver" },
  });
  fireEvent.change(screen.getByLabelText(/Password/), {
    target: { value: " password with spaces " },
  });
}

describe("LoginForm", () => {
  it("renders accessible credentials with password manager hints and recovery navigation", () => {
    render(<LoginForm />);
    expect(screen.getByRole("heading", { level: 1, name: "Welcome Back" })).toBeVisible();
    expect(screen.getByLabelText(/Email or Username/)).toHaveAttribute("autocomplete", "username");
    expect(screen.getByLabelText(/Password/)).toHaveAttribute("autocomplete", "current-password");
    expect(screen.getByLabelText(/Password/)).toHaveAttribute("type", "password");
    expect(screen.getByRole("link", { name: "Forgot password?" })).toHaveAttribute(
      "href",
      "/forget-password",
    );
  });

  it("reports unavailable sign-in after valid input when no authentication service is connected", async () => {
    render(<LoginForm />);
    enterCredentials();
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("Sign-in is currently unavailable."),
    );
  });
  it.each(["Google", "Microsoft"])(
    "provides a usable %s sign-in action without submitting credentials",
    async (provider) => {
      render(<LoginForm />);
      fireEvent.click(screen.getByRole("button", { name: `Continue with ${provider}` }));
      await waitFor(() =>
        expect(screen.getByRole("alert")).toHaveTextContent(
          `${provider} sign-in is currently unavailable.`,
        ),
      );
      expect(screen.queryByText("Enter your password.")).toBeNull();
    },
  );
});
