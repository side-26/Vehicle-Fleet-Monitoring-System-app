import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Form } from "@/components/ui/form";

import { SwitchFormField } from "./index";

const options = { defaultValues: { vehicle: true } };
const submit = vi.fn();
afterEach(cleanup);
describe("SwitchFormField", () => {
  it("binds defaults and preserves the configured color before interaction", () => {
    render(
      <Form formOptions={options} onSubmit={submit}>
        <SwitchFormField name="vehicle" label="Vehicle" trueValueColor="primary" disabled />
      </Form>,
    );
    const input = screen.getByRole("switch");
    expect(document.querySelector('input[name="vehicle"]')).not.toBeNull();
    expect(input).toBeChecked();
    expect(input).toHaveAttribute("aria-disabled", "true");
    expect(input.closest('[data-slot="field"]')?.getAttribute("data-true-color")).toBe("primary");
    expect(input.getAttribute("aria-invalid")).toBeNull();
  });
});
