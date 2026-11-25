import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { ThemeProvider } from "@/providers/theme-provider";

import { LandingShell } from "./index";

const previewStyle = { minBlockSize: "150vh", padding: "2rem" };

const meta = {
  title: "Layouts/Landing",
  component: LandingShell,
  args: { children: null },
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
    viewport: {
      options: {
        mobile: { name: "Mobile", styles: { width: "390px", height: "844px" } },
        tablet: { name: "Tablet", styles: { width: "768px", height: "1024px" } },
        tabletBoundary: { name: "Tablet boundary", styles: { width: "1024px", height: "900px" } },
        desktopBoundary: { name: "Desktop boundary", styles: { width: "1025px", height: "900px" } },
        desktop: { name: "Desktop", styles: { width: "1440px", height: "900px" } },
      },
    },
  },
  argTypes: {
    children: {
      control: false,
      description: "Page content rendered between the header and footer.",
      type: "string",
    },
  },
  render: () => (
    <ThemeProvider defaultTheme="light" enableSystem storageKey="fleetos-layout-story-theme">
      <LandingShell>
        <main aria-label="Example page" style={previewStyle}>
          <h1>Landing layout preview</h1>
          <p>Placeholder content for inspecting the header, footer, and navigation.</p>
        </main>
      </LandingShell>
    </ThemeProvider>
  ),
  beforeEach: () => {
    localStorage.removeItem("fleetos-layout-story-theme");
    window.scrollTo(0, 0);
    return () => {
      localStorage.removeItem("fleetos-layout-story-theme");
      document.documentElement.classList.remove("dark", "light");
      window.scrollTo(0, 0);
    };
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const desktop = window.innerWidth > 1024;
    const logo = canvasElement.querySelector("header picture img");
    if (!(logo instanceof HTMLImageElement)) throw new Error("Missing responsive logo");
    await waitFor(() =>
      expect(logo.currentSrc).toContain(
        window.matchMedia("(width < 48rem)").matches ? "mini-favicon.svg" : "fleetos-logo.svg",
      ),
    );
    await waitFor(() => expect(logo.naturalWidth).toBeGreaterThan(0));
    const mobileNavigation = canvasElement.querySelector('nav[aria-label="Landing page"]');
    const desktopNavigation = canvasElement.querySelector('nav[aria-label="Desktop landing page"]');
    if (!(mobileNavigation instanceof HTMLElement) || !(desktopNavigation instanceof HTMLElement))
      throw new Error("Missing responsive navigation");
    await expect(
      canvas.getByRole("heading", { name: "Landing layout preview", level: 1 }),
    ).toBeVisible();
    if (desktop) {
      await expect(desktopNavigation).toBeVisible();
      await expect(mobileNavigation).not.toBeVisible();
      await expect(canvas.getByRole("heading", { name: "Product", level: 2 })).toBeVisible();
      const header = canvasElement.querySelector("header");
      if (!header) throw new Error("Missing header");
      await expect(within(header).getByRole("link", { name: "Account" })).toHaveAttribute(
        "href",
        "/login",
      );
    } else {
      await expect(mobileNavigation).toBeVisible();
      await expect(desktopNavigation).not.toBeVisible();
      const card = mobileNavigation.closest('[data-slot="card"]');
      if (!card) throw new Error("Missing glass navigation card");
      await expect(card.getBoundingClientRect().width).toBeLessThanOrEqual(768);
      await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(window.innerWidth);
      await Promise.all(
        within(mobileNavigation)
          .getAllByRole("link")
          .map((link) => expect(link.getBoundingClientRect().height).toBeGreaterThanOrEqual(44)),
      );
      const top = mobileNavigation.getBoundingClientRect().top;
      window.scrollTo(0, 400);
      await waitFor(() => expect(window.scrollY).toBeGreaterThan(0));
      await expect(mobileNavigation.getBoundingClientRect().top).toBeCloseTo(top, 0);
      window.scrollTo(0, 0);
    }
    await userEvent.click(canvas.getByRole("button", { name: "Change theme" }));
    const menu = within(document.body);
    const dark = await menu.findByRole("menuitemradio", { name: "Dark" });
    await waitFor(() => expect(getComputedStyle(dark).pointerEvents).not.toBe("none"));
    await userEvent.click(dark);
    await waitFor(() => expect(document.documentElement).toHaveClass("dark"));
  },
} satisfies Meta<typeof LandingShell>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const TabletBoundary: Story = {
  globals: { viewport: { value: "tabletBoundary", isRotated: false } },
};
export const DesktopBoundary: Story = {
  globals: { viewport: { value: "desktopBoundary", isRotated: false } },
};
export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
