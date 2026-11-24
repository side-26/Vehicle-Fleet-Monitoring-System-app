// @vitest-environment jsdom
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { useAnimationRunOnIntersectionObserver } from "./use-animation-run-on-intersection-observer";

let callback: IntersectionObserverCallback;

const observe = vi.fn();
const disconnect = vi.fn();
const constructor = vi.fn();

class Observer implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "0px";
  readonly thresholds = [0.1];
  observe = observe;
  disconnect = disconnect;
  unobserve = vi.fn();
  takeRecords = () => [];
  constructor(handler: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    callback = handler;
    constructor(options);
  }
}

const observer = {
  root: null,
  rootMargin: "0px",
  thresholds: [0.1],
  observe,
  disconnect,
  unobserve: vi.fn(),
  takeRecords: () => [],
} satisfies IntersectionObserver;

beforeEach(() => {
  vi.stubGlobal("IntersectionObserver", Observer);
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function intersect(target: Element, ratio: number, isIntersecting = true) {
  const entry = {
    target,
    intersectionRatio: ratio,
    isIntersecting,
    time: 0,
    boundingClientRect: target.getBoundingClientRect(),
    intersectionRect: target.getBoundingClientRect(),
    rootBounds: null,
  } satisfies IntersectionObserverEntry;
  act(() => {
    callback([entry], observer);
  });
}

it("starts hidden, waits for the threshold and stays visible after entering once", () => {
  const { result } = renderHook(() => useAnimationRunOnIntersectionObserver());
  expect(result.current.isVisible).toBe(false);
  const section = document.createElement("section");
  act(() => result.current.ref(section));
  expect(observe).toHaveBeenCalledWith(section);
  intersect(section, 0.05);
  expect(result.current.isVisible).toBe(false);
  intersect(section, 0.2);
  expect(result.current.isVisible).toBe(true);
  expect(disconnect).toHaveBeenCalled();
  intersect(section, 0, false);
  expect(result.current.isVisible).toBe(true);
});

it("supports replay and forwards observer options", () => {
  const root = document.createElement("div");
  const { result } = renderHook(() =>
    useAnimationRunOnIntersectionObserver({
      once: false,
      root,
      rootMargin: "20px",
      threshold: [0.25, 0.5],
    }),
  );
  const section = document.createElement("section");
  act(() => result.current.ref(section));
  expect(constructor).toHaveBeenCalledWith({ root, rootMargin: "20px", threshold: [0.25, 0.5] });
  intersect(section, 0.3);
  expect(result.current.isVisible).toBe(true);
  intersect(section, 0, false);
  expect(result.current.isVisible).toBe(false);
});

it("disconnects on target replacement and unmount and ignores stale notifications", () => {
  const { result, unmount } = renderHook(() =>
    useAnimationRunOnIntersectionObserver({ once: false }),
  );
  const first = document.createElement("section");
  act(() => result.current.ref(first));
  const stale = callback;
  const second = document.createElement("section");
  act(() => result.current.ref(second));
  expect(disconnect).toHaveBeenCalled();
  expect(observe).toHaveBeenLastCalledWith(second);
  intersect(first, 1);
  expect(result.current.isVisible).toBe(false);
  unmount();
  act(() => stale([], observer));
  expect(disconnect).toHaveBeenCalledTimes(2);
});

it("reveals content without IntersectionObserver support", () => {
  vi.stubGlobal("IntersectionObserver", undefined);
  const { result } = renderHook(() => useAnimationRunOnIntersectionObserver());
  act(() => result.current.ref(document.createElement("section")));
  expect(result.current.isVisible).toBe(true);
});

it("does not resubscribe when an equivalent threshold array is passed again", () => {
  const { result, rerender } = renderHook(() =>
    useAnimationRunOnIntersectionObserver({ threshold: [0.1, 0.5] }),
  );
  act(() => result.current.ref(document.createElement("section")));
  const count = constructor.mock.calls.length;
  rerender();
  expect(constructor).toHaveBeenCalledTimes(count);
});
