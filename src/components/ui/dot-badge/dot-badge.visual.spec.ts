import { expect, test } from "@playwright/test";

import { dotBadgeColors, dotBadgeSizes } from "./dot-badge.types";

for (const theme of ["light", "dark"] as const) {
  for (const size of dotBadgeSizes) {
    for (const color of dotBadgeColors) {
      test(`${theme} ${size} ${color}`, async ({ page }) => {
        await page.goto(`/iframe.html?id=shared-ui-dotbadge--${size}-${color}&viewMode=story`);
        const badge = page.getByRole("img", { name: "Status indicator" });
        await expect(badge).toBeVisible();
        await page.evaluate((selectedTheme) => {
          document.documentElement.classList.remove("light", "dark");
          document.documentElement.classList.add(selectedTheme);
        }, theme);
        await expect(badge).toHaveAttribute("data-size", size);
        await expect(badge).toHaveAttribute("data-color", color);
        await expect(badge.locator("..")).toHaveScreenshot(`${theme}-${size}-${color}.png`);
      });
    }
  }
}
