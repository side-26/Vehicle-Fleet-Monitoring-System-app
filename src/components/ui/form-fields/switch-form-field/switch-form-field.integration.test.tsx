import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Form } from "@/components/ui/form";

import { SwitchFormField } from "./index";

const options = { defaultValues: { vehicle: false } };
const rules = { required: "Enter a vehicle" };
afterEach(cleanup);
describe("SwitchFormField integration", () => {
  it("shows validation errors, focuses invalid input, restores helper text, and submits corrected values", async () => {
    const submit = vi.fn();
    render(
      <Form formOptions={options} onSubmit={submit}>
        <SwitchFormField name="vehicle" label="Vehicle" message="Fleet identifier" rules={rules} />
        <button type="submit">Save</button>
      </Form>,
    );
    const input = screen.getByRole("switch", { name: "Vehicle" });
    expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(screen.getByText("Enter a vehicle")).toBeTruthy());
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.closest('[data-slot="field"]')?.getAttribute("data-true-color")).toBe("primary");
    await waitFor(() => expect(document.activeElement).toBe(input));
    fireEvent.click(input);
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(submit).toHaveBeenCalledWith({ vehicle: true }, expect.anything()));
    expect(screen.getByText("Fleet identifier")).toBeTruthy();
    expect(input.getAttribute("data-validated")).toBe("true");
    expect(input.hasAttribute("aria-invalid")).toBe(false);
    expect(input.closest('[data-slot="field"]')?.getAttribute("data-true-color")).toBe("primary");
  });
});
