import { createRef } from "react";

import { act, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

import { FadeIn } from "./fade-in";
import { StaggeredListAnimation } from "./stagered-list-animation";

const cases = [
  { name: "FadeIn", Component: FadeIn },
  { name: "StaggeredListAnimation", Component: StaggeredListAnimation },
];

afterEach(() => vi.unstubAllGlobals());

it.each(cases)("$name waits for 40% visibility, then runs once", ({ Component }) => {
  const callbacks: IntersectionObserverCallback[] = [];
  const instances: IntersectionObserver[] = [];
  const options: (IntersectionObserverInit | undefined)[] = [];
  const disconnect = vi.fn();
  class Observer implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = "0px";
    readonly thresholds = [0.4];
    observe = (target: Element) => {
      instances.push({
        root: null,
        rootMargin: "0px",
        thresholds: [0.4],
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect,
        takeRecords: () => [],
      });
      expect(target).toBeInstanceOf(HTMLElement);
    };
    unobserve = vi.fn();
    disconnect = disconnect;
    takeRecords = () => [];
    constructor(callback: IntersectionObserverCallback, config?: IntersectionObserverInit) {
      callbacks.push(callback);
      options.push(config);
    }
  }
  vi.stubGlobal("IntersectionObserver", Observer);
  const ref = createRef<HTMLDivElement>();
  const { unmount } = render(
    <Component ref={ref} data-testid="animation">
      <p>Section content</p>
    </Component>,
  );
  const wrapper = screen.getByTestId("animation");
  expect(ref.current).toBe(wrapper);
  expect(wrapper).toHaveAttribute("data-visible", "false");
  expect(options[0]?.threshold).toEqual([0.4]);
  const notify = (ratio: number) => {
    const callback = callbacks[0];
    const instance = instances[0];
    if (!callback || !instance) throw new Error("Observer was not attached");
    const rect = wrapper.getBoundingClientRect();
    act(() =>
      callback(
        [
          {
            target: wrapper,
            isIntersecting: ratio > 0,
            intersectionRatio: ratio,
            boundingClientRect: rect,
            intersectionRect: rect,
            rootBounds: null,
            time: 0,
          },
        ],
        instance,
      ),
    );
  };
  notify(0.39);
  expect(wrapper).toHaveAttribute("data-visible", "false");
  notify(0.4);
  expect(wrapper).toHaveAttribute("data-visible", "true");
  expect(disconnect).toHaveBeenCalled();
  notify(0);
  expect(wrapper).toHaveAttribute("data-visible", "true");
  unmount();
  expect(ref.current).toBeNull();
});
