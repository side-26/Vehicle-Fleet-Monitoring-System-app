import { render, screen, within } from "@testing-library/react";
import { expect, it } from "vitest";

import { fleetFeatures } from "./features-section.types";
import { FeaturesSection } from "./index";

it("provides the features anchor and accessible section heading", () => {
  render(<FeaturesSection />);
  const section = screen.getByRole("region", { name: "Everything You Need to Manage Your Fleet." });
  expect(section).toHaveAttribute("id", "features");
  expect(within(section).getByRole("heading", { level: 2 })).toHaveAttribute(
    "id",
    "features-heading",
  );
});

it("renders all six informational features with h3 titles and descriptions", () => {
  render(<FeaturesSection />);
  expect(screen.getAllByRole("article")).toHaveLength(6);
  for (const { title, description } of fleetFeatures) {
    const article = screen.getByRole("article", { name: title });
    expect(within(article).getByRole("heading", { name: title, level: 3 })).toBeInTheDocument();
    expect(within(article).getByText(description)).toBeInTheDocument();
    expect(within(article).queryByRole("button")).not.toBeInTheDocument();
    expect(within(article).queryByRole("link")).not.toBeInTheDocument();
  }
});
