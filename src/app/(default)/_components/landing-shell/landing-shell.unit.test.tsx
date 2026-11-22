import { render, screen, within } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { LandingShell } from "./index";

const { setTheme } = vi.hoisted(() => ({ setTheme: vi.fn() }));
vi.mock("next-themes", () => ({ useTheme: () => ({ theme: "system", setTheme }) }));

it("preserves content and exposes five labeled navigation links", () => {
  render(
    <LandingShell>
      <p>Page content</p>
    </LandingShell>,
  );
  expect(screen.getByText("Page content")).toBeVisible();
  expect(screen.getByRole("link", { name: "FleetOS home" })).toHaveAttribute("href", "/");
  expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "/#faq");
  const navigation = screen.getByRole("navigation", { name: "Landing page" });
  expect(within(navigation).getAllByRole("link")).toHaveLength(5);
  expect(within(navigation).getByRole("link", { name: "Account" })).toHaveAttribute(
    "href",
    "/login",
  );
  expect(within(navigation).getByRole("link", { name: "Features" })).toHaveAttribute(
    "href",
    "/#features",
  );
});
