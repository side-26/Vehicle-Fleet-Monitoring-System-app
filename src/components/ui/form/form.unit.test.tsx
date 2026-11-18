import * as jestDomMatchers from "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { UseFormReturn } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";

import { Form } from "./index";

void jestDomMatchers;

interface Values {
  name: string;
}
const submit = vi.fn();
const options = { defaultValues: { name: "Ada" } };
function fields(methods: UseFormReturn<Values>) {
  return (
    <>
      <label htmlFor="name">Name</label>
      <input id="name" {...methods.register("name")} />
      <button type="submit">Save</button>
    </>
  );
}

describe("Form", () => {
  it("renders a native form with an id and exposes form methods to fields", () => {
    render(
      <Form<Values> id="profile-form" aria-label="Profile" formOptions={options} onSubmit={submit}>
        {fields}
      </Form>,
    );
    expect(screen.getByRole("form", { name: "Profile" })).toHaveAttribute("id", "profile-form");
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveValue("Ada");
    expect(screen.getByRole("form", { name: "Profile" })).toHaveAttribute("novalidate");
  });
  it("submits valid registered values", async () => {
    submit.mockClear();
    render(
      <Form<Values> formOptions={options} onSubmit={submit}>
        {fields}
      </Form>,
    );
    fireEvent.change(screen.getByRole("textbox", { name: "Name" }), { target: { value: "Grace" } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(submit).toHaveBeenCalledWith({ name: "Grace" }, expect.anything()));
  });
});
