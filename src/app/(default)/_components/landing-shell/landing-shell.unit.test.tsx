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
  expect(screen.getAllByRole("link", { name: "FleetOS home" })[0]).toHaveAttribute("href", "/");
  expect(
    within(screen.getByRole("navigation", { name: "Desktop landing page" })).getByRole("link", {
      name: "FAQ",
    }),
  ).toHaveAttribute("href", "/#faq");
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

it("provides desktop section navigation, account access and footer groups", () => {
  render(<LandingShell>Content</LandingShell>);
  const desktop = screen.getByRole("navigation", { name: "Desktop landing page" });
  expect(within(desktop).getAllByRole("link")).toHaveLength(5);
  for (const name of ["Product", "Company", "Support"]) {
    expect(screen.getByRole("navigation", { name })).toBeInTheDocument();
  }
  expect(screen.getByRole("button", { name: "Change theme" })).toBeInTheDocument();
  expect(screen.getByText("Stay connected")).toBeInTheDocument();
});

it("supplies responsive logo sources and keeps page content between header and footers", () => {
  const { container } = render(
    <LandingShell>
      <h1>Page slot</h1>
    </LandingShell>,
  );
  const header = container.querySelector("header");
  expect(header).not.toBeNull();
  expect(container.querySelector("picture source")).toHaveAttribute(
    "srcset",
    "/icons/mini-favicon.svg",
  );
  expect(container.querySelector("picture source")).toHaveAttribute("media", "(width < 48rem)");
  expect(screen.getByRole("img", { name: "FleetOS" })).toHaveAttribute(
    "src",
    "/icons/fleetos-logo.svg",
  );
  const heading = screen.getByRole("heading", { name: "Page slot" });
  expect(header?.compareDocumentPosition(heading)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  for (const footer of container.querySelectorAll("footer")) {
    expect(heading.compareDocumentPosition(footer)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  }
});
