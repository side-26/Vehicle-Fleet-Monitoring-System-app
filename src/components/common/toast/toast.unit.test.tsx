import { useCallback } from "react";

import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { useToast } from "@/hooks/use-toast";

import { Toaster, createToastManager } from "./index";
import type { ToastAlign } from "./toast.types";
import { getToastAlign, getToastColor, toastAlignments, toastColors } from "./toast.types";

function Controls({ align, type }: { readonly align?: ToastAlign; readonly type?: string }) {
  const { add } = useToast();
  const show = useCallback(() => {
    add({ title: "Saved", description: "Vehicle updated", duration: 0, align, type });
  }, [add, align, type]);
  return (
    <button type="button" onClick={show}>
      Show toast
    </button>
  );
}

it.each(toastAlignments)("renders add({ align: %s }) in its own position group", async (align) => {
  render(
    <Toaster>
      <Controls align={align} />
    </Toaster>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Show toast" }));
  const dialog = await screen.findByRole("dialog", { name: "Saved" });
  expect(dialog).toHaveAccessibleDescription("Vehicle updated");
  expect(dialog).toHaveAttribute("data-align", align);
  expect(dialog.closest('[data-slot="toast-group"]')).toHaveAttribute("data-align", align);
  expect(screen.getByRole("region", { name: "Notifications" })).toBeInTheDocument();
});

it("defaults to top center, omits empty actions, and closes with its accessible button", async () => {
  render(
    <Toaster>
      <Controls />
    </Toaster>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Show toast" }));
  const dialog = await screen.findByRole("dialog", { name: "Saved" });
  expect(dialog).toHaveAttribute("data-align", "top-center");
  expect(within(dialog).getAllByRole("button")).toHaveLength(1);
  fireEvent.click(within(dialog).getByRole("button", { name: "Close toast" }));
  await waitFor(() =>
    expect(screen.queryByRole("dialog", { name: "Saved" })).not.toBeInTheDocument(),
  );
});

it("shows independent positions and preserves action callbacks", async () => {
  const manager = createToastManager();
  const onClick = vi.fn();
  render(
    <Toaster toastManager={manager}>
      <Controls align="bottom-end" />
    </Toaster>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Show toast" }));
  // Use the external native manager too; missing alignment falls back to top center.
  act(() => {
    manager.add({ title: "Native toast", timeout: 0, actionProps: { children: "Undo", onClick } });
  });
  expect(await screen.findByRole("dialog", { name: "Saved" })).toHaveAttribute(
    "data-align",
    "bottom-end",
  );
  const native = await screen.findByRole("dialog", { name: "Native toast" });
  expect(native).toHaveAttribute("data-align", "top-center");
  fireEvent.click(within(native).getByRole("button", { name: "Undo" }));
  expect(onClick).toHaveBeenCalledOnce();
});

it.each(["success", "info", "warning", "error", "loading"])("renders the %s icon", async (type) => {
  render(
    <Toaster>
      <Controls type={type} />
    </Toaster>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Show toast" }));
  const dialog = await screen.findByRole("dialog", { name: "Saved" });
  expect(dialog.querySelector('[data-slot="toast-icon"]')).toHaveAttribute("data-type", type);
});

it("falls back safely for unknown alignment metadata", () => {
  expect(getToastAlign({ align: "unknown" })).toBe("top-center");
  expect(getToastAlign({})).toBe("top-center");
});

it.each(toastColors)("renders the %s glass surface", async (color) => {
  render(
    <Toaster>
      <Controls type={color} />
    </Toaster>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Show toast" }));
  const dialog = await screen.findByRole("dialog", { name: "Saved" });
  expect(dialog).toHaveAttribute("data-color", color);
  expect(dialog).toHaveAttribute("data-glassy", "true");
  expect(dialog).toHaveAccessibleDescription("Vehicle updated");
});

it("derives color only from type and ignores legacy color metadata", () => {
  expect(getToastColor({})).toBe("primary");
  expect(getToastColor({ color: "unknown", type: "unknown" })).toBe("primary");
  expect(getToastColor({ type: "info" })).toBe("info");
  expect(getToastColor({ color: "primary", type: "error" })).toBe("error");
  expect(getToastColor({ color: "error" })).toBe("primary");
  expect(getToastColor({ type: "loading" })).toBe("primary");
});

it("updates the glass color when the native toast type changes", async () => {
  const manager = createToastManager();
  render(<Toaster toastManager={manager} />);
  act(() => {
    manager.add({ id: "status", title: "Vehicle status", type: "success", timeout: 0 });
  });
  const dialog = await screen.findByRole("dialog", { name: "Vehicle status" });
  expect(dialog).toHaveAttribute("data-color", "success");
  act(() => manager.update("status", { type: "warning" }));
  expect(dialog).toHaveAttribute("data-color", "warning");
  act(() => manager.update("status", { type: "loading" }));
  expect(dialog).toHaveAttribute("data-color", "primary");
});
