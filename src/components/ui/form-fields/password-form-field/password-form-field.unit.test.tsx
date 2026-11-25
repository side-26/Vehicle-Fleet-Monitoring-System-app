import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Form } from "@/components/ui/form";

import { PasswordFormField } from "./index";

const options = { defaultValues: { password: "secret" } };
afterEach(cleanup);
describe("PasswordFormField", () => {
  it("masks by default and toggles without changing the value or submitting", () => {
    const submit = vi.fn();
    render(
      <Form formOptions={options} onSubmit={submit}>
        <PasswordFormField name="password" label="Password" autoComplete="current-password" />
      </Form>,
    );
    const input = screen.getByLabelText("Password");
    expect(input.getAttribute("type")).toBe("password");
    expect(input.getAttribute("autocomplete")).toBe("current-password");
    expect(screen.getByDisplayValue("secret")).toBe(input);
    fireEvent.click(screen.getByRole("button", { name: "Show password" }));
    expect(input.getAttribute("type")).toBe("text");
    fireEvent.click(screen.getByRole("button", { name: "Hide password" }));
    expect(input.getAttribute("type")).toBe("password");
    expect(screen.getByDisplayValue("secret")).toBe(input);
    expect(submit).not.toHaveBeenCalled();
  });

  it("disables the input and visibility toggle together", () => {
    render(
      <Form formOptions={options} onSubmit={vi.fn()}>
        <PasswordFormField name="password" aria-label="Password" disabled />
      </Form>,
    );
    expect(screen.getByLabelText("Password").hasAttribute("disabled")).toBe(true);
    const toggle = screen.getByRole("button", { name: "Show password" });
    expect(toggle.hasAttribute("disabled")).toBe(true);
    fireEvent.click(toggle);
    expect(screen.getByLabelText("Password").getAttribute("type")).toBe("password");
  });
});
