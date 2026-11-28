import { Suspense, type ReactNode } from "react";

import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AdminLayoutClient } from "./index";

vi.mock("@/app/admin/_components/desktop-admin-layout-shell", () => ({
  DesktopAdminLayoutShell: ({ children }: { readonly children: ReactNode }) => (
    <div data-testid="desktop">{children}</div>
  ),
}));
vi.mock("@/app/admin/_components/mobile-admin-shell", () => ({
  MobileAdminShell: ({ children }: { readonly children: ReactNode }) => (
    <div data-testid="mobile">{children}</div>
  ),
}));
let width = 1440;
const listeners = new Set<() => void>();
beforeEach(() => {
  width = 1440;
  vi.stubGlobal("innerWidth", width);
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({
      matches: width <= 1024,
      addEventListener: (_: string, listener: () => void) => listeners.add(listener),
      removeEventListener: (_: string, listener: () => void) => listeners.delete(listener),
    })),
  );
});
afterEach(() => {
  cleanup();
  listeners.clear();
  vi.unstubAllGlobals();
});

function preview() {
  return (
    <Suspense fallback={null}>
      <AdminLayoutClient>
        <h1>Page content</h1>
      </AdminLayoutClient>
    </Suspense>
  );
}
function resize(nextWidth: number) {
  act(() => {
    width = nextWidth;
    vi.stubGlobal("innerWidth", width);
    listeners.forEach((listener) => listener());
  });
}

describe("AdminLayoutClient", () => {
  it.each([390, 768, 1024])("renders only mobile/tablet at %ipx", async (nextWidth) => {
    width = nextWidth;
    vi.stubGlobal("innerWidth", width);
    render(preview());
    expect(await screen.findByTestId("mobile")).toBeTruthy();
    expect(screen.queryByTestId("desktop")).toBeNull();
    expect(screen.getAllByRole("heading", { name: "Page content" })).toHaveLength(1);
  });
  it.each([1025, 1440])("renders only desktop at %ipx", async (nextWidth) => {
    width = nextWidth;
    vi.stubGlobal("innerWidth", width);
    render(preview());
    expect(await screen.findByTestId("desktop")).toBeTruthy();
    expect(screen.queryByTestId("mobile")).toBeNull();
  });
  it("replaces the mounted shell when crossing the breakpoint", async () => {
    render(preview());
    await screen.findByTestId("desktop");
    resize(768);
    await screen.findByTestId("mobile");
    expect(screen.queryByTestId("desktop")).toBeNull();
    resize(1440);
    await screen.findByTestId("desktop");
    expect(screen.queryByTestId("mobile")).toBeNull();
    expect(window.matchMedia).toHaveBeenCalledWith("(max-width: 1024px)");
  });
});
