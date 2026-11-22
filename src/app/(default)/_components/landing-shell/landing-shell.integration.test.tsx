import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import DefaultLayout from "@/app/(default)/layout";
import { ThemeProvider } from "@/providers/theme-provider";

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(() => true),
    })),
  );
});
afterEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove("dark", "light");
  document.documentElement.style.removeProperty("color-scheme");
  window.history.replaceState(null, "", "/");
});

function renderLayout() {
  return render(
    <ThemeProvider>
      <DefaultLayout>
        <h1>Fleet page</h1>
      </DefaultLayout>
    </ThemeProvider>,
  );
}

it.each([
  { label: "Dark", value: "dark", resolved: "dark" },
  { label: "Light", value: "light", resolved: "light" },
  { label: "System", value: "system", resolved: "light" },
])("changes and persists $label through the real provider", async ({ label, value, resolved }) => {
  const user = userEvent.setup();
  renderLayout();
  await user.click(screen.getByRole("button", { name: "Change theme" }));
  await user.click(await screen.findByRole("menuitemradio", { name: label }));
  await waitFor(() => expect(document.documentElement).toHaveClass(resolved));
  expect(localStorage.getItem("theme")).toBe(value);
  expect(screen.getByRole("heading", { name: "Fleet page" })).toBeVisible();
});

it("restores a saved theme and supports keyboard opening and dismissal", async () => {
  localStorage.setItem("theme", "dark");
  const user = userEvent.setup();
  renderLayout();
  await waitFor(() => expect(document.documentElement).toHaveClass("dark"));
  const trigger = screen.getByRole("button", { name: "Change theme" });
  trigger.focus();
  await user.keyboard("{Enter}");
  expect(await screen.findByRole("menuitemradio", { name: "Dark" })).toHaveAttribute(
    "aria-checked",
    "true",
  );
  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument());
  expect(trigger).toHaveFocus();
});

it("keeps account destinations and active section state consistent across layout parts", () => {
  renderLayout();
  const navigation = screen.getByRole("navigation", { name: "Landing page" });
  expect(within(navigation).getByRole("link", { name: "Account" })).toHaveAttribute(
    "href",
    "/login",
  );
  for (const section of ["features", "how-it-works", "pricing", "about-us"]) {
    act(() => {
      window.history.replaceState(null, "", `/#${section}`);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    const current = within(navigation)
      .getAllByRole("link")
      .filter((link) => link.hasAttribute("aria-current"));
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveAttribute("href", `/#${section}`);
  }
  act(() => {
    window.history.replaceState(null, "", "/login");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
  expect(within(navigation).getByRole("link", { name: "Account" })).toHaveAttribute(
    "aria-current",
    "location",
  );
});
