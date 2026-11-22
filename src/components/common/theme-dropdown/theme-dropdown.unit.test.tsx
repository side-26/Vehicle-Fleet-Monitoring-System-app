import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

import { ThemeDropdown } from "./index";
import { themeOptions } from "./theme-dropdown.types";

const { setTheme } = vi.hoisted(() => ({ setTheme: vi.fn() }));
vi.mock("next-themes", () => ({ useTheme: () => ({ theme: "system", setTheme }) }));

it.each(themeOptions)("selects %s from the theme menu", async (theme) => {
  const user = userEvent.setup();
  render(<ThemeDropdown />);
  await user.click(screen.getByRole("button", { name: "Change theme" }));
  expect(await screen.findByRole("menuitemradio", { name: "System" })).toHaveAttribute(
    "aria-checked",
    "true",
  );
  await user.click(screen.getByRole("menuitemradio", { name: new RegExp(theme, "i") }));
  expect(setTheme).toHaveBeenCalledWith(theme, expect.anything());
});
