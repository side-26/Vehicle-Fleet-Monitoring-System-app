import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AdminProfileMenu } from "./index";

const { setTheme } = vi.hoisted(() => ({ setTheme: vi.fn() }));
vi.mock("next-themes", () => ({ useTheme: () => ({ theme: "system", setTheme }) }));
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("AdminProfileMenu", () => {
  it("shows Profile, Theme and Sign out, disabling actions without handlers", async () => {
    const user = userEvent.setup();
    render(<AdminProfileMenu />);
    screen.getByRole("button", { name: "Administrator menu" }).focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Profile" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.getByRole("menuitem", { name: "Theme" })).toBeTruthy();
    expect(screen.getByRole("menuitem", { name: "Sign out" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.queryByText("FleetOS website")).toBeNull();
  });
  it("calls the supplied profile and sign-out actions", async () => {
    const user = userEvent.setup();
    const onProfile = vi.fn();
    const onSignOut = vi.fn();
    render(<AdminProfileMenu onProfile={onProfile} onSignOut={onSignOut} />);
    screen.getByRole("button", { name: "Administrator menu" }).focus();
    await user.keyboard("{ArrowDown}");
    await user.click(screen.getByRole("menuitem", { name: "Profile" }));
    expect(onProfile).toHaveBeenCalledOnce();
    screen.getByRole("button", { name: "Administrator menu" }).focus();
    await user.keyboard("{ArrowDown}");
    await user.click(screen.getByRole("menuitem", { name: "Sign out" }));
    expect(onSignOut).toHaveBeenCalledOnce();
  });
  it.each(["Light", "Dark", "System"])("selects %s from the theme submenu", async (name) => {
    const user = userEvent.setup();
    render(<AdminProfileMenu />);
    screen.getByRole("button", { name: "Administrator menu" }).focus();
    await user.keyboard("{ArrowDown}");
    screen.getByRole("menuitem", { name: "Theme" }).focus();
    await user.keyboard("{ArrowRight}");
    await user.click(await screen.findByRole("menuitemradio", { name }));
    expect(setTheme).toHaveBeenCalledWith(name.toLowerCase(), expect.anything());
  });
});
