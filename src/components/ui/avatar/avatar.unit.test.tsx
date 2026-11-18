import * as jestDomMatchers from "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "./index";

void jestDomMatchers;

describe("Avatar", () => {
  afterEach(cleanup);

  it("shows its fallback while the image is pending", () => {
    render(
      <Avatar>
        <AvatarImage src="/images/random-avatar.jpg" alt="Fleet operator" />
        <AvatarFallback>FO</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("FO")).toHaveAttribute("data-slot", "avatar-fallback");
  });

  it("renders fallback content without an image", () => {
    render(
      <Avatar>
        <AvatarFallback>FO</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("FO")).toHaveAttribute("data-slot", "avatar-fallback");
  });

  it("renders badge and grouped avatars", () => {
    render(
      <AvatarGroup aria-label="Operators">
        <Avatar>
          <AvatarFallback>FO</AvatarFallback>
          <AvatarBadge aria-label="Online" />
        </Avatar>
        <AvatarGroupCount aria-label="Three more operators">+3</AvatarGroupCount>
      </AvatarGroup>,
    );
    expect(screen.getByLabelText("Operators")).toHaveAttribute("data-slot", "avatar-group");
    expect(screen.getByLabelText("Online")).toHaveAttribute("data-slot", "avatar-badge");
    expect(screen.getByLabelText("Three more operators")).toHaveTextContent("+3");
  });
});
