import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { LoginForm } from "./index";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => false }));

function fillForm() {
  fireEvent.change(screen.getByLabelText(/Email or Username/), {
    target: { value: "fleet-driver" },
  });
  fireEvent.change(screen.getByLabelText(/Password/), { target: { value: " keep spaces " } });
}

describe("LoginForm integration", () => {
  it("validates empty fields, focuses the first error, and submits unchanged credentials", async () => {
    const submit = vi.fn();
    render(<LoginForm onSubmit={submit} />);
    const identifier = screen.getByLabelText(/Email or Username/);
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
    await waitFor(() => expect(screen.getByText("Enter your email or username.")).toBeVisible());
    await waitFor(() => expect(screen.getByText("Enter your password.")).toBeVisible());
    expect(submit).not.toHaveBeenCalled();
    await waitFor(() => expect(identifier).toHaveFocus());
    fillForm();
    fireEvent.click(screen.getByRole("button", { name: "Show password" }));
    expect(screen.getByLabelText(/Password/)).toHaveAttribute("type", "text");
    expect(submit).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
    await waitFor(() =>
      expect(submit).toHaveBeenCalledWith({
        identifier: "fleet-driver",
        password: " keep spaces ",
      }),
    );
    expect(screen.queryByText("Enter your password.")).toBeNull();
  });

  it("uses the Zod resolver to reject whitespace-only identifiers", async () => {
    const submit = vi.fn();
    render(<LoginForm onSubmit={submit} />);
    fireEvent.change(screen.getByLabelText(/Email or Username/), { target: { value: "   " } });
    fireEvent.change(screen.getByLabelText(/Password/), { target: { value: "secret" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
    await waitFor(() => expect(screen.getByText("Enter your email or username.")).toBeVisible());
    expect(submit).not.toHaveBeenCalled();
  });

  it("disables controls during submission and recovers from failure without exposing server errors", async () => {
    let rejectSubmit: ((error: Error) => void) | undefined;
    const pending = new Promise<void>((_resolve, reject) => {
      rejectSubmit = reject;
    });
    const submit = vi.fn(() => pending);
    render(<LoginForm onSubmit={submit} />);
    fillForm();
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
    const button = screen.getByRole("button", { name: "Sign In" });
    await waitFor(() => expect(button).toBeDisabled());
    expect(button).toHaveTextContent("Signing in…");
    expect(screen.getByLabelText(/Email or Username/)).toBeDisabled();
    expect(screen.getByRole("button", { name: "Show password" })).toBeDisabled();
    rejectSubmit?.(new Error("Private server response"));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Unable to sign in."));
    expect(button).not.toBeDisabled();
    expect(screen.queryByText("Private server response")).toBeNull();
  });
  it("passes the selected provider to the handler and restores controls after a provider failure", async () => {
    let rejectSignIn: ((error: Error) => void) | undefined;
    const pending = new Promise<void>((_resolve, reject) => {
      rejectSignIn = reject;
    });
    const providerSignIn = vi.fn(() => pending);
    render(<LoginForm onProviderSignIn={providerSignIn} />);
    fireEvent.click(screen.getByRole("button", { name: "Continue with Google" }));
    expect(providerSignIn).toHaveBeenCalledWith("google");
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Continue with Google" })).toBeDisabled(),
    );
    expect(screen.getByRole("button", { name: "Continue with Microsoft" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Sign In" })).toBeDisabled();
    rejectSignIn?.(new Error("Internal provider response"));
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("Unable to sign in with Google."),
    );
    expect(screen.getByRole("button", { name: "Continue with Microsoft" })).not.toBeDisabled();
    expect(screen.queryByText("Internal provider response")).toBeNull();
  });
});
