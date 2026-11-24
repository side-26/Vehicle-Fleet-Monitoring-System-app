import { render, screen, within } from "@testing-library/react";
import { expect, it } from "vitest";

import { howItWorksSteps } from "./how-it-works-section.types";
import { HowItWorksSection } from "./index";

it("provides an accessible how-it-works anchor and h2 heading", () => {
  render(<HowItWorksSection />);
  const section = screen.getByRole("region", { name: "Get Started in Three Simple Steps." });
  expect(section).toHaveAttribute("id", "how-it-works");
  expect(within(section).getByRole("heading", { level: 2 })).toHaveAttribute(
    "id",
    "how-it-works-heading",
  );
});

it("presents all three steps in order with accessible numbers and descriptions", () => {
  render(<HowItWorksSection />);
  const articles = screen.getAllByRole("article");
  expect(articles).toHaveLength(3);
  howItWorksSteps.forEach(({ number, title, description }, index) => {
    const article = articles[index];
    if (!article) throw new Error("Missing step");
    expect(within(article).getByRole("heading", { level: 3 })).toHaveTextContent(title);
    expect(
      within(article).getByRole("heading", { name: `Step ${number}: ${title}`, level: 3 }),
    ).toBeInTheDocument();
    expect(within(article).getByText(description)).toBeInTheDocument();
  });
});
