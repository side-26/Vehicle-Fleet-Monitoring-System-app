import * as jestDomMatchers from "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { dialogSizes } from "./dialog.types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./index";

void jestDomMatchers;

function TestDialog({
  eager = true,
  size = "md",
  glassy = false,
}: {
  eager?: boolean;
  size?: (typeof dialogSizes)[number];
  glassy?: boolean;
}) {
  return (
    <Dialog eager={eager}>
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogContent size={size} glassy={glassy}>
        <DialogHeader>
          <DialogTitle>Fleet settings</DialogTitle>
          <DialogDescription>Adjust preferences.</DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  );
}

async function openDialog() {
  fireEvent.click(screen.getByRole("button", { name: "Open dialog" }));
  return screen.findByRole("dialog", { name: "Fleet settings" });
}

describe("Dialog", () => {
  afterEach(cleanup);
  it.each(dialogSizes)("renders %s size", async (size) => {
    render(<TestDialog size={size} />);
    expect(await openDialog()).toHaveAttribute("data-size", size);
  });
  it("renders glass content when requested", async () => {
    render(<TestDialog glassy />);
    expect(await openDialog()).toHaveAttribute("data-glassy", "true");
  });
  it("closes with Escape when eager", async () => {
    render(<TestDialog />);
    await openDialog();
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() =>
      expect(screen.queryByRole("dialog", { name: "Fleet settings" })).not.toBeInTheDocument(),
    );
  });
  it("stays open on Escape when eager is false, then closes explicitly", async () => {
    render(<TestDialog eager={false} />);
    await openDialog();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.getByRole("dialog", { name: "Fleet settings" })).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole("button", { name: "Close dialog" })[0]!);
    await waitFor(() =>
      expect(screen.queryByRole("dialog", { name: "Fleet settings" })).not.toBeInTheDocument(),
    );
  });
  it("closes on outside click when eager", async () => {
    render(<TestDialog />);
    await openDialog();
    const overlay = document.querySelector('[data-slot="dialog-overlay"]');
    expect(overlay).toBeInTheDocument();
    fireEvent.pointerDown(overlay!);
    fireEvent.pointerUp(overlay!);
    fireEvent.click(overlay!);
    await waitFor(() =>
      expect(screen.queryByRole("dialog", { name: "Fleet settings" })).not.toBeInTheDocument(),
    );
  });
  it("stays open on outside click when eager is false", async () => {
    render(<TestDialog eager={false} />);
    await openDialog();
    const overlay = document.querySelector('[data-slot="dialog-overlay"]');
    expect(overlay).toBeInTheDocument();
    fireEvent.pointerDown(overlay!);
    fireEvent.pointerUp(overlay!);
    fireEvent.click(overlay!);
    expect(screen.getByRole("dialog", { name: "Fleet settings" })).toBeInTheDocument();
  });
});
