// @vitest-environment jsdom

import { createElement, type PropsWithChildren } from "react";

import { Toast } from "@base-ui/react/toast";
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { DEFAULT_TOAST_DURATION, useToast } from "./use-toast";
import type { ToastOptions } from "./use-toast";

function Wrapper({ children }: Readonly<PropsWithChildren>) {
  return createElement(Toast.Provider, null, children);
}

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

it("adds a toast and closes it after the default 3000 milliseconds", () => {
  const onClose = vi.fn();
  const { result } = renderHook(() => useToast(), { wrapper: Wrapper });
  let id = "";
  act(() => {
    id = result.current.add({ title: "Vehicle saved", onClose });
  });
  expect(DEFAULT_TOAST_DURATION).toBe(3000);
  expect(result.current.toasts[0]).toMatchObject({ id, title: "Vehicle saved", timeout: 3000 });
  act(() => vi.advanceTimersByTime(2999));
  expect(onClose).not.toHaveBeenCalled();
  act(() => vi.advanceTimersByTime(1));
  expect(onClose).toHaveBeenCalledOnce();
  expect(result.current.toasts[0]?.transitionStatus).toBe("ending");
});

const durationCases = [
  { description: "duration", options: { duration: 1200 }, expected: 1200 },
  { description: "native timeout", options: { timeout: 1800 }, expected: 1800 },
  {
    description: "duration over native timeout",
    options: { duration: 900, timeout: 1800 },
    expected: 900,
  },
] satisfies ReadonlyArray<{
  readonly description: string;
  readonly options: ToastOptions;
  readonly expected: number;
}>;

it.each(durationCases)("honors $description", ({ options, expected }) => {
  const onClose = vi.fn();
  const { result } = renderHook(() => useToast(), { wrapper: Wrapper });
  act(() => {
    result.current.add({ ...options, title: "Saved", onClose });
  });
  expect(result.current.toasts[0]?.timeout).toBe(expected);
  expect(result.current.toasts[0]).not.toHaveProperty("duration");
  act(() => vi.advanceTimersByTime(expected - 1));
  expect(onClose).not.toHaveBeenCalled();
  act(() => vi.advanceTimersByTime(1));
  expect(onClose).toHaveBeenCalledOnce();
});

it.each([{ duration: 0 }, { timeout: 0 }])("keeps persistent toasts open: %o", (options) => {
  const onClose = vi.fn();
  const { result } = renderHook(() => useToast(), { wrapper: Wrapper });
  act(() => {
    result.current.add({ ...options, title: "Persistent", onClose });
  });
  act(() => vi.advanceTimersByTime(60000));
  expect(onClose).not.toHaveBeenCalled();
  expect(result.current.toasts[0]?.transitionStatus).not.toBe("ending");
});

it("accepts duration per toast without changing the default for other toasts", () => {
  const { result } = renderHook(() => useToast(), { wrapper: Wrapper });
  act(() => {
    result.current.add({ id: "first", duration: 2000 });
    result.current.add({ id: "second" });
  });
  expect(result.current.toasts.find((toast) => toast.id === "first")?.timeout).toBe(2000);
  expect(result.current.toasts.find((toast) => toast.id === "second")?.timeout).toBe(3000);
  expect(result.current.toasts[0]).toMatchObject({ align: "top-center" });
});

it("preserves native options, typed data, updates and close", () => {
  const { result } = renderHook(() => useToast<{ vehicleId: string }>(), { wrapper: Wrapper });
  act(() => {
    result.current.add({
      id: "vehicle",
      title: "Saved",
      description: "Fleet updated",
      type: "success",
      priority: "high",
      data: { vehicleId: "v-1" },
      duration: 0,
    });
  });
  expect(result.current.toasts[0]).toMatchObject({
    id: "vehicle",
    description: "Fleet updated",
    type: "success",
    priority: "high",
    data: { vehicleId: "v-1" },
    timeout: 0,
  });
  act(() => result.current.update("vehicle", { title: "Updated" }));
  expect(result.current.toasts[0]?.title).toBe("Updated");
  act(() => result.current.close("vehicle"));
  expect(result.current.toasts[0]?.transitionStatus).toBe("ending");
});

it("shares the provider's toast list with native consumers", () => {
  const { result } = renderHook(() => ({ custom: useToast(), native: Toast.useToastManager() }), {
    wrapper: Wrapper,
  });
  act(() => {
    result.current.custom.add({ title: "Shared notification" });
  });
  expect(result.current.native.toasts).toEqual(result.current.custom.toasts);
});

it("keeps the add handler stable across rerenders without hook options", () => {
  const { result, rerender } = renderHook(() => useToast(), { wrapper: Wrapper });
  const add = result.current.add;
  rerender();
  expect(result.current.add).toBe(add);
  act(() => {
    result.current.add({ title: "Saved" });
  });
  expect(result.current.add).toBe(add);
});

it("preserves native promise handling", async () => {
  const { result } = renderHook(() => useToast(), { wrapper: Wrapper });
  await act(async () => {
    const resolved = await result.current.promise(Promise.resolve("Truck"), {
      loading: "Saving",
      success: (vehicle) => ({ title: `${vehicle} saved`, timeout: 1500 }),
      error: "Save failed",
    });
    expect(resolved).toBe("Truck");
  });
  expect(result.current.toasts[0]).toMatchObject({
    title: "Truck saved",
    type: "success",
    timeout: 1500,
  });
});

it("preserves independent per-toast alignment without modifying custom data", () => {
  const { result } = renderHook(() => useToast<{ vehicleId: string }>(), { wrapper: Wrapper });
  act(() => {
    result.current.add({ id: "first", align: "bottom-end", data: { vehicleId: "v-1" } });
    result.current.add({ id: "second" });
  });
  expect(result.current.toasts.find((toast) => toast.id === "first")).toMatchObject({
    align: "bottom-end",
    data: { vehicleId: "v-1" },
  });
  expect(result.current.toasts.find((toast) => toast.id === "second")).toMatchObject({
    align: "top-center",
  });
  act(() => result.current.update("first", { title: "Updated" }));
  expect(result.current.toasts.find((toast) => toast.id === "first")).toMatchObject({
    align: "bottom-end",
  });
});

it("keeps type, duration and alignment independent without storing a color override", () => {
  const { result } = renderHook(() => useToast(), { wrapper: Wrapper });
  act(() => {
    result.current.add({ id: "default" });
    result.current.add({ id: "success", type: "success", align: "bottom-end", duration: 5000 });
  });
  expect(result.current.toasts.find((toast) => toast.id === "default")).toMatchObject({
    align: "top-center",
    timeout: 3000,
  });
  const success = result.current.toasts.find((toast) => toast.id === "success");
  expect(success).toMatchObject({ type: "success", align: "bottom-end", timeout: 5000 });
  expect(success).not.toHaveProperty("color");
  act(() => result.current.update("success", { type: "warning" }));
  expect(result.current.toasts.find((toast) => toast.id === "success")).toMatchObject({
    type: "warning",
  });
});
