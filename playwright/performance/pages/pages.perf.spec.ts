import { PERFORMANCE_BUDGETS } from "@playwright/performance/config/budgets";
import { DEFAULT_NETWORK } from "@playwright/performance/config/network";
import { PERFORMANCE_ROUTES } from "@playwright/performance/config/routes";
import { test, expect } from "@playwright/performance/fixtures/performance.fixture";
import { initializeMetrics, collectMetrics } from "@playwright/performance/utils/collect-metrics";
import { savePerformanceReport } from "@playwright/performance/utils/save-report";

for (const route of PERFORMANCE_ROUTES) {
  test(`${route.name} performance`, async ({ page }, testInfo) => {
    await initializeMetrics(page);

    const response = await page.goto(route.path, {
      waitUntil: "load",
    });

    expect(response?.ok()).toBe(true);

    // Fixed observation window for initial performance sampling.
    await page.waitForTimeout(3000);

    const metrics = await collectMetrics(page);

    const device = testInfo.project.name.replace("performance-", "");

    await savePerformanceReport({
      page: route.name,
      route: route.path,
      device,
      network: DEFAULT_NETWORK,
      timestamp: new Date().toISOString(),
      metrics,
    });

    expect.soft(metrics.ttfb).toBeLessThanOrEqual(PERFORMANCE_BUDGETS.ttfb);

    expect.soft(metrics.fcp).not.toBeNull();
    expect.soft(metrics.lcp).not.toBeNull();
    expect.soft(metrics.cls).not.toBeNull();

    if (metrics.fcp !== null) {
      expect.soft(metrics.fcp).toBeLessThanOrEqual(PERFORMANCE_BUDGETS.fcp);
    }

    if (metrics.lcp !== null) {
      expect.soft(metrics.lcp).toBeLessThanOrEqual(PERFORMANCE_BUDGETS.lcp);
    }

    if (metrics.cls !== null) {
      expect.soft(metrics.cls).toBeLessThanOrEqual(PERFORMANCE_BUDGETS.cls);
    }
  });
}
