import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";

import type { collectMetrics } from "./collect-metrics";

interface PerformanceReport {
  page: string;
  route: string;
  device: string;
  network: string;
  timestamp: string;
  metrics: Awaited<ReturnType<typeof collectMetrics>>;
}

export async function savePerformanceReport(report: PerformanceReport) {
  const directory = path.resolve(process.cwd(), "docs", "performance", report.page);

  await mkdir(directory, {
    recursive: true,
  });

  const filename = path.join(directory, `${report.device}.json`);

  await writeFile(filename, JSON.stringify(report, null, 2) + "\n", "utf8");
}
