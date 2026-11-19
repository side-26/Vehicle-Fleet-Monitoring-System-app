import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Form } from "@/components/ui/form";

import { TextareaFormField } from "./index";

const options = { defaultValues: { vehicle: "Van" } };
const submit = vi.fn();
afterEach(cleanup);
describe("TextareaFormField", () => {
  it("binds defaults and preserves the configured color before interaction", () => {
    render(
      <Form formOptions={options} onSubmit={submit}>
        <TextareaFormField name="vehicle" label="Vehicle" color="primary" disabled />
      </Form>,
    );
    const input = screen.getByRole("textbox");
    expect(input.getAttribute("name")).toBe("vehicle");
    expect(input.getAttribute("disabled")).not.toBeNull();
    expect(input.closest('[data-slot="field"]')?.getAttribute("data-color")).toBe("primary");
    expect(input.getAttribute("aria-invalid")).toBeNull();
  });
});
