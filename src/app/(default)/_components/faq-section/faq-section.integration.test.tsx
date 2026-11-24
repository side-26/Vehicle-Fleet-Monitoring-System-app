import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";

import { FaqSection } from "./index";

it("integrates all FAQ questions with single-panel expansion and collapse", async () => {
  const user = userEvent.setup();
  render(<FaqSection />);
  expect(screen.getByRole("region", { name: "Frequently Asked Questions" })).toHaveAttribute(
    "id",
    "faq",
  );
  expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(5);
  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(5);
  for (const button of buttons) expect(button).toHaveAttribute("aria-expanded", "false");

  const first = screen.getByRole("button", { name: "What types of vehicles are supported?" });
  await user.click(first);
  expect(
    screen.getByRole("region", { name: "What types of vehicles are supported?" }),
  ).toHaveTextContent("cars, vans, and trucks");

  const hardware = screen.getByRole("button", {
    name: "Do I need special hardware to use the platform?",
  });
  await user.click(hardware);
  expect(first).toHaveAttribute("aria-expanded", "false");
  expect(
    screen.getByRole("region", { name: "Do I need special hardware to use the platform?" }),
  ).toHaveTextContent("compatible tracking device or integration");

  const growth = screen.getByRole("button", { name: "Can I add more vehicles or drivers later?" });
  await user.click(growth);
  expect(hardware).toHaveAttribute("aria-expanded", "false");
  expect(
    screen.getByRole("region", { name: "Can I add more vehicles or drivers later?" }),
  ).toHaveTextContent("Add vehicles and drivers as your fleet grows");

  const security = screen.getByRole("button", { name: "Is my data secure?" });
  await user.click(security);
  expect(growth).toHaveAttribute("aria-expanded", "false");
  expect(screen.getByRole("region", { name: "Is my data secure?" })).toHaveTextContent(
    "authorized team members",
  );

  const support = screen.getByRole("button", { name: "What kind of support do you provide?" });
  await user.click(support);
  expect(security).toHaveAttribute("aria-expanded", "false");
  expect(
    screen.getByRole("region", { name: "What kind of support do you provide?" }),
  ).toHaveTextContent("fleet administrator or support team");
  await user.click(support);
  await waitFor(() =>
    expect(
      screen.queryByRole("region", { name: "What kind of support do you provide?" }),
    ).not.toBeInTheDocument(),
  );
  for (const button of buttons) expect(button).toHaveAttribute("aria-expanded", "false");
});

it("allows keyboard users to open, navigate and collapse FAQ answers", async () => {
  const user = userEvent.setup();
  render(<FaqSection />);
  const first = screen.getByRole("button", { name: "What types of vehicles are supported?" });
  await user.tab();
  expect(first).toHaveFocus();
  await user.keyboard("{Enter}");
  expect(first).toHaveAttribute("aria-expanded", "true");
  await user.tab();
  const second = screen.getByRole("button", {
    name: "Do I need special hardware to use the platform?",
  });
  expect(second).toHaveFocus();
  await user.keyboard(" ");
  expect(second).toHaveAttribute("aria-expanded", "true");
  expect(first).toHaveAttribute("aria-expanded", "false");
  await user.keyboard("{Enter}");
  expect(second).toHaveAttribute("aria-expanded", "false");
});
