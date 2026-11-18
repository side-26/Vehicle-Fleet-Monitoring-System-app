import * as jestDomMatchers from "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { cardColors, cardSizes, cardVariants } from "./card.types";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./index";

void jestDomMatchers;

describe("Card", () => {
  afterEach(cleanup);
  it("uses the requested defaults and forwards DOM props", () => {
    render(
      <Card data-testid="card" aria-label="Fleet overview" className="custom">
        Content
      </Card>,
    );
    expect(screen.getByTestId("card")).toHaveAttribute("data-color", "neutral");
    expect(screen.getByTestId("card")).toHaveAttribute("data-size", "md");
    expect(screen.getByTestId("card")).toHaveAttribute("data-variant", "tonal");
    expect(screen.getByTestId("card")).toHaveClass("custom");
    expect(screen.getByTestId("card")).toHaveAccessibleName("Fleet overview");
  });
  it.each(cardColors)("supports %s color", (color) => {
    render(<Card data-testid="card" color={color} />);
    expect(screen.getByTestId("card")).toHaveAttribute("data-color", color);
  });
  it.each(cardSizes)("supports %s size", (size) => {
    render(<Card data-testid="card" size={size} />);
    expect(screen.getByTestId("card")).toHaveAttribute("data-size", size);
  });
  it.each(cardVariants)("supports %s variant", (variant) => {
    render(<Card data-testid="card" variant={variant} />);
    expect(screen.getByTestId("card")).toHaveAttribute("data-variant", variant);
  });
  it("renders semantic title and compound slots", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Fleet</CardTitle>
          <CardDescription>Status</CardDescription>
          <CardAction>Today</CardAction>
        </CardHeader>
        <CardContent>42 active</CardContent>
        <CardFooter>Updated</CardFooter>
      </Card>,
    );
    expect(screen.getByRole("heading", { name: "Fleet" })).toBeInTheDocument();
    for (const slot of [
      "card-header",
      "card-title",
      "card-description",
      "card-action",
      "card-content",
      "card-footer",
    ]) {
      expect(document.querySelector(`[data-slot="${slot}"]`)).toBeInTheDocument();
    }
  });
});
