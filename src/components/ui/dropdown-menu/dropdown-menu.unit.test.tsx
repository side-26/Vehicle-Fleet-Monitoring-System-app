import * as jestDomMatchers from "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./index";

void jestDomMatchers;

function TestMenu({
  onOpenChange,
}: {
  onOpenChange?: React.ComponentProps<typeof DropdownMenu>["onOpenChange"];
}) {
  return (
    <>
      <DropdownMenu defaultOpen onOpenChange={onOpenChange}>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>View vehicles</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div data-testid="outside">Outside</div>
    </>
  );
}

describe("DropdownMenu", () => {
  afterEach(cleanup);
  it("renders an open, accessible, nonmodal menu", () => {
    render(<TestMenu />);
    expect(screen.getByRole("menuitem", { name: "View vehicles" })).toBeInTheDocument();
    expect(document.body).not.toHaveStyle({ overflow: "hidden" });
  });
  it("closes when a container outside the popup scrolls", async () => {
    const onOpenChange = vi.fn();
    render(<TestMenu onOpenChange={onOpenChange} />);
    fireEvent.scroll(screen.getByTestId("outside"));
    await waitFor(() =>
      expect(screen.queryByRole("menuitem", { name: "View vehicles" })).not.toBeInTheDocument(),
    );
    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
  });
  it("stays open when scrolling inside the popup", async () => {
    render(<TestMenu />);
    fireEvent.scroll(screen.getByRole("menu"));
    expect(screen.getByRole("menuitem", { name: "View vehicles" })).toBeInTheDocument();
  });
});
