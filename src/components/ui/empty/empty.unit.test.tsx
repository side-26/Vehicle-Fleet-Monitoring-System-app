import Link from "next/link";
import { createRef } from "react";

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/button";

import { emptyMediaVariants } from "./empty.types";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./index";

afterEach(cleanup);
describe("Empty", () => {
  it("renders semantic content and forwards native props, classes and refs for all parts", () => {
    const root = createRef<HTMLDivElement>();
    const header = createRef<HTMLDivElement>();
    const media = createRef<HTMLDivElement>();
    const title = createRef<HTMLHeadingElement>();
    const description = createRef<HTMLParagraphElement>();
    const content = createRef<HTMLDivElement>();
    render(
      <Empty ref={root} className="custom" aria-labelledby="empty-title">
        <EmptyHeader ref={header}>
          <EmptyMedia ref={media}>Artwork</EmptyMedia>
          <EmptyTitle ref={title} id="empty-title">
            No vehicles
          </EmptyTitle>
          <EmptyDescription ref={description}>Add your first vehicle.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent ref={content}>Actions</EmptyContent>
      </Empty>,
    );
    expect(root.current).toHaveClass("custom");
    expect(root.current).toHaveAccessibleName("No vehicles");
    expect(screen.getByRole("heading", { name: "No vehicles", level: 2 })).toBe(title.current);
    expect(description.current?.tagName).toBe("P");
    for (const [ref, slot] of [
      [root, "empty"],
      [header, "empty-header"],
      [media, "empty-icon"],
      [title, "empty-title"],
      [description, "empty-description"],
      [content, "empty-content"],
    ] as const) {
      expect(ref.current).toHaveAttribute("data-slot", slot);
    }
    expect(media.current).toHaveAttribute("data-variant", "default");
    expect(media.current).toHaveAttribute("aria-hidden", "true");
  });
  it.each(emptyMediaVariants)("supports %s decorative media", (variant) => {
    const { container } = render(
      <EmptyMedia variant={variant}>
        <svg aria-label="Decoration" />
      </EmptyMedia>,
    );
    expect(container.firstChild).toHaveAttribute("data-variant", variant);
    expect(screen.queryByRole("img")).toBeNull();
  });
  it("works without media and supports a supporting link", () => {
    render(
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No results</EmptyTitle>
          <EmptyDescription>
            Try another search or <Link href="/">return home</Link>.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>,
    );
    expect(screen.getByRole("link", { name: "return home" })).toHaveAttribute("href", "/");
    expect(document.querySelector('[data-slot="empty-icon"]')).toBeNull();
  });
  it("allows action composition and preserves disabled actions", async () => {
    const user = userEvent.setup();
    const action = vi.fn();
    render(
      <Empty>
        <EmptyTitle>No vehicles</EmptyTitle>
        <EmptyContent>
          <Button aria-label="Add vehicle" onClick={action}>
            Add vehicle
          </Button>
          <Button aria-label="Import vehicles" onClick={action} disabled>
            Import vehicles
          </Button>
        </EmptyContent>
      </Empty>,
    );
    await user.click(screen.getByRole("button", { name: "Add vehicle" }));
    await user.click(screen.getByRole("button", { name: "Import vehicles" }));
    expect(action).toHaveBeenCalledOnce();
  });
});
