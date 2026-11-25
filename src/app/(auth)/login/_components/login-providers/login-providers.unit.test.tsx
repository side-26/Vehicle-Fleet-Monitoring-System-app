import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { LoginProviders } from "./index";

const callbacks = { onGoogleSignIn: vi.fn(), onMicrosoftSignIn: vi.fn() };

describe("LoginProviders", () => {
  it("works without a form provider and routes each action without submitting its surrounding form", () => {
    const submit = vi.fn();
    render(
      <form onSubmit={submit}>
        <LoginProviders {...callbacks} />
      </form>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Continue with Google" }));
    expect(callbacks.onGoogleSignIn).toHaveBeenCalledOnce();
    expect(callbacks.onMicrosoftSignIn).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Continue with Microsoft" }));
    expect(callbacks.onMicrosoftSignIn).toHaveBeenCalledOnce();
    expect(submit).not.toHaveBeenCalled();
    expect(screen.getByText("or continue with")).toBeVisible();
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("disables both provider buttons", () => {
    render(<LoginProviders {...callbacks} disabled />);
    for (const button of screen.getAllByRole("button")) expect(button).toBeDisabled();
  });

  it.each(["google", "microsoft"] as const)("shows only %s as pending", (provider) => {
    render(<LoginProviders {...callbacks} pendingProvider={provider} disabled />);
    const name = provider === "google" ? "Google" : "Microsoft";
    const other = provider === "google" ? "Microsoft" : "Google";
    expect(screen.getByRole("button", { name: `Continue with ${name}` })).toHaveAttribute(
      "aria-busy",
      "true",
    );
    expect(screen.getByRole("button", { name: `Continue with ${name}` })).toHaveTextContent(
      "Connecting…",
    );
    expect(screen.getByRole("button", { name: `Continue with ${other}` })).not.toHaveAttribute(
      "aria-busy",
    );
  });
});
