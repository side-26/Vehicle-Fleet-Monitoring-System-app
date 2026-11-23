import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { FleetMapSection } from "./index";

vi.mock("@/components/common/viewport-suspense", () => ({
  ViewportSuspense: ({ fallback }: { readonly fallback: React.ReactNode }) => fallback,
}));

it("renders primary section content, exact demo counts, source note", () => {
  render(<FleetMapSection />);
  expect(screen.getByRole("region", { name: "See Your Fleet Across the USA." })).toHaveAttribute(
    "id",
    "fleet-preview",
  );
  const legend = screen.getByRole("list", { name: "Demo fleet vehicle counts" });
  expect(legend).toHaveTextContent("400 Trucks");
  expect(legend).toHaveTextContent("300 Vans");
  expect(legend).toHaveTextContent("200 Cars");
  expect(screen.getByText(/Explore 900 demo vehicles/)).toBeInTheDocument();
  expect(screen.getByRole("status")).toHaveTextContent("Loading fleet map");
  expect(screen.getByText(/Synthetic positions near the 25/)).toBeInTheDocument();
});
