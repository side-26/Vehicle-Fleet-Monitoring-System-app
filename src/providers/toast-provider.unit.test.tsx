import { useCallback } from "react";

import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { expect, it } from "vitest";

import { useToast } from "@/hooks/use-toast";

import { ToastProvider } from "./toast-provider";

function NotificationConsumer() {
  const { add } = useToast();
  const show = useCallback(() => {
    add({
      title: "Vehicle saved",
      description: "Fleet updated",
      type: "success",
      align: "bottom-end",
      duration: 0,
    });
  }, [add]);
  return (
    <button type="button" onClick={show}>
      Save vehicle
    </button>
  );
}

it("renders application children and one global notification viewport", () => {
  render(
    <ToastProvider>
      <main>Fleet dashboard</main>
    </ToastProvider>,
  );
  expect(screen.getByRole("main")).toHaveTextContent("Fleet dashboard");
  expect(screen.getAllByRole("region", { name: "Notifications" })).toHaveLength(1);
});

it("provides useToast to descendants and renders and dismisses the common Toast", async () => {
  render(
    <ToastProvider>
      <NotificationConsumer />
    </ToastProvider>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Save vehicle" }));
  const popup = await screen.findByRole("dialog", { name: "Vehicle saved" });
  expect(popup).toHaveAccessibleDescription("Fleet updated");
  expect(popup).toHaveAttribute("data-color", "success");
  expect(popup).toHaveAttribute("data-align", "bottom-end");
  expect(popup).toHaveAttribute("data-glassy", "true");
  fireEvent.click(within(popup).getByRole("button", { name: "Close toast" }));
  await waitFor(() =>
    expect(screen.queryByRole("dialog", { name: "Vehicle saved" })).not.toBeInTheDocument(),
  );
});
