import * as jestDomMatchers from "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { Resolver, ResolverResult, UseFormReturn } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";

import { Form } from "./index";

void jestDomMatchers;

interface Values {
  email: string;
}
const validSubmit = vi.fn();
const invalidSubmit = vi.fn();
const options = { defaultValues: { email: "" } };
const validation: Resolver<Values> = (values): ResolverResult<Values> => {
  if (values.email.includes("@")) return { values, errors: {} };
  return { values: {}, errors: { email: { type: "validate", message: "Enter a valid email" } } };
};

function fields(methods: UseFormReturn<Values>) {
  return <Fields methods={methods} />;
}

function Fields({ methods }: { readonly methods: UseFormReturn<Values> }) {
  const setFieldError = useCallback(
    () => methods.setError("email", { type: "server", message: "Already registered" }),
    [methods],
  );
  const resetForm = useCallback(() => methods.reset(), [methods]);
  return (
    <>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        aria-invalid={Boolean(methods.formState.errors.email)}
        aria-describedby={methods.formState.errors.email ? "email-error" : undefined}
        {...methods.register("email")}
      />
      {methods.formState.errors.email && (
        <span id="email-error">{methods.formState.errors.email.message}</span>
      )}
      <button type="button" onClick={setFieldError}>
        Set field error
      </button>
      <button type="button" onClick={resetForm}>
        Reset
      </button>
    </>
  );
}

function Example() {
  return (
    <>
      <Form<Values>
        id="email-form"
        formOptions={options}
        validation={validation}
        onSubmit={validSubmit}
        onInvalid={invalidSubmit}
      >
        {fields}
      </Form>
      <button aria-label="Submit email" type="submit" form="email-form">
        Submit email
      </button>
    </>
  );
}

describe("Form integration", () => {
  it("validates an external submit, exposes errors, then submits corrected values", async () => {
    validSubmit.mockClear();
    invalidSubmit.mockClear();
    render(<Example />);
    fireEvent.click(screen.getByRole("button", { name: "Submit email" }));
    await waitFor(() => expect(screen.getByText("Enter a valid email")).toBeInTheDocument());
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute("aria-invalid", "true");
    expect(invalidSubmit).toHaveBeenCalled();
    expect(validSubmit).not.toHaveBeenCalled();
    fireEvent.change(screen.getByRole("textbox", { name: "Email" }), {
      target: { value: "ada@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit email" }));
    await waitFor(() =>
      expect(validSubmit).toHaveBeenCalledWith({ email: "ada@example.com" }, expect.anything()),
    );
  });
  it("exposes setError and reset to field content", async () => {
    render(<Example />);
    fireEvent.click(screen.getByRole("button", { name: "Set field error" }));
    await waitFor(() => expect(screen.getByText("Already registered")).toBeInTheDocument());
    fireEvent.change(screen.getByRole("textbox", { name: "Email" }), {
      target: { value: "ada@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveValue("");
    expect(screen.queryByText("Already registered")).not.toBeInTheDocument();
  });
});
import { useCallback } from "react";
