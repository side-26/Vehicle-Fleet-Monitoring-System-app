import { render, screen, within } from "@testing-library/react";
import { expect, it } from "vitest";

import { PricingSection } from "./index";

it("exposes the pricing anchor, all plan prices and vehicle limits", () => {
  render(<PricingSection />);
  expect(
    screen.getByRole("region", { name: "Simple, Transparent Pricing for Every Fleet." }),
  ).toHaveAttribute("id", "pricing");
  expect(screen.getAllByRole("article")).toHaveLength(3);
  const starter = screen.getByRole("article", { name: "Starter" });
  expect(within(starter).getByText("$29")).toBeInTheDocument();
  expect(within(starter).getByText("Up to 5 vehicles")).toBeInTheDocument();
  const professional = screen.getByRole("article", { name: "Professional" });
  expect(within(professional).getByText("$79")).toBeInTheDocument();
  expect(within(professional).getByText("Up to 25 vehicles")).toBeInTheDocument();
  expect(professional).toHaveAttribute("data-featured", "true");
  expect(within(professional).getByText("Most Popular")).toBeInTheDocument();
  expect(screen.getAllByText("Most Popular")).toHaveLength(1);
  expect(
    within(screen.getByRole("article", { name: "Enterprise" })).getByText("Custom pricing"),
  ).toBeInTheDocument();
});

it("lists plan benefits and provides uniquely named navigation actions", () => {
  render(<PricingSection />);
  expect(
    within(screen.getByRole("list", { name: "Starter features" })).getAllByRole("listitem"),
  ).toHaveLength(3);
  expect(
    within(screen.getByRole("list", { name: "Professional features" })).getByText(
      "Maintenance scheduling",
    ),
  ).toBeInTheDocument();
  expect(
    within(screen.getByRole("list", { name: "Enterprise features" })).getByText("Priority support"),
  ).toBeInTheDocument();
  for (const name of [
    "Get Started — Starter",
    "Get Started — Professional",
    "Contact Sales — Enterprise",
  ]) {
    expect(screen.getByRole("link", { name })).toHaveAttribute("href", "/login");
  }
});
