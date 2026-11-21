// @vitest-environment jsdom

import { createElement } from "react";

import { act, cleanup, renderHook } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { useIsMobile } from "./use-mobile";

function createMediaQuery(media: string) {
  const query = Object.assign(new EventTarget(), {
    media,
    matches: false,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }) satisfies MediaQueryList;
  return {
    query,
    add: vi.spyOn(query, "addEventListener"),
    remove: vi.spyOn(query, "removeEventListener"),
  };
}

const mediaQueries: ReturnType<typeof createMediaQuery>[] = [];

beforeEach(() => {
  mediaQueries.length = 0;
  vi.stubGlobal("innerWidth", 1024);
  vi.stubGlobal(
    "matchMedia",
    vi.fn((media: string) => {
      const entry = createMediaQuery(media);
      mediaQueries.push(entry);
      return entry.query;
    }),
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it.each([
  { width: 767, expected: true },
  { width: 768, expected: false },
  { width: 769, expected: false },
])("uses the default 768 breakpoint at viewport width $width", ({ width, expected }) => {
  vi.stubGlobal("innerWidth", width);
  const { result } = renderHook(() => useIsMobile());
  expect(result.current).toBe(expected);
  expect(window.matchMedia).toHaveBeenCalledWith("(max-width: 767px)");
});

it.each([
  { width: 1023, expected: true },
  { width: 1024, expected: false },
])("uses a custom breakpoint at viewport width $width", ({ width, expected }) => {
  vi.stubGlobal("innerWidth", width);
  const { result } = renderHook(() => useIsMobile(1024));
  expect(result.current).toBe(expected);
  expect(window.matchMedia).toHaveBeenCalledWith("(max-width: 1023px)");
});

it("updates when the viewport crosses the breakpoint in either direction", () => {
  const { result } = renderHook(() => useIsMobile());
  expect(result.current).toBe(false);
  const media = mediaQueries[0];
  if (!media) throw new Error("Missing media query");
  act(() => {
    vi.stubGlobal("innerWidth", 600);
    media.query.dispatchEvent(new Event("change"));
  });
  expect(result.current).toBe(true);
  act(() => {
    vi.stubGlobal("innerWidth", 900);
    media.query.dispatchEvent(new Event("change"));
  });
  expect(result.current).toBe(false);
});

it("replaces the subscription and recalculates when the breakpoint changes", () => {
  vi.stubGlobal("innerWidth", 900);
  const { result, rerender } = renderHook((breakpoint: number) => useIsMobile(breakpoint), {
    initialProps: 768,
  });
  const first = mediaQueries[0];
  if (!first) throw new Error("Missing first media query");
  expect(result.current).toBe(false);
  rerender(1024);
  expect(result.current).toBe(true);
  expect(window.matchMedia).toHaveBeenLastCalledWith("(max-width: 1023px)");
  expect(first.remove).toHaveBeenCalledWith("change", first.add.mock.calls[0]?.[1]);
  // A stale subscription must not affect the value after replacement.
  act(() => first.query.dispatchEvent(new Event("change")));
  expect(result.current).toBe(true);
});

it("keeps the subscription when the breakpoint stays the same and removes it on unmount", () => {
  const { rerender, unmount } = renderHook(() => useIsMobile());
  const media = mediaQueries[0];
  if (!media) throw new Error("Missing media query");
  rerender();
  expect(window.matchMedia).toHaveBeenCalledOnce();
  expect(media.add).toHaveBeenCalledWith("change", expect.any(Function));
  unmount();
  expect(media.remove).toHaveBeenCalledExactlyOnceWith("change", media.add.mock.calls[0]?.[1]);
});

function ServerExample() {
  return createElement("span", null, String(useIsMobile()));
}

it("returns false on the server without reading matchMedia", () => {
  expect(renderToString(createElement(ServerExample))).toBe("<span>false</span>");
  expect(window.matchMedia).not.toHaveBeenCalled();
});

it("hydrates the server fallback before synchronizing a mobile viewport", async () => {
  vi.stubGlobal("innerWidth", 600);
  const container = document.createElement("div");
  container.innerHTML = renderToString(createElement(ServerExample));
  document.body.append(container);
  expect(container.textContent).toBe("false");
  const onRecoverableError = vi.fn();
  const root = hydrateRoot(container, createElement(ServerExample), { onRecoverableError });
  try {
    await act(async () => {});
    expect(container.textContent).toBe("true");
    expect(onRecoverableError).not.toHaveBeenCalled();
  } finally {
    act(() => root.unmount());
    container.remove();
  }
});
