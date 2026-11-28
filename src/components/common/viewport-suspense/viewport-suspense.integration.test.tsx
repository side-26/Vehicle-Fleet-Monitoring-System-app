import dynamic from "next/dynamic";
import { createRef, useCallback, useState, type ComponentType } from "react";

import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";

import { ViewportSuspense } from "./index";

function createMain(Main: ComponentType) {
  return <Main />;
}

const fallback = <p>Loading section</p>;

function Counter() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((value) => value + 1), []);
  return <button onClick={increment}>Count {count}</button>;
}

afterEach(() => vi.unstubAllGlobals());

it("defers the dynamic import until 35% entry, suspends, then retains loaded state", async () => {
  const callbacks: IntersectionObserverCallback[] = [];
  const options: (IntersectionObserverInit | undefined)[] = [];
  const disconnect = vi.fn();
  const observer = {
    root: null,
    rootMargin: "0px",
    thresholds: [0.35],
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect,
    takeRecords: () => [],
  } satisfies IntersectionObserver;
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe = observer.observe;
      disconnect = disconnect;
      constructor(callback: IntersectionObserverCallback, config?: IntersectionObserverInit) {
        callbacks.push(callback);
        options.push(config);
      }
    },
  );
  const dynamicModule = Promise.withResolvers<{ default: typeof Counter }>();
  const loader = vi.fn(() => dynamicModule.promise);
  const Main = dynamic(loader, { loading: () => fallback });
  const main = createMain(Main);
  const ref = createRef<HTMLDivElement>();
  const { unmount } = render(
    <ViewportSuspense ref={ref} data-testid="wrapper" fallback={fallback} dynamicMain={main} />,
  );
  const target = screen.getByTestId("wrapper");
  expect(ref.current).toBe(target);
  expect(options[0]?.threshold).toEqual([0.35]);
  expect(loader).not.toHaveBeenCalled();
  const notify = (ratio: number) => {
    const callback = callbacks[0];
    if (!callback) throw new Error("Missing observer");
    const rect = target.getBoundingClientRect();
    act(() =>
      callback(
        [
          {
            target,
            isIntersecting: ratio > 0,
            intersectionRatio: ratio,
            time: 0,
            boundingClientRect: rect,
            intersectionRect: rect,
            rootBounds: null,
          },
        ],
        observer,
      ),
    );
  };
  notify(0.34);
  expect(loader).not.toHaveBeenCalled();
  notify(0.35);
  expect(loader).toHaveBeenCalledTimes(1);
  expect(screen.getByText("Loading section")).toBeInTheDocument();
  await act(async () => {
    dynamicModule.resolve({ default: Counter });
    await dynamicModule.promise;
  });
  const user = userEvent.setup();
  await user.click(await screen.findByRole("button", { name: "Count 0" }));
  notify(0);
  expect(screen.getByRole("button", { name: "Count 1" })).toBeInTheDocument();
  expect(screen.queryByText("Loading section")).not.toBeInTheDocument();
  expect(disconnect).toHaveBeenCalled();
  unmount();
  expect(ref.current).toBeNull();
});

it("loads content if IntersectionObserver is unavailable", async () => {
  vi.stubGlobal("IntersectionObserver", undefined);
  const Main = dynamic(async () => Counter, { loading: () => fallback });
  const main = createMain(Main);
  render(<ViewportSuspense fallback={fallback} dynamicMain={main} />);
  expect(await screen.findByRole("button", { name: "Count 0" })).toBeInTheDocument();
});
