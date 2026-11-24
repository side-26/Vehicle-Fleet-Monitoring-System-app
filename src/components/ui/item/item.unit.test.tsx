import { createRef } from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";

import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "./index";
import { itemColors, itemVariants } from "./item.types";

afterEach(cleanup);

it("composes an accessible list item with decorative media and descriptive content", () => {
  render(
    <ul aria-label="Principles">
      <Item>
        <ItemMedia>
          <svg aria-label="Target" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Our Mission</ItemTitle>
          <ItemDescription>Simplify fleet operations.</ItemDescription>
        </ItemContent>
      </Item>
    </ul>,
  );
  expect(screen.getByRole("list", { name: "Principles" })).toBeInTheDocument();
  expect(screen.getAllByRole("listitem")).toHaveLength(1);
  expect(screen.getByRole("heading", { level: 3, name: "Our Mission" })).toBeInTheDocument();
  expect(screen.getByText("Simplify fleet operations.")).toBeInTheDocument();
  expect(screen.getByLabelText("Target").parentElement).toHaveAttribute("aria-hidden", "true");
});

it("forwards native props, refs and custom classes through every part", () => {
  const ref = createRef<HTMLLIElement>();
  const mediaRef = createRef<HTMLDivElement>();
  const contentRef = createRef<HTMLDivElement>();
  const titleRef = createRef<HTMLHeadingElement>();
  const descriptionRef = createRef<HTMLParagraphElement>();
  render(
    <ul>
      <Item ref={ref} className="custom" id="mission">
        <ItemMedia ref={mediaRef} className="custom" title="Media" />
        <ItemContent ref={contentRef} className="custom" title="Content">
          <ItemTitle ref={titleRef} className="custom" title="Title">
            Mission
          </ItemTitle>
          <ItemDescription ref={descriptionRef} className="custom" title="Description">
            Copy
          </ItemDescription>
        </ItemContent>
      </Item>
    </ul>,
  );
  expect(ref.current).toHaveAttribute("id", "mission");
  for (const part of [ref, mediaRef, contentRef, titleRef, descriptionRef]) {
    expect(part.current).toHaveClass("custom");
  }
  expect(mediaRef.current).toHaveAttribute("title", "Media");
  expect(contentRef.current).toHaveAttribute("title", "Content");
  expect(titleRef.current).toHaveAttribute("title", "Title");
  expect(descriptionRef.current).toHaveAttribute("title", "Description");
});

it("defaults to inherited color", () => {
  render(
    <ul>
      <Item>Inherited</Item>
    </ul>,
  );
  expect(screen.getByRole("listitem")).toHaveAttribute("data-color", "inherit");
});

it.each(itemColors)("supports the %s color", (color) => {
  render(
    <ul>
      <Item color={color}>Content</Item>
    </ul>,
  );
  expect(screen.getByRole("listitem")).toHaveAttribute("data-color", color);
  expect(screen.getByRole("listitem")).not.toHaveAttribute("color");
});

it("defaults to the transparent variant", () => {
  render(
    <ul>
      <Item>Content</Item>
    </ul>,
  );
  expect(screen.getByRole("listitem")).toHaveAttribute("data-variant", "default");
});

it.each(itemVariants.flatMap((variant) => itemColors.map((color) => ({ variant, color }))))(
  "supports $variant with the $color palette",
  ({ variant, color }) => {
    render(
      <ul>
        <Item variant={variant} color={color}>
          Content
        </Item>
      </ul>,
    );
    expect(screen.getByRole("listitem")).toHaveAttribute("data-variant", variant);
    expect(screen.getByRole("listitem")).toHaveAttribute("data-color", color);
  },
);

it("groups items with native list semantics and forwards group props and ref", () => {
  const ref = createRef<HTMLUListElement>();
  render(
    <ItemGroup ref={ref} aria-label="Principles" className="custom" id="principles">
      <Item>Mission</Item>
      <Item>Vision</Item>
    </ItemGroup>,
  );
  expect(ref.current).toBe(screen.getByRole("list", { name: "Principles" }));
  expect(ref.current).toHaveAttribute("id", "principles");
  expect(ref.current).toHaveAttribute("data-slot", "item-group");
  expect(ref.current).toHaveClass("custom");
  expect(screen.getAllByRole("listitem")).toHaveLength(2);
});
