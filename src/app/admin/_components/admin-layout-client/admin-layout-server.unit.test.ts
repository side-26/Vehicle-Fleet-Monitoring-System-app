import { createElement } from "react";

import { renderToString } from "react-dom/server";
import { expect, it } from "vitest";

import { AdminLayoutClient } from "./index";

it("server-renders the loading fallback without choosing a viewport shell", () => {
  const html = renderToString(createElement(AdminLayoutClient, null, "Page content"));
  expect(html).toContain("Loading admin layout");
  expect(html).not.toContain("Admin bottom navigation");
  expect(html).not.toContain("Admin navigation");
});
