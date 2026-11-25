import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { AuthLayoutShell } from "./index";

afterEach(cleanup);
describe("AuthLayoutShell", () => {
  it("renders auth page content and a named home link without adding a main landmark", () => {
    render(
      <AuthLayoutShell>
        <h1>Welcome Back</h1>
      </AuthLayoutShell>,
    );
    expect(screen.getByRole("heading", { name: "Welcome Back", level: 1 })).toBeTruthy();
    expect(screen.getByRole("link", { name: "FleetOS home" }).getAttribute("href")).toBe("/");
    expect(screen.queryByRole("main")).toBeNull();
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("provides mobile, tablet, and desktop picture sources", () => {
    const { container } = render(<AuthLayoutShell>Recovery form</AuthLayoutShell>);
    const picture = container.querySelector("picture");
    expect(
      picture?.querySelector('source[media="(min-width: 48rem)"]')?.getAttribute("srcset"),
    ).toBe("/images/auth/tablet-image.webp");
    expect(
      picture?.querySelector('source[media="(min-width: 64rem)"]')?.getAttribute("srcset"),
    ).toBe("/images/auth/desktop-image.webp");
    expect(picture?.querySelector("img")?.getAttribute("src")).toBe(
      "/images/auth/mobile-image.webp",
    );
    expect(picture?.querySelector("img")?.getAttribute("alt")).toBe("");
    expect(screen.getByText("Recovery form")).toBeTruthy();
  });
});
