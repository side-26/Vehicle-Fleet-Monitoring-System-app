import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import { mobileAdminNavigationItems } from "@/app/admin/_components/mobile-admin-bottom-navigation/mobile-admin-bottom-navigation.types";
import { ThemeProvider } from "@/providers/theme-provider";

import { MobileAdminShell } from "./index";
import styles from "./styles.module.css";

const meta = {
  title: "Layouts/Admin/MobileShell",
  component: MobileAdminShell,
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
    viewport: {
      options: {
        phone: { name: "Phone", styles: { width: "390px", height: "844px" } },
        tablet: { name: "Tablet", styles: { width: "768px", height: "1024px" } },
      },
    },
  },
  args: {
    activeDestination: "overview",
    onNavigate: fn(),
    children: (
      <div className={styles.storyContent}>
        <h1>Fleet page</h1>
        <p>Page content stays clear of the fixed bottom navigation.</p>
      </div>
    ),
  },
  argTypes: {
    activeDestination: {
      control: "select",
      options: mobileAdminNavigationItems.map((item) => item.key),
      type: "string",
      description: "Current bottom navigation destination; defaults to overview.",
    },
    children: { control: false, type: "string", description: "Page content." },
    onNavigate: {
      control: false,
      type: "function",
      description: "Connects all five destinations to application navigation.",
    },
  },
  render: (args) => (
    <ThemeProvider defaultTheme="light" storageKey="mobile-admin-story-theme">
      <MobileAdminShell {...args} />
    </ThemeProvider>
  ),
  beforeEach: () => {
    window.scrollTo(0, 0);
    localStorage.removeItem("mobile-admin-story-theme");
    return () => {
      window.scrollTo(0, 0);
      localStorage.removeItem("mobile-admin-story-theme");
    };
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("heading", { name: "Fleet page", level: 1 })).toBeVisible();
    await expect(canvas.getByRole("searchbox")).toBeVisible();
    const header = canvasElement.querySelector("header");
    const footer = canvasElement.querySelector("footer");
    if (!header || !footer) throw new Error("Missing shell regions");
    await expect(getComputedStyle(header).position).toBe("sticky");
    await expect(getComputedStyle(footer).position).toBe("fixed");
    const nav = canvas.getByRole("navigation", { name: "Admin bottom navigation" });
    await expect(Array.from(nav.children, (item) => item.getAttribute("aria-label"))).toEqual([
      "Overview",
      "Violations",
      "Map",
      "Notifications",
      "Users",
    ]);
    window.scrollTo(0, 200);
    await waitFor(() => expect(header.getBoundingClientRect().top).toBeCloseTo(0, 0));
    await expect(footer.getBoundingClientRect().bottom).toBeCloseTo(window.innerHeight, 0);
    await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(window.innerWidth);
    await userEvent.click(canvas.getByRole("button", { name: "Administrator menu" }));
    const menu = await within(document.body).findByRole("menu");
    await expect(within(menu).getByText("Mahdi Rashidi")).toBeVisible();
    await expect(within(menu).getByText("Administrator")).toBeVisible();
    await expect(within(menu).getByRole("menuitem", { name: "Profile" })).toBeVisible();
    await expect(within(menu).getByRole("menuitem", { name: "Theme" })).toBeVisible();
    await expect(within(menu).getByRole("menuitem", { name: "Sign out" })).toBeVisible();
    await userEvent.keyboard("{Escape}");
  },
} satisfies Meta<typeof MobileAdminShell>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Phone: Story = { globals: { viewport: { value: "phone", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
