import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Form } from "@/components/ui/form";

import { PasswordFormField } from "./index";

const options = { defaultValues: { vehicle: "" } };
const rules = { required: "Enter a vehicle" };
afterEach(cleanup);
describe("PasswordFormField integration", () => {
  it("shows validation errors, focuses invalid input, restores helper text, and submits corrected values", async () => {
    const submit = vi.fn();
    render(
      <Form formOptions={options} onSubmit={submit}>
        <PasswordFormField
          name="vehicle"
          label="Vehicle"
          message="Fleet identifier"
          rules={rules}
        />
        <button type="submit">Save</button>
      </Form>,
    );
    const input = screen.getByLabelText(/Vehicle/);
    expect(input.hasAttribute("required")).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(screen.getByText("Enter a vehicle")).toBeTruthy());
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.closest('[data-slot="field"]')?.getAttribute("data-color")).toBe("neutral");
    await waitFor(() => expect(document.activeElement).toBe(input));
    fireEvent.change(input, { target: { value: "Van" } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(submit).toHaveBeenCalledWith({ vehicle: "Van" }, expect.anything()));
    expect(screen.getByText("Fleet identifier")).toBeTruthy();
    expect(input.getAttribute("data-validated")).toBe("true");
    expect(input.hasAttribute("aria-invalid")).toBe(false);
    expect(input.closest('[data-slot="field"]')?.getAttribute("data-color")).toBe("neutral");
  });
});
