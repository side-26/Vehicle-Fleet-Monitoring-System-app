import type { Page } from "@playwright/test";

export async function initializeMetrics(page: Page) {
  await page.addInitScript(() => {
    const state = {
      lcp: 0,
      cls: 0,
      sessionValue: 0,
      sessionStart: 0,
      lastShift: 0,
    };

    Object.assign(window, {
      performanceMetrics: state,
    });

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        state.lcp = entry.startTime;
      }
    }).observe({
      type: "largest-contentful-paint",
      buffered: true,
    });

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & {
          value: number;
          hadRecentInput: boolean;
        };

        if (shift.hadRecentInput) continue;

        const sameSession =
          shift.startTime - state.lastShift < 1000 && shift.startTime - state.sessionStart < 5000;

        if (sameSession) {
          state.sessionValue += shift.value;
        } else {
          state.sessionStart = shift.startTime;
          state.sessionValue = shift.value;
        }

        state.lastShift = shift.startTime;
        state.cls = Math.max(state.cls, state.sessionValue);
      }
    }).observe({
      type: "layout-shift",
      buffered: true,
    });
  });
}

export async function collectMetrics(page: Page) {
  return page.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation")[0];

    if (!(navigation instanceof PerformanceNavigationTiming)) {
      throw new Error("Navigation timing unavailable");
    }

    const paint = performance.getEntriesByType("paint");

    const getPaint = (name: string) =>
      paint.find((entry) => entry.name === name)?.startTime ?? null;

    const metricsWindow = window as Window & {
      performanceMetrics?: {
        lcp: number;
        cls: number;
      };
    };

    const observed = metricsWindow.performanceMetrics;

    const resources = performance
      .getEntriesByType("resource")
      .filter(
        (entry): entry is PerformanceResourceTiming => entry instanceof PerformanceResourceTiming,
      );

    return {
      ttfb: navigation.responseStart,
      fcp: getPaint("first-contentful-paint"),
      lcp: observed?.lcp || null,
      cls: observed?.cls ?? null,

      domContentLoaded: navigation.domContentLoadedEventEnd,

      loadTime: navigation.loadEventEnd,

      transferSize:
        navigation.transferSize + resources.reduce((total, entry) => total + entry.transferSize, 0),

      resourceCount: resources.length,
    };
  });
}
