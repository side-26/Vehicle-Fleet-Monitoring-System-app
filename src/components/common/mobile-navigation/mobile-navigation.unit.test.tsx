import { act, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";

import { MobileNavigation } from "./index";
import { mobileNavigationItems } from "./mobile-navigation.types";

afterEach(() => {
  window.history.replaceState(null, "", "/");
});

it("renders the five labeled landing links", () => {
  render(<MobileNavigation />);
  const navigation = screen.getByRole("navigation", { name: "Landing page" });
  expect(within(navigation).getAllByRole("link")).toHaveLength(5);
  for (const { label, href } of mobileNavigationItems) {
    expect(within(navigation).getByRole("link", { name: label })).toHaveAttribute("href", href);
  }
  expect(screen.getByRole("link", { name: "Account" })).not.toHaveAttribute("aria-current");
});

it("updates the current link when the section hash or history changes", () => {
  render(<MobileNavigation />);
  act(() => {
    window.history.replaceState(null, "", "/#pricing");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute("aria-current", "location");
  expect(screen.getByRole("link", { name: "Account" })).not.toHaveAttribute("aria-current");
  act(() => {
    window.history.replaceState(null, "", "/");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
  expect(screen.getByRole("link", { name: "Account" })).not.toHaveAttribute("aria-current");
});
