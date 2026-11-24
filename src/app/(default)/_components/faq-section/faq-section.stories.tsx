import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { FaqSection } from "./index";

const viewportOptions = {
  narrowMobile: { name: "Narrow mobile", styles: { width: "320px", height: "740px" } },
  mobile: { name: "Mobile", styles: { width: "390px", height: "844px" } },
  tablet: { name: "Tablet", styles: { width: "768px", height: "1024px" } },
  belowDesktop: { name: "Below desktop breakpoint", styles: { width: "1023px", height: "900px" } },
  desktopBoundary: { name: "Desktop breakpoint", styles: { width: "1024px", height: "900px" } },
  desktop: { name: "Desktop", styles: { width: "1440px", height: "900px" } },
};

const meta = {
  title: "Landing/FAQ Section",
  component: FaqSection,
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
    viewport: { options: viewportOptions },
  },
} satisfies Meta<typeof FaqSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("region", { name: "Frequently Asked Questions" }),
    ).toHaveAttribute("id", "faq");
    await expect(
      canvas.getByRole("heading", { level: 2, name: "Frequently Asked Questions" }),
    ).toBeVisible();
    const heading = canvas.getByRole("heading", { level: 2, name: "Frequently Asked Questions" });
    const introduction = heading.parentElement;
    const accordion = canvasElement.querySelector('[data-slot="accordion"]');
    if (!(introduction instanceof HTMLElement) || !(accordion instanceof HTMLElement)) {
      throw new Error("Missing FAQ layout elements");
    }
    const introBounds = introduction.getBoundingClientRect();
    const accordionBounds = accordion.getBoundingClientRect();
    if (window.matchMedia("(min-width: 64rem)").matches) {
      await expect(accordionBounds.left).toBeGreaterThanOrEqual(introBounds.right);
      await expect(accordionBounds.top + accordionBounds.height / 2).toBeCloseTo(
        introBounds.top + introBounds.height / 2,
        0,
      );
    } else {
      await expect(accordionBounds.top).toBeGreaterThanOrEqual(introBounds.bottom);
      await expect(accordionBounds.left).toBeCloseTo(introBounds.left, 0);
      await expect(accordionBounds.width).toBeCloseTo(introBounds.width, 0);
    }
    await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(window.innerWidth);
    const buttons = canvas.getAllByRole("button");
    await expect(buttons).toHaveLength(5);
    await expect(canvas.getAllByRole("heading", { level: 3 })).toHaveLength(5);
    await Promise.all(
      buttons.map((button) => expect(button).toHaveAttribute("aria-expanded", "false")),
    );
    const first = canvas.getByRole("button", { name: "What types of vehicles are supported?" });
    await userEvent.click(first);
    await expect(
      canvas.getByRole("region", { name: "What types of vehicles are supported?" }),
    ).toHaveTextContent("cars, vans, and trucks");
    await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(window.innerWidth);
    await expect(accordion.scrollWidth).toBeLessThanOrEqual(accordion.clientWidth);
    if (window.matchMedia("(min-width: 64rem)").matches) {
      await waitFor(() => {
        const text = introduction.getBoundingClientRect();
        const questions = accordion.getBoundingClientRect();
        return expect(questions.top + questions.height / 2).toBeCloseTo(
          text.top + text.height / 2,
          0,
        );
      });
    }
    const second = canvas.getByRole("button", {
      name: "Do I need special hardware to use the platform?",
    });
    await userEvent.click(second);
    await expect(first).toHaveAttribute("aria-expanded", "false");
    await expect(
      canvas.getByRole("region", { name: "Do I need special hardware to use the platform?" }),
    ).toBeVisible();
    await userEvent.click(second);
    await waitFor(() =>
      expect(
        canvas.queryByRole("region", { name: "Do I need special hardware to use the platform?" }),
      ).not.toBeInTheDocument(),
    );
  },
};

function responsiveStory(viewport: keyof typeof viewportOptions): Story {
  return {
    globals: { viewport: { value: viewport, isRotated: false } },
    play: async (context) => {
      await expect(window.innerWidth).toBe(
        Number.parseInt(viewportOptions[viewport].styles.width, 10),
      );
      await Default.play?.(context);
    },
  };
}

export const NarrowMobile = responsiveStory("narrowMobile");
export const Mobile = responsiveStory("mobile");
export const Tablet = responsiveStory("tablet");
export const BelowDesktopBreakpoint = responsiveStory("belowDesktop");
export const DesktopBreakpoint = responsiveStory("desktopBoundary");
export const Desktop = responsiveStory("desktop");
