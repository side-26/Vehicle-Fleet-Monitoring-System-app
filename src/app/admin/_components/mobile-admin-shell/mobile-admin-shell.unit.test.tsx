import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { mobileAdminNavigationItems } from "@/app/admin/_components/mobile-admin-bottom-navigation/mobile-admin-bottom-navigation.types";

import { MobileAdminShell } from "./index";

const { setTheme } = vi.hoisted(() => ({ setTheme: vi.fn() }));
vi.mock("next-themes", () => ({ useTheme: () => ({ theme: "system", setTheme }) }));
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("MobileAdminShell", () => {
  it("renders content, search and the five navigation items in order without a sidebar", () => {
    render(
      <MobileAdminShell>
        <h1>Fleet page</h1>
      </MobileAdminShell>,
    );
    expect(screen.getByRole("heading", { name: "Fleet page" })).toBeTruthy();
    expect(screen.getByRole("searchbox")).toHaveAccessibleName(
      "Search vehicles, drivers, violations",
    );
    const nav = screen.getByRole("navigation", { name: "Admin bottom navigation" });
    expect(Array.from(nav.children, (item) => item.getAttribute("aria-label"))).toEqual([
      "Overview",
      "Violations",
      "Map",
      "Notifications",
      "Users",
    ]);
    expect(within(nav).getByRole("link", { name: "Overview" })).toHaveAttribute(
      "href",
      "/admin/dashboard",
    );
    expect(document.querySelector('[data-slot="sidebar"]')).toBeNull();
  });
  it.each(mobileAdminNavigationItems)(
    "routes $label through the provided handler",
    async ({ key, label }) => {
      const user = userEvent.setup();
      const onNavigate = vi.fn();
      render(
        <MobileAdminShell activeDestination={key} onNavigate={onNavigate}>
          Page
        </MobileAdminShell>,
      );
      const item = screen.getByRole("button", { name: label });
      expect(item).toHaveAttribute("aria-current", "page");
      await user.click(item);
      expect(onNavigate).toHaveBeenCalledWith(key);
    },
  );
  it("shows the header's static mock identity and unavailable account actions", async () => {
    const user = userEvent.setup();
    render(<MobileAdminShell>Page</MobileAdminShell>);
    screen.getByRole("button", { name: "Administrator menu" }).focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByText("Mahdi Rashidi")).toBeTruthy();
    expect(screen.getByText("Administrator")).toBeTruthy();
    expect(screen.getByRole("menuitem", { name: "Profile" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.getByRole("menuitem", { name: "Sign out" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });
  it("lets the standalone header search accept input", () => {
    render(<MobileAdminShell>Page</MobileAdminShell>);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "T-784" } });
    expect(screen.getByRole("searchbox")).toHaveValue("T-784");
  });
  it("switches themes through the avatar menu", async () => {
    const user = userEvent.setup();
    render(<MobileAdminShell>Page</MobileAdminShell>);
    screen.getByRole("button", { name: "Administrator menu" }).focus();
    await user.keyboard("{ArrowDown}");
    screen.getByRole("menuitem", { name: "Theme" }).focus();
    await user.keyboard("{ArrowRight}");
    await user.click(await screen.findByRole("menuitemradio", { name: "Dark" }));
    expect(setTheme).toHaveBeenCalledWith("dark", expect.anything());
  });
});
